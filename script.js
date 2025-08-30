// --------- NAVBAR SCROLL EFFECT ---------
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    navbar.classList.add('navbar-glass');
  } else {
    navbar.classList.remove('navbar-glass');
  }
});

// --------- MOBILE MENU TOGGLE ---------
const menuBtn = document.getElementById('menu-btn');
const mobileMenu = document.getElementById('mobile-menu');

menuBtn.addEventListener('click', () => {
  mobileMenu.classList.toggle('hidden');
});

// Close mobile menu when clicking on a link
const mobileLinks = mobileMenu.querySelectorAll('a');
mobileLinks.forEach(link => {
  link.addEventListener('click', () => {
    mobileMenu.classList.add('hidden');
  });
});

// --------- LIGHTBOX FUNCTIONALITY ---------
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-image');
const lightboxClose = document.getElementById('lightbox-close');
const lightboxPrev = document.getElementById('lightbox-prev');
const lightboxNext = document.getElementById('lightbox-next');

// Array to store gallery images
let lightboxImages = [];
let currentImageIndex = 0;

// Function to open lightbox
function openLightbox(images, index) {
  lightboxImages = images;
  currentImageIndex = index;
  lightboxImg.src = lightboxImages[currentImageIndex];
  lightbox.classList.remove('hidden');
  document.body.style.overflow = 'hidden'; // Prevent scrolling
}

// Function to close lightbox
function closeLightbox() {
  lightbox.classList.add('hidden');
  document.body.style.overflow = 'auto'; // Enable scrolling
}

// Function to navigate to next image
function nextImage() {
  currentImageIndex = (currentImageIndex + 1) % lightboxImages.length;
  lightboxImg.src = lightboxImages[currentImageIndex];
}

// Function to navigate to previous image
function prevImage() {
  currentImageIndex = (currentImageIndex - 1 + lightboxImages.length) % lightboxImages.length;
  lightboxImg.src = lightboxImages[currentImageIndex];
}

// Event listeners
lightboxClose.addEventListener('click', closeLightbox);
lightboxNext.addEventListener('click', nextImage);
lightboxPrev.addEventListener('click', prevImage);

// Close lightbox when clicking on background
lightbox.addEventListener('click', (e) => {
  if (e.target === lightbox) {
    closeLightbox();
  }
});

// Keyboard navigation
document.addEventListener('keydown', (e) => {
  if (!lightbox.classList.contains('hidden')) {
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowRight') nextImage();
    if (e.key === 'ArrowLeft') prevImage();
  }
});

// Initialize gallery items
document.querySelectorAll('.gallery-item, .project-card').forEach((item) => {
  const imgSrc = item.getAttribute('data-image');
  item.addEventListener('click', () => {
    openLightbox([imgSrc], 0);
  });
});

// --------- ROOM TABS FUNCTIONALITY ---------
const tabs = document.querySelectorAll('.tab-btn');
const containers = document.querySelectorAll('.before-after-container');

tabs.forEach((tab, index) => {
  tab.addEventListener('click', () => {
    // Remove active class from all tabs
    tabs.forEach(t => t.classList.remove('active'));
    // Add active class to clicked tab
    tab.classList.add('active');

    // Remove active class from all containers
    containers.forEach(c => c.classList.remove('active'));
    // Add active class to corresponding container
    containers[index].classList.add('active');
  });
});

// --------- BEFORE & AFTER SLIDER ---------
containers.forEach(container => {
  const afterImage = container.querySelector('.after');
  const slider = container.querySelector('.before-after-slider');

  let isDragging = false;

  // Set initial clip path for after image
  afterImage.style.clipPath = 'inset(0 50% 0 0)';
  slider.style.left = '50%';

  // Mouse events
  container.addEventListener('mousedown', () => isDragging = true);
  container.addEventListener('mouseup', () => isDragging = false);
  container.addEventListener('mouseleave', () => isDragging = false);
  container.addEventListener('mousemove', (e) => {
    if (!isDragging) return;
    const rect = container.getBoundingClientRect();
    let offsetX = e.clientX - rect.left;
    offsetX = Math.max(0, Math.min(offsetX, rect.width)); // Clamp value
    let percent = (offsetX / rect.width) * 100;
    afterImage.style.clipPath = `inset(0 ${100 - percent}% 0 0)`;
    slider.style.left = `${percent}%`;
  });

  // Touch events for mobile
  container.addEventListener('touchstart', () => isDragging = true);
  container.addEventListener('touchend', () => isDragging = false);
  container.addEventListener('touchmove', (e) => {
    if (!isDragging) return;
    const touch = e.touches[0];
    const rect = container.getBoundingClientRect();
    let offsetX = touch.clientX - rect.left;
    offsetX = Math.max(0, Math.min(offsetX, rect.width));
    let percent = (offsetX / rect.width) * 100;
    afterImage.style.clipPath = `inset(0 ${100 - percent}% 0 0)`;
    slider.style.left = `${percent}%`;
  });
});

// --------- SCROLL ANIMATIONS ---------
const observerOptions = {
  root: null,
  rootMargin: '0px',
  threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('fade-in');
    }
  });
}, observerOptions);

document.querySelectorAll('section h2, .fade-in').forEach((el) => {
  observer.observe(el);
});

// --------- EMAILJS CONTACT FORM ---------
const contactForm = document.getElementById('contact-form');
const formMessage = document.getElementById('form-message');

if (contactForm) {
  contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form data
    const formData = {
      from_name: contactForm.querySelector('input[type="text"]').value,
      from_email: contactForm.querySelector('input[type="email"]').value,
      from_phone: contactForm.querySelector('input[type="tel"]').value,
      message: contactForm.querySelector('textarea').value
    };
    
    // Send email using EmailJS
    emailjs.send('service_n5zrphg', 'template_kji7hhj' , formData)
      .then(function(response) {
        console.log('SUCCESS!', response.status, response.text);
        formMessage.classList.remove('hidden');
        formMessage.classList.add('bg-green-100', 'text-green-700');
        formMessage.innerHTML = '<i class="fas fa-check-circle mr-2"></i> Your message has been sent successfully!';
        contactForm.reset();
      }, function(error) {
        console.log('FAILED...', error);
        formMessage.classList.remove('hidden');
        formMessage.classList.add('bg-red-100', 'text-red-700');
        formMessage.innerHTML = '<i class="fas fa-exclamation-circle mr-2"></i> Sorry, there was an error sending your message. Please try again.';
      });
  });
}

// --------- SMOOTH SCROLLING ---------
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    
    const targetId = this.getAttribute('href');
    if (targetId === '#') return;
    
    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      const navHeight = navbar.offsetHeight;
      const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navHeight;
      
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
    }
  });
});

// --------- MOBILE HORIZONTAL SCROLL ENHANCEMENTS ---------
function enhanceHorizontalScroll(containerClass) {
  const containers = document.querySelectorAll(`.${containerClass}`);
  
  containers.forEach(container => {
    let isDown = false;
    let startX;
    let scrollLeft;
    
    container.addEventListener('mousedown', (e) => {
      isDown = true;
      startX = e.pageX - container.offsetLeft;
      scrollLeft = container.scrollLeft;
    });
    
    container.addEventListener('mouseleave', () => {
      isDown = false;
    });
    
    container.addEventListener('mouseup', () => {
      isDown = false;
    });
    
    container.addEventListener('mousemove', (e) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - container.offsetLeft;
      const walk = (x - startX) * 2;
      container.scrollLeft = scrollLeft - walk;
    });
    
    // Touch events for mobile
    container.addEventListener('touchstart', (e) => {
      startX = e.touches[0].pageX - container.offsetLeft;
      scrollLeft = container.scrollLeft;
    }, { passive: true });
    
    container.addEventListener('touchmove', (e) => {
      if (e.touches.length !== 1) return;
      const x = e.touches[0].pageX - container.offsetLeft;
      const walk = (x - startX) * 2;
      container.scrollLeft = scrollLeft - walk;
    }, { passive: true });
  });
}

// Initialize horizontal scroll enhancements
enhanceHorizontalScroll('gallery-scroll-container');
enhanceHorizontalScroll('projects-scroll-container');
enhanceHorizontalScroll('testimonials-scroll-container');
enhanceHorizontalScroll('room-tabs-container');