// ============================================================
// HANDMADE HEAVEN — Master Application Logic
// ============================================================

document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initDynamicLinks();

  // Page specific checks
  if (document.getElementById('featuredGrid')) {
    initHomePage();
  }
  if (document.getElementById('catalogueGrid')) {
    initCataloguePage();
  }
  if (document.getElementById('productContainer')) {
    initProductDetailPage();
  }

  // Observe animations after DOM elements are rendered
  initScrollAnimations();
});

// ---------- Navbar & Mobile Menu ----------
function initNavbar() {
  const navbar = document.getElementById('navbar');
  const hamburger = document.getElementById('navHamburger');
  const navLinks = document.getElementById('navLinks');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 30) {
      navbar?.classList.add('scrolled');
    } else {
      navbar?.classList.remove('scrolled');
    }
  });

  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('active');
      navLinks.classList.toggle('active');
    });

    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
      });
    });
  }
}

// ---------- Scroll Fade-In Observer ----------
function initScrollAnimations() {
  const items = document.querySelectorAll('.animate-on-scroll');
  if (!items.length) return;

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible', 'animated');
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    items.forEach(el => observer.observe(el));
  } else {
    items.forEach(el => el.classList.add('visible', 'animated'));
  }
}

// ---------- Update phone & instagram from config ----------
function initDynamicLinks() {
  if (typeof config === 'undefined') return;

  const homeWa = document.getElementById('homeWhatsappBtn');
  if (homeWa) {
    const defaultMsg = encodeURIComponent(`Hi ${config.brandName}! I'm visiting your website and interested in ordering handcrafted bracelets.`);
    homeWa.href = `https://wa.me/${config.whatsappNumber}?text=${defaultMsg}`;
  }

  document.querySelectorAll('a[href*="919XXXXXXXXX"]').forEach(a => {
    a.href = a.href.replace('919XXXXXXXXX', config.whatsappNumber);
  });

  document.querySelectorAll('a[href*="instagram.com"]').forEach(a => {
    a.href = config.instagramUrl || `https://instagram.com/${config.instagramUsername}`;
  });
}

// ---------- Reusable Product Card Generator ----------
function createProductCard(product) {
  const badgeHTML = product.badge
    ? `<span class="badge badge-${product.badge.toLowerCase()}">${product.badge}</span>`
    : '';

  const thumbImg = (product.thumbnails && product.thumbnails.length)
    ? product.thumbnails[0]
    : product.images[0];

  return `
    <article class="product-card animate-on-scroll" onclick="window.location.href='product.html?id=${encodeURIComponent(product.id)}'">
      <div class="product-card-image">
        ${badgeHTML}
        <img src="${thumbImg}" alt="${product.name}" loading="lazy">
      </div>
      <div class="product-card-body">
        <span class="product-card-category">${product.categoryName}</span>
        <h3 class="product-card-name">${product.name}</h3>
        <div class="product-card-price">
          <span class="price-single">₹${product.price}</span>
          <span class="price-combo">Combo of 2: <strong>₹${product.comboPrice}</strong></span>
        </div>
        <span class="product-card-btn">View Details &rarr;</span>
      </div>
    </article>
  `;
}

// ============================================================
// 1. HOMEPAGE LOGIC
// ============================================================
function initHomePage() {
  // Render all available products in the Featured & Popular Collection grid
  const featuredGrid = document.getElementById('featuredGrid');
  if (featuredGrid && typeof products !== 'undefined') {
    featuredGrid.innerHTML = products.map(createProductCard).join('');
  }

  // Render Combo Pricing Cards
  const pricingCards = document.getElementById('pricingCards');
  if (pricingCards && typeof pricingTiers !== 'undefined') {
    pricingCards.innerHTML = pricingTiers.map(tier => {
      const singleText = tier.note ? `₹${tier.single}*` : `₹${tier.single}`;
      return `
        <div class="pricing-card">
          <div class="pricing-card-type">${tier.type}</div>
          <div class="pricing-card-prices">
            <div class="pricing-single">
              <span class="pricing-label">Single</span>
              <span class="pricing-amount">${singleText}</span>
            </div>
            <div class="pricing-combo">
              <span class="pricing-label">Combo of 2</span>
              <span class="pricing-amount">₹${tier.combo}</span>
            </div>
          </div>
          ${tier.note ? `<p class="pricing-note">* ${tier.note}</p>` : ''}
        </div>
      `;
    }).join('');
  }

  // Initialize Reelmark-style Cylindrical Video Carousel
  initReelmarkCarousel();
}

// ---------- Cylindrical Video Carousel Stage ----------
function initReelmarkCarousel() {
  const stage = document.getElementById('reelCarouselStage');
  if (!stage || typeof products === 'undefined' || !products.length) return;

  // Use 8-10 cards (loop products if needed to reach 8-10 items)
  let carouselItems = [...products];
  if (carouselItems.length < 10) {
    carouselItems = [...carouselItems, ...products.slice(0, 10 - carouselItems.length)];
  }

  const TOTAL_CARDS = carouselItems.length;
  const PITCH = 210; // pitch in virtual units
  const TOTAL_WIDTH = TOTAL_CARDS * PITCH;

  let scrollOffset = 0;
  let velocity = -42; // smooth right -> left drift (42u/s)
  let isDragging = false;
  let isHorizontalDrag = false;
  let startPointerX = 0;
  let startPointerY = 0;
  let lastPointerX = 0;
  let lastTime = performance.now();
  let dragVelocity = 0;

  const cardElements = [];

  // Create cards
  carouselItems.forEach((product, idx) => {
    const cardWrap = document.createElement('div');
    cardWrap.className = 'reel-card-wrap';

    const viewport = document.createElement('div');
    viewport.className = 'reel-tile-viewport';

    // Solid Poster image as base layer
    const posterImg = document.createElement('img');
    posterImg.className = 'reel-card-media';
    posterImg.src = (product.thumbnails && product.thumbnails[0]) || (product.images && product.images[0]);
    posterImg.alt = product.name;

    // Video layer (revealed once video actually plays)
    const video = document.createElement('video');
    video.className = 'reel-card-video';
    video.muted = true;
    video.loop = true;
    video.playsInline = true;
    video.setAttribute('muted', '');
    video.setAttribute('playsinline', '');

    if (product.video) {
      video.src = product.video;
      video.addEventListener('playing', () => {
        video.classList.add('playing');
      }, { once: true });
      video.play().catch(() => {});
    }

    // Overlay
    const overlay = document.createElement('div');
    overlay.className = 'reel-card-overlay';

    // Play icon badge
    const playPill = document.createElement('div');
    playPill.className = 'reel-play-pill';
    playPill.innerHTML = `
      <svg viewBox="0 0 24 24">
        <polygon points="6,3 20,12 6,21"/>
      </svg>
    `;

    // Info overlay
    const info = document.createElement('div');
    info.className = 'reel-card-info';
    info.innerHTML = `
      <div class="reel-card-name">${product.name}</div>
      <div class="reel-card-price">₹${product.price} <span style="opacity:0.8; font-size:0.75rem;">(Combo: ₹${product.comboPrice})</span></div>
    `;

    viewport.appendChild(posterImg);
    if (product.video) {
      viewport.appendChild(video);
    }
    viewport.appendChild(overlay);
    viewport.appendChild(playPill);
    viewport.appendChild(info);
    cardWrap.appendChild(viewport);
    stage.appendChild(cardWrap);

    // Click opens product detail page
    cardWrap.addEventListener('click', (e) => {
      if (Math.abs(dragVelocity) < 8) {
        window.location.href = `product.html?id=${encodeURIComponent(product.id)}`;
      }
    });

    cardElements.push({
      wrap: cardWrap,
      video,
      poster: posterImg,
      baseIndex: idx
    });
  });

  function getScale() {
    const stageWidth = stage.offsetWidth || window.innerWidth;
    return Math.min(stageWidth / 1380, 1.1);
  }

  function updateCards() {
    const scale = getScale();
    const stageW = stage.offsetWidth || window.innerWidth;
    const centerX = stageW / 2;
    const refWidth = 700;

    cardElements.forEach((item) => {
      let rawX = (item.baseIndex * PITCH + scrollOffset) % TOTAL_WIDTH;
      if (rawX < -PITCH * 2) rawX += TOTAL_WIDTH;
      if (rawX > TOTAL_WIDTH - PITCH * 2) rawX -= TOTAL_WIDTH;

      const t = rawX - (TOTAL_WIDTH / 2);
      const normT = t / refWidth;
      const pushedX = centerX + (t * (1 + 0.08 * (normT * normT))) * scale;

      const d = Math.abs(pushedX - centerX) / (refWidth * scale);
      const cardW = (180 + 44 * (d * d)) * scale;

      const leftX = pushedX - cardW / 2;
      const rightX = pushedX + cardW / 2;

      const qLeft = Math.abs(leftX - centerX) / (refWidth * scale);
      const qRight = Math.abs(rightX - centerX) / (refWidth * scale);

      const hLeft = (270 + 85 * Math.pow(Math.min(qLeft, 2), 2.5)) * scale;
      const hRight = (270 + 85 * Math.pow(Math.min(qRight, 2), 2.5)) * scale;

      const centerYPos = 200 - (10 * (d * d)) * scale;
      const maxH = Math.max(hLeft, hRight);

      const el = item.wrap;
      el.style.width = `${cardW}px`;
      el.style.height = `${maxH}px`;
      el.style.transform = `translate3d(${leftX}px, ${centerYPos - maxH / 2}px, 0)`;
    });
  }

  // Pointer & Touch Drag Events
  function onPointerDown(e) {
    isDragging = true;
    isHorizontalDrag = false;
    const clientX = e.clientX || (e.touches && e.touches[0].clientX) || 0;
    const clientY = e.clientY || (e.touches && e.touches[0].clientY) || 0;
    startPointerX = clientX;
    startPointerY = clientY;
    lastPointerX = clientX;
    dragVelocity = 0;
  }

  function onPointerMove(e) {
    if (!isDragging) return;
    const currentX = e.clientX || (e.touches && e.touches[0].clientX) || 0;
    const currentY = e.clientY || (e.touches && e.touches[0].clientY) || 0;
    const diffX = Math.abs(currentX - startPointerX);
    const diffY = Math.abs(currentY - startPointerY);

    // If movement is predominantly vertical on touch devices, yield to native page scroll!
    if (!isHorizontalDrag && e.touches) {
      if (diffY > diffX && diffY > 6) {
        isDragging = false;
        return;
      }
      if (diffX > diffY && diffX > 6) {
        isHorizontalDrag = true;
      }
    }

    if (isHorizontalDrag || !e.touches) {
      const delta = currentX - lastPointerX;
      lastPointerX = currentX;

      const scale = getScale();
      scrollOffset += delta / (scale || 1);
      dragVelocity = (delta / (scale || 1)) * 60;
    }
  }

  function onPointerUp() {
    if (!isDragging) return;
    isDragging = false;
    isHorizontalDrag = false;
    if (Math.abs(dragVelocity) > 10) {
      velocity = dragVelocity;
    }
  }

  stage.addEventListener('mousedown', onPointerDown);
  window.addEventListener('mousemove', onPointerMove);
  window.addEventListener('mouseup', onPointerUp);

  stage.addEventListener('touchstart', onPointerDown, { passive: true });
  window.addEventListener('touchmove', onPointerMove, { passive: true });
  window.addEventListener('touchend', onPointerUp);

  // Animation Loop
  function tick(now) {
    const dt = Math.min((now - lastTime) / 1000, 0.1);
    lastTime = now;

    if (!isDragging) {
      const targetVelocity = -42;
      velocity += (targetVelocity - velocity) * (1 - Math.pow(0.05, dt));
      scrollOffset += velocity * dt;
    }

    updateCards();
    requestAnimationFrame(tick);
  }

  requestAnimationFrame(tick);
  window.addEventListener('resize', updateCards);
}

// ============================================================
// 2. CATALOGUE PAGE LOGIC
// ============================================================
function initCataloguePage() {
  const catalogueGrid = document.getElementById('catalogueGrid');
  const categoryPills = document.getElementById('categoryFilterPills');
  const sortSelect = document.getElementById('sortSelect');
  const productCount = document.getElementById('productCount');
  const emptyState = document.getElementById('emptyState');
  const emptyTitle = document.getElementById('emptyTitle');
  const emptyDesc = document.getElementById('emptyDesc');
  const btnReset = document.getElementById('btnResetFilter');

  if (!catalogueGrid || typeof products === 'undefined') return;

  const urlParams = new URLSearchParams(window.location.search);
  let selectedCategory = urlParams.get('category') || 'all';

  // Render Category Filter Pills
  if (categoryPills && typeof categories !== 'undefined') {
    categoryPills.innerHTML = categories.map(cat => {
      const activeClass = cat.id === selectedCategory ? 'active' : '';
      const disabledClass = cat.comingSoon ? 'disabled' : '';
      const countLabel = cat.comingSoon ? '(Soon)' : `(${cat.count})`;
      return `
        <button class="filter-pill ${activeClass} ${disabledClass}" data-id="${cat.id}">
          ${cat.name} ${countLabel}
        </button>
      `;
    }).join('');

    categoryPills.querySelectorAll('.filter-pill').forEach(pill => {
      pill.addEventListener('click', () => {
        const catId = pill.getAttribute('data-id');
        selectedCategory = catId;

        // Update URL
        const newUrl = new URL(window.location);
        if (catId === 'all') {
          newUrl.searchParams.delete('category');
        } else {
          newUrl.searchParams.set('category', catId);
        }
        window.history.pushState({}, '', newUrl);

        // Update active class
        categoryPills.querySelectorAll('.filter-pill').forEach(p => p.classList.remove('active'));
        pill.classList.add('active');

        renderCatalogue();
      });
    });
  }

  // Sort dropdown
  if (sortSelect) {
    sortSelect.addEventListener('change', () => renderCatalogue());
  }

  // Reset filter button
  if (btnReset) {
    btnReset.addEventListener('click', () => {
      selectedCategory = 'all';
      categoryPills?.querySelectorAll('.filter-pill').forEach(p => {
        p.classList.toggle('active', p.getAttribute('data-id') === 'all');
      });
      renderCatalogue();
    });
  }

  function renderCatalogue() {
    const catObj = categories.find(c => c.id === selectedCategory);

    // If "coming soon" category selected
    if (catObj && catObj.comingSoon) {
      catalogueGrid.style.display = 'none';
      if (emptyState) {
        emptyState.style.display = 'block';
        if (emptyTitle) emptyTitle.innerText = `${catObj.name} — Coming Soon! 🌸`;
        if (emptyDesc) emptyDesc.innerText = `We are handcrafting our signature ${catObj.name} collection right now. Check back soon or message us on WhatsApp for custom requests!`;
      }
      if (productCount) productCount.innerText = 'Showing 0 designs';
      return;
    }

    let list = [...products];

    // Filter
    if (selectedCategory !== 'all') {
      list = list.filter(p => p.category === selectedCategory);
    }

    // Sort
    const sortVal = sortSelect ? sortSelect.value : 'featured';
    if (sortVal === 'price-asc') {
      list.sort((a, b) => a.price - b.price);
    } else if (sortVal === 'price-desc') {
      list.sort((a, b) => b.price - a.price);
    } else if (sortVal === 'name-asc') {
      list.sort((a, b) => a.name.localeCompare(b.name));
    }

    if (list.length === 0) {
      catalogueGrid.style.display = 'none';
      if (emptyState) {
        emptyState.style.display = 'block';
        if (emptyTitle) emptyTitle.innerText = 'No Designs Found';
        if (emptyDesc) emptyDesc.innerText = 'Try choosing a different category or view all bracelets.';
      }
      if (productCount) productCount.innerText = 'Showing 0 designs';
    } else {
      if (emptyState) emptyState.style.display = 'none';
      catalogueGrid.style.display = 'grid';
      catalogueGrid.innerHTML = list.map(createProductCard).join('');
      if (productCount) productCount.innerText = `Showing ${list.length} designs`;
      initScrollAnimations();
    }
  }

  renderCatalogue();
}

// ============================================================
// 3. PRODUCT DETAIL PAGE LOGIC
// ============================================================
function initProductDetailPage() {
  const urlParams = new URLSearchParams(window.location.search);
  const productId = urlParams.get('id');

  const detailGrid = document.getElementById('productDetailGrid');
  const notFound = document.getElementById('productNotFound');
  const relatedSection = document.getElementById('relatedSection');

  if (typeof products === 'undefined') return;

  const product = products.find(p => p.id === productId);

  if (!product) {
    if (detailGrid) detailGrid.style.display = 'none';
    if (relatedSection) relatedSection.style.display = 'none';
    if (notFound) notFound.style.display = 'flex';
    return;
  }

  // Update Page Title
  document.title = `${product.name} | Handmade Heaven`;

  // Breadcrumbs & Basic Info
  document.getElementById('breadcrumbCurrent').innerText = product.name;
  document.getElementById('productTitle').innerText = product.name;
  document.getElementById('productCategory').innerText = product.categoryName;
  document.getElementById('productType').innerText = product.type;
  document.getElementById('productDescription').innerText = product.description;
  document.getElementById('productPrice').innerText = `₹${product.price}`;
  document.getElementById('optSinglePrice').innerText = `₹${product.price}`;
  document.getElementById('optComboPrice').innerText = `₹${product.comboPrice}`;

  const savings = (product.price * 2) - product.comboPrice;
  const comboText = document.getElementById('productComboText');
  if (comboText) {
    comboText.innerText = `Buy 2 for just ₹${product.comboPrice}! ${savings > 0 ? `(Save ₹${savings})` : ''}`;
  }

  // Badges
  const badgeOverlay = document.getElementById('productBadgeOverlay');
  if (badgeOverlay && product.badge) {
    badgeOverlay.innerHTML = `<span class="badge badge-${product.badge.toLowerCase()}">${product.badge}</span>`;
  }

  // Color Badges
  const colorDotsList = document.getElementById('colorDotsList');
  if (colorDotsList && product.colors) {
    const colorMap = {
      'Black': '#222222',
      'Blue': '#3a7bd5',
      'Light Blue': '#8ec5fc',
      'Transparent': 'rgba(255,255,255,0.8)',
      'Pink': '#ffb6c1',
      'Golden': '#e5b842',
      'Purple': '#8e4585',
      'Green': '#4ca1af',
      'Red': '#e63946'
    };
    colorDotsList.innerHTML = product.colors.map(col => `
      <span class="color-dot">
        <span class="color-dot-circle" style="background-color: ${colorMap[col] || '#ddd'};"></span>
        ${col}
      </span>
    `).join('');
  }

  // Media Gallery Setup
  const mainImage = document.getElementById('mainImage');
  const mainVideo = document.getElementById('mainVideo');
  const thumbsContainer = document.getElementById('galleryThumbnails');
  const galleryMain = document.getElementById('galleryMain');

  if (mainImage && product.images.length) {
    mainImage.src = product.images[0];
    mainImage.alt = product.name;
  }

  // Build Thumbnail list (images + video)
  let thumbsHTML = '';
  product.images.forEach((img, idx) => {
    const thumb = (product.thumbnails && product.thumbnails[idx]) ? product.thumbnails[idx] : img;
    thumbsHTML += `
      <div class="gallery-thumb ${idx === 0 ? 'active' : ''}" data-type="image" data-src="${img}">
        <img src="${thumb}" alt="${product.name} thumb ${idx + 1}">
      </div>
    `;
  });

  if (product.video) {
    thumbsHTML += `
      <div class="gallery-thumb" data-type="video" data-src="${product.video}">
        <div class="video-icon">▶</div>
        <img src="${product.thumbnails ? product.thumbnails[0] : product.images[0]}" alt="Video preview">
      </div>
    `;
  }

  if (thumbsContainer) {
    thumbsContainer.innerHTML = thumbsHTML;

    thumbsContainer.querySelectorAll('.gallery-thumb').forEach(thumb => {
      thumb.addEventListener('click', () => {
        thumbsContainer.querySelectorAll('.gallery-thumb').forEach(t => t.classList.remove('active'));
        thumb.classList.add('active');

        const type = thumb.getAttribute('data-type');
        const src = thumb.getAttribute('data-src');

        if (type === 'image') {
          if (mainVideo) {
            mainVideo.pause();
            mainVideo.style.display = 'none';
          }
          if (mainImage) {
            mainImage.style.display = 'block';
            mainImage.src = src;
          }
        } else if (type === 'video') {
          if (mainImage) mainImage.style.display = 'none';
          if (mainVideo) {
            mainVideo.style.display = 'block';
            mainVideo.src = src;
            mainVideo.play();
          }
        }
      });
    });
  }

  // Hover Zoom for Desktop
  if (galleryMain && mainImage) {
    galleryMain.addEventListener('mousemove', (e) => {
      if (mainImage.style.display === 'none') return;
      const rect = galleryMain.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      mainImage.style.transformOrigin = `${x}% ${y}%`;
      mainImage.style.transform = 'scale(1.5)';
    });

    galleryMain.addEventListener('mouseleave', () => {
      mainImage.style.transformOrigin = 'center center';
      mainImage.style.transform = 'scale(1)';
    });
  }

  // Quantity and Option Pricing
  let quantity = 1;
  let orderMode = 'single'; // 'single' | 'combo'

  const qtyValue = document.getElementById('qtyValue');
  const qtyMinus = document.getElementById('qtyMinus');
  const qtyPlus = document.getElementById('qtyPlus');
  const calculatedTotal = document.getElementById('calculatedTotal');
  const optSingle = document.getElementById('optSingle');
  const optCombo = document.getElementById('optCombo');

  function calculateSubtotal() {
    const rate = orderMode === 'combo' ? product.comboPrice : product.price;
    const total = rate * quantity;
    if (calculatedTotal) calculatedTotal.innerText = `₹${total}`;
  }

  if (qtyMinus && qtyPlus && qtyValue) {
    qtyMinus.addEventListener('click', () => {
      if (quantity > 1) {
        quantity--;
        qtyValue.value = quantity;
        calculateSubtotal();
      }
    });

    qtyPlus.addEventListener('click', () => {
      if (quantity < 20) {
        quantity++;
        qtyValue.value = quantity;
        calculateSubtotal();
      }
    });
  }

  if (optSingle && optCombo) {
    optSingle.addEventListener('change', () => {
      orderMode = 'single';
      calculateSubtotal();
    });
    optCombo.addEventListener('change', () => {
      orderMode = 'combo';
      calculateSubtotal();
    });
  }

  // WhatsApp Order Button
  const btnOrder = document.getElementById('btnOrderWhatsapp');
  if (btnOrder) {
    btnOrder.addEventListener('click', () => {
      const isCombo = orderMode === 'combo';
      const rate = isCombo ? product.comboPrice : product.price;
      const total = rate * quantity;
      const optionLabel = isCombo ? 'Combo of 2 (Pair)' : 'Single Bracelet';

      const orderMsg = 
`✨ *NEW ORDER — HANDMADE HEAVEN* ✨

📿 *Product:* ${product.name}
🏷️ *Option:* ${optionLabel}
🎨 *Category:* ${product.categoryName}
🔢 *Quantity:* ${quantity}
💰 *Price:* ₹${rate} per ${isCombo ? 'combo' : 'piece'}
💵 *Total Amount:* ₹${total}

📍 *Shipping Address & Pin Code:*
(Please reply with your address to confirm courier shipping)

Thank you! Excited to receive my handcrafted bracelets! 🌸`;

      const phone = (typeof config !== 'undefined' && config.whatsappNumber)
        ? config.whatsappNumber
        : '919XXXXXXXXX';

      const waUrl = `https://wa.me/${phone}?text=${encodeURIComponent(orderMsg)}`;
      window.open(waUrl, '_blank');
    });
  }

  // Related Products Grid
  const relatedGrid = document.getElementById('relatedGrid');
  if (relatedGrid) {
    let related = products.filter(p => p.id !== product.id && p.category === product.category);
    if (related.length < 3) {
      const others = products.filter(p => p.id !== product.id && p.category !== product.category);
      related = [...related, ...others];
    }
    const finalRelated = related.slice(0, 4);
    relatedGrid.innerHTML = finalRelated.map(createProductCard).join('');
    initScrollAnimations();
  }
}
