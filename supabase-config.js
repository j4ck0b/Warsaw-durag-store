// ========================================================================
// WARSAW DURAG STORE — SUPABASE CLIENT CONFIGURATION
//
// !! UZUPEŁNIJ SWOJE KLUCZE PONIŻEJ !!
// Znajdziesz je w: Supabase Dashboard → Settings → API
// ========================================================================

// Inicjalizacja klienta Supabase z obsługą CDN w przeglądarce i fallbacku offline
const createClient = window.supabase ? window.supabase.createClient : null;

// 🔑 TWOJE KLUCZE SUPABASE — wklej tutaj wartości z dashboardu
const SUPABASE_URL = 'https://icvgsnenbgyvpwmsccym.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImljdmdzbmVuYmd5dnB3bXNjY3ltIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODEwMTIyMjgsImV4cCI6MjA5NjU4ODIyOH0.ls3_Echd4hZkDYJcwr4Wx0YT2gnG36-Me76fwqIMd2I';

// 🔗 URL Twojej Edge Function do wysyłki maili
const EDGE_FUNCTION_URL = `${SUPABASE_URL}/functions/v1/send-order-email`;
window.EDGE_FUNCTION_URL = EDGE_FUNCTION_URL;

const supabase = createClient ? createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false
  }
}) : null;
window.supabaseClient = supabase;

// ========================================================================
// SEED FUNCTION — wykonuje się raz przy pustej bazie
// Importuje produkty z window.products do Supabase
// ========================================================================
async function seedProductsIfEmpty() {
  if (!supabase) {
    console.warn('[WDS] Supabase client is not initialized (offline fallback).');
    return false;
  }
  try {
    // Check if products table is empty
    const { count, error } = await supabase
      .from('products')
      .select('*', { count: 'exact', head: true });

    if (error) {
      console.warn('Supabase products check error:', error.message);
      return false;
    }

    if (count > 0) {
      console.log(`[WDS] Supabase: ${count} produktów już w bazie.`);
      return true;
    }

    // Seed from window.products
    if (!window.products || window.products.length === 0) {
      console.warn('[WDS] Brak produktów do seedowania.');
      return false;
    }

    console.log('[WDS] Seedowanie produktów do Supabase...');

    const rows = window.products.map(p => ({
      id: p.id,
      name: p.name,
      name_en: p.nameEn || p.name,
      price: p.price,
      category: p.category,
      category_label: p.categoryLabel,
      material: p.material || '',
      description: p.description || '',
      images: p.images || [],
      colors: p.colors || [],
      reviews: p.reviews || [],
      stock: 10,
      visible: true
    }));

    const { error: insertError } = await supabase
      .from('products')
      .insert(rows);

    if (insertError) {
      console.error('[WDS] Błąd seedowania produktów:', insertError.message);
      return false;
    }

    console.log(`[WDS] ✓ Zaimportowano ${rows.length} produktów do Supabase.`);
    return true;
  } catch (err) {
    console.warn('[WDS] Seed function error:', err);
    return false;
  }
}
window.seedProductsIfEmpty = seedProductsIfEmpty;

// ========================================================================
// HELPER: Sprawdź czy użytkownik jest zalogowany jako admin
// ========================================================================
async function getAdminSession() {
  if (!supabase) return null;
  try {
    const { data: { session } } = await supabase.auth.getSession();
    return session;
  } catch (e) {
    return null;
  }
}
window.getAdminSession = getAdminSession;
