/* --- STATE MANAGEMENT & DATA --- */
let currentCurrency = 'INR';
const EXCHANGE_RATES = { INR: 1, USD: 0.012, EUR: 0.011, GBP: 0.0094, AED: 0.044 };
const CURRENCY_SYMBOLS = { INR: '₹', USD: '$', EUR: '€', GBP: '£', AED: 'د.إ ' };

const ROOMS = [
    { id: 'deluxe', name: 'Deluxe Room', category: 'deluxe', basePrice: 2800, capacity: 2, sqft: 340, view: 'Garden View', bed: 'King Bed', img: 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&q=85&w=1200', badge: 'Popular choice', rating: 4.8 },
    { id: 'family', name: 'Family Suite', category: 'family', basePrice: 4500, capacity: 4, sqft: 520, view: 'Mountain View', bed: '2 Queen Beds', img: 'https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&q=85&w=1200', badge: 'Spacious', rating: 4.9 },
    { id: 'royal', name: 'Royal Suite', category: 'royal', basePrice: 6500, capacity: 2, sqft: 680, view: 'Panoramic Dal Lake', bed: 'Super King Bed', img: './assets/images/khatamband-royal-suite.png', badge: '🔥 2 Left Today', rating: 5.0 },
    { id: 'villa', name: 'Heritage Villa', category: 'villa', basePrice: 9500, capacity: 6, sqft: 1100, view: 'Private Garden & Peak View', bed: '3 Luxury Bedrooms', img: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&q=85&w=1200', badge: 'Exclusive Villa', rating: 4.9 }
];

const EXPERIENCES = [
    { id: 'exp1', type: 'attractions', title: 'Dal Lake Sunset Shikara', dist: '1.2 km away', time: '1.5 Hours', img: 'https://images.unsplash.com/photo-1598091383021-15ddea10925d?auto=format&fit=crop&q=85&w=800', desc: 'Glide across mirror-like waters surrounded by lotus gardens and floating flower markets.' },
    { id: 'exp2', type: 'attractions', title: 'Nishat Bagh Mughal Gardens', dist: '600m walk', time: '2 Hours', img: 'https://images.unsplash.com/photo-1584132967334-10e028bd69f7?auto=format&fit=crop&q=85&w=800', desc: 'The Garden of Pleasure built in 1633 with 12 terraced lawns facing the lake.' },
    { id: 'exp3', type: 'attractions', title: 'Shalimar Bagh Terraced Fountains', dist: '2.5 km away', time: '2 Hours', img: 'https://images.unsplash.com/photo-1598091383021-15ddea10925d?auto=format&fit=crop&q=85&w=800', desc: 'Royal Mughal garden built by Emperor Jahangir for Empress Noor Jahan in 1619.' },
    { id: 'exp4', type: 'dining', title: '7-Course Traditional Wazwan Feast', dist: 'In-House Dining Pavilion', time: 'Evening', img: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=85&w=800', desc: 'Savor authentic Rogan Josh, Gushtaba, and Rista prepared by master Kashmiri Wazas.' },
    { id: 'exp5', type: 'dining', title: 'Kashmiri Saffron Kahwa High Tea', dist: 'Garden Lawn Terrace', time: 'Afternoon', img: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&q=85&w=800', desc: 'Pair whole-thread Saffron Kahwa with fresh Girda breads and mountain honey on the lawn.' },
    { id: 'exp6', type: 'dining', title: 'Lakeview Shikara Candlelight Dinner', dist: 'Dal Lake Ghat', time: 'Sunset', img: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&q=85&w=800', desc: 'A private dining experience on a decorated Shikara boat with Kahwa and Kashmiri appetizers.' },
    { id: 'exp7', type: 'treks', title: 'Gulmarg Gondola & Snow Excursion', dist: '52 km day trip', time: 'Full Day', img: 'https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&q=85&w=800', desc: 'Ride one of the highest cable cars in the world for unforgettable Himalayan skiing & views.' },
    { id: 'exp8', type: 'treks', title: 'Pahalgam Valley of Shepherds', dist: '90 km day trip', time: 'Full Day', img: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&q=85&w=800', desc: 'Explore pristine Lidder River valleys, pine forest trails, and Betaab Valley meadows.' }
];

const AMENITIES = [
    { name: 'High-Speed Wi-Fi', desc: 'Seamless 200Mbps optic fiber connection throughout the property.', icon: '<path d="M5 12.55a11 11 0 0 1 14.08 0"/><path d="M1.42 9a16 16 0 0 1 21.16 0"/><path d="M8.53 16.11a6 6 0 0 1 6.95 0"/><line x1="12" y1="20" x2="12.01" y2="20"/>' },
    { name: 'Heated Wooden Floors', desc: 'Radiant underfloor heating to keep you warm on crisp mountain nights.', icon: '<path d="M12 2v20M2 12h20M4.93 4.93l14.14 14.14M4.93 19.07l14.14-14.14"/>' },
    { name: 'Organic Breakfast & Kahwa', desc: 'Fresh local breads (Girda, Tsot), mountain honey, and hot Kashmiri Kahwa.', icon: '<path d="M18 8h1a4 4 0 0 1 0 8h-1"/><path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"/><line x1="6" y1="1" x2="6" y2="4"/><line x1="14" y1="1" x2="14" y2="4"/>' },
    { name: 'Private Airport Pickup', desc: 'Chauffeur-driven luxury car transfers directly from Srinagar Airport (SXR).', icon: '<rect x="1" y="13" width="22" height="8" rx="2"/><path d="M7 13l3-8h4l3 8"/><circle cx="5.5" cy="17" r="1.5"/><circle cx="18.5" cy="17" r="1.5"/>' }
];

let reviewsData = JSON.parse(localStorage.getItem('orchids_reviews')) || [
    { name: 'Rohit & Priya Malhotra', rating: 5, text: 'Our stay at The Orchids Cove made our Kashmir honeymoon unforgettable. The view of Zabarwan mountains from the Royal Suite balcony in the morning is magical!' },
    { name: 'Sarah Jenkins (UK)', rating: 5, text: 'Clean, peaceful, and authentic hospitality. The staff arranged a private Shikara ride at sunrise for us. Highly recommended!' },
    { name: 'Dr. Tariq Shah', rating: 4, text: 'Superb boutique hotel near Nishat. Beautiful Khatamband wood ceilings and very warm floor heating during winter.' }
];

const DINING_MENU = [
    { id: 'd1', type: 'wazwan', name: 'Rogan Josh', desc: 'Tender mutton slow-cooked in Kashmiri red chillies, saffron & aromatic spices.', price: 750, img: 'https://images.unsplash.com/photo-1545247181-516773cae754?auto=format&fit=crop&q=85&w=800', tag: 'Chef’s Special' },
    { id: 'd2', type: 'wazwan', name: 'Gushtaba', desc: 'Minced lamb meatballs cooked in a velvety spiced yogurt gravy.', price: 820, img: 'https://images.unsplash.com/photo-1574484284002-952d92456975?auto=format&fit=crop&q=85&w=800', tag: 'Royal Dish' },
    { id: 'd3', type: 'wazwan', name: 'Rista', desc: 'Hand-beaten mutton meatballs poached in a rich saffron-infused red gravy.', price: 780, img: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?auto=format&fit=crop&q=85&w=800', tag: 'Traditional' },
    { id: 'd4', type: 'wazwan', name: 'Tabak Maaz', desc: 'Crispy fried lamb ribs braised in ghee and Kashmiri mountain herbs.', price: 850, img: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&q=85&w=800', tag: 'Crispy Special' },
    { id: 'd5', type: 'wazwan', name: 'Aab Gosht', desc: 'Succulent mutton ribs simmered in milk broth infused with cardamom & garlic.', price: 790, img: 'https://images.unsplash.com/photo-1545247181-516773cae754?auto=format&fit=crop&q=85&w=800', tag: 'Mutton Classic' },
    { id: 'd6', type: 'beverage', name: 'Kashmiri Saffron Kahwa', desc: 'Green tea brewed with whole saffron threads, crushed almonds & cinnamon.', price: 220, img: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&q=85&w=800', tag: 'Warm Signature' },
    { id: 'd7', type: 'beverage', name: 'Noon Chai (Pink Tea)', desc: 'Authentic salted pink tea brewed with green tea leaves, milk, and pistachios.', price: 200, img: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&q=85&w=800', tag: 'Authentic Pink' },
    { id: 'd8', type: 'breads', name: 'Girda Bread', desc: 'Authentic wood-fired Kashmiri breakfast bread served hot with butter & honey.', price: 180, img: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&q=85&w=800', tag: 'Bakery Fresh' },
    { id: 'd9', type: 'breads', name: 'Tsot & Sheermal', desc: 'Traditional saffron-scented Kashmiri bakery breads cooked in clay tandoors.', price: 210, img: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&q=85&w=800', tag: 'Tandoori Warm' }
];

let userBookings = JSON.parse(localStorage.getItem('orchids_bookings')) || [];
let userDiningReservations = JSON.parse(localStorage.getItem('orchids_dining')) || [
    { id: 'DIN-8841', name: 'Dr. Tariq Shah', seating: 'Traditional Floor Dastarkhwan (Trami Service)', date: '2026-07-30', time: '7:30 PM', guests: 4, status: 'Confirmed', createdAt: '2026-07-29' },
    { id: 'DIN-4192', name: 'Ananya Sharma', seating: 'Outdoor Garden Pavilion Table', date: '2026-07-31', time: '1:00 PM', guests: 2, status: 'Confirmed', createdAt: '2026-07-29' }
];
let userItinerary = JSON.parse(localStorage.getItem('orchids_itinerary')) || [];
let activeRoomFilter = 'all';
let activeDiningFilter = 'all';
let activeGalleryFilter = 'all';

const GALLERY_ITEMS = [
    { url: './assets/images/resort-night-lawn.png', type: 'exterior', caption: 'Illuminated Resort Villa & Night Lawn Grounds (Exterior)' },
    { url: './assets/images/resort-dusk-view.png', type: 'exterior', caption: 'Dusk Vista over Lawns, Balconies & Mountain Backdrop (Exterior)' },
    { url: './assets/images/resort-day-exterior.png', type: 'exterior', caption: 'Daytime View of Villa Architecture & Pine Mountain Backdrop (Exterior)' },
    { url: './assets/images/resort-garden-lawn.png', type: 'exterior', caption: 'Front Garden Lawn & Stone Entrance Architecture (Exterior)' },
    { url: 'https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&q=85&w=1200', type: 'exterior', caption: 'Property Frontage & Zabarwan Mountain Panorama (Resort View)' },
    { url: './assets/images/khatamband-royal-suite.png', type: 'interior', caption: 'Royal Suite with Handcrafted Kashmiri Khatamband Wood Carved Ceiling (Interior)' },
    { url: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&q=85&w=1200', type: 'interior', caption: 'Heritage Villa Wooden Bedroom Suite Interior (Interior)' },
    { url: 'https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&q=85&w=1200', type: 'interior', caption: 'Family Suite Twin Bed Seating & Mountain View Balcony (Interior)' }
];

/* --- INITIALIZATION --- */
function initApp() {
    initDefaultDates();
    startLiveClock();
    renderRooms();
    renderDiningMenu();
    renderExperiences('attractions');
    renderAmenities();
    renderReviews();
    renderGallery();
    updateBadges();
    initScrollAnimations();
    initCanvasParticles();
}

function initDefaultDates() {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 2);
    
    const todayStr = today.toISOString().split('T')[0];
    const tomorrowStr = tomorrow.toISOString().split('T')[0];

    const heroIn = document.getElementById('heroCheckIn');
    const heroOut = document.getElementById('heroCheckOut');
    const bookIn = document.getElementById('bookCheckIn');
    const bookOut = document.getElementById('bookCheckOut');

    if (heroIn) heroIn.value = todayStr;
    if (heroOut) heroOut.value = tomorrowStr;
    if (bookIn) bookIn.value = todayStr;
    if (bookOut) bookOut.value = tomorrowStr;
    updateHeroQuote();
}

function startLiveClock() {
    setInterval(() => {
        const now = new Date();
        const el = document.getElementById('liveClock');
        if (el) {
            el.textContent = now.toLocaleTimeString('en-IN', { timeZone: 'Asia/Kolkata', hour: '2-digit', minute: '2-digit', second: '2-digit' }) + ' IST';
        }
    }, 1000);
}

/* --- CURRENCY CONVERTER --- */
function formatPrice(inrAmount) {
    const converted = inrAmount * EXCHANGE_RATES[currentCurrency];
    return CURRENCY_SYMBOLS[currentCurrency] + Math.round(converted).toLocaleString();
}

function changeCurrency(val) {
    currentCurrency = val;
    renderRooms();
    updateHeroQuote();
    calculateBookingTotal();
    showToast('Currency updated to ' + val);
}

/* --- THEME TOGGLE --- */
function toggleTheme() {
    const current = document.body.getAttribute('data-theme');
    const target = current === 'dark' ? 'light' : 'dark';
    document.body.setAttribute('data-theme', target);
    showToast(target === 'dark' ? '🌙 Dark Sapphire Theme Activated' : '☀️ Light Luxury Theme Activated');
}

/* --- WEB AUDIO SOUNDSCAPE --- */
let audioCtx, isPlayingAudio = false;
function toggleSoundscape() {
    if (!audioCtx) {
        audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    }
    const btn = document.getElementById('audioBtn');
    if (isPlayingAudio) {
        audioCtx.suspend();
        isPlayingAudio = false;
        if (btn) btn.style.borderColor = 'var(--line)';
        showToast('Audio Ambience Paused');
    } else {
        audioCtx.resume();
        playAmbientStream();
        isPlayingAudio = true;
        if (btn) btn.style.borderColor = 'var(--brass)';
        showToast('🎵 Playing Kashmir Mountain Stream & Sitar Drone');
    }
}

function playAmbientStream() {
    const bufferSize = audioCtx.sampleRate * 2;
    const buffer = audioCtx.createBuffer(1, bufferSize, audioCtx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
        data[i] = Math.random() * 2 - 1;
    }
    const noise = audioCtx.createBufferSource();
    noise.buffer = buffer;
    noise.loop = true;

    const filter = audioCtx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.value = 800;

    const gain = audioCtx.createGain();
    gain.gain.value = 0.03;

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(audioCtx.destination);
    noise.start();
}

/* --- HERO QUOTE CALCULATOR --- */
function updateHeroQuote() {
    const inEl = document.getElementById('heroCheckIn');
    const outEl = document.getElementById('heroCheckOut');
    if (!inEl || !outEl) return;

    const inDate = new Date(inEl.value);
    const outDate = new Date(outEl.value);
    let nights = Math.max(1, Math.round((outDate - inDate) / (1000 * 60 * 60 * 24)));
    if (isNaN(nights)) nights = 1;

    const roomSelect = document.getElementById('heroRoomSelect');
    const roomType = roomSelect ? roomSelect.value : 'royal';
    const roomObj = ROOMS.find(r => r.id === roomType) || ROOMS[2];
    const total = roomObj.basePrice * nights;
    const priceEl = document.getElementById('heroQuotePrice');
    if (priceEl) priceEl.textContent = formatPrice(total) + ` (${nights} nts)`;
}

function proceedFromHeroQuote() {
    const hIn = document.getElementById('heroCheckIn');
    const hOut = document.getElementById('heroCheckOut');
    const hSelect = document.getElementById('heroRoomSelect');

    if (hIn && document.getElementById('bookCheckIn')) document.getElementById('bookCheckIn').value = hIn.value;
    if (hOut && document.getElementById('bookCheckOut')) document.getElementById('bookCheckOut').value = hOut.value;
    if (hSelect && document.getElementById('bookRoomSelect')) document.getElementById('bookRoomSelect').value = hSelect.value;
    openModal('bookModal');
}

/* --- ROOM RENDERING & FILTERING --- */
function filterRooms(cat, el) {
    activeRoomFilter = cat;
    const container = document.getElementById('rooms');
    if (container) {
        container.querySelectorAll('.filter-tab').forEach(t => t.classList.remove('active'));
    }
    const target = (el && el.nodeType) ? el : (window.event && (window.event.currentTarget || window.event.target));
    if (target && target.classList) target.classList.add('active');
    renderRooms();
}

function renderRooms() {
    const grid = document.getElementById('roomGrid');
    if (!grid) return;

    const searchInput = document.getElementById('roomSearch');
    const search = searchInput ? searchInput.value.toLowerCase() : '';
    const sortSelect = document.getElementById('roomSort');
    const sort = sortSelect ? sortSelect.value : 'default';

    let filtered = ROOMS.filter(r => {
        const matchesCat = activeRoomFilter === 'all' || r.category === activeRoomFilter;
        const matchesSearch = r.name.toLowerCase().includes(search) || r.view.toLowerCase().includes(search);
        return matchesCat && matchesSearch;
    });

    if (sort === 'price-low') filtered.sort((a, b) => a.basePrice - b.basePrice);
    if (sort === 'price-high') filtered.sort((a, b) => b.basePrice - a.basePrice);
    if (sort === 'capacity') filtered.sort((a, b) => b.capacity - a.capacity);

    grid.innerHTML = filtered.map(r => `
        <div class="room-card reveal active">
            <span class="room-badge">${r.badge}</span>
            <div class="room-image">
                <img src="${r.img}" alt="${r.name}">
            </div>
            <div class="room-content">
                <div>
                    <div style="display:flex; justify-content:space-between; align-items:center;">
                        <h3>${r.name}</h3>
                        <span style="font-size:0.85rem; color:var(--brass); font-weight:700;">★ ${r.rating}</span>
                    </div>
                    <div class="room-specs">
                        <span>📐 ${r.sqft} sq ft</span> • <span>👥 Max ${r.capacity}</span> • <span>🌅 ${r.view}</span>
                    </div>
                </div>
                <div>
                    <div class="room-price">${formatPrice(r.basePrice)} <span>/ night</span></div>
                    <div class="room-actions">
                        <button class="btn btn-outline btn-sm" style="flex:1;" onclick="openQuickView('${r.id}')">Quick View</button>
                        <button class="btn btn-primary btn-sm" style="flex:1;" onclick="selectRoomAndBook('${r.id}')">Book Suite</button>
                    </div>
                </div>
            </div>
        </div>
    `).join('');
}

function openQuickView(id) {
    const r = ROOMS.find(item => item.id === id);
    const content = document.getElementById('quickModalContent');
    if (!content) return;

    content.innerHTML = `
        <div style="text-align:center; margin-bottom:20px;">
            <span class="eyebrow">${r.view}</span>
            <h2>${r.name}</h2>
            <p style="color:var(--brass); font-family:'Fraunces'; font-size:1.5rem; margin-top:5px;">${formatPrice(r.basePrice)} / night</p>
        </div>
        <img src="${r.img}" alt="${r.name}" style="width:100%; height:300px; object-fit:cover; border-radius:var(--radius); margin-bottom:20px;">
        <div style="display:grid; grid-template-columns: repeat(3, 1fr); gap:15px; text-align:center; font-size:0.85rem; margin-bottom:20px; background:var(--bg-paper); padding:15px; border-radius:var(--radius);">
            <div><strong>Size</strong><br>${r.sqft} sq ft</div>
            <div><strong>Bed</strong><br>${r.bed}</div>
            <div><strong>Occupancy</strong><br>${r.capacity} Guests</div>
        </div>
        <p style="font-size:0.9rem; color:var(--ink-muted); line-height:1.6; margin-bottom:20px;">This exquisite suite features authentic Kashmiri Khatamband carved ceilings, premium goose-down bedding, floor heating, and panoramic floor-to-ceiling windows facing the mountains.</p>
        <button class="btn btn-brass" style="width:100%;" onclick="closeModal('roomQuickModal'); selectRoomAndBook('${r.id}');">Proceed to Book ${r.name}</button>
    `;
    openModal('roomQuickModal');
}

function selectRoomAndBook(id) {
    const select = document.getElementById('bookRoomSelect');
    if (select) select.value = id;
    calculateBookingTotal();
    openModal('bookModal');
}

/* --- WAZWAN DINING MENU RENDERING --- */
function filterDining(type, el) {
    activeDiningFilter = type;
    const container = document.getElementById('dining');
    if (container) {
        container.querySelectorAll('.filter-tab').forEach(t => t.classList.remove('active'));
    }
    const target = (el && el.nodeType) ? el : (window.event && (window.event.currentTarget || window.event.target));
    if (target && target.classList) target.classList.add('active');
    renderDiningMenu();
}

function renderDiningMenu() {
    const grid = document.getElementById('diningGrid');
    if (!grid) return;

    let filtered = DINING_MENU;
    if (activeDiningFilter !== 'all') {
        filtered = DINING_MENU.filter(d => d.type === activeDiningFilter);
    }

    grid.innerHTML = filtered.map(d => `
        <div class="exp-card reveal active">
            <img src="${d.img}" alt="${d.name}" class="exp-img">
            <div class="exp-body">
                <div style="display:flex; justify-content:space-between; align-items:center;">
                    <h4>${d.name}</h4>
                    <span style="font-size:0.7rem; font-family:'Space Mono'; color:var(--brass); background:var(--brass-light); padding:2px 8px; border-radius:10px; font-weight:700;">${d.tag}</span>
                </div>
                <div class="exp-meta">
                    <span>${formatPrice(d.price)} per portion</span>
                    <span>Trami Service</span>
                </div>
                <p style="font-size:0.85rem; color:var(--ink-muted); line-height:1.5; margin-bottom:15px;">${d.desc}</p>
                <button class="btn btn-outline btn-sm" style="width:100%;" onclick="openModal('diningModal')">Reserve Dining Table</button>
            </div>
        </div>
    `).join('');
}

function handleDiningSubmit(e) {
    e.preventDefault();
    const typeSelect = document.getElementById('diningType');
    const seatingText = typeSelect ? typeSelect.options[typeSelect.selectedIndex].text : 'Standard Dining Table';
    const date = document.getElementById('diningDate').value;
    const time = document.getElementById('diningTime').value;
    const guests = document.getElementById('diningGuests').value;
    const name = document.getElementById('diningName').value;

    const newRes = {
        id: 'DIN-' + Math.floor(1000 + Math.random() * 9000),
        name: name,
        seating: seatingText,
        date: date,
        time: time,
        guests: parseInt(guests),
        status: 'Confirmed',
        createdAt: new Date().toISOString().split('T')[0]
    };

    userDiningReservations.unshift(newRes);
    localStorage.setItem('orchids_dining', JSON.stringify(userDiningReservations));

    closeModal('diningModal');
    showToast(`🍽️ Table Reserved for ${name}! (${guests} Guests, ${date} at ${time})`);
    renderAdminDashboard();
}

/* --- EXPERIENCES & ITINERARY --- */
function filterExp(type, el) {
    const container = document.getElementById('experiences');
    if (container) {
        container.querySelectorAll('.filter-tab').forEach(t => t.classList.remove('active'));
    }
    const target = (el && el.nodeType) ? el : (window.event && (window.event.currentTarget || window.event.target));
    if (target && target.classList) target.classList.add('active');
    renderExperiences(type);
}

function renderExperiences(type) {
    const grid = document.getElementById('expGrid');
    if (!grid) return;

    const filtered = EXPERIENCES.filter(e => e.type === type);
    grid.innerHTML = filtered.map(e => `
        <div class="exp-card reveal active">
            <img src="${e.img}" alt="${e.title}" class="exp-img">
            <div class="exp-body">
                <h4>${e.title}</h4>
                <div class="exp-meta">
                    <span>📍 ${e.dist}</span>
                    <span>⏳ ${e.time}</span>
                </div>
                <p style="font-size:0.85rem; color:var(--ink-muted); line-height:1.5; margin-bottom:15px;">${e.desc}</p>
                <button class="btn btn-outline btn-sm" style="width:100%;" onclick="addToItinerary('${e.id}')">+ Add to My Itinerary</button>
            </div>
        </div>
    `).join('');
}

function addToItinerary(id) {
    const exp = EXPERIENCES.find(e => e.id === id);
    if (!userItinerary.some(item => item.id === id)) {
        userItinerary.push(exp);
        localStorage.setItem('orchids_itinerary', JSON.stringify(userItinerary));
        updateBadges();
        showToast('Added "' + exp.title + '" to your Kashmir Itinerary!');
    } else {
        showToast('Already in your itinerary!');
    }
}

function renderAmenities() {
    const grid = document.getElementById('facGrid');
    if (!grid) return;

    grid.innerHTML = AMENITIES.map(a => `
        <div class="fac-item reveal active">
            <svg viewBox="0 0 24 24">${a.icon}</svg>
            <h4>${a.name}</h4>
            <p>${a.desc}</p>
        </div>
    `).join('');
}

/* --- REVIEWS --- */
function renderReviews() {
    const grid = document.getElementById('reviewsGrid');
    if (!grid) return;

    grid.innerHTML = reviewsData.map(r => `
        <div class="review-card reveal active">
            <div class="stars">${'★'.repeat(r.rating)}</div>
            <p style="font-size:0.9rem; color:var(--ink-muted); line-height:1.6; font-style:italic;">"${r.text}"</p>
            <h5 style="margin-top:15px; font-family:'Space Mono'; font-size:0.8rem; color:var(--brass);">${r.name}</h5>
        </div>
    `).join('');
}

function submitReview(e) {
    e.preventDefault();
    const rating = parseInt(document.getElementById('reviewRating').value);
    const name = document.getElementById('reviewAuthor').value;
    const text = document.getElementById('reviewText').value;

    reviewsData.unshift({ name, rating, text });
    localStorage.setItem('orchids_reviews', JSON.stringify(reviewsData));
    renderReviews();
    closeModal('reviewModal');
    showToast('Thank you! Your review has been published.');
}

/* --- GALLERY LIGHTBOX --- */

function filterGallery(type, el) {
    activeGalleryFilter = type;
    const container = document.getElementById('gallery');
    if (container) {
        container.querySelectorAll('.filter-tab').forEach(t => t.classList.remove('active'));
    }
    const target = (el && el.nodeType) ? el : (window.event && (window.event.currentTarget || window.event.target));
    if (target && target.classList) target.classList.add('active');
    renderGallery();
}

function renderGallery() {
    const grid = document.getElementById('galleryGrid');
    if (!grid) return;

    let filtered = GALLERY_ITEMS;
    if (activeGalleryFilter !== 'all') {
        filtered = GALLERY_ITEMS.filter(g => g.type === activeGalleryFilter);
    }

    grid.innerHTML = filtered.map((g) => {
        const originalIndex = GALLERY_ITEMS.indexOf(g);
        return `
            <div class="gallery-item reveal active" onclick="openLightbox(${originalIndex})">
                <img src="${g.url}" alt="${g.caption}">
                <div class="gallery-overlay">🔍 Expand View</div>
            </div>
        `;
    }).join('');
}

function openLightbox(idx) {
    const item = GALLERY_ITEMS[idx];
    if (!item) return;
    const img = document.getElementById('lightboxImg');
    const caption = document.getElementById('lightboxCaption');
    if (img) img.src = item.url;
    if (caption) caption.textContent = item.caption;
    openModal('lightboxModal');
}

/* --- BOOKING CALCULATOR & FORM SUBMISSION --- */
function calculateBookingTotal() {
    const inEl = document.getElementById('bookCheckIn');
    const outEl = document.getElementById('bookCheckOut');
    if (!inEl || !outEl) return;

    const inDate = new Date(inEl.value);
    const outDate = new Date(outEl.value);
    let nights = Math.max(1, Math.round((outDate - inDate) / (1000 * 60 * 60 * 24)));
    if (isNaN(nights)) nights = 1;

    const roomSelect = document.getElementById('bookRoomSelect');
    const roomType = roomSelect ? roomSelect.value : 'royal';
    const roomObj = ROOMS.find(r => r.id === roomType) || ROOMS[2];

    const titleEl = document.getElementById('selectedRoomTitle');
    const nightsEl = document.getElementById('sumNights');
    if (titleEl) titleEl.textContent = roomObj.name;
    if (nightsEl) nightsEl.textContent = `${nights} Night${nights > 1 ? 's' : ''}`;

    const baseTotal = roomObj.basePrice * nights;
    let addonTotal = 0;
    const shikara = document.getElementById('addonShikara');
    const airport = document.getElementById('addonAirport');
    const wazwan = document.getElementById('addonWazwan');

    if (shikara && shikara.checked) addonTotal += 1500;
    if (airport && airport.checked) addonTotal += 1200;
    if (wazwan && wazwan.checked) addonTotal += 2200;

    const subtotal = baseTotal + addonTotal;
    const tax = subtotal * 0.18;

    const promoEl = document.getElementById('promoCode');
    const promo = promoEl ? promoEl.value.trim().toUpperCase() : '';
    let discount = 0;
    if (promo === 'WELCOME10') discount = subtotal * 0.10;
    if (promo === 'KASHMIR15') discount = subtotal * 0.15;

    const grandTotal = subtotal + tax - discount;

    const baseEl = document.getElementById('sumBasePrice');
    const addonsEl = document.getElementById('sumAddons');
    const taxEl = document.getElementById('sumTax');
    const totalEl = document.getElementById('sumTotal');

    if (baseEl) baseEl.textContent = formatPrice(baseTotal);
    if (addonsEl) addonsEl.textContent = formatPrice(addonTotal);
    if (taxEl) taxEl.textContent = formatPrice(tax);

    const discountRow = document.getElementById('discountRow');
    if (discountRow) {
        if (discount > 0) {
            discountRow.style.display = 'flex';
            const discEl = document.getElementById('sumDiscount');
            if (discEl) discEl.textContent = '-' + formatPrice(discount);
        } else {
            discountRow.style.display = 'none';
        }
    }

    if (totalEl) totalEl.textContent = formatPrice(grandTotal);
}

function handleBookingSubmit(e) {
    e.preventDefault();
    const refCode = 'ORCHID-' + Math.floor(10000 + Math.random() * 90000);
    
    const nameEl = document.getElementById('guestName');
    const emailEl = document.getElementById('guestEmail');
    const checkInEl = document.getElementById('bookCheckIn');
    const checkOutEl = document.getElementById('bookCheckOut');
    const titleEl = document.getElementById('selectedRoomTitle');
    const totalEl = document.getElementById('sumTotal');

    const bookingObj = {
        ref: refCode,
        name: nameEl ? nameEl.value : '',
        email: emailEl ? emailEl.value : '',
        checkIn: checkInEl ? checkInEl.value : '',
        checkOut: checkOutEl ? checkOutEl.value : '',
        room: titleEl ? titleEl.textContent : '',
        total: totalEl ? totalEl.textContent : ''
    };

    userBookings.unshift(bookingObj);
    localStorage.setItem('orchids_bookings', JSON.stringify(userBookings));
    updateBadges();

    const form = document.getElementById('bookingForm');
    const voucher = document.getElementById('bookingVoucher');
    const vRef = document.getElementById('voucherRef');
    const vDetails = document.getElementById('voucherDetails');

    if (form) form.style.display = 'none';
    if (voucher) voucher.style.display = 'block';
    if (vRef) vRef.textContent = refCode;
    if (vDetails) {
        vDetails.innerHTML = `
            <strong>Guest:</strong> ${bookingObj.name}<br>
            <strong>Dates:</strong> ${bookingObj.checkIn} to ${bookingObj.checkOut}<br>
            <strong>Reserved Suite:</strong> ${bookingObj.room}<br>
            <strong>Amount Paid:</strong> ${bookingObj.total}
        `;
    }

    showToast('🎉 Reservation ' + refCode + ' Confirmed!');
}

/* --- DRAWERS & BADGES --- */
function updateBadges() {
    const bCount = document.getElementById('bookingCount');
    const iCount = document.getElementById('itineraryCount');
    if (bCount) bCount.textContent = userBookings.length;
    if (iCount) iCount.textContent = userItinerary.length;
    renderBookingsDrawer();
    renderItineraryDrawer();
}

function renderBookingsDrawer() {
    const list = document.getElementById('bookingsList');
    if (!list) return;

    if (userBookings.length === 0) {
        list.innerHTML = '<p style="color:var(--ink-muted); font-size:0.85rem;">No active reservations found.</p>';
        return;
    }
    list.innerHTML = userBookings.map((b, i) => `
        <div style="background:var(--bg-paper); padding:15px; border-radius:var(--radius); border:1px solid var(--line); font-size:0.85rem;">
            <div style="display:flex; justify-content:space-between; color:var(--brass); font-family:'Space Mono'; font-weight:700;">
                <span>${b.ref}</span>
                <span>CONFIRMED</span>
            </div>
            <div style="font-size:1rem; font-family:'Fraunces'; margin:5px 0;">${b.room}</div>
            <div style="color:var(--ink-muted); font-size:0.78rem;">${b.checkIn} to ${b.checkOut}</div>
            <div style="margin-top:8px; font-weight:600;">Total: ${b.total}</div>
            <button class="btn btn-outline btn-sm" style="margin-top:10px; width:100%;" onclick="cancelBooking(${i})">Cancel Reservation</button>
        </div>
    `).join('');
}

function cancelBooking(idx) {
    userBookings.splice(idx, 1);
    localStorage.setItem('orchids_bookings', JSON.stringify(userBookings));
    updateBadges();
    showToast('Reservation Canceled');
}

function renderItineraryDrawer() {
    const list = document.getElementById('itineraryList');
    if (!list) return;

    if (userItinerary.length === 0) {
        list.innerHTML = '<p style="color:var(--ink-muted); font-size:0.85rem;">Your itinerary is empty. Explore Experiences section to add tours!</p>';
        return;
    }
    list.innerHTML = userItinerary.map((item, i) => `
        <div style="background:var(--bg-paper); padding:12px; border-radius:var(--radius); border:1px solid var(--line); display:flex; justify-content:space-between; align-items:center; font-size:0.85rem;">
            <div>
                <strong>${item.title}</strong>
                <div style="font-size:0.75rem; color:var(--brass);">${item.dist} • ${item.time}</div>
            </div>
            <button style="background:none; border:none; color:red; cursor:pointer; font-size:1.1rem;" onclick="removeFromItinerary(${i})">&times;</button>
        </div>
    `).join('');
}

function removeFromItinerary(i) {
    userItinerary.splice(i, 1);
    localStorage.setItem('orchids_itinerary', JSON.stringify(userItinerary));
    updateBadges();
}

function openDrawer(id) { 
    const d = document.getElementById(id);
    if (d) d.classList.add('open'); 
}
function closeDrawer(id) { 
    const d = document.getElementById(id);
    if (d) d.classList.remove('open'); 
}

/* --- MODAL CONTROL --- */
function openModal(id) {
    const m = document.getElementById(id);
    if (m) {
        m.classList.add('active');
        if (id === 'bookModal') calculateBookingTotal();
    }
}

function closeModal(id) {
    const m = document.getElementById(id);
    if (m) m.classList.remove('active');
}

/* --- CONCIERGE CHAT ASSISTANT --- */
function toggleChat() {
    const box = document.getElementById('chatBox');
    if (box) box.classList.toggle('active');
}

function sendChatMessage() {
    const input = document.getElementById('chatInput');
    if (!input) return;
    const txt = input.value.trim();
    if (!txt) return;

    const msgs = document.getElementById('chatMsgs');
    if (!msgs) return;

    msgs.innerHTML += `<div class="msg user">${txt}</div>`;
    input.value = '';

    setTimeout(() => {
        let reply = "That is a wonderful question about Srinagar! The Orchids Cove team is happy to assist with customized itineraries, taxis, or dining reservations anytime.";
        const q = txt.toLowerCase();
        if (q.includes('shikara') || q.includes('lake')) reply = "Our hotel is just 5 minutes from Dal Lake! We can book a private sunset Shikara ride with Kahwa tea served onboard for ₹1,500.";
        if (q.includes('weather') || q.includes('snow')) reply = "Srinagar features pleasant spring blossoms now (~18°C). Snow can be experienced year-round at high altitudes in Gulmarg (52 km away).";
        if (q.includes('food') || q.includes('wazwan')) reply = "We serve authentic 7-course Kashmiri Wazwan prepared by traditional Wazas right at our in-house dining pavilion!";
        if (q.includes('airport')) reply = "Srinagar Airport (SXR) is approximately 18 km (40 mins drive). We provide luxury private pickup transfers for ₹1,200.";

        msgs.innerHTML += `<div class="msg bot">${reply}</div>`;
        msgs.scrollTop = msgs.scrollHeight;
    }, 600);
}

/* --- TOAST SYSTEM --- */
function showToast(msg) {
    const container = document.getElementById('toastContainer');
    if (!container) return;
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = msg;
    container.appendChild(toast);
    setTimeout(() => toast.remove(), 3500);
}

/* --- SCROLL ANIMATIONS --- */
function initScrollAnimations() {
    document.querySelectorAll('.reveal').forEach(el => el.classList.add('active'));
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, i) => {
            if (entry.isIntersecting) {
                setTimeout(() => entry.target.classList.add('active'), i * 80);
            }
        });
    }, { threshold: 0.1 });
    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
}

/* --- CANVAS FLOATING GOLDEN PARTICLES --- */
function initCanvasParticles() {
    const canvas = document.getElementById('bgCanvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let w, h, particles = [];

    function resize() {
        w = canvas.width = window.innerWidth;
        h = canvas.height = window.innerHeight;
    }
    window.addEventListener('resize', resize);
    resize();

    for (let i = 0; i < 35; i++) {
        particles.push({
            x: Math.random() * w,
            y: Math.random() * h,
            r: Math.random() * 2 + 1,
            dx: (Math.random() - 0.5) * 0.4,
            dy: -Math.random() * 0.5 - 0.2
        });
    }

    function draw() {
        ctx.clearRect(0, 0, w, h);
        ctx.fillStyle = 'rgba(184, 137, 43, 0.4)';
        particles.forEach(p => {
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
            ctx.fill();
            p.x += p.dx;
            p.y += p.dy;
            if (p.y < 0) { p.y = h; p.x = Math.random() * w; }
        });
        requestAnimationFrame(draw);
    }
    draw();
}

// Keyboard Escape key & Backdrop click handlers
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        document.querySelectorAll('.modal.active').forEach(m => m.classList.remove('active'));
        document.querySelectorAll('.drawer.open').forEach(d => d.classList.remove('open'));
        const mobileNav = document.getElementById('mobileNav');
        if (mobileNav) mobileNav.classList.remove('open');
        const chatBox = document.getElementById('chatBox');
        if (chatBox) chatBox.classList.remove('active');
    }
});

document.querySelectorAll('.modal').forEach(m => {
    m.addEventListener('click', (e) => {
        if (e.target === m) m.classList.remove('active');
    });
});

function toggleMenu() {
    const mobileNav = document.getElementById('mobileNav');
    if (mobileNav) mobileNav.classList.toggle('open');
}

function closeMenu() {
    const mobileNav = document.getElementById('mobileNav');
    if (mobileNav) mobileNav.classList.remove('open');
}

/* --- ADMIN DASHBOARD & MANAGEMENT PORTAL --- */
let activeAdminTab = 'rooms';
let isAdminLoggedIn = sessionStorage.getItem('orchids_admin_logged_in') === 'true';

function openAdminModal() {
    if (!isAdminLoggedIn) {
        const errDiv = document.getElementById('adminLoginError');
        if (errDiv) errDiv.style.display = 'none';
        openModal('adminLoginModal');
    } else {
        renderAdminDashboard();
        openModal('adminModal');
    }
}

function handleAdminLogin(e) {
    e.preventDefault();
    const u = document.getElementById('adminUsername').value.trim();
    const p = document.getElementById('adminPassword').value.trim();
    const errDiv = document.getElementById('adminLoginError');

    if (u.toLowerCase() === 'admin' && p === 'orchids2026') {
        isAdminLoggedIn = true;
        sessionStorage.setItem('orchids_admin_logged_in', 'true');
        if (errDiv) errDiv.style.display = 'none';
        closeModal('adminLoginModal');
        showToast('🔐 Welcome, Administrator! Access Granted.');
        renderAdminDashboard();
        openModal('adminModal');
    } else {
        if (errDiv) errDiv.style.display = 'block';
    }
}

function handleAdminLogout() {
    isAdminLoggedIn = false;
    sessionStorage.removeItem('orchids_admin_logged_in');
    closeModal('adminModal');
    showToast('🔒 Logged out of Property Admin Portal.');
}

function switchAdminTab(tab, el) {
    activeAdminTab = tab;
    const container = document.getElementById('adminTabsContainer');
    if (container) {
        container.querySelectorAll('.filter-tab').forEach(t => t.classList.remove('active'));
    }
    const target = (el && el.nodeType) ? el : (window.event && (window.event.currentTarget || window.event.target));
    if (target && target.classList) target.classList.add('active');

    const tabRooms = document.getElementById('adminTabRooms');
    const tabDining = document.getElementById('adminTabDining');
    const tabNew = document.getElementById('adminTabNew');

    if (tabRooms) tabRooms.style.display = tab === 'rooms' ? 'block' : 'none';
    if (tabDining) tabDining.style.display = tab === 'dining' ? 'block' : 'none';
    if (tabNew) tabNew.style.display = tab === 'new' ? 'block' : 'none';

    renderAdminDashboard();
}

function renderAdminDashboard() {
    renderAdminStats();
    renderAdminRoomsTable();
    renderAdminDiningTable();
}

function renderAdminStats() {
    const statsGrid = document.getElementById('adminStatsGrid');
    if (!statsGrid) return;

    const totalRev = userBookings.reduce((sum, b) => sum + (b.totalPrice || 0), 0);
    const confirmedRooms = userBookings.filter(b => b.status !== 'Cancelled').length;
    const confirmedDining = userDiningReservations.filter(d => d.status !== 'Cancelled').length;
    const totalGuests = userBookings.reduce((sum, b) => sum + (b.guests || 2), 0) + userDiningReservations.reduce((sum, d) => sum + (d.guests || 1), 0);

    statsGrid.innerHTML = `
        <div style="background:var(--bg-paper); padding:15px; border-radius:6px; border:1px solid var(--line);">
            <span style="font-family:'Space Mono'; font-size:0.7rem; color:var(--brass); text-transform:uppercase; font-weight:700;">Total Revenue</span>
            <h3 style="font-family:'Fraunces'; font-size:1.5rem; margin-top:5px; color:var(--ink);">${formatPrice(totalRev)}</h3>
        </div>
        <div style="background:var(--bg-paper); padding:15px; border-radius:6px; border:1px solid var(--line);">
            <span style="font-family:'Space Mono'; font-size:0.7rem; color:var(--brass); text-transform:uppercase; font-weight:700;">Room Bookings</span>
            <h3 style="font-family:'Fraunces'; font-size:1.5rem; margin-top:5px; color:var(--ink);">${confirmedRooms} Active</h3>
        </div>
        <div style="background:var(--bg-paper); padding:15px; border-radius:6px; border:1px solid var(--line);">
            <span style="font-family:'Space Mono'; font-size:0.7rem; color:var(--brass); text-transform:uppercase; font-weight:700;">Dining Tables</span>
            <h3 style="font-family:'Fraunces'; font-size:1.5rem; margin-top:5px; color:var(--ink);">${confirmedDining} Reserved</h3>
        </div>
        <div style="background:var(--bg-paper); padding:15px; border-radius:6px; border:1px solid var(--line);">
            <span style="font-family:'Space Mono'; font-size:0.7rem; color:var(--brass); text-transform:uppercase; font-weight:700;">Expected Guests</span>
            <h3 style="font-family:'Fraunces'; font-size:1.5rem; margin-top:5px; color:var(--ink);">${totalGuests} Visitors</h3>
        </div>
    `;

    const roomsCountEl = document.getElementById('adminRoomsCount');
    const diningCountEl = document.getElementById('adminDiningCount');
    if (roomsCountEl) roomsCountEl.textContent = userBookings.length;
    if (diningCountEl) diningCountEl.textContent = userDiningReservations.length;
}

function renderAdminRoomsTable() {
    const tbody = document.getElementById('adminRoomsTbody');
    if (!tbody) return;

    const searchInput = document.getElementById('adminRoomSearch');
    const search = searchInput ? searchInput.value.toLowerCase() : '';

    const filtered = userBookings.filter(b => 
        (b.guestName && b.guestName.toLowerCase().includes(search)) ||
        (b.id && b.id.toLowerCase().includes(search)) ||
        (b.roomName && b.roomName.toLowerCase().includes(search))
    );

    if (filtered.length === 0) {
        tbody.innerHTML = `<tr><td colspan="7" style="padding:20px; text-align:center; color:var(--ink-muted);">No room bookings recorded yet.</td></tr>`;
        return;
    }

    tbody.innerHTML = filtered.map(b => `
        <tr style="border-bottom:1px solid var(--line);">
            <td style="padding:10px; font-family:'Space Mono'; font-weight:700; color:var(--brass);">${b.id}</td>
            <td style="padding:10px;"><strong>${b.guestName || 'Guest'}</strong><br><span style="font-size:0.75rem; color:var(--ink-muted);">${b.guestPhone || ''}</span></td>
            <td style="padding:10px;">${b.roomName}</td>
            <td style="padding:10px;">${b.checkIn} → ${b.checkOut}</td>
            <td style="padding:10px; font-weight:700;">${formatPrice(b.totalPrice)}</td>
            <td style="padding:10px;">
                <span class="badge" style="background:${b.status === 'Cancelled' ? '#ef4444' : b.status === 'Checked-In' ? '#3b82f6' : '#10b981'}; color:white; font-size:0.7rem; padding:2px 6px;">
                    ${b.status || 'Confirmed'}
                </span>
            </td>
            <td style="padding:10px;">
                <div style="display:flex; gap:6px;">
                    <button class="btn btn-outline btn-sm" style="padding:2px 6px; font-size:0.7rem;" onclick="updateAdminRoomStatus('${b.id}', 'Checked-In')">Check-In</button>
                    <button class="btn btn-outline btn-sm" style="padding:2px 6px; font-size:0.7rem; border-color:#ef4444; color:#ef4444;" onclick="deleteAdminRoomBooking('${b.id}')">Cancel</button>
                </div>
            </td>
        </tr>
    `).join('');
}

function updateAdminRoomStatus(id, newStatus) {
    const booking = userBookings.find(b => b.id === id);
    if (booking) {
        booking.status = newStatus;
        localStorage.setItem('orchids_bookings', JSON.stringify(userBookings));
        renderAdminDashboard();
        updateBadges();
        showToast(`Booking ${id} status updated to ${newStatus}`);
    }
}

function deleteAdminRoomBooking(id) {
    if (confirm(`Cancel reservation ${id}?`)) {
        userBookings = userBookings.filter(b => b.id !== id);
        localStorage.setItem('orchids_bookings', JSON.stringify(userBookings));
        renderAdminDashboard();
        updateBadges();
        showToast(`Booking ${id} cancelled`);
    }
}

function renderAdminDiningTable() {
    const tbody = document.getElementById('adminDiningTbody');
    if (!tbody) return;

    const searchInput = document.getElementById('adminDiningSearch');
    const search = searchInput ? searchInput.value.toLowerCase() : '';

    const filtered = userDiningReservations.filter(d => 
        (d.name && d.name.toLowerCase().includes(search)) ||
        (d.id && d.id.toLowerCase().includes(search))
    );

    if (filtered.length === 0) {
        tbody.innerHTML = `<tr><td colspan="7" style="padding:20px; text-align:center; color:var(--ink-muted);">No table reservations recorded yet.</td></tr>`;
        return;
    }

    tbody.innerHTML = filtered.map(d => `
        <tr style="border-bottom:1px solid var(--line);">
            <td style="padding:10px; font-family:'Space Mono'; font-weight:700; color:var(--brass);">${d.id}</td>
            <td style="padding:10px;"><strong>${d.name}</strong></td>
            <td style="padding:10px;">${d.seating}</td>
            <td style="padding:10px;">${d.date} at ${d.time}</td>
            <td style="padding:10px;">👥 ${d.guests} Guests</td>
            <td style="padding:10px;">
                <span class="badge" style="background:${d.status === 'Cancelled' ? '#ef4444' : d.status === 'Seated' ? '#8b5cf6' : '#10b981'}; color:white; font-size:0.7rem; padding:2px 6px;">
                    ${d.status || 'Confirmed'}
                </span>
            </td>
            <td style="padding:10px;">
                <div style="display:flex; gap:6px;">
                    <button class="btn btn-outline btn-sm" style="padding:2px 6px; font-size:0.7rem;" onclick="updateAdminDiningStatus('${d.id}', 'Seated')">Mark Seated</button>
                    <button class="btn btn-outline btn-sm" style="padding:2px 6px; font-size:0.7rem; border-color:#ef4444; color:#ef4444;" onclick="deleteAdminDiningReservation('${d.id}')">Cancel</button>
                </div>
            </td>
        </tr>
    `).join('');
}

function updateAdminDiningStatus(id, newStatus) {
    const res = userDiningReservations.find(d => d.id === id);
    if (res) {
        res.status = newStatus;
        localStorage.setItem('orchids_dining', JSON.stringify(userDiningReservations));
        renderAdminDashboard();
        showToast(`Table ${id} status updated to ${newStatus}`);
    }
}

function deleteAdminDiningReservation(id) {
    if (confirm(`Cancel table reservation ${id}?`)) {
        userDiningReservations = userDiningReservations.filter(d => d.id !== id);
        localStorage.setItem('orchids_dining', JSON.stringify(userDiningReservations));
        renderAdminDashboard();
        showToast(`Table reservation ${id} cancelled`);
    }
}

function handleAdminAddBooking(e) {
    e.preventDefault();
    const name = document.getElementById('adminAddGuestName').value;
    const roomSelect = document.getElementById('adminAddRoomSelect');
    const roomId = roomSelect.value;
    const roomObj = ROOMS.find(r => r.id === roomId);
    const checkIn = document.getElementById('adminAddIn').value;
    const checkOut = document.getElementById('adminAddOut').value;

    const days = Math.max(1, Math.round((new Date(checkOut) - new Date(checkIn)) / (1000 * 60 * 60 * 24))) || 1;
    const totalPrice = (roomObj ? roomObj.basePrice : 4000) * days;

    const newBooking = {
        id: 'ORCHID-' + Math.floor(1000 + Math.random() * 9000),
        guestName: name,
        guestPhone: 'Walk-In Guest',
        roomName: roomObj ? roomObj.name : 'Deluxe Room',
        checkIn: checkIn,
        checkOut: checkOut,
        nights: days,
        totalPrice: totalPrice,
        status: 'Confirmed',
        createdAt: new Date().toISOString().split('T')[0]
    };

    userBookings.unshift(newBooking);
    localStorage.setItem('orchids_bookings', JSON.stringify(userBookings));

    showToast(`Created Walk-in Suite Reservation for ${name}!`);
    renderAdminDashboard();
    updateBadges();
    switchAdminTab('rooms', document.querySelectorAll('#adminTabsContainer .filter-tab')[0]);
}

function handleAdminAddDining(e) {
    e.preventDefault();
    const name = document.getElementById('adminAddDiningName').value;
    const seating = document.getElementById('adminAddDiningType').value;
    const date = document.getElementById('adminAddDiningDate').value;
    const time = document.getElementById('adminAddDiningTime').value;
    const guests = document.getElementById('adminAddDiningGuests').value;

    const newRes = {
        id: 'DIN-' + Math.floor(1000 + Math.random() * 9000),
        name: name,
        seating: seating,
        date: date,
        time: time,
        guests: parseInt(guests),
        status: 'Confirmed',
        createdAt: new Date().toISOString().split('T')[0]
    };

    userDiningReservations.unshift(newRes);
    localStorage.setItem('orchids_dining', JSON.stringify(userDiningReservations));

    showToast(`Created Walk-in Table Reservation for ${name}!`);
    renderAdminDashboard();
    switchAdminTab('dining', document.querySelectorAll('#adminTabsContainer .filter-tab')[1]);
}

function exportAdminData() {
    let csv = "Type,ID,Guest Name,Details,Date / Duration,Status,Total Price\n";
    userBookings.forEach(b => {
        csv += `Room,${b.id},"${b.guestName}","${b.roomName}",${b.checkIn} to ${b.checkOut},${b.status},${b.totalPrice}\n`;
    });
    userDiningReservations.forEach(d => {
        csv += `Dining,${d.id},"${d.name}","${d.seating}",${d.date} ${d.time},${d.status},N/A\n`;
    });

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Orchids_Cove_Property_Data_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    showToast('Exported Property Data to CSV!');
}

// Bind functions to window immediately so HTML inline event handlers find them
Object.assign(window, {
    changeCurrency,
    toggleTheme,
    toggleSoundscape,
    updateHeroQuote,
    proceedFromHeroQuote,
    filterRooms,
    renderRooms,
    openQuickView,
    selectRoomAndBook,
    filterExp,
    filterDining,
    renderDiningMenu,
    handleDiningSubmit,
    addToItinerary,
    submitReview,
    openLightbox,
    filterGallery,
    calculateBookingTotal,
    handleBookingSubmit,
    cancelBooking,
    removeFromItinerary,
    openDrawer,
    closeDrawer,
    openModal,
    closeModal,
    toggleChat,
    sendChatMessage,
    closeMenu,
    toggleMenu,
    openAdminModal,
    switchAdminTab,
    renderAdminDashboard,
    renderAdminRoomsTable,
    renderAdminDiningTable,
    updateAdminRoomStatus,
    deleteAdminRoomBooking,
    updateAdminDiningStatus,
    deleteAdminDiningReservation,
    handleAdminAddBooking,
    handleAdminAddDining,
    exportAdminData,
    handleAdminLogin,
    handleAdminLogout
});

// Initialize application after all data and functions are defined & bound
if (document.readyState === 'loading') {
    window.addEventListener('DOMContentLoaded', initApp);
} else {
    initApp();
}
