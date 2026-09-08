-- ========================================================================
-- WARSAW DURAG STORE — STRIPE PAYMENTS INTEGRATION MIGRATION
-- Bezpieczna migracja (IDEMPOTENTNA) dodająca obsługę Stripe do tabeli orders
-- ========================================================================

ALTER TABLE orders 
  ADD COLUMN IF NOT EXISTS stripe_session_id TEXT,
  ADD COLUMN IF NOT EXISTS payment_status TEXT NOT NULL DEFAULT 'pending',
  ADD COLUMN IF NOT EXISTS payment_method TEXT;

-- Indeksy dla szybkiego wyszukiwania zamówień po sesji Stripe i numerze
CREATE INDEX IF NOT EXISTS idx_orders_stripe_session_id ON orders(stripe_session_id);
CREATE INDEX IF NOT EXISTS idx_orders_payment_status ON orders(payment_status);

-- Komentarz informacyjny
COMMENT ON COLUMN orders.stripe_session_id IS 'ID sesji Stripe Checkout (cs_test_... / cs_live_...)';
COMMENT ON COLUMN orders.payment_status IS 'Status płatności: pending, paid, failed, refunded';
