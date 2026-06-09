-- ========================================================================
-- WARSAW DURAG STORE — SUPABASE SCHEMA
-- Wklej cały ten plik do: Supabase Dashboard → SQL Editor → Run
-- ========================================================================

-- ========================================================================
-- 1. PRODUCTS TABLE
-- ========================================================================
CREATE TABLE IF NOT EXISTS products (
  id            BIGSERIAL PRIMARY KEY,
  name          TEXT NOT NULL,
  name_en       TEXT,
  price         NUMERIC(10, 2) NOT NULL DEFAULT 79.00,
  category      TEXT NOT NULL DEFAULT 'silk',   -- 'silk' | 'velvet' | 'accessories'
  category_label TEXT NOT NULL DEFAULT 'Czysty Jedwab',
  material      TEXT,
  description   TEXT,
  images        TEXT[] NOT NULL DEFAULT '{}',   -- array of image URLs
  colors        JSONB NOT NULL DEFAULT '[]',     -- [{ name, hex }]
  reviews       JSONB NOT NULL DEFAULT '[]',     -- [{ author, rating, comment, date }]
  stock         INTEGER NOT NULL DEFAULT 10,
  visible       BOOLEAN NOT NULL DEFAULT true,
  created_at    TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at    TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Auto-update updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_products_updated_at
  BEFORE UPDATE ON products
  FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();

-- ========================================================================
-- 2. ORDERS TABLE
-- ========================================================================
CREATE TABLE IF NOT EXISTS orders (
  id                BIGSERIAL PRIMARY KEY,
  order_no          TEXT NOT NULL UNIQUE,        -- '#WDS-123456'
  created_at        TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  
  -- Customer info
  customer_name     TEXT NOT NULL,
  customer_email    TEXT NOT NULL,
  customer_phone    TEXT NOT NULL,
  
  -- Delivery
  delivery_method   TEXT NOT NULL DEFAULT 'courier',   -- 'courier' | 'paczkomat'
  locker_code       TEXT,                               -- InPost locker code if paczkomat
  locker_address    TEXT,
  
  -- Order contents
  items             JSONB NOT NULL DEFAULT '[]',        -- cart items snapshot
  items_summary     TEXT,                               -- human-readable summary
  
  -- Pricing
  subtotal          NUMERIC(10, 2) NOT NULL DEFAULT 0,
  discount_code     TEXT,
  discount_pct      NUMERIC(5, 2) NOT NULL DEFAULT 0,  -- e.g. 10 = 10%
  discount_val      NUMERIC(10, 2) NOT NULL DEFAULT 0,
  total             NUMERIC(10, 2) NOT NULL DEFAULT 0,
  
  -- Status
  status            TEXT NOT NULL DEFAULT 'new'         -- 'new' | 'processing' | 'shipped' | 'delivered' | 'cancelled'
);

-- ========================================================================
-- 3. PROMO CODES TABLE
-- ========================================================================
CREATE TABLE IF NOT EXISTS promo_codes (
  id          BIGSERIAL PRIMARY KEY,
  code        TEXT NOT NULL UNIQUE,
  rate        NUMERIC(5, 2) NOT NULL,    -- discount multiplier, e.g. 0.10 = 10%
  active      BOOLEAN NOT NULL DEFAULT true,
  uses_count  INTEGER NOT NULL DEFAULT 0,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Insert default promo codes
INSERT INTO promo_codes (code, rate) VALUES
  ('WARSAW10', 0.10),
  ('ELEMENTY', 0.15),
  ('DURAGWAVES', 0.20)
ON CONFLICT (code) DO NOTHING;

-- ========================================================================
-- 4. NEWSLETTER TABLE
-- ========================================================================
CREATE TABLE IF NOT EXISTS newsletter_emails (
  id            BIGSERIAL PRIMARY KEY,
  email         TEXT NOT NULL UNIQUE,
  subscribed_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ========================================================================
-- 5. ROW LEVEL SECURITY (RLS) POLICIES
-- ========================================================================

-- Enable RLS on all tables
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE promo_codes ENABLE ROW LEVEL SECURITY;
ALTER TABLE newsletter_emails ENABLE ROW LEVEL SECURITY;

-- ---- PRODUCTS ----
-- Anyone can read visible products (public storefront)
CREATE POLICY "Public can read visible products"
  ON products FOR SELECT
  USING (visible = true);

-- Only authenticated admin can do all operations
CREATE POLICY "Admin full access to products"
  ON products FOR ALL
  USING (auth.role() = 'authenticated')
  WITH CHECK (auth.role() = 'authenticated');

-- ---- ORDERS ----
-- Anyone can insert a new order (place order without account)
CREATE POLICY "Anyone can place an order"
  ON orders FOR INSERT
  WITH CHECK (true);

-- Only authenticated admin can read orders
CREATE POLICY "Admin can read all orders"
  ON orders FOR SELECT
  USING (auth.role() = 'authenticated');

-- Only authenticated admin can update order status
CREATE POLICY "Admin can update order status"
  ON orders FOR UPDATE
  USING (auth.role() = 'authenticated')
  WITH CHECK (auth.role() = 'authenticated');

-- ---- PROMO CODES ----
-- Anyone can read active promo codes (for cart validation)
CREATE POLICY "Public can read active promo codes"
  ON promo_codes FOR SELECT
  USING (active = true);

-- Only admin can manage promo codes
CREATE POLICY "Admin full access to promo codes"
  ON promo_codes FOR ALL
  USING (auth.role() = 'authenticated')
  WITH CHECK (auth.role() = 'authenticated');

-- ---- NEWSLETTER ----
-- Anyone can subscribe
CREATE POLICY "Anyone can subscribe to newsletter"
  ON newsletter_emails FOR INSERT
  WITH CHECK (true);

-- Only admin can read newsletter list
CREATE POLICY "Admin can read newsletter"
  ON newsletter_emails FOR SELECT
  USING (auth.role() = 'authenticated');

-- ========================================================================
-- 6. SEED PRODUCTS FROM window.products (run manually if needed)
-- ========================================================================
-- Products will be seeded automatically by the supabase-config.js
-- seed function on first load if the products table is empty.
-- You can also manually INSERT products here.
