// PRELOADER
window.addEventListener('load', () => {
  const preloader = document.getElementById('preloader');
  setTimeout(() => {
    preloader.style.opacity = '0';
    setTimeout(() => preloader.remove(), 500);
  }, 1000);
});

// ANIMATED COUNTERS
const counters = document.querySelectorAll('.counter');
const animateCounter = (counter) => {
  const target = parseInt(counter.getAttribute('data-target'));
  let current = 0;
  const increment = target / 50;
  const updateCounter = () => {
    current += increment;
    if (current < target) {
      counter.innerText = Math.ceil(current);
      requestAnimationFrame(updateCounter);
    } else {
      counter.innerText = target;
    }
  };
  updateCounter();
};

const observerOptions = { threshold: 0.5 };
const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      animateCounter(entry.target);
      counterObserver.unobserve(entry.target);
    }
  });
}, observerOptions);

counters.forEach(counter => counterObserver.observe(counter));

// STICKY NAVBAR
window.addEventListener('scroll', () => {
  const nav = document.getElementById('navbar');
  if (window.scrollY > 50) {
    nav.style.background = 'rgba(15, 14, 14, 0.98)';
  } else {
    nav.style.background = 'rgba(15, 14, 14, 0.95)';
  }
});

// SMOOTH SCROLL
document.querySelectorAll('.nav-link, .consult-btn, .btn-primary, .btn-outline').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    if (this.getAttribute('href') && this.getAttribute('href').startsWith('#')) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
        document.getElementById('navLinks')?.classList.remove('active');
      }
    }
  });
});

// HAMBURGER MENU
const hamburger = document.getElementById('hamburger');
if (hamburger) {
  hamburger.addEventListener('click', () => {
    document.getElementById('navLinks').classList.toggle('active');
  });
}

// DARK/LIGHT MODE TOGGLE
const themeToggle = document.getElementById('themeToggle');
themeToggle.addEventListener('click', () => {
  document.body.classList.toggle('light');
  const icon = themeToggle.querySelector('i');
  if (document.body.classList.contains('light')) {
    icon.classList.replace('fa-moon', 'fa-sun');
  } else {
    icon.classList.replace('fa-sun', 'fa-moon');
  }
});

// GALLERY DATA
const galleryItems = [
  { name: "Modern Floral Wallpaper", category: "Wallpapers", img: "https://images.pexels.com/photos/1571463/pexels-photo-1571463.jpeg?auto=compress&w=400", desc: "Elegant floral pattern for living rooms" },
  { name: "Geometric Wall Texture", category: "Wall Textures", img: "https://images.pexels.com/photos/2587054/pexels-photo-2587054.jpeg?auto=compress&w=400", desc: "Contemporary 3D texture design" },
  { name: "Luxury Vinyl Flooring", category: "Vinyl Flooring", img: "https://images.pexels.com/photos/276724/pexels-photo-276724.jpeg?auto=compress&w=400", desc: "Waterproof, scratch-resistant flooring" },
  { name: "Living Room Decor", category: "Room Decor", img: "https://images.pexels.com/photos/1571468/pexels-photo-1571468.jpeg?auto=compress&w=400", desc: "Complete modern living room setup" },
  { name: "Brick Texture Wallpaper", category: "Wallpapers", img: "https://images.pexels.com/photos/3757055/pexels-photo-3757055.jpeg?auto=compress&w=400", desc: "Industrial style brick effect" },
  { name: "Marble Vinyl Flooring", category: "Vinyl Flooring", img: "https://images.pexels.com/photos/1648771/pexels-photo-1648771.jpeg?auto=compress&w=400", desc: "Luxury marble look flooring" },
  { name: "Bedroom Decor Set", category: "Room Decor", img: "https://images.pexels.com/photos/2089698/pexels-photo-2089698.jpeg?auto=compress&w=400", desc: "Complete bedroom interior styling" },
  { name: "Suede Wall Texture", category: "Wall Textures", img: "https://images.pexels.com/photos/1248583/pexels-photo-1248583.jpeg?auto=compress&w=400", desc: "Soft suede finish for bedrooms" }
];

function renderGallery(filter = "all") {
  const grid = document.getElementById('galleryGrid');
  const filtered = filter === "all" ? galleryItems : galleryItems.filter(item => item.category === filter);
  grid.innerHTML = filtered.map((item, idx) => `
    <div class="gallery-item" data-img="${item.img}" data-name="${item.name}" data-desc="${item.desc}">
      <div class="gallery-img" style="background-image: url('${item.img}');"></div>
      <div class="gallery-info">
        <h3>${item.name}</h3>
        <p style="color:#999">${item.category}</p>
      </div>
    </div>
  `).join('');
  
  document.querySelectorAll('.gallery-item').forEach(item => {
    item.addEventListener('click', () => {
      const modal = document.getElementById('imageModal');
      const imgSrc = item.dataset.img;
      const name = item.dataset.name;
      const desc = item.dataset.desc;
      document.getElementById('modalImageContainer').innerHTML = `
        <img src="${imgSrc}" style="width:100%; border-radius:16px;">
        <h3 style="color:#d4af37; margin-top:1rem;">${name}</h3>
        <p>${desc}</p>
      `;
      modal.style.display = 'flex';
    });
  });
}

document.querySelectorAll('.filter-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    renderGallery(btn.dataset.filter);
  });
});
renderGallery();

// BEFORE/AFTER COMPARE SLIDER
const baSlider = document.getElementById('baSlider');
const baOverlay = document.getElementById('baOverlay');
let isDraggingBA = false;

if (baSlider) {
  baSlider.addEventListener('mousedown', () => isDraggingBA = true);
  window.addEventListener('mouseup', () => isDraggingBA = false);
  window.addEventListener('mousemove', (e) => {
    if (!isDraggingBA) return;
    const rect = document.querySelector('.ba-image').getBoundingClientRect();
    let x = e.clientX - rect.left;
    x = Math.min(Math.max(x, 0), rect.width);
    const percent = (x / rect.width) * 100;
    baOverlay.style.width = percent + '%';
    baSlider.style.left = percent + '%';
  });
}

// TESTIMONIAL SLIDER
let currentTesti = 0;
const testiSlider = document.getElementById('testiSliderContainer');
const testiCards = document.querySelectorAll('.testi-card');
const prevTesti = document.getElementById('prevTesti');
const nextTesti = document.getElementById('nextTesti');

function updateTestiSlider() {
  if (testiSlider) {
    testiSlider.style.transform = `translateX(-${currentTesti * 100}%)`;
  }
}
if (nextTesti) {
  nextTesti.addEventListener('click', () => {
    currentTesti = (currentTesti + 1) % testiCards.length;
    updateTestiSlider();
  });
}
if (prevTesti) {
  prevTesti.addEventListener('click', () => {
    currentTesti = (currentTesti - 1 + testiCards.length) % testiCards.length;
    updateTestiSlider();
  });
}

// INSTAGRAM FEED (Static placeholders)
const instagramPosts = [
  "https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&w=300",
  "https://images.pexels.com/photos/1571463/pexels-photo-1571463.jpeg?auto=compress&w=300",
  "https://images.pexels.com/photos/2587054/pexels-photo-2587054.jpeg?auto=compress&w=300",
  "https://images.pexels.com/photos/276724/pexels-photo-276724.jpeg?auto=compress&w=300"
];

const instagramGrid = document.getElementById('instagramGrid');
if (instagramGrid) {
  instagramGrid.innerHTML = instagramPosts.map(img => `
    <div class="insta-post" style="background-image: url('${img}');" onclick="window.open('https://www.instagram.com/ariesdecor', '_blank')"></div>
  `).join('');
}

// FORM SUBMIT TO WHATSAPP
const bookingForm = document.getElementById('bookingForm');
if (bookingForm) {
  bookingForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('bookName').value;
    const phone = document.getElementById('bookPhone').value;
    const city = document.getElementById('bookCity').value;
    const service = document.getElementById('bookService').value;
    const message = document.getElementById('bookMessage').value;
    const whatsappMsg = `Hello Arhaan Interior Studios! I need a design quote.%0A*Name:* ${name}%0A*Phone:* ${phone}%0A*City:* ${city}%0A*Service:* ${service}%0A*Message:* ${message}`;
    window.open(`https://wa.me/923312627378?text=${whatsappMsg}`, '_blank');
  });
}

// MODAL CLOSE
document.querySelector('.close-modal')?.addEventListener('click', () => {
  document.getElementById('imageModal').style.display = 'none';
});
window.onclick = (e) => {
  if (e.target === document.getElementById('imageModal')) {
    document.getElementById('imageModal').style.display = 'none';
  }
};

// SCROLL ANIMATIONS
const faders = document.querySelectorAll('.fade-up, .fade-right, .fade-left');
const appearOptionsScroll = { threshold: 0.2, rootMargin: "0px 0px -50px 0px" };
const appearOnScroll = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add('appear');
  });
}, appearOptionsScroll);
faders.forEach(fader => appearOnScroll.observe(fader));
