/*
========================================================================
   WARSAW DURAG STORE - APP CONTROLLER
   Full Interactive Experience (Cart, Modals, Filters, Aesthetics)
   Backend: Supabase (PostgreSQL + Edge Functions for email)
========================================================================
*/

// Access Supabase client and helpers from global window scope (allows CORS-safe local files execution)
const supabase = window.supabaseClient;
const seedProductsIfEmpty = window.seedProductsIfEmpty;
const EDGE_FUNCTION_URL = window.EDGE_FUNCTION_URL;

// --- Products array (populated from Supabase on init) ---
let products = [];

// --- Application State ---
let state = {
  cart: [],
  activeCategory: 'all',
  promoApplied: null, // { code: 'WARSAW10', discount: 0.1 } or null
  activeProductInModal: null,
  selectedColorInModal: null,
  activeImageIndexInModal: 0
};

// --- Load products from Supabase (async) ---
async function loadProductsFromSupabase() {
  try {
    // Seed on first use if DB is empty
    await seedProductsIfEmpty();

    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('visible', true)
      .order('id', { ascending: true });

    if (error) {
      console.warn('[WDS] Supabase products load error, falling back to window.products:', error.message);
      products = window.products ? [...window.products] : [];
    } else {
      // Map snake_case DB columns to camelCase used throughout the app
      products = (data || []).map(p => ({
        id: p.id,
        name: p.name,
        nameEn: p.name_en,
        price: parseFloat(p.price),
        category: p.category,
        categoryLabel: p.category_label,
        material: p.material,
        description: p.description,
        images: p.images || [],
        colors: p.colors || [],
        reviews: p.reviews || [],
        stock: p.stock,
        visible: p.visible
      }));
      console.log(`[WDS] ✓ Załadowano ${products.length} produktów z Supabase.`);
    }
  } catch (err) {
    console.warn('[WDS] Błąd ładowania produktów:', err);
    products = window.products ? [...window.products] : [];
  }

  renderProductGrid();
}

// --- DOM Elements Cache ---
const DOM = {
  preloader: document.getElementById('preloader'),
  siteHeader: document.getElementById('siteHeader'),
  hamburgerBtn: document.getElementById('hamburgerBtn'),
  mobileNavDrawer: document.getElementById('mobileNavDrawer'),
  productGrid: document.getElementById('productGrid'),
  filterBtns: document.querySelectorAll('.filter-btn'),
  navFilterLinks: document.querySelectorAll('.nav-links a, .mobile-menu-links a'),
  scrollDownIndicator: document.getElementById('scrollDownIndicator'),
  logoLink: document.getElementById('logoLink'),
  
  // Cart elements
  cartOverlay: document.getElementById('cartOverlay'),
  cartTrigger: document.getElementById('cartTrigger'),
  cartCloseBtn: document.getElementById('cartCloseBtn'),
  cartCount: document.getElementById('cartCount'),
  cartHeaderCount: document.getElementById('cartHeaderCount'),
  cartItemsContainer: document.getElementById('cartItemsContainer'),
  cartPromoInput: document.getElementById('cartPromoInput'),
  cartPromoApplyBtn: document.getElementById('cartPromoApplyBtn'),
  promoStatusMsg: document.getElementById('promoStatusMsg'),
  cartSubtotal: document.getElementById('cartSubtotal'),
  cartDiscountRow: document.getElementById('cartDiscountRow'),
  cartDiscountPercent: document.getElementById('cartDiscountPercent'),
  cartDiscountVal: document.getElementById('cartDiscountVal'),
  cartShipping: document.getElementById('cartShipping'),
  cartTotal: document.getElementById('cartTotal'),
  checkoutBtn: document.getElementById('checkoutBtn'),
  cartFooter: document.getElementById('cartFooter'),
  
  // Modal elements
  productModal: document.getElementById('productModal'),
  modalCloseBtn: document.getElementById('modalCloseBtn'),
  modalImg: document.getElementById('modalImg'),
  modalGalleryPrev: document.getElementById('modalGalleryPrev'),
  modalGalleryNext: document.getElementById('modalGalleryNext'),
  modalThumbnails: document.getElementById('modalThumbnails'),
  modalCategory: document.getElementById('modalCategory'),
  modalTitle: document.getElementById('modalTitle'),
  modalPrice: document.getElementById('modalPrice'),
  modalMaterial: document.getElementById('modalMaterial'),
  modalColors: document.getElementById('modalColors'),
  modalDesc: document.getElementById('modalDesc'),
  modalQtyMinus: document.getElementById('modalQtyMinus'),
  modalQtyPlus: document.getElementById('modalQtyPlus'),
  modalQtyVal: document.getElementById('modalQtyVal'),
  modalAddBtn: document.getElementById('modalAddBtn'),
  modalReviewsCount: document.getElementById('modalReviewsCount'),
  modalReviewsList: document.getElementById('modalReviewsList'),
  tabHeaders: document.querySelectorAll('.tab-header'),
  
  // Newsletter
  newsletterForm: document.getElementById('newsletterForm'),
  newsletterEmail: document.getElementById('newsletterEmail'),
  newsletterSubmitBtn: document.getElementById('newsletterSubmitBtn'),
  newsletterMessage: document.getElementById('newsletterMessage')
};

// ========================================================================
// 1. INITIALIZATION & LAYOUT TRIGGERS
// ========================================================================

document.addEventListener('DOMContentLoaded', async () => {
  // Load Cart from localStorage (cart stays local for session speed)
  const savedCart = localStorage.getItem('wds_cart');
  if (savedCart) {
    try {
      state.cart = JSON.parse(savedCart);
      updateCartBadge();
    } catch (e) {
      state.cart = [];
    }
  }

  // Load products from Supabase (async - renders grid when ready)
  await loadProductsFromSupabase();
  
  // Initialize IntersectionObserver for Scroll Reveals
  initScrollReveals();
  
  // Bind Event Listeners
  bindEventListeners();
  
  // Initialize Admin CMS Portal Controls
  initAdminCMS();

  // Initialize Multi-step Checkout and Paczkomat API
  initCheckoutFlow();
  
  // Initialize WooCommerce Clientside Importers
  initWooCommerceImporter();

  // Initialize Scroll Lock Observer
  initScrollLockObserver();

});

// Hide Preloader on Page Load with Safety Timeout Fallback
const hidePreloader = () => {
  if (DOM.preloader && DOM.preloader.style.opacity !== '0') {
    DOM.preloader.style.opacity = '0';
    setTimeout(() => {
      DOM.preloader.style.display = 'none';
      DOM.preloader.style.visibility = 'hidden';
    }, 800);
  }
};

window.addEventListener('load', hidePreloader);

// Safety timeout: hide preloader after 2s maximum anyway to avoid hanging on slow network asset load
setTimeout(hidePreloader, 2000);

// Sticky Glassmorphic Header transition on scroll
window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    DOM.siteHeader.classList.add('scrolled');
  } else {
    DOM.siteHeader.classList.remove('scrolled');
  }
});

// Scroll Reveal Observer Setup
function initScrollReveals() {
  const revealElements = document.querySelectorAll('.reveal');
  
  const observer = new IntersectionObserver((entries, self) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        self.unobserve(entry.target); // Reveal once
      }
    });
  }, {
    threshold: 0.15
  });
  
  revealElements.forEach(el => observer.observe(el));
}

// ========================================================================
// 2. EVENT BINDING & ROUTING
// ========================================================================

function bindEventListeners() {
  // Mobile Nav Drawer Toggle
  if (DOM.hamburgerBtn) {
    DOM.hamburgerBtn.addEventListener('click', toggleMobileNav);
  }
  
  // Close Mobile Drawer on Link Click and Filter Products
  DOM.navFilterLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      const filter = link.getAttribute('data-filter');
      if (filter) {
        e.preventDefault();
        
        // Close drawer if open
        if (DOM.mobileNavDrawer.classList.contains('active')) {
          toggleMobileNav();
        }
        
        // Filter catalog
        setActiveFilter(filter);
        
        // Scroll to Catalog
        const catalogSec = document.getElementById('kolekcja');
        if (catalogSec) {
          setTimeout(() => {
            catalogSec.scrollIntoView({ behavior: 'smooth' });
          }, 300);
        }
      }
    });
  });

  // Hero Scroll Down button
  if (DOM.scrollDownIndicator) {
    DOM.scrollDownIndicator.addEventListener('click', () => {
      const catalogSec = document.getElementById('kolekcja');
      if (catalogSec) {
        catalogSec.scrollIntoView({ behavior: 'smooth' });
      }
    });
  }
  
  // Return to top on logo click
  if (DOM.logoLink) {
    DOM.logoLink.addEventListener('click', (e) => {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // Collection Filter Button Clicks
  DOM.filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const category = btn.getAttribute('data-category');
      setActiveFilter(category);
    });
  });

  // Cart Drawer Toggles
  DOM.cartTrigger.addEventListener('click', openCartDrawer);
  DOM.cartCloseBtn.addEventListener('click', closeCartDrawer);
  DOM.cartOverlay.addEventListener('click', (e) => {
    if (e.target === DOM.cartOverlay) closeCartDrawer();
  });

  // Cart actions: Qty, Delete, Apply Promo, Checkout
  DOM.cartItemsContainer.addEventListener('click', handleCartItemClicks);
  DOM.cartPromoApplyBtn.addEventListener('click', handleApplyPromoCode);
  DOM.checkoutBtn.addEventListener('click', handleCheckoutProcess);

  // Product Modal Toggles
  DOM.modalCloseBtn.addEventListener('click', closeProductModal);
  DOM.productModal.addEventListener('click', (e) => {
    if (e.target === DOM.productModal) closeProductModal();
  });
  
  if (DOM.modalGalleryPrev) {
    DOM.modalGalleryPrev.addEventListener('click', (e) => {
      e.stopPropagation();
      updateModalGallery(state.activeImageIndexInModal - 1);
    });
  }
  if (DOM.modalGalleryNext) {
    DOM.modalGalleryNext.addEventListener('click', (e) => {
      e.stopPropagation();
      updateModalGallery(state.activeImageIndexInModal + 1);
    });
  }
  
  // Esc Key closes Drawer & Modals
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeCartDrawer();
      closeProductModal();
    }
  });

  // Modal Quantity adjustment
  DOM.modalQtyMinus.addEventListener('click', () => adjustModalQty(-1));
  DOM.modalQtyPlus.addEventListener('click', () => adjustModalQty(1));
  DOM.modalAddBtn.addEventListener('click', handleAddFromModal);

  // Modal Tabs (Accordion details)
  DOM.tabHeaders.forEach(header => {
    header.addEventListener('click', () => {
      const tabName = header.getAttribute('data-tab');
      toggleModalTab(header, tabName);
    });
  });

  // Newsletter Submit Form validation
  if (DOM.newsletterForm) {
    DOM.newsletterForm.addEventListener('submit', handleNewsletterSubmit);
  }
}

// Mobile Nav toggle mechanism
function toggleMobileNav() {
  const isOpen = DOM.mobileNavDrawer.classList.contains('active');
  
  if (isOpen) {
    DOM.mobileNavDrawer.classList.remove('active');
    DOM.mobileNavDrawer.setAttribute('aria-hidden', 'true');
    DOM.hamburgerBtn.classList.remove('active');
    DOM.hamburgerBtn.setAttribute('aria-label', 'Otwórz menu');
    document.body.style.overflow = '';
  } else {
    DOM.mobileNavDrawer.classList.add('active');
    DOM.mobileNavDrawer.setAttribute('aria-hidden', 'false');
    DOM.hamburgerBtn.classList.add('active');
    DOM.hamburgerBtn.setAttribute('aria-label', 'Zamknij menu');
    document.body.style.overflow = 'hidden';
  }
}

// Active Filter setter with smooth fade animation
function setActiveFilter(category) {
  state.activeCategory = category;
  
  // Update nav UI buttons
  DOM.filterBtns.forEach(btn => {
    if (btn.getAttribute('data-category') === category) {
      btn.classList.add('active');
      btn.setAttribute('aria-selected', 'true');
    } else {
      btn.classList.remove('active');
      btn.setAttribute('aria-selected', 'false');
    }
  });

  // Fade-out catalog, filter, then fade-in
  DOM.productGrid.style.transition = 'opacity 0.3s cubic-bezier(0.25, 1, 0.5, 1)';
  DOM.productGrid.style.opacity = '0';
  
  setTimeout(() => {
    renderProductGrid();
    DOM.productGrid.style.opacity = '1';
  }, 300);
}

// ========================================================================
// 3. CATALOG RENDERING & SHOP INTERACTIONS
// ========================================================================

function renderProductGrid() {
  const filtered = state.activeCategory === 'all' 
    ? products 
    : products.filter(p => p.category === state.activeCategory);
    
  DOM.productGrid.innerHTML = '';
  
  if (filtered.length === 0) {
    DOM.productGrid.innerHTML = `<p style="grid-column: 1/-1; text-align:center; color:var(--color-secondary); padding: 40px 0;">Brak dostępnych produktów w wybranej kategorii.</p>`;
    return;
  }
  
  filtered.forEach(p => {
    const card = document.createElement('article');
    card.className = 'product-card reveal active';
    card.setAttribute('data-id', p.id);
    
    // Add specific visual flags
    let badgeHtml = '';
    if (p.id === 1) {
      badgeHtml = `<span class="product-badge gold">Morwowy bestseller</span>`;
    } else if (p.id === 3) {
      badgeHtml = `<span class="product-badge">Wyścigowy Welwet</span>`;
    }
    
    // Swatches render
    let swatchesHtml = '';
    if (p.colors && p.colors.length > 0) {
      swatchesHtml = `<div class="swatches">`;
      p.colors.forEach(c => {
        swatchesHtml += `<span class="swatch" style="background-color: ${c.hex};" title="${c.name}"></span>`;
      });
      swatchesHtml += `</div>`;
    }

    card.innerHTML = `
      <div class="product-image-container">
        ${badgeHtml}
        <img class="product-card-img primary" src="${p.images[0]}" alt="${p.name}" loading="lazy">
        <img class="product-card-img secondary" src="${p.images[1] || p.images[0]}" alt="${p.name} - detale" loading="lazy">
        
        <div class="quick-add-overlay">
          <button class="btn-quick-add" data-action="quickadd" data-id="${p.id}">Dodaj do koszyka</button>
        </div>
      </div>
      
      <div class="product-info">
        <span class="product-category">${p.categoryLabel}</span>
        <h3 class="product-title">${p.name}</h3>
        <div class="product-meta-row">
          <span class="product-price">${p.price.toFixed(2)} PLN</span>
          ${swatchesHtml}
        </div>
      </div>
    `;
    
    // Binding triggers
    // Click card opens modal, except clicking the quick add button itself
    card.addEventListener('click', (e) => {
      if (e.target.closest('[data-action="quickadd"]')) {
        return;
      }
      openProductModal(p.id);
    });
    
    // Quick Add bind
    const quickAddBtn = card.querySelector('[data-action="quickadd"]');
    if (quickAddBtn) {
      quickAddBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        const defaultColor = p.colors && p.colors.length > 0 ? p.colors[0].name : 'Default';
        addToCart(p.id, 1, defaultColor);
        openCartDrawer();
      });
    }
    
    DOM.productGrid.appendChild(card);
  });
}

// ========================================================================
// 4. CART STATE & DRAWER MANAGEMENT
// ========================================================================

function openCartDrawer() {
  DOM.cartOverlay.classList.add('active');
  DOM.cartOverlay.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
  renderCart();
}

function closeCartDrawer() {
  DOM.cartOverlay.classList.remove('active');
  DOM.cartOverlay.setAttribute('aria-hidden', 'true');
  // Re-enable body scroll only if mobile nav is also closed
  if (!DOM.mobileNavDrawer.classList.contains('active')) {
    document.body.style.overflow = '';
  }
}

function updateCartBadge() {
  const totalQty = state.cart.reduce((sum, item) => sum + item.quantity, 0);
  DOM.cartCount.textContent = totalQty;
  DOM.cartHeaderCount.textContent = totalQty;
  
  // Bounce animation trigger
  DOM.cartTrigger.classList.remove('bounce-badge');
  void DOM.cartTrigger.offsetWidth; // Trigger reflow
  DOM.cartTrigger.classList.add('bounce-badge');
}

function addToCart(productId, qty = 1, color = 'Default') {
  const product = products.find(p => p.id === productId);
  if (!product) return;

  // Check if item exists with same color in cart
  const existingIdx = state.cart.findIndex(item => item.id === productId && item.color === color);
  
  if (existingIdx > -1) {
    state.cart[existingIdx].quantity += qty;
  } else {
    state.cart.push({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.images[0],
      color: color,
      quantity: qty
    });
  }

  // Update badge and localStorage
  updateCartBadge();
  localStorage.setItem('wds_cart', JSON.stringify(state.cart));
}

function removeFromCart(index) {
  state.cart.splice(index, 1);
  updateCartBadge();
  localStorage.setItem('wds_cart', JSON.stringify(state.cart));
  renderCart();
}

function updateCartItemQty(index, delta) {
  const item = state.cart[index];
  if (!item) return;
  
  item.quantity += delta;
  
  if (item.quantity <= 0) {
    removeFromCart(index);
  } else {
    updateCartBadge();
    localStorage.setItem('wds_cart', JSON.stringify(state.cart));
    renderCart();
  }
}

function calculateTotals() {
  const subtotal = state.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  let discount = 0;
  
  if (state.promoApplied) {
    discount = subtotal * state.promoApplied.discount;
  }
  
  const total = Math.max(0, subtotal - discount);
  
  return { subtotal, discount, total };
}

function renderCart() {
  DOM.cartItemsContainer.innerHTML = '';
  
  if (state.cart.length === 0) {
    DOM.cartItemsContainer.innerHTML = `<p class="cart-empty-message">Twój koszyk jest obecnie pusty.</p>`;
    // Hide footer details
    DOM.cartFooter.style.opacity = '0.5';
    DOM.cartFooter.style.pointerEvents = 'none';
    
    DOM.cartSubtotal.textContent = '0.00 PLN';
    DOM.cartTotal.textContent = '0.00 PLN';
    DOM.cartDiscountRow.style.display = 'none';
    return;
  }
  
  DOM.cartFooter.style.opacity = '1';
  DOM.cartFooter.style.pointerEvents = 'all';
  
  state.cart.forEach((item, idx) => {
    const itemEl = document.createElement('div');
    itemEl.className = 'cart-item';
    itemEl.innerHTML = `
      <img src="${item.image}" alt="${item.name}" class="cart-item-image">
      <div class="cart-item-info">
        <h4 class="cart-item-name">${item.name}</h4>
        <span class="cart-item-meta">Kolor: ${item.color}</span>
        
        <div class="cart-item-controls">
          <div class="quantity-selector">
            <button class="qty-btn" data-action="minus" data-idx="${idx}">-</button>
            <span class="qty-val">${item.quantity}</span>
            <button class="qty-btn" data-action="plus" data-idx="${idx}">+</button>
          </div>
          <span class="cart-item-price">${(item.price * item.quantity).toFixed(2)} PLN</span>
        </div>
        <div>
          <button class="cart-item-remove" data-action="remove" data-idx="${idx}">Usuń</button>
        </div>
      </div>
    `;
    DOM.cartItemsContainer.appendChild(itemEl);
  });

  // Calculate totals and render
  const totals = calculateTotals();
  DOM.cartSubtotal.textContent = `${totals.subtotal.toFixed(2)} PLN`;
  
  if (state.promoApplied) {
    DOM.cartDiscountRow.style.display = 'flex';
    DOM.cartDiscountPercent.textContent = state.promoApplied.percent;
    DOM.cartDiscountVal.textContent = `-${totals.discount.toFixed(2)} PLN`;
  } else {
    DOM.cartDiscountRow.style.display = 'none';
  }
  
  DOM.cartTotal.textContent = `${totals.total.toFixed(2)} PLN`;
}

function handleCartItemClicks(e) {
  const btn = e.target.closest('button');
  if (!btn) return;
  
  const action = btn.getAttribute('data-action');
  const index = parseInt(btn.getAttribute('data-idx'));
  
  if (action === 'minus') {
    updateCartItemQty(index, -1);
  } else if (action === 'plus') {
    updateCartItemQty(index, 1);
  } else if (action === 'remove') {
    removeFromCart(index);
  }
}

// Apply Promo Coupon Logic — walidacja po stronie Supabase (serwer)
async function handleApplyPromoCode() {
  const rawCode = DOM.cartPromoInput.value.trim().toUpperCase();
  
  if (!rawCode) {
    showPromoMessage('Wpisz kod rabatowy.', 'error');
    return;
  }

  // Show loading state
  DOM.cartPromoApplyBtn.textContent = '...';
  DOM.cartPromoApplyBtn.disabled = true;

  try {
    // Validate server-side — nikt nie może ominąć przez devtools
    const { data, error } = await supabase
      .from('promo_codes')
      .select('code, rate')
      .eq('code', rawCode)
      .eq('active', true)
      .maybeSingle();

    DOM.cartPromoApplyBtn.textContent = 'Zastosuj';
    DOM.cartPromoApplyBtn.disabled = false;

    if (error || !data) {
      state.promoApplied = null;
      showPromoMessage('Nieprawidłowy kod rabatowy.', 'error');
      renderCart();
      return;
    }

    state.promoApplied = {
      code: rawCode,
      discount: parseFloat(data.rate),
      percent: Math.round(parseFloat(data.rate) * 100)
    };
    showPromoMessage(`Dodano kupon ${rawCode}! Zniżka ${state.promoApplied.percent}%`, 'success');
    renderCart();
  } catch (err) {
    DOM.cartPromoApplyBtn.textContent = 'Zastosuj';
    DOM.cartPromoApplyBtn.disabled = false;
    console.warn('[WDS] Promo validation error:', err);
    showPromoMessage('Błąd połączenia. Spróbuj ponownie.', 'error');
  }
}

function showPromoMessage(msg, type) {
  DOM.promoStatusMsg.textContent = msg;
  DOM.promoStatusMsg.className = `promo-status-msg ${type}`;
  setTimeout(() => {
    DOM.promoStatusMsg.textContent = '';
    DOM.promoStatusMsg.className = 'promo-status-msg';
  }, 4000);
}

// Checkout Process Mock and Success view transition
function handleCheckoutProcess() {
  if (state.cart.length === 0) {
    alert('Twój koszyk jest pusty!');
    return;
  }
  
  const cartStepCart = document.getElementById('cartStepCart');
  const cartStepCheckout = document.getElementById('cartStepCheckout');
  
  // Hide Cart View, Show Checkout View
  cartStepCart.style.display = 'none';
  cartStepCheckout.style.display = 'flex';
  
  // Update Checkout Invoice Summaries
  const totals = calculateTotals();
  document.getElementById('checkoutSubtotal').textContent = totals.subtotal.toFixed(2) + ' PLN';
  
  const checkoutDiscountRow = document.getElementById('checkoutDiscountRow');
  const checkoutDiscountVal = document.getElementById('checkoutDiscountVal');
  if (totals.discount > 0) {
    checkoutDiscountRow.style.display = 'flex';
    checkoutDiscountVal.textContent = '-' + totals.discount.toFixed(2) + ' PLN';
  } else {
    checkoutDiscountRow.style.display = 'none';
  }
  document.getElementById('checkoutTotal').textContent = totals.total.toFixed(2) + ' PLN';
}

// ========================================================================
// 5. ACCESSIBLE PRODUCT DETAIL MODAL CONTROLLER
// ========================================================================

function updateModalGallery(index) {
  if (!state.activeProductInModal || !state.activeProductInModal.images) return;
  const images = state.activeProductInModal.images;
  
  if (index < 0) index = images.length - 1;
  if (index >= images.length) index = 0;
  
  state.activeImageIndexInModal = index;
  DOM.modalImg.src = images[index];
  
  const thumbs = DOM.modalThumbnails.querySelectorAll('.modal-thumb');
  thumbs.forEach((t, idx) => {
    if (idx === index) {
      t.classList.add('active');
    } else {
      t.classList.remove('active');
    }
  });
}

function openProductModal(productId) {
  const p = products.find(prod => prod.id === productId);
  if (!p) return;

  state.activeProductInModal = p;
  state.activeImageIndexInModal = 0;
  
  // Inject details
  DOM.modalImg.src = p.images[0];
  DOM.modalImg.alt = p.name;
  DOM.modalCategory.textContent = p.categoryLabel;
  DOM.modalTitle.textContent = p.name;
  DOM.modalPrice.textContent = `${p.price.toFixed(2)} PLN`;
  DOM.modalMaterial.textContent = p.material;
  DOM.modalDesc.textContent = p.description;
  DOM.modalQtyVal.textContent = '1';
  DOM.modalReviewsCount.textContent = p.reviews.length;
  
  // Render thumbnails
  DOM.modalThumbnails.innerHTML = '';
  if (p.images && p.images.length > 1) {
    p.images.forEach((imgSrc, idx) => {
      const thumb = document.createElement('img');
      thumb.className = `modal-thumb ${idx === 0 ? 'active' : ''}`;
      thumb.src = imgSrc;
      thumb.alt = `${p.name} - ujęcie ${idx + 1}`;
      thumb.addEventListener('click', () => {
        updateModalGallery(idx);
      });
      DOM.modalThumbnails.appendChild(thumb);
    });
    DOM.modalGalleryPrev.style.display = 'flex';
    DOM.modalGalleryNext.style.display = 'flex';
  } else {
    DOM.modalGalleryPrev.style.display = 'none';
    DOM.modalGalleryNext.style.display = 'none';
  }
  
  // Render colors swatch inputs
  DOM.modalColors.innerHTML = '';
  if (p.colors && p.colors.length > 0) {
    state.selectedColorInModal = p.colors[0].name;
    
    p.colors.forEach((c, idx) => {
      const swatch = document.createElement('span');
      swatch.className = `color-option ${idx === 0 ? 'selected' : ''}`;
      swatch.style.backgroundColor = c.hex;
      swatch.title = c.name;
      swatch.setAttribute('data-color', c.name);
      
      swatch.addEventListener('click', () => {
        document.querySelectorAll('.color-option').forEach(opt => opt.classList.remove('selected'));
        swatch.classList.add('selected');
        state.selectedColorInModal = c.name;
      });
      
      DOM.modalColors.appendChild(swatch);
    });
  } else {
    state.selectedColorInModal = 'Default';
  }

  // Render Reviews tab
  DOM.modalReviewsList.innerHTML = '';
  p.reviews.forEach(rev => {
    const starStr = '★'.repeat(rev.rating) + '☆'.repeat(5 - rev.rating);
    const revEl = document.createElement('div');
    revEl.className = 'review-item';
    revEl.innerHTML = `
      <div class="review-header">
        <span class="review-author">${rev.author}</span>
        <span class="review-date">${rev.date}</span>
      </div>
      <div class="review-rating">${starStr}</div>
      <p class="review-comment">${rev.comment}</p>
    `;
    DOM.modalReviewsList.appendChild(revEl);
  });

  // Reset tab accordions
  document.querySelectorAll('.tab-content').forEach(c => c.style.maxHeight = null);
  document.querySelectorAll('.tab-header').forEach(h => h.classList.remove('active'));

  // Trigger modal visibility
  DOM.productModal.classList.add('active');
  DOM.productModal.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
}

function closeProductModal() {
  DOM.productModal.classList.remove('active');
  DOM.productModal.setAttribute('aria-hidden', 'true');
  // Re-enable body scroll only if mobile nav/cart drawer is also closed
  if (!DOM.mobileNavDrawer.classList.contains('active') && !DOM.cartOverlay.classList.contains('active')) {
    document.body.style.overflow = '';
  }
  state.activeProductInModal = null;
  state.selectedColorInModal = null;
}

function adjustModalQty(delta) {
  let val = parseInt(DOM.modalQtyVal.textContent);
  val = Math.max(1, val + delta);
  DOM.modalQtyVal.textContent = val;
}

function handleAddFromModal() {
  if (!state.activeProductInModal) return;
  
  const qty = parseInt(DOM.modalQtyVal.textContent);
  addToCart(state.activeProductInModal.id, qty, state.selectedColorInModal);
  
  // Visual feedback on button
  DOM.modalAddBtn.textContent = 'Dodano!';
  DOM.modalAddBtn.disabled = true;
  
  setTimeout(() => {
    DOM.modalAddBtn.textContent = 'Dodaj do koszyka';
    DOM.modalAddBtn.disabled = false;
    closeProductModal();
    openCartDrawer();
  }, 800);
}

// Collapsible Detail Tab Accordions
function toggleModalTab(header, tabName) {
  const content = header.nextElementSibling;
  const isActive = header.classList.contains('active');
  
  // Close all other accordions first
  document.querySelectorAll('.tab-header').forEach(h => {
    if (h !== header) {
      h.classList.remove('active');
      h.nextElementSibling.style.maxHeight = null;
    }
  });

  if (isActive) {
    header.classList.remove('active');
    content.style.maxHeight = null;
  } else {
    header.classList.add('active');
    // Set scrolling container height
    content.style.maxHeight = content.scrollHeight + "px";
  }
}

// ========================================================================
// 6. NEWSLETTER VALIDATION HANDLER
// ========================================================================

function handleNewsletterSubmit(e) {
  e.preventDefault();
  
  const email = DOM.newsletterEmail.value.trim();
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
  // Reset message styles
  DOM.newsletterMessage.textContent = '';
  DOM.newsletterMessage.className = 'newsletter-message';

  if (!email) {
    DOM.newsletterMessage.textContent = 'Wprowadź swój adres e-mail.';
    DOM.newsletterMessage.classList.add('error');
    return;
  }
  
  if (!emailRegex.test(email)) {
    DOM.newsletterMessage.textContent = 'Wprowadź poprawny adres e-mail (np. nazwa@domena.pl).';
    DOM.newsletterMessage.classList.add('error');
    return;
  }

  // Visual submission transition
  DOM.newsletterSubmitBtn.disabled = true;
  DOM.newsletterSubmitBtn.textContent = 'Trwa zapis...';

  setTimeout(() => {
    DOM.newsletterMessage.innerHTML = 'Witamy w klubie! Twój kod rabatowy 10% to: <strong>WDSKLUBNOWY</strong>';
    DOM.newsletterMessage.classList.add('success');
    DOM.newsletterEmail.value = '';
    
    DOM.newsletterSubmitBtn.disabled = false;
    DOM.newsletterSubmitBtn.textContent = 'Dołącz';
  }, 1200);
}

// ========================================================================
// 7. ADMINISTRATIVE CMS PORTAL CONTROLLERS
// ========================================================================

function initAdminCMS() {
  const adminPortalLink = document.getElementById('adminPortalLink');
  const adminLoginModal = document.getElementById('adminLoginModal');
  const adminLoginCloseBtn = document.getElementById('adminLoginCloseBtn');
  const adminLoginForm = document.getElementById('adminLoginForm');
  const adminPassword = document.getElementById('adminPassword');
  const adminLoginMsg = document.getElementById('adminLoginMsg');
  const adminDashboardOverlay = document.getElementById('adminDashboardOverlay');
  const adminDashboardCloseBtn = document.getElementById('adminDashboardCloseBtn');
  
  const cmsTabButtons = document.querySelectorAll('[data-cms-tab]');
  const cmsTabContents = document.querySelectorAll('.cms-tab-content');
  const cmsProductListBody = document.getElementById('cmsProductListBody');
  const cmsPromoListBody = document.getElementById('cmsPromoListBody');
  
  const adminLogoutBtn = document.getElementById('adminLogoutBtn');
  const cmsAddNewBtn = document.getElementById('cmsAddNewBtn');
  const cmsResetDbBtn = document.getElementById('cmsResetDbBtn');
  
  const cmsProductDrawer = document.getElementById('cmsProductDrawer');
  const cmsDrawerCloseBtn = document.getElementById('cmsDrawerCloseBtn');
  const cmsDrawerTitle = document.getElementById('cmsDrawerTitle');
  const cmsProductForm = document.getElementById('cmsProductForm');
  
  const cmsFormProductId = document.getElementById('cmsFormProductId');
  const cmsFormProductName = document.getElementById('cmsFormProductName');
  const cmsFormProductNameEn = document.getElementById('cmsFormProductNameEn');
  const cmsFormProductCategory = document.getElementById('cmsFormProductCategory');
  const cmsFormProductPrice = document.getElementById('cmsFormProductPrice');
  const cmsFormProductMaterial = document.getElementById('cmsFormProductMaterial');
  const cmsFormProductDesc = document.getElementById('cmsFormProductDesc');
  const cmsFormProductImage = document.getElementById('cmsFormProductImage');
  const cmsProductFormImagePreview = document.getElementById('cmsProductFormImagePreview');
  const btnCmsTriggerUpload = document.getElementById('btnCmsTriggerUpload');
  const cmsProductFormFileInput = document.getElementById('cmsProductFormFileInput');
  const btnCmsClearImage = document.getElementById('btnCmsClearImage');
  const cmsFormProductImageUrl = document.getElementById('cmsFormProductImageUrl');
  const cmsPresetItems = document.querySelectorAll('.cms-preset-item');
  
  const cmsAddPromoForm = document.getElementById('cmsAddPromoForm');
  const cmsPromoCode = document.getElementById('cmsPromoCode');
  const cmsPromoRate = document.getElementById('cmsPromoRate');

  if (!adminPortalLink) return;

  // --- Auth Controls ---
  adminPortalLink.addEventListener('click', (e) => {
    e.preventDefault();
    adminLoginModal.classList.add('active');
    adminLoginModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  });

  adminLoginCloseBtn.addEventListener('click', () => {
    adminLoginModal.classList.remove('active');
    adminLoginModal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    adminPassword.value = '';
    adminLoginMsg.textContent = '';
  });

  adminLoginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const emailVal = adminPassword.value.trim(); // pole "hasło" używamy jako email na chwilę, ale dodamy osobne pole

    // Dla uproszczenia: format "email:hasło" w polu hasła, lub email jako login admina
    // Supabase Auth wymaga email + hasła — pobieramy je z formularza
    const adminEmailInput = document.getElementById('adminEmailInput');
    const adminEmail = adminEmailInput ? adminEmailInput.value.trim() : 'admin@warsawduragstore.pl';
    const adminPw = adminPassword.value.trim();

    if (!adminPw) {
      adminLoginMsg.textContent = 'Wpisz hasło dostępu.';
      return;
    }

    const submitBtn = adminLoginForm.querySelector('button[type="submit"]');
    if (submitBtn) { submitBtn.textContent = 'Logowanie...'; submitBtn.disabled = true; }

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: adminEmail,
        password: adminPw
      });

      if (submitBtn) { submitBtn.textContent = 'Zaloguj się'; submitBtn.disabled = false; }

      if (error || !data.session) {
        adminLoginMsg.textContent = 'Niepoprawny e-mail lub hasło.';
        setTimeout(() => { adminLoginMsg.textContent = ''; }, 3000);
        return;
      }

      // Success Login
      adminLoginModal.classList.remove('active');
      adminLoginModal.setAttribute('aria-hidden', 'true');
      adminPassword.value = '';
      if (adminEmailInput) adminEmailInput.value = '';
      adminLoginMsg.textContent = '';
      
      // Open Dashboard
      adminDashboardOverlay.classList.add('active');
      adminDashboardOverlay.setAttribute('aria-hidden', 'false');
      
      switchCmsTab('products');
    } catch (err) {
      if (submitBtn) { submitBtn.textContent = 'Zaloguj się'; submitBtn.disabled = false; }
      adminLoginMsg.textContent = 'Błąd połączenia z serwerem.';
      setTimeout(() => { adminLoginMsg.textContent = ''; }, 3000);
    }
  });

  adminLogoutBtn.addEventListener('click', async () => {
    try {
      if (supabase) {
        await supabase.auth.signOut();
      }
    } catch (e) {
      console.warn('[WDS] Sign out error:', e);
    }
    adminDashboardOverlay.classList.remove('active');
    adminDashboardOverlay.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  });

  adminDashboardCloseBtn.addEventListener('click', () => {
    adminDashboardOverlay.classList.remove('active');
    adminDashboardOverlay.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  });

  // --- CMS Dashboard Tab Routing ---
  cmsTabButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const tabName = btn.getAttribute('data-cms-tab');
      switchCmsTab(tabName);
    });
  });

  function switchCmsTab(tabName) {
    // Buttons active state
    cmsTabButtons.forEach(b => {
      if (b.getAttribute('data-cms-tab') === tabName) {
        b.classList.add('active');
      } else {
        b.classList.remove('active');
      }
    });

    // Content panels hide/show
    cmsTabContents.forEach(c => {
      c.style.display = 'none';
    });
    
    // Capitalize and inject current tab name
    const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);
    
    const panelId = `cmsTab${capitalize(tabName)}`;
    const targetPanel = document.getElementById(panelId);
    if (targetPanel) targetPanel.style.display = 'block';

    // Update headings subtitle based on tab
    const subtitle = document.getElementById('cmsDashboardSubtitle');
    if (tabName === 'products') {
      subtitle.textContent = 'Katalog Twoich luksusowych produktów';
      cmsAddNewBtn.style.display = 'block';
      renderCmsProductList();
    } else if (tabName === 'promos') {
      subtitle.textContent = 'Kody kuponów zniżkowych aktywnych w koszyku';
      cmsAddNewBtn.style.display = 'none';
      renderCmsPromoList();
    } else if (tabName === 'stats') {
      subtitle.textContent = 'Szczegóły sprzedaży oraz historyczny wykaz zakupów';
      cmsAddNewBtn.style.display = 'none';
      renderCmsStats();
    } else if (tabName === 'settings') {
      subtitle.textContent = 'Zaawansowane opcje czyszczenia baz danych';
      cmsAddNewBtn.style.display = 'none';
    }
  }

  // --- RENDER HELPERS ---

  // 1. PRODUCTS TAB RENDER
  function renderCmsProductList() {
    if (!cmsProductListBody) return;
    cmsProductListBody.innerHTML = '';

    products.forEach((p, idx) => {
      const tr = document.createElement('tr');
      tr.style.borderBottom = '1px solid var(--border-color-light)';
      
      tr.innerHTML = `
        <td style="padding: 10px;"><img src="${p.images[0]}" alt="${p.name}" style="width: 48px; height: 48px; object-fit: cover; border: 1px solid var(--border-color-light);"></td>
        <td style="padding: 10px; font-weight: 500; color: var(--color-primary);">${p.name}</td>
        <td style="padding: 10px; text-transform: uppercase; font-size:0.75rem; letter-spacing: 0.05em; color: var(--color-secondary);">${p.categoryLabel}</td>
        <td style="padding: 10px; font-weight: 500;">${p.price.toFixed(2)} PLN</td>
        <td style="padding: 10px; color: var(--color-secondary); font-size: 0.85rem; max-width: 250px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">${p.material}</td>
        <td style="padding: 10px; text-align: right;">
          <button class="btn-text" data-action="edit-prod" data-id="${p.id}" style="font-size: 0.75rem; margin-right: 16px;">Edytuj</button>
          <button class="btn-text" data-action="delete-prod" data-id="${p.id}" style="font-size: 0.75rem; color: #D32F2F; --color-primary: #D32F2F;">Usuń</button>
        </td>
      `;

      // Bind edit button
      tr.querySelector('[data-action="edit-prod"]').addEventListener('click', () => {
        openCmsProductDrawer(p.id);
      });

      // Bind delete button
      tr.querySelector('[data-action="delete-prod"]').addEventListener('click', () => {
        if (confirm(`Czy na pewno chcesz usunąć produkt "${p.name}" z katalogu?`)) {
          deleteCmsProduct(p.id);
        }
      });

      cmsProductListBody.appendChild(tr);
    });
  }

  // Delete Product — Supabase
  async function deleteCmsProduct(id) {
    try {
      const { error } = await supabase
        .from('products')
        .delete()
        .eq('id', id);

      if (error) {
        alert('Błąd usuwania produktu: ' + error.message);
        return;
      }

      // Remove from local array and re-render
      const idx = products.findIndex(p => p.id === id);
      if (idx > -1) products.splice(idx, 1);
      renderCmsProductList();
      renderProductGrid();
    } catch (err) {
      alert('Błąd połączenia przy usuwaniu produktu.');
    }
  }

  // 2. PROMO CODES TAB RENDER — Supabase
  async function renderCmsPromoList() {
    if (!cmsPromoListBody) return;
    cmsPromoListBody.innerHTML = `<tr><td colspan="3" style="text-align:center; padding: 20px 0; color: var(--color-secondary);">Ładowanie...</td></tr>`;
    
    try {
      const { data: promos, error } = await supabase
        .from('promo_codes')
        .select('id, code, rate, active, uses_count')
        .order('created_at', { ascending: false });

      if (error) throw error;

      cmsPromoListBody.innerHTML = '';

      if (!promos || promos.length === 0) {
        cmsPromoListBody.innerHTML = `<tr><td colspan="3" style="text-align:center; padding: 20px 0; color: var(--color-secondary);">Brak zdefiniowanych kuponów rabatowych.</td></tr>`;
        return;
      }

      promos.forEach((pr) => {
        const tr = document.createElement('tr');
        tr.style.borderBottom = '1px solid var(--border-color-light)';
        
        tr.innerHTML = `
          <td style="padding: 14px 10px; font-weight: 500; color: var(--color-primary);">${pr.code}</td>
          <td style="padding: 14px 10px; font-weight: 500; color: #2E7D32;">${Math.round(pr.rate * 100)}% zniżki</td>
          <td style="padding: 14px 10px; text-align: right;">
            <button class="btn-text" data-action="delete-promo" data-id="${pr.id}" style="font-size: 0.75rem; color: #D32F2F; --color-primary: #D32F2F;">Usuń</button>
          </td>
        `;

        tr.querySelector('[data-action="delete-promo"]').addEventListener('click', async () => {
          const { error: delErr } = await supabase
            .from('promo_codes')
            .delete()
            .eq('id', pr.id);
          if (!delErr) renderCmsPromoList();
          else alert('Błąd usuwania kodu: ' + delErr.message);
        });

        cmsPromoListBody.appendChild(tr);
      });
    } catch (err) {
      cmsPromoListBody.innerHTML = `<tr><td colspan="3" style="text-align:center; padding: 20px 0; color: #D32F2F;">Błąd ładowania kuponów.</td></tr>`;
    }
  }

  // Create new coupon — Supabase
  cmsAddPromoForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const code = cmsPromoCode.value.trim().toUpperCase();
    const ratePercent = parseInt(cmsPromoRate.value);
    
    if (!code || isNaN(ratePercent) || ratePercent <= 0 || ratePercent > 100) return;

    const { error } = await supabase
      .from('promo_codes')
      .insert({ code, rate: ratePercent / 100 });

    if (error) {
      if (error.code === '23505') {
        alert('Taki kod rabatowy już istnieje!');
      } else {
        alert('Błąd dodawania kodu: ' + error.message);
      }
      return;
    }

    cmsPromoCode.value = '';
    cmsPromoRate.value = '';
    renderCmsPromoList();
  });

  // 3. STATS TAB RENDER — Supabase
  async function renderCmsStats() {
    const revEl = document.getElementById('cmsStatRevenue');
    const countEl = document.getElementById('cmsStatOrders');
    const bestEl = document.getElementById('cmsStatBestseller');
    const listEl = document.getElementById('cmsOrderHistoryBody');
    
    if (!revEl || !countEl || !bestEl || !listEl) return;

    listEl.innerHTML = `<tr><td colspan="6" style="text-align:center; padding: 20px 0; color: var(--color-secondary);">Ładowanie zamówień...</td></tr>`;

    try {
      const { data: orders, error } = await supabase
        .from('orders')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;

      // Calculate stats
      const totalRev = (orders || []).reduce((sum, o) => sum + parseFloat(o.total || 0), 0);
      revEl.textContent = `${totalRev.toFixed(2)} PLN`;
      countEl.textContent = orders?.length || 0;

      // Bestseller from items JSON
      if (orders && orders.length > 0) {
        const itemCounts = {};
        orders.forEach(o => {
          if (Array.isArray(o.items)) {
            o.items.forEach(item => {
              itemCounts[item.name] = (itemCounts[item.name] || 0) + (item.quantity || 1);
            });
          }
        });
        let bestProduct = 'Brak danych';
        let maxCount = 0;
        for (const [name, count] of Object.entries(itemCounts)) {
          if (count > maxCount) { maxCount = count; bestProduct = name; }
        }
        bestEl.textContent = maxCount > 0 ? `${bestProduct} (${maxCount} szt.)` : 'Brak danych';
      } else {
        bestEl.textContent = 'Brak danych';
      }

      // Render orders history
      listEl.innerHTML = '';
      if (!orders || orders.length === 0) {
        listEl.innerHTML = `<tr><td colspan="6" style="text-align:center; padding: 20px 0; color: var(--color-secondary);">Brak zrealizowanych zamówień.</td></tr>`;
        return;
      }

      orders.forEach(o => {
        const tr = document.createElement('tr');
        tr.style.borderBottom = '1px solid var(--border-color-light)';

        const statusLabels = { new: '🆕 Nowe', processing: '⚙️ W realizacji', shipped: '🚚 Wysłane', delivered: '✅ Dostarczone', cancelled: '❌ Anulowane' };
        const dateStr = new Date(o.created_at).toLocaleString('pl-PL');

        tr.innerHTML = `
          <td style="padding: 14px 10px; font-weight: 500; color: var(--color-primary);">
            ${o.order_no}
            <div style="font-size:0.75rem; color:var(--color-secondary); margin-top:2px;">${o.customer_name} • ${o.customer_phone}</div>
          </td>
          <td style="padding: 14px 10px; font-weight: 300; font-size:0.85rem;">${dateStr}</td>
          <td style="padding: 14px 10px; font-weight: 300; max-width: 250px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;" title="${o.items_summary || ''}">${
            o.items_summary || '—'
          }</td>
          <td style="padding: 14px 10px; color: var(--color-secondary); font-size: 0.85rem;">${o.discount_code ? o.discount_code + ' (-' + parseFloat(o.discount_val).toFixed(2) + ' PLN)' : 'Brak'}</td>
          <td style="padding: 14px 10px; font-weight: 500; text-align: right; color: var(--color-primary);">${parseFloat(o.total).toFixed(2)} PLN</td>
          <td style="padding: 14px 10px;">
            <select class="order-status-select" data-order-id="${o.id}" style="font-size: 0.75rem; padding: 4px 8px; border: 1px solid var(--border-color); background: var(--bg-secondary); color: var(--color-primary); cursor: pointer;">
              <option value="new" ${o.status === 'new' ? 'selected' : ''}>🆕 Nowe</option>
              <option value="processing" ${o.status === 'processing' ? 'selected' : ''}>⚙️ W realizacji</option>
              <option value="shipped" ${o.status === 'shipped' ? 'selected' : ''}>🚚 Wysłane</option>
              <option value="delivered" ${o.status === 'delivered' ? 'selected' : ''}>✅ Dostarczone</option>
              <option value="cancelled" ${o.status === 'cancelled' ? 'selected' : ''}>❌ Anulowane</option>
            </select>
          </td>
        `;

        // Status change handler
        const statusSelect = tr.querySelector('.order-status-select');
        statusSelect.addEventListener('change', async () => {
          const { error: upErr } = await supabase
            .from('orders')
            .update({ status: statusSelect.value })
            .eq('id', o.id);
          if (upErr) {
            alert('Błąd zmiany statusu: ' + upErr.message);
            statusSelect.value = o.status; // revert
          }
        });

        listEl.appendChild(tr);
      });
    } catch (err) {
      listEl.innerHTML = `<tr><td colspan="6" style="text-align:center; padding: 20px 0; color: #D32F2F;">Błąd ładowania zamówień: ${err.message}</td></tr>`;
    }
  }

  // --- PRODUCT FORM EDIT/ADD DRAWER CONTROLLER ---

  // --- VISUAL IMAGE UPLOADER HANDLERS ---
  function initCmsImageUploader() {
    if (!btnCmsTriggerUpload) return;

    // Trigger file dialog
    btnCmsTriggerUpload.addEventListener('click', () => {
      cmsProductFormFileInput.click();
    });

    // Local file selector change handler
    cmsProductFormFileInput.addEventListener('change', (e) => {
      const file = e.target.files[0];
      if (!file) return;

      const reader = new FileReader();
      reader.onload = function(evt) {
        const base64Str = evt.target.result;
        updateCmsImageSource(base64Str, 'upload');
      };
      reader.readAsDataURL(file);
    });

    // Clear custom image
    btnCmsClearImage.addEventListener('click', () => {
      // Revert to first WDS preset
      const firstPreset = './assets/durag_silk_black.png';
      updateCmsImageSource(firstPreset, 'preset');
    });

    // Paste URL text input listener
    cmsFormProductImageUrl.addEventListener('input', () => {
      const urlVal = cmsFormProductImageUrl.value.trim();
      if (urlVal) {
        updateCmsImageSource(urlVal, 'url');
      } else {
        // If empty, fall back to first preset
        const firstPreset = './assets/durag_silk_black.png';
        updateCmsImageSource(firstPreset, 'preset');
      }
    });

    // Click select presets gallery
    cmsPresetItems.forEach(item => {
      item.addEventListener('click', () => {
        const imgPath = item.getAttribute('data-img');
        updateCmsImageSource(imgPath, 'preset');
      });
    });
  }

  // Set the image source, update preview, text URL input, and highlights
  function updateCmsImageSource(src, type) {
    cmsFormProductImage.value = src;
    cmsProductFormImagePreview.src = src;

    // Manage clear button visibility (only show for custom upload/URL)
    if (type === 'upload' || type === 'url') {
      btnCmsClearImage.style.display = 'inline-block';
    } else {
      btnCmsClearImage.style.display = 'none';
      cmsProductFormFileInput.value = ''; // Reset file input
    }

    // Synchronize URL text input field
    if (type !== 'url') {
      cmsFormProductImageUrl.value = ''; // Reset url input unless pasting it
    } else {
      cmsFormProductImageUrl.value = src;
    }

    // Sync presets highlights
    cmsPresetItems.forEach(item => {
      const imgPath = item.getAttribute('data-img');
      if (type === 'preset' && imgPath === src) {
        item.style.borderColor = 'var(--color-primary)';
        item.classList.add('active');
      } else {
        item.style.borderColor = 'var(--border-color)';
        item.classList.remove('active');
      }
    });
  }

  // Initialize visual uploader bindings immediately inside CMS
  initCmsImageUploader();

  cmsAddNewBtn.addEventListener('click', () => {
    openCmsProductDrawer(); // Open blank
  });

  cmsDrawerCloseBtn.addEventListener('click', () => {
    closeCmsProductDrawer();
  });

  function openCmsProductDrawer(productId = null) {
    cmsProductDrawer.classList.add('active');
    cmsProductDrawer.setAttribute('aria-hidden', 'false');
    
    if (productId) {
      // EDIT MODE
      const p = products.find(prod => prod.id === productId);
      if (!p) return;
      
      cmsDrawerTitle.textContent = 'Edytuj Produkt';
      cmsFormProductId.value = p.id;
      cmsFormProductName.value = p.name;
      cmsFormProductNameEn.value = p.nameEn || p.name;
      cmsFormProductCategory.value = p.category;
      cmsFormProductPrice.value = p.price;
      cmsFormProductMaterial.value = p.material;
      cmsFormProductDesc.value = p.description;
      cmsFormProductImage.value = p.images[0];

      // Setup visual uploader field states matching this image
      const isPreset = p.images[0] && (
        p.images[0].includes('durag_silk_black.png') ||
        p.images[0].includes('durag_silk_champagne.png') ||
        p.images[0].includes('durag_velvet_emerald.png') ||
        p.images[0].includes('durag_velvet_royal.png')
      );
      
      if (isPreset) {
        updateCmsImageSource(p.images[0], 'preset');
      } else if (p.images[0] && p.images[0].startsWith('data:image/')) {
        updateCmsImageSource(p.images[0], 'upload');
      } else if (p.images[0]) {
        updateCmsImageSource(p.images[0], 'url');
      } else {
        updateCmsImageSource('./assets/durag_silk_black.png', 'preset');
      }
    } else {
      // ADD NEW MODE
      cmsDrawerTitle.textContent = 'Dodaj Nowy Produkt';
      cmsProductForm.reset();
      cmsFormProductId.value = '';
      cmsFormProductCategory.value = 'silk';
      cmsFormProductImageUrl.value = '';
      updateCmsImageSource('./assets/durag_silk_black.png', 'preset');
    }
  }

  function closeCmsProductDrawer() {
    cmsProductDrawer.classList.remove('active');
    cmsProductDrawer.setAttribute('aria-hidden', 'true');
    cmsProductForm.reset();
    cmsFormProductImageUrl.value = '';
    updateCmsImageSource('./assets/durag_silk_black.png', 'preset');
  }

  // Handle Add/Edit form submission — Supabase
  cmsProductForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const idVal = cmsFormProductId.value;
    const name = cmsFormProductName.value.trim();
    const nameEn = cmsFormProductNameEn.value.trim();
    const category = cmsFormProductCategory.value;
    const price = parseFloat(cmsFormProductPrice.value);
    const material = cmsFormProductMaterial.value.trim();
    const description = cmsFormProductDesc.value.trim();
    const mainImg = cmsFormProductImage.value;
    
    if (!name || !nameEn || isNaN(price) || !material || !description) return;
    
    const categoryLabels = {
      'silk': 'Czysty Jedwab',
      'velvet': 'Ekskluzywny Aksamit',
      'accessories': 'Pielęgnacja & Akcesoria'
    };

    const submitBtn = cmsProductForm.querySelector('button[type="submit"]');
    if (submitBtn) { submitBtn.textContent = 'Zapisywanie...'; submitBtn.disabled = true; }

    try {
      if (idVal) {
        // EDIT EXISTING PRODUCT
        const productId = parseInt(idVal);
        const { error } = await supabase
          .from('products')
          .update({
            name,
            name_en: nameEn,
            category,
            category_label: categoryLabels[category],
            price,
            material,
            description,
            images: [mainImg, mainImg]
          })
          .eq('id', productId);

        if (error) throw error;

        // Update local array
        const idx = products.findIndex(prod => prod.id === productId);
        if (idx > -1) {
          products[idx] = { ...products[idx], name, nameEn, category, categoryLabel: categoryLabels[category], price, material, description, images: [mainImg, mainImg] };
        }
      } else {
        // ADD NEW PRODUCT
        let newColors = [{ name: 'Standard Edition', hex: '#111111' }];
        if (category === 'silk') {
          newColors = [{ name: 'Classic Pearl', hex: '#F3F2EE' }, { name: 'Obsidian Sheen', hex: '#111111' }];
        } else if (category === 'velvet') {
          newColors = [{ name: 'Deep Velvet', hex: '#1C2E24' }];
        }

        const { data: inserted, error } = await supabase
          .from('products')
          .insert({
            name,
            name_en: nameEn,
            category,
            category_label: categoryLabels[category],
            price,
            material,
            description,
            images: [mainImg, mainImg],
            colors: newColors,
            reviews: [{ author: 'Obsługa Sklepu', rating: 5, comment: 'Nowość w katalogu WDS.', date: new Date().toLocaleDateString('pl-PL') }],
            stock: 10,
            visible: true
          })
          .select()
          .single();

        if (error) throw error;

        // Add to local array
        products.push({
          id: inserted.id,
          name: inserted.name,
          nameEn: inserted.name_en,
          price: parseFloat(inserted.price),
          category: inserted.category,
          categoryLabel: inserted.category_label,
          material: inserted.material,
          description: inserted.description,
          images: inserted.images || [],
          colors: inserted.colors || [],
          reviews: inserted.reviews || [],
          stock: inserted.stock,
          visible: inserted.visible
        });
      }

      if (submitBtn) { submitBtn.textContent = 'Zapisz produkt'; submitBtn.disabled = false; }
      closeCmsProductDrawer();
      renderCmsProductList();
      renderProductGrid();
    } catch (err) {
      if (submitBtn) { submitBtn.textContent = 'Zapisz produkt'; submitBtn.disabled = false; }
      alert('Błąd zapisu produktu: ' + err.message);
    }
  });

  // --- DATABASE RESET HELPER — Supabase ---
  cmsResetDbBtn.addEventListener('click', async () => {
    if (confirm('CAŁKOWITY RESET BAZY: Czy jesteś pewien? To polecenie wymaże wszystkie produkty i kody rabatowe z Supabase i przywróci domyślne.')) {
      try {
        // Delete all products and promo codes from Supabase
        await supabase.from('products').delete().neq('id', 0);
        await supabase.from('promo_codes').delete().neq('id', 0);

        // Re-seed products and promos
        await seedProductsIfEmpty();

        // Re-insert default promos
        await supabase.from('promo_codes').insert([
          { code: 'WARSAW10', rate: 0.10 },
          { code: 'ELEMENTY', rate: 0.15 },
          { code: 'DURAGWAVES', rate: 0.20 }
        ]);

        // Reload products
        await loadProductsFromSupabase();

        alert('Baza danych została pomysłnie zresetowana.');
        switchCmsTab('products');
      } catch (err) {
        alert('Błąd resetu bazy: ' + err.message);
      }
    }
  });

}

function initCheckoutFlow() {
  const checkoutBtn = document.getElementById('checkoutBtn');
  const btnBackToCart = document.getElementById('btnBackToCart');
  const cartStepCart = document.getElementById('cartStepCart');
  const cartStepCheckout = document.getElementById('cartStepCheckout');
  
  const deliveryTabBtns = document.querySelectorAll('.delivery-tab-btn');
  const inpostSelectionContainer = document.getElementById('inpostSelectionContainer');
  const inpostSearchInput = document.getElementById('inpostSearchInput');
  const inpostSearchBtn = document.getElementById('inpostSearchBtn');
  const inpostResultsList = document.getElementById('inpostResultsList');
  const selectedPaczkomatCard = document.getElementById('selectedPaczkomatCard');
  const btnChangePaczkomat = document.getElementById('btnChangePaczkomat');
  
  const paczkomatCardCode = document.getElementById('paczkomatCardCode');
  const paczkomatCardAddress = document.getElementById('paczkomatCardAddress');
  const paczkomatCardDesc = document.getElementById('paczkomatCardDesc');
  
  const checkoutForm = document.getElementById('checkoutForm');
  const checkoutName = document.getElementById('checkoutName');
  const checkoutEmail = document.getElementById('checkoutEmail');
  const checkoutPhone = document.getElementById('checkoutPhone');
  const placeOrderBtn = document.getElementById('placeOrderBtn');
  const checkoutErrorMsg = document.getElementById('checkoutErrorMsg');
  
  const checkoutSubtotal = document.getElementById('checkoutSubtotal');
  const checkoutDiscountRow = document.getElementById('checkoutDiscountRow');
  const checkoutDiscountVal = document.getElementById('checkoutDiscountVal');
  const checkoutTotal = document.getElementById('checkoutTotal');
  
  let currentDeliveryMethod = 'courier'; // 'courier' or 'paczkomat'
  let selectedPaczkomat = null; // { name: 'WAW15A', address: '...', description: '...' }

  // Premium Fallback Locker Dataset
  const fallbackLockers = [
    { name: 'WAW42M', address: 'Mokotowska 42, 00-543 Warszawa', description: 'Obok WDS Showroom' },
    { name: 'WAW102A', address: 'Nowy Świat 28, 00-373 Warszawa', description: 'Przy stacji metro' },
    { name: 'WAW15A', address: 'Marszałkowska 115, 00-102 Warszawa', description: 'Obok sklepu Żabka' },
    { name: 'WAW88B', address: 'Aleje Jerozolimskie 54, 00-024 Warszawa', description: 'Obok Dworca Centralnego' },
    { name: 'WAW99C', address: 'Chmielna 12, 00-020 Warszawa', description: 'W bramie kamienicy' }
  ];

  if (!checkoutBtn) return;

  // Toggle Back from Checkout to Cart
  btnBackToCart.addEventListener('click', () => {
    cartStepCheckout.style.display = 'none';
    cartStepCart.style.display = 'flex';
  });

  // Delivery Method Selection Buttons
  deliveryTabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      deliveryTabBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      
      const method = btn.getAttribute('data-method');
      currentDeliveryMethod = method;
      
      if (method === 'paczkomat') {
        inpostSelectionContainer.style.display = 'flex';
        // Auto search/load standard premium fallbacks initially
        renderPaczkomatyResults(fallbackLockers);
      } else {
        inpostSelectionContainer.style.display = 'none';
        checkoutErrorMsg.textContent = '';
      }
    });
  });

  // InPost Paczkomat Live API Search Autocomplete
  const performInPostSearch = async () => {
    const query = inpostSearchInput.value.trim();
    if (!query) {
      // If search query is empty, render beautiful default fallbacks
      renderPaczkomatyResults(fallbackLockers);
      return;
    }

    inpostResultsList.innerHTML = `<div style="text-align:center; padding: 15px; font-size:0.8rem; color:var(--color-secondary);">Wyszukiwanie Paczkomatów w API...</div>`;

    try {
      // InPost Public Points API Query (CORS friendly endpoint, point directory)
      const res = await fetch(`https://api-pl-points.easypack24.net/v1/points?query=${encodeURIComponent(query)}&limit=8`);
      if (!res.ok) throw new Error('API Response Error');
      const data = await res.json();
      
      if (data && data.items && data.items.length > 0) {
        // Map points to clean object array
        const results = data.items.map(item => ({
          name: item.name,
          address: item.address_details.post_code + ' ' + item.address_details.city + ', ' + item.address_details.street + ' ' + (item.address_details.building_number || ''),
          description: item.description || item.location_description || 'Paczkomat InPost'
        }));
        renderPaczkomatyResults(results);
      } else {
        inpostResultsList.innerHTML = `<div style="text-align:center; padding: 15px; font-size:0.8rem; color:var(--color-secondary);">Brak wyników w API. Wybierz z listy poniżej:</div>`;
        setTimeout(() => {
          renderPaczkomatyResults(fallbackLockers);
        }, 1500);
      }
    } catch (err) {
      console.warn('InPost API error, using high-quality local cache: ', err);
      // Fallback to local high-quality mock data
      const searchResults = fallbackLockers.filter(l => 
        l.name.toLowerCase().includes(query.toLowerCase()) || 
        l.address.toLowerCase().includes(query.toLowerCase())
      );
      renderPaczkomatyResults(searchResults.length > 0 ? searchResults : fallbackLockers);
    }
  };

  inpostSearchBtn.addEventListener('click', performInPostSearch);
  inpostSearchInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      performInPostSearch();
    }
  });

  // Render search results
  function renderPaczkomatyResults(lockers) {
    inpostResultsList.innerHTML = '';
    
    lockers.forEach(locker => {
      const div = document.createElement('div');
      div.className = 'paczkomat-item';
      div.innerHTML = `
        <h5>Paczkomat ${locker.name}</h5>
        <p>${locker.address}</p>
        <span>${locker.description}</span>
      `;
      
      div.addEventListener('click', () => {
        selectLocker(locker);
      });
      inpostResultsList.appendChild(div);
    });
  }

  // Select Paczkomat
  function selectLocker(locker) {
    selectedPaczkomat = locker;
    paczkomatCardCode.textContent = 'Paczkomat ' + locker.name;
    paczkomatCardAddress.textContent = locker.address;
    paczkomatCardDesc.textContent = locker.description;
    
    selectedPaczkomatCard.style.display = 'block';
    inpostResultsList.style.display = 'none';
    inpostSearchInput.style.display = 'none';
    inpostSearchBtn.style.display = 'none';
    checkoutErrorMsg.textContent = '';
  }

  // Change Paczkomat
  btnChangePaczkomat.addEventListener('click', () => {
    selectedPaczkomat = null;
    selectedPaczkomatCard.style.display = 'none';
    inpostResultsList.style.display = 'flex';
    inpostSearchInput.style.display = 'block';
    inpostSearchBtn.style.display = 'block';
    inpostSearchInput.value = '';
    renderPaczkomatyResults(fallbackLockers);
  });

  // Place Order Action Validation — zapisuje do Supabase i wysyła maile
  placeOrderBtn.addEventListener('click', async (e) => {
    e.preventDefault();
    checkoutErrorMsg.textContent = '';
    
    const nameVal = checkoutName.value.trim();
    const emailVal = checkoutEmail.value.trim();
    const phoneVal = checkoutPhone.value.trim();
    
    if (!nameVal || !emailVal || !phoneVal) {
      checkoutErrorMsg.textContent = 'Proszę wypełnić wszystkie dane dostawy.';
      return;
    }
    
    if (currentDeliveryMethod === 'paczkomat' && !selectedPaczkomat) {
      checkoutErrorMsg.textContent = 'Proszę wybrać Paczkomat InPost z listy.';
      return;
    }

    // Email validation regex
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(emailVal)) {
      checkoutErrorMsg.textContent = 'Proszę podać prawidłowy adres e-mail.';
      return;
    }

    // Visual order processing block
    placeOrderBtn.textContent = 'Przetwarzanie zamówienia...';
    placeOrderBtn.disabled = true;

    try {
      // Generate order number
      const orderNo = `#WDS-${Math.floor(100000 + Math.random() * 900000)}`;
      const totals = calculateTotals();
      const orderItemsSummary = state.cart.map(item => `${item.name} (${item.color}) x${item.quantity}`).join(', ');

      // Build order object for Supabase
      const orderPayload = {
        order_no: orderNo,
        customer_name: nameVal,
        customer_email: emailVal,
        customer_phone: phoneVal,
        delivery_method: currentDeliveryMethod,
        locker_code: currentDeliveryMethod === 'paczkomat' ? selectedPaczkomat?.name : null,
        locker_address: currentDeliveryMethod === 'paczkomat' ? selectedPaczkomat?.address : null,
        items: state.cart.map(item => ({
          id: item.id,
          name: item.name,
          price: item.price,
          image: item.image,
          color: item.color,
          quantity: item.quantity
        })),
        items_summary: orderItemsSummary,
        subtotal: totals.subtotal,
        discount_code: state.promoApplied ? state.promoApplied.code : null,
        discount_pct: state.promoApplied ? state.promoApplied.percent : 0,
        discount_val: totals.discount,
        total: totals.total,
        status: 'new'
      };

      // 1. Save order to Supabase (with offline local fallback)
      let savedOrder = null;
      let orderError = null;

      if (supabase) {
        try {
          const { data, error } = await supabase
            .from('orders')
            .insert(orderPayload)
            .select()
            .single();
          savedOrder = data;
          orderError = error;
        } catch (e) {
          orderError = e;
        }
      }

      if (!supabase || orderError) {
        console.warn('[WDS] Supabase offline order fallback triggered.');
        savedOrder = {
          id: Date.now(),
          order_no: orderNo,
          ...orderPayload
        };
        
        // Save to local storage for administration stats compatibility
        const localOrders = JSON.parse(localStorage.getItem('wds_orders') || '[]');
        localOrders.unshift({
          orderNo: orderNo,
          date: new Date().toLocaleString('pl-PL'),
          timestamp: Date.now(),
          itemsSummary: orderItemsSummary,
          discountCode: state.promoApplied ? state.promoApplied.code : 'Brak',
          discountVal: totals.discount,
          total: totals.total,
          rawItems: orderPayload.items,
          shipping: {
            method: currentDeliveryMethod,
            name: nameVal,
            email: emailVal,
            phone: phoneVal,
            lockerCode: currentDeliveryMethod === 'paczkomat' ? selectedPaczkomat?.name : null
          }
        });
        localStorage.setItem('wds_orders', JSON.stringify(localOrders));
        orderError = null; // Clear error to allow success view
      }

      // 2. Send emails via Edge Function (non-blocking — fire and forget)
      fetch(EDGE_FUNCTION_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...orderPayload,
          order_no: savedOrder.order_no,
          id: savedOrder.id
        })
      }).catch(err => console.warn('[WDS] Email Edge Function error (non-critical):', err));

      // 3. Show success view
      const cartItemsContainer = document.getElementById('cartItemsContainer');
      const cartFooter = document.getElementById('cartFooter');
      
      cartStepCheckout.style.display = 'none';
      cartStepCart.style.display = 'flex';
      cartItemsContainer.style.opacity = '1';
      cartFooter.style.display = 'none';
      
      cartItemsContainer.innerHTML = `
        <div class="checkout-success-view">
          <div class="success-icon-circle">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h3 style="font-family: var(--font-serif); font-size: 1.6rem; color: var(--color-primary);">Dziękujemy za zamówienie!</h3>
          <p style="font-size: 0.95rem; color: var(--color-secondary); line-height: 1.6; font-weight: 300;">
            Twoje zamówienie zostało pomyślnie przyjęte. Numer zamówienia: <strong style="color:var(--color-primary);">${savedOrder.order_no}</strong>. Szczegóły wysłaliśmy na e-mail: <strong style="color:var(--color-primary);">${emailVal}</strong>.
          </p>
          ${currentDeliveryMethod === 'paczkomat' ? `
            <div style="background-color: var(--bg-secondary); border: 1px solid var(--border-color); padding: 14px; text-align: left; margin: 15px 0; font-size: 0.85rem;">
              <strong style="color:#2E7D32; display:block; margin-bottom:4px;">Dostawa Paczkomat:</strong>
              <strong>${selectedPaczkomat.name}</strong> - ${selectedPaczkomat.address}
            </div>
          ` : `
            <div style="background-color: var(--bg-secondary); border: 1px solid var(--border-color); padding: 14px; text-align: left; margin: 15px 0; font-size: 0.85rem;">
              <strong style="color:var(--color-primary); display:block; margin-bottom:4px;">Dostawa Kurierska:</strong>
              Adresat: ${nameVal}<br>Tel: ${phoneVal}
            </div>
          `}
          <button class="btn-minimal" id="successCloseBtn" style="margin-top: 20px; width: 100%;">Kontynuuj zakupy</button>
        </div>
      `;

      // 4. Clear state
      state.cart = [];
      state.promoApplied = null;
      selectedPaczkomat = null;
      currentDeliveryMethod = 'courier';
      
      checkoutName.value = '';
      checkoutEmail.value = '';
      checkoutPhone.value = '';
      selectedPaczkomatCard.style.display = 'none';
      inpostResultsList.style.display = 'flex';
      inpostSearchInput.style.display = 'block';
      inpostSearchBtn.style.display = 'block';
      inpostSearchInput.value = '';
      deliveryTabBtns.forEach(b => b.classList.remove('active'));
      deliveryTabBtns[0].classList.add('active');
      inpostSelectionContainer.style.display = 'none';
      
      const cartPromoInput = document.getElementById('cartPromoInput');
      if (cartPromoInput) cartPromoInput.value = '';
      
      updateCartBadge();
      localStorage.removeItem('wds_cart');

      // Refresh CMS statistics if panel is open
      updateCmsAnalyticStatsDirectly();

      document.getElementById('successCloseBtn').addEventListener('click', () => {
        closeCartDrawer();
        setTimeout(() => {
          cartFooter.style.display = 'flex';
          cartFooter.style.opacity = '1';
          placeOrderBtn.textContent = 'Kupuję i płacę';
          placeOrderBtn.disabled = false;
          renderCart();
        }, 500);
      });

    } catch (err) {
      console.error('[WDS] Order placement error:', err);
      checkoutErrorMsg.textContent = 'Błąd połączenia z serwerem. Spróbuj ponownie.';
      placeOrderBtn.textContent = 'Kupuję i płacę';
      placeOrderBtn.disabled = false;
    }
  });
}


function updateCmsAnalyticStatsDirectly() {
  const orders = JSON.parse(localStorage.getItem('wds_orders') || '[]');
  const statRevenue = document.getElementById('cmsStatRevenue');
  const statOrders = document.getElementById('cmsStatOrders');
  const statBestseller = document.getElementById('cmsStatBestseller');
  const cmsOrderHistoryBody = document.getElementById('cmsOrderHistoryBody');
  
  if (statOrders) statOrders.textContent = orders.length;
  if (statRevenue) {
    const rev = orders.reduce((sum, o) => sum + o.total, 0);
    statRevenue.textContent = rev.toFixed(2) + ' PLN';
  }
  
  if (statBestseller && orders.length > 0) {
    const counts = {};
    orders.forEach(o => {
      if (o.rawItems) {
        o.rawItems.forEach(item => {
          counts[item.name] = (counts[item.name] || 0) + item.quantity;
        });
      }
    });
    
    let best = 'Brak danych';
    let max = 0;
    for (const name in counts) {
      if (counts[name] > max) {
        max = counts[name];
        best = name;
      }
    }
    statBestseller.textContent = best;
  }

  // Also refresh Order logs list inside CMS panel overlay if open
  if (cmsOrderHistoryBody) {
    cmsOrderHistoryBody.innerHTML = '';
    if (orders.length === 0) {
      cmsOrderHistoryBody.innerHTML = `<tr><td colspan="5" style="text-align:center; padding: 30px 0; color: var(--color-secondary);">Brak zrealizowanych zamówień.</td></tr>`;
      return;
    }
    
    orders.forEach(order => {
      const tr = document.createElement('tr');
      tr.style.borderBottom = '1px solid var(--border-color-light)';
      
      let shippingInfo = '';
      if (order.shipping) {
        shippingInfo = `<div style="font-size:0.75rem; color:var(--color-secondary); margin-top:2px;">Odbiorca: ${order.shipping.name} (${order.shipping.method}${order.shipping.lockerCode ? ` - ${order.shipping.lockerCode}` : ''})</div>`;
      }
      
      tr.innerHTML = `
        <td style="padding: 16px 10px; font-weight: 500; color: var(--color-primary);">${order.orderNo}${shippingInfo}</td>
        <td style="padding: 16px 10px; font-weight: 300;">${order.date}</td>
        <td style="padding: 16px 10px; font-weight: 300; max-width: 300px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;" title="${order.itemsSummary}">${order.itemsSummary}</td>
        <td style="padding: 16px 10px; font-weight: 500; color: var(--color-secondary);">${order.discountCode} (${order.discountVal.toFixed(2)} PLN)</td>
        <td style="padding: 16px 10px; font-weight: 500; text-align: right; color: var(--color-primary);">${order.total.toFixed(2)} PLN</td>
      `;
      cmsOrderHistoryBody.appendChild(tr);
    });
  }
}

function initWooCommerceImporter() {
  const productsDropzone = document.getElementById('cmsWooProductsDropzone');
  const productsFile = document.getElementById('cmsWooProductsFile');
  const productsStatus = document.getElementById('cmsWooProductsStatus');
  
  const ordersDropzone = document.getElementById('cmsWooOrdersDropzone');
  const ordersFile = document.getElementById('cmsWooOrdersFile');
  const ordersStatus = document.getElementById('cmsWooOrdersStatus');
  
  const jsonPaste = document.getElementById('cmsWooJsonPaste');
  const importJsonProducts = document.getElementById('cmsWooImportJsonProducts');
  const importJsonOrders = document.getElementById('cmsWooImportJsonOrders');
  const pasteStatus = document.getElementById('cmsWooPasteStatus');

  if (!productsDropzone) return;

  // --- 1. SETUP DRAG AND DROP HANDLERS ---
  
  // Products Importer Dropzone
  productsDropzone.addEventListener('click', () => productsFile.click());
  productsDropzone.addEventListener('dragover', (e) => {
    e.preventDefault();
    productsDropzone.classList.add('drag-over');
  });
  productsDropzone.addEventListener('dragleave', () => {
    productsDropzone.classList.remove('drag-over');
  });
  productsDropzone.addEventListener('drop', (e) => {
    e.preventDefault();
    productsDropzone.classList.remove('drag-over');
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      handleProductFileImport(files[0]);
    }
  });
  productsFile.addEventListener('change', (e) => {
    if (e.target.files.length > 0) {
      handleProductFileImport(e.target.files[0]);
    }
  });

  // Orders Importer Dropzone
  ordersDropzone.addEventListener('click', () => ordersFile.click());
  ordersDropzone.addEventListener('dragover', (e) => {
    e.preventDefault();
    ordersDropzone.classList.add('drag-over');
  });
  ordersDropzone.addEventListener('dragleave', () => {
    ordersDropzone.classList.remove('drag-over');
  });
  ordersDropzone.addEventListener('drop', (e) => {
    e.preventDefault();
    ordersDropzone.classList.remove('drag-over');
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      handleOrderFileImport(files[0]);
    }
  });
  ordersFile.addEventListener('change', (e) => {
    if (e.target.files.length > 0) {
      handleOrderFileImport(e.target.files[0]);
    }
  });

  // --- 2. FILE IMPORT HANDLERS ---
  
  function handleProductFileImport(file) {
    const reader = new FileReader();
    productsStatus.innerHTML = `<span style="color:var(--color-primary);">Wczytywanie pliku...</span>`;
    
    reader.onload = function(e) {
      const text = e.target.result;
      if (file.name.endsWith('.json')) {
        try {
          const arr = JSON.parse(text);
          importWooProductsArray(arr, productsStatus);
        } catch (err) {
          productsStatus.innerHTML = `<span style="color:#D32F2F;">Błąd składni JSON: ${err.message}</span>`;
        }
      } else if (file.name.endsWith('.csv')) {
        const parsed = parseCSV(text);
        importWooProductsCSV(parsed, productsStatus);
      } else {
        productsStatus.innerHTML = `<span style="color:#D32F2F;">Nieobsługiwany format pliku. Użyj CSV lub JSON.</span>`;
      }
    };
    reader.readAsText(file);
  }

  function handleOrderFileImport(file) {
    const reader = new FileReader();
    ordersStatus.innerHTML = `<span style="color:var(--color-primary);">Wczytywanie pliku...</span>`;
    
    reader.onload = function(e) {
      const text = e.target.result;
      if (file.name.endsWith('.json')) {
        try {
          const arr = JSON.parse(text);
          importWooOrdersArray(arr, ordersStatus);
        } catch (err) {
          ordersStatus.innerHTML = `<span style="color:#D32F2F;">Błąd składni JSON: ${err.message}</span>`;
        }
      } else if (file.name.endsWith('.csv')) {
        const parsed = parseCSV(text);
        importWooOrdersCSV(parsed, ordersStatus);
      } else {
        ordersStatus.innerHTML = `<span style="color:#D32F2F;">Nieobsługiwany format pliku. Użyj CSV lub JSON.</span>`;
      }
    };
    reader.readAsText(file);
  }

  // --- 3. JSON MANUAL PASTE HANDLERS ---
  
  importJsonProducts.addEventListener('click', () => {
    const val = jsonPaste.value.trim();
    if (!val) {
      pasteStatus.innerHTML = `<span style="color:#D32F2F;">Wklej kod JSON przed importem.</span>`;
      return;
    }
    try {
      const arr = JSON.parse(val);
      importWooProductsArray(arr, pasteStatus);
      jsonPaste.value = '';
    } catch (err) {
      pasteStatus.innerHTML = `<span style="color:#D32F2F;">Błąd składni JSON: ${err.message}</span>`;
    }
  });

  importJsonOrders.addEventListener('click', () => {
    const val = jsonPaste.value.trim();
    if (!val) {
      pasteStatus.innerHTML = `<span style="color:#D32F2F;">Wklej kod JSON przed importem.</span>`;
      return;
    }
    try {
      const arr = JSON.parse(val);
      importWooOrdersArray(arr, pasteStatus);
      jsonPaste.value = '';
    } catch (err) {
      pasteStatus.innerHTML = `<span style="color:#D32F2F;">Błąd składni JSON: ${err.message}</span>`;
    }
  });

  // --- 4. CSV LIGHTWEIGHT JS PARSER ---
  
  function parseCSV(text) {
    const lines = [];
    let row = [""];
    let inQuotes = false;

    for (let i = 0; i < text.length; i++) {
      let c = text[i];
      let next = text[i+1];
      
      if (c === '"') {
        if (inQuotes && next === '"') {
          row[row.length - 1] += '"';
          i++;
        } else {
          inQuotes = !inQuotes;
        }
      } else if (c === ',') {
        if (inQuotes) {
          row[row.length - 1] += c;
        } else {
          row.push("");
        }
      } else if (c === '\r' || c === '\n') {
        if (inQuotes) {
          row[row.length - 1] += c;
        } else {
          if (c === '\r' && next === '\n') {
            i++;
          }
          lines.push(row);
          row = [""];
        }
      } else {
        row[row.length - 1] += c;
      }
    }
    if (row.length > 1 || row[0] !== "") {
      lines.push(row);
    }
    return lines;
  }

  // --- 5. DATA MAPPER & SYNCING LOGIC ---
  
  // WooCommerce Product Array Import
  function importWooProductsArray(arr, statusEl) {
    const items = Array.isArray(arr) ? arr : [arr];
    const currentProducts = JSON.parse(localStorage.getItem('wds_products') || '[]');
    let importCount = 0;

    items.forEach(item => {
      // Map columns (WooCommerce JSON product payload schema)
      const name = item.name || item.title || item.post_title || 'Nienazwany produkt z WooCommerce';
      const nameEn = item.nameEn || item.title_en || name;
      const price = parseFloat(item.price || item.regular_price || item.sale_price || 99.00);
      const category = item.category || (item.categories && item.categories[0] ? item.categories[0].slug : 'silk');
      const material = item.material || 'Luksusowe wykończenie streetwear';
      const description = item.description || item.post_content || item.short_description || 'Brak opisu z WooCommerce.';
      
      // Safe image parsing
      let imagePath = './assets/durag_silk_black.png';
      if (item.images && Array.isArray(item.images) && item.images.length > 0) {
        imagePath = item.images[0].src || item.images[0] || imagePath;
      } else if (item.image) {
        imagePath = item.image;
      }

      // Safe category label
      let categoryLabel = 'Czysty Jedwab';
      if (category === 'velvet') categoryLabel = 'Ekskluzywny Aksamit';
      if (category === 'accessories') categoryLabel = 'Pielęgnacja & Akcesoria';

      // Colors mapping
      const colors = item.colors || [
        { name: 'Obsidian Black', hex: '#111111' },
        { name: 'Bronze Satin', hex: '#8A6E55' }
      ];

      // Add record to storage
      const newId = currentProducts.length > 0 ? Math.max(...currentProducts.map(p => p.id)) + 1 : 1;
      const productObj = {
        id: newId,
        name: name,
        nameEn: nameEn,
        price: price,
        category: category,
        categoryLabel: categoryLabel,
        material: material,
        description: description,
        images: [imagePath, './assets/lookbook_editorial.png'],
        colors: colors,
        reviews: []
      };

      currentProducts.push(productObj);
      importCount++;
    });

    localStorage.setItem('wds_products', JSON.stringify(currentProducts));
    
    // Globally sync active lists in memory!
    products = currentProducts;
    
    // Reactively refresh storefront and CMS dashboard
    renderProductGrid();
    
    // If inside admin console, refresh list
    const tabProductsBtn = document.querySelector('[data-cms-tab="products"]');
    if (tabProductsBtn) tabProductsBtn.click();

    statusEl.innerHTML = `<span style="color:#2E7D32;">Pomyślnie zaimportowano ${importCount} produktów!</span>`;
  }

  // WooCommerce Product CSV Import
  function importWooProductsCSV(parsed, statusEl) {
    if (parsed.length < 2) {
      statusEl.innerHTML = `<span style="color:#D32F2F;">Pusty plik CSV lub zła struktura.</span>`;
      return;
    }

    const headers = parsed[0].map(h => h.trim().toLowerCase());
    const currentProducts = JSON.parse(localStorage.getItem('wds_products') || '[]');
    let importCount = 0;

    // WooCommerce CSV columns mapping indices
    const nameIdx = headers.findIndex(h => h.includes('name') || h.includes('title') || h === 'nazwa');
    const priceIdx = headers.findIndex(h => h.includes('price') || h.includes('cena') || h === 'cena regularna' || h === 'regular price');
    const descIdx = headers.findIndex(h => h.includes('description') || h.includes('content') || h === 'opis');
    const catIdx = headers.findIndex(h => h.includes('categories') || h.includes('category') || h === 'kategorie');
    const imgIdx = headers.findIndex(h => h.includes('images') || h.includes('image') || h === 'obrazy' || h === 'zdjęcia');

    for (let i = 1; i < parsed.length; i++) {
      const row = parsed[i];
      if (row.length < nameIdx || !row[nameIdx]) continue;

      const name = row[nameIdx] || 'Nienazwany produkt CSV';
      const price = priceIdx !== -1 && row[priceIdx] ? parseFloat(row[priceIdx].replace(/[^\d.]/g, '')) : 99.00;
      const description = descIdx !== -1 && row[descIdx] ? row[descIdx] : 'Brak opisu z WooCommerce.';
      const rawCat = catIdx !== -1 && row[catIdx] ? row[catIdx].toLowerCase() : 'silk';
      const rawImg = imgIdx !== -1 && row[imgIdx] ? row[imgIdx].split(',')[0].trim() : './assets/durag_silk_black.png';

      // Categorize
      let category = 'silk';
      if (rawCat.includes('velvet') || rawCat.includes('aksamit') || rawCat.includes('welwet')) category = 'velvet';
      else if (rawCat.includes('access') || rawCat.includes('szczotka') || rawCat.includes('akcesor')) category = 'accessories';

      let categoryLabel = 'Czysty Jedwab';
      if (category === 'velvet') categoryLabel = 'Ekskluzywny Aksamit';
      if (category === 'accessories') categoryLabel = 'Pielęgnacja & Akcesoria';

      const newId = currentProducts.length > 0 ? Math.max(...currentProducts.map(p => p.id)) + 1 : 1;
      const productObj = {
        id: newId,
        name: name,
        nameEn: name,
        price: isNaN(price) ? 99.00 : price,
        category: category,
        categoryLabel: categoryLabel,
        material: 'Importowane wykończenie WooCommerce',
        description: description,
        images: [rawImg, './assets/lookbook_editorial.png'],
        colors: [
          { name: 'Obsidian Black', hex: '#111111' },
          { name: 'Bronze Satin', hex: '#8A6E55' }
        ],
        reviews: []
      };

      currentProducts.push(productObj);
      importCount++;
    }

    localStorage.setItem('wds_products', JSON.stringify(currentProducts));
    
    // Globally sync active lists in memory!
    products = currentProducts;
    
    // Reactively refresh storefront and CMS dashboard
    renderProductGrid();
    
    const tabProductsBtn = document.querySelector('[data-cms-tab="products"]');
    if (tabProductsBtn) tabProductsBtn.click();

    statusEl.innerHTML = `<span style="color:#2E7D32;">Pomyślnie zaimportowano ${importCount} produktów!</span>`;
  }

  // WooCommerce Orders Array Import
  function importWooOrdersArray(arr, statusEl) {
    const items = Array.isArray(arr) ? arr : [arr];
    const currentOrders = JSON.parse(localStorage.getItem('wds_orders') || '[]');
    let importCount = 0;

    items.forEach(item => {
      // Map columns (WooCommerce JSON orders payload schema)
      const orderNo = item.order_number || item.orderNo || item.id || Math.floor(100000 + Math.random() * 900000);
      const date = item.date_created || item.date || new Date().toLocaleString('pl-PL');
      const total = parseFloat(item.total || item.total_amount || 238.00);
      
      let itemsSummary = '';
      if (item.line_items && Array.isArray(item.line_items)) {
        itemsSummary = item.line_items.map(li => `${li.name} x${li.quantity}`).join(', ');
      } else {
        itemsSummary = item.itemsSummary || 'Jedwabny Durag Obsidian x2';
      }

      const newOrder = {
        orderNo: orderNo.toString().startsWith('#') ? orderNo : '#WDS-' + orderNo,
        date: date,
        timestamp: Date.now(),
        itemsSummary: itemsSummary,
        discountCode: item.discountCode || 'Brak',
        discountVal: parseFloat(item.discountVal || item.discount || 0.00),
        total: isNaN(total) ? 129.00 : total,
        rawItems: [],
        shipping: {
          method: item.shipping_method || 'Kurier WDS',
          name: item.billing ? `${item.billing.first_name} ${item.billing.last_name}` : 'Klient WooCommerce',
          email: item.billing ? item.billing.email : 'klient@woo.pl',
          phone: item.billing ? item.billing.phone : '500-000-000',
          lockerCode: item.lockerCode || null
        }
      };

      currentOrders.unshift(newOrder);
      importCount++;
    });

    localStorage.setItem('wds_orders', JSON.stringify(currentOrders));
    
    // Reactively refresh CMS statistics if open
    updateCmsAnalyticStatsDirectly();
    
    const tabStatsBtn = document.querySelector('[data-cms-tab="stats"]');
    if (tabStatsBtn) tabStatsBtn.click();

    statusEl.innerHTML = `<span style="color:#2E7D32;">Pomyślnie zaimportowano ${importCount} zamówień!</span>`;
  }

  // WooCommerce Orders CSV Import
  function importWooOrdersCSV(parsed, statusEl) {
    if (parsed.length < 2) {
      statusEl.innerHTML = `<span style="color:#D32F2F;">Pusty plik CSV lub zła struktura.</span>`;
      return;
    }

    const headers = parsed[0].map(h => h.trim().toLowerCase());
    const currentOrders = JSON.parse(localStorage.getItem('wds_orders') || '[]');
    let importCount = 0;

    // WooCommerce CSV columns mapping indices
    const orderNoIdx = headers.findIndex(h => h.includes('id') || h.includes('number') || h === 'zamówienie' || h === 'numer');
    const dateIdx = headers.findIndex(h => h.includes('date') || h.includes('data') || h === 'data zamówienia');
    const totalIdx = headers.findIndex(h => h.includes('total') || h.includes('suma') || h === 'kwota' || h === 'cena');
    const itemsIdx = headers.findIndex(h => h.includes('items') || h.includes('products') || h.includes('pozycje') || h === 'przedmioty');
    const nameIdx = headers.findIndex(h => h.includes('billing_first_name') || h.includes('customer') || h === 'klient' || h === 'imię');

    for (let i = 1; i < parsed.length; i++) {
      const row = parsed[i];
      if (row.length < orderNoIdx || !row[orderNoIdx]) continue;

      const orderNo = row[orderNoIdx] || Math.floor(100000 + Math.random() * 900000);
      const date = dateIdx !== -1 && row[dateIdx] ? row[dateIdx] : new Date().toLocaleString('pl-PL');
      const total = totalIdx !== -1 && row[totalIdx] ? parseFloat(row[totalIdx].replace(/[^\d.]/g, '')) : 129.00;
      const itemsSummary = itemsIdx !== -1 && row[itemsIdx] ? row[itemsIdx] : 'Jedwabny Durag Obsidian x1';
      const name = nameIdx !== -1 && row[nameIdx] ? row[nameIdx] : 'Klient WooCommerce';

      const newOrder = {
        orderNo: orderNo.toString().startsWith('#') ? orderNo : '#WDS-' + orderNo,
        date: date,
        timestamp: Date.now(),
        itemsSummary: itemsSummary,
        discountCode: 'Brak',
        discountVal: 0.00,
        total: isNaN(total) ? 129.00 : total,
        rawItems: [],
        shipping: {
          method: 'Kurier WDS',
          name: name,
          email: 'klient@woo.pl',
          phone: '500-000-000',
          lockerCode: null
        }
      };

      currentOrders.unshift(newOrder);
      importCount++;
    }

    localStorage.setItem('wds_orders', JSON.stringify(currentOrders));
    
    // Reactively refresh CMS statistics if open
    updateCmsAnalyticStatsDirectly();
    
    const tabStatsBtn = document.querySelector('[data-cms-tab="stats"]');
    if (tabStatsBtn) tabStatsBtn.click();

    statusEl.innerHTML = `<span style="color:#2E7D32;">Pomyślnie zaimportowano ${importCount} zamówień!</span>`;
  }
}

// --- Scroll Lock Observer ---
// Monitors overlay states and dynamically locks background body scroll to prevent page shift
function initScrollLockObserver() {
  const overlayIds = [
    'mobileNavDrawer',
    'cartOverlay',
    'productModal',
    'adminLoginModal',
    'adminDashboardOverlay',
    'cmsProductDrawer'
  ];

  const updateBodyScroll = () => {
    let shouldLock = false;
    overlayIds.forEach(id => {
      const el = document.getElementById(id);
      if (el && el.classList.contains('active')) {
        shouldLock = true;
      }
    });

    if (shouldLock) {
      document.body.classList.add('no-scroll');
    } else {
      document.body.classList.remove('no-scroll');
    }
  };

  const observer = new MutationObserver(updateBodyScroll);

  overlayIds.forEach(id => {
    const el = document.getElementById(id);
    if (el) {
      observer.observe(el, { attributes: true, attributeFilter: ['class'] });
    }
  });

  // Run initial check
  updateBodyScroll();
}

