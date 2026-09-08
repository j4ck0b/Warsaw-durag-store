import { NextRequest, NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';
import { updateOrderPaymentBySessionId, getSupabaseServerClient } from '@/lib/supabase';
import Stripe from 'stripe';

export async function POST(req: NextRequest) {
  const body = await req.text();
  const signature = req.headers.get('stripe-signature');

  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  let event: Stripe.Event;

  if (webhookSecret && signature) {
    try {
      event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
    } catch (err: any) {
      console.error(`[Stripe Webhook Signature Error]: ${err.message}`);
      return NextResponse.json({ error: `Błąd weryfikacji podpisu: ${err.message}` }, { status: 400 });
    }
  } else {
    // If webhook secret isn't provided (e.g. initial dev test), parse directly with warning
    console.warn('[Stripe Webhook] Brak STRIPE_WEBHOOK_SECRET. Przetwarzanie bez weryfikacji podpisu.');
    try {
      event = JSON.parse(body) as Stripe.Event;
    } catch (e: any) {
      return NextResponse.json({ error: 'Nieprawidłowy format JSON' }, { status: 400 });
    }
  }

  // Handle specific Stripe events
  switch (event.type) {
    case 'checkout.session.completed': {
      const session = event.data.object as Stripe.Checkout.Session;
      console.log(`[Stripe Webhook] Sesja opłacona: ${session.id}`);

      const orderNo = session.metadata?.order_no;

      try {
        // 1. Try to update by session ID
        const res = await updateOrderPaymentBySessionId(session.id, {
          payment_status: 'paid',
          status: 'new', // Order is now ready to be processed and shipped
          payment_method: session.payment_method_types?.[0] || 'stripe',
        });

        // 2. Fallback: if not found by session_id, update by order_no
        if (!res.success && orderNo) {
          const supabase = getSupabaseServerClient();
          if (supabase) {
            await supabase
              .from('orders')
              .update({
                payment_status: 'paid',
                status: 'new',
                stripe_session_id: session.id,
                payment_method: session.payment_method_types?.[0] || 'stripe',
              })
              .eq('order_no', orderNo);
          }
        }
      } catch (dbErr) {
        console.error('[Stripe Webhook] Błąd aktualizacji bazy danych:', dbErr);
      }
      break;
    }

    case 'payment_intent.payment_failed': {
      const paymentIntent = event.data.object as Stripe.PaymentIntent;
      console.warn(`[Stripe Webhook] Płatność nie powiodła się dla PaymentIntent: ${paymentIntent.id}`);
      break;
    }

    default:
      // Inne zdarzenia Stripe
      break;
  }

  return NextResponse.json({ received: true });
}
