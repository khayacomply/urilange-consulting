// Navbar scroll effect
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Initialize WOW.js for scroll animations
new WOW({
    mobile: false,
    live: false
}).init();

// Active navigation link
const currentPage = window.location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.nav-link').forEach(link => {
    if (link.getAttribute('href') === currentPage) {
        link.classList.add('active');
    }
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Contact form handling
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const formData = new FormData(this);
        const data = Object.fromEntries(formData);
        
        // Validation
        if (!data.name || !data.email || !data.phone || !data.message) {
            alert('Please fill in all required fields');
            return;
        }
        
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(data.email)) {
            alert('Please enter a valid email address');
            return;
        }
        
        // Show success message
        alert('Thank you for your message! We will contact you soon.');
        this.reset();
    });
}

// Counter animation for stats
const animateCounter = (element) => {
    const target = parseInt(element.getAttribute('data-target'));
    const duration = 2000;
    const step = target / (duration / 16);
    let current = 0;
    
    const timer = setInterval(() => {
        current += step;
        if (current >= target) {
            element.textContent = target + '+';
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current) + '+';
        }
    }, 16);
};

// Intersection Observer for stats
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateCounter(entry.target);
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.stat-number').forEach(stat => {
    statsObserver.observe(stat);
});

// Phone click tracking
document.querySelectorAll('a[href^="tel:"]').forEach(phone => {
    phone.addEventListener('click', function() {
        console.log('Phone clicked:', this.getAttribute('href'));
    });
});

// ===== REVIEWS CAROUSEL (SWIPER) =====
// Only initialize if the reviews swiper exists on the page
if (document.querySelector('.reviews-swiper')) {
    const reviewsSwiper = new Swiper('.reviews-swiper', {
        // Fade effect for smooth transitions
        effect: 'fade',
        fadeEffect: {
            crossFade: true
        },
        
        // Auto-play settings
        autoplay: {
            delay: 5000, // Change slide every 5 seconds
            disableOnInteraction: false,
            pauseOnMouseEnter: true
        },
        
        // Loop infinitely
        loop: true,
        
        // Transition speed in milliseconds
        speed: 1000,
        
        // Navigation arrows
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        
        // Pagination dots
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
            dynamicBullets: true,
        },
        
        // Keyboard navigation
        keyboard: {
            enabled: true,
        },
        
        // Accessibility
        a11y: {
            prevSlideMessage: 'Previous testimonial',
            nextSlideMessage: 'Next testimonial',
        },
    });
}

console.log('Urilange Consulting Website Loaded');