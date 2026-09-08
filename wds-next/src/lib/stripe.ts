import Stripe from 'stripe';

const apiKey = process.env.STRIPE_SECRET_KEY || 'sk_test_placeholder_key_to_allow_next_build';

export const isStripeConfigured = Boolean(
  process.env.STRIPE_SECRET_KEY &&
  !process.env.STRIPE_SECRET_KEY.includes('placeholder') &&
  !process.env.STRIPE_SECRET_KEY.includes('twoj_tajny')
);

export const stripe = new Stripe(apiKey, {
  typescript: true,
  appInfo: {
    name: 'Warsaw Durag Store',
    version: '1.0.0',
  },
});
