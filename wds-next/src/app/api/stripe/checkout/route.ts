import { NextRequest, NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';
import { createOrderInSupabase } from '@/lib/supabase';

export async function POST(req: NextRequest) {
  try {
    if (
      !process.env.STRIPE_SECRET_KEY ||
      process.env.STRIPE_SECRET_KEY.includes('placeholder') ||
      process.env.STRIPE_SECRET_KEY.includes('twoj_tajny')
    ) {
      return NextResponse.json(
        {
          error: 'Brak aktywnego klucza Stripe. Wklej poprawny STRIPE_SECRET_KEY (np. sk_test_...) w pliku wds-next/.env.local.',
        },
        { status: 500 }
      );
    }

    const body = await req.json();
    const {
      customerName,
      customerEmail,
      customerPhone,
      deliveryMethod,
      lockerCode,
      lockerAddress,
      items,
      subtotal,
      discountCode,
      discountVal = 0,
      discountPct = 0,
      total,
    } = body;

    // Validation
    if (!customerName || !customerEmail || !customerPhone) {
      return NextResponse.json(
        { error: 'Wymagane są dane zamawiającego (imię, e-mail, telefon).' },
        { status: 400 }
      );
    }

    if (!items || !Array.isArray(items) || items.length === 0) {
      return NextResponse.json(
        { error: 'Koszyk jest pusty.' },
        { status: 400 }
      );
    }

    if (deliveryMethod === 'paczkomat' && !lockerCode) {
      return NextResponse.json(
        { error: 'Nie wybrano Paczkomatu InPost.' },
        { status: 400 }
      );
    }

    if (deliveryMethod === 'courier' && !lockerAddress) {
      return NextResponse.json(
        { error: 'Wymagany jest pełny adres do wysyłki kurierem.' },
        { status: 400 }
      );
    }

    const orderNo = `WDS-${Math.floor(100000 + Math.random() * 900000)}`;

    // Build origin / base URL
    const origin =
      process.env.NEXT_PUBLIC_BASE_URL ||
      req.headers.get('origin') ||
      req.headers.get('referer')?.replace(/\/$/, '') ||
      'https://warsawduragstore.pl';

    // Format line items for Stripe
    const line_items = items.map((item: any) => {
      const imgUrl = item.image
        ? item.image.startsWith('http')
          ? item.image
          : `${origin}${item.image}`
        : undefined;

      return {
        price_data: {
          currency: 'pln',
          product_data: {
            name: item.name,
            images: imgUrl ? [imgUrl] : [],
            description: item.material || 'Warsaw Durag Store — Premium Silk Durag',
          },
          unit_amount: Math.round(Number(item.price) * 100),
        },
        quantity: Math.max(1, Number(item.quantity) || 1),
      };
    });

    // Handle Promo Code Discount via Stripe Coupon
    let discounts: { coupon: string }[] | undefined = undefined;
    if (Number(discountVal) > 0) {
      try {
        const coupon = await stripe.coupons.create({
          amount_off: Math.round(Number(discountVal) * 100),
          currency: 'pln',
          duration: 'once',
          name: discountCode ? `KOD: ${discountCode}` : 'RABAT',
        });
        discounts = [{ coupon: coupon.id }];
      } catch (err) {
        console.error('[Stripe] Błąd tworzenia kuponu rabatowego:', err);
      }
    }

    // Create Stripe Checkout Session
    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      payment_method_types: ['card', 'blik', 'p24'],
      customer_email: customerEmail.trim(),
      line_items,
      discounts,
      metadata: {
        order_no: orderNo,
        customer_name: customerName.trim(),
        customer_email: customerEmail.trim(),
        customer_phone: customerPhone.trim(),
        delivery_method: deliveryMethod,
        locker_code: lockerCode || '',
        locker_address: lockerAddress || '',
        discount_code: discountCode || '',
      },
      success_url: `${origin}/zamowienie/sukces?session_id={CHECKOUT_SESSION_ID}&order_no=${orderNo}`,
      cancel_url: `${origin}?canceled=true`,
    });

    // Create pending order in Supabase
    const orderPayload = {
      order_no: orderNo,
      customer_name: customerName.trim(),
      customer_email: customerEmail.trim(),
      customer_phone: customerPhone.trim(),
      delivery_method: deliveryMethod,
      locker_code: deliveryMethod === 'paczkomat' ? lockerCode : null,
      locker_address: lockerAddress,
      items: items.map((i: any) => ({
        id: i.id,
        name: i.name,
        price: i.price,
        quantity: i.quantity,
        category: i.category,
        material: i.material,
        image: i.image,
      })),
      items_summary: items.map((i: any) => `${i.quantity}x ${i.name}`).join(' | '),
      subtotal: Number(subtotal) || Number(total),
      discount_code: discountCode || null,
      discount_pct: Number(discountPct) || 0,
      discount_val: Number(discountVal) || 0,
      total: Number(total),
      status: 'pending_payment' as const,
      payment_status: 'pending' as const,
      stripe_session_id: session.id,
    };

    const dbRes = await createOrderInSupabase(orderPayload);
    if (!dbRes.success) {
      console.warn('[Supabase] Ostrzeżenie przy zapisie zamówienia wstępnego:', dbRes.error);
    }

    return NextResponse.json({
      url: session.url,
      sessionId: session.id,
      orderNo,
    });
  } catch (error: any) {
    console.error('[Stripe Checkout Error]:', error);
    return NextResponse.json(
      { error: error?.message || 'Wystąpił błąd podczas inicjalizacji płatności.' },
      { status: 500 }
    );
  }
}
