// ===== TESTIMONIALS PAGE FUNCTIONALITY =====

// Slider functionality
let currentSlide = 0;
const slides = document.querySelectorAll('.testimonial-slide');
const totalSlides = slides.length;

// Create dots dynamically
const createDots = () => {
  const dotsContainer = document.getElementById('sliderDots');
  
  for (let i = 0; i < totalSlides; i++) {
    const dot = document.createElement('span');
    dot.className = 'dot';
    if (i === 0) dot.classList.add('active');
    dot.addEventListener('click', () => goToSlide(i));
    dotsContainer.appendChild(dot);
  }
};

// Show specific slide
const showSlide = (index) => {
  // Hide all slides
  slides.forEach(slide => {
    slide.classList.remove('active');
  });

  // Show current slide
  slides[index].classList.add('active');

  // Update dots
  const dots = document.querySelectorAll('.dot');
  dots.forEach((dot, i) => {
    dot.classList.toggle('active', i === index);
  });
};

// Go to specific slide
const goToSlide = (index) => {
  currentSlide = index;
  showSlide(currentSlide);
};

// Next slide
const nextSlide = () => {
  currentSlide = (currentSlide + 1) % totalSlides;
  showSlide(currentSlide);
};

// Previous slide
const prevSlide = () => {
  currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
  showSlide(currentSlide);
};

// Initialize slider
const initializeSlider = () => {
  createDots();
  showSlide(0);

  // Button event listeners
  document.getElementById('nextBtn').addEventListener('click', nextSlide);
  document.getElementById('prevBtn').addEventListener('click', prevSlide);

  // Keyboard navigation
  document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') prevSlide();
    if (e.key === 'ArrowRight') nextSlide();
  });

  // Auto-advance slider
  let autoSlideInterval = setInterval(nextSlide, 6000);

  // Pause on hover
  const sliderWrapper = document.querySelector('.slider-wrapper');
  sliderWrapper.addEventListener('mouseenter', () => {
    clearInterval(autoSlideInterval);
  });

  sliderWrapper.addEventListener('mouseleave', () => {
    autoSlideInterval = setInterval(nextSlide, 6000);
  });

  // Touch/swipe support
  let touchStartX = 0;
  let touchEndX = 0;

  sliderWrapper.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
  });

  sliderWrapper.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
  });

  const handleSwipe = () => {
    if (touchEndX < touchStartX - 50) nextSlide();
    if (touchEndX > touchStartX + 50) prevSlide();
  };
};

// Animate trust indicators
const animateTrustItems = () => {
  const trustItems = document.querySelectorAll('.trust-item');

  const trustObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting && !entry.target.classList.contains('visible')) {
        setTimeout(() => {
          entry.target.classList.add('visible');
          animateCounter(entry.target.querySelector('.trust-number'));
        }, index * 150);
      }
    });
  }, {
    threshold: 0.3
  });

  trustItems.forEach(item => trustObserver.observe(item));
};

// Animate counter numbers
const animateCounter = (element) => {
  const target = parseFloat(element.getAttribute('data-target'));
  const duration = 2000;
  const steps = 60;
  const increment = target / steps;
  let current = 0;
  let step = 0;

  const timer = setInterval(() => {
    current += increment;
    step++;
    
    // Handle decimal numbers
    if (target % 1 !== 0) {
      element.textContent = current.toFixed(1);
    } else {
      element.textContent = Math.floor(current);
    }

    if (step >= steps) {
      element.textContent = target % 1 !== 0 ? target.toFixed(1) : target;
      clearInterval(timer);
    }
  }, duration / steps);
};

// Animate testimonial cards on scroll
const animateTestimonialCards = () => {
  const cards = document.querySelectorAll('.testimonial-card');

  const cardObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
        setTimeout(() => {
          entry.target.classList.add('visible', 'animated');
          entry.target.style.transition = 'all 0.6s ease-out';
        }, index * 100);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });

  cards.forEach(card => cardObserver.observe(card));
};

// Add star animation on hover
const addStarAnimations = () => {
  const ratings = document.querySelectorAll('.rating, .card-rating');
  
  ratings.forEach(rating => {
    const stars = rating.querySelectorAll('.star');
    
    stars.forEach((star, index) => {
      star.addEventListener('mouseenter', () => {
        stars.forEach((s, i) => {
          if (i <= index) {
            s.style.transform = 'scale(1.2)';
            s.style.transition = 'transform 0.2s ease';
          }
        });
      });
      
      star.addEventListener('mouseleave', () => {
        stars.forEach(s => {
          s.style.transform = 'scale(1)';
        });
      });
    });
  });
};

// Add testimonial card interactions
const addCardInteractions = () => {
  const cards = document.querySelectorAll('.testimonial-card');
  
  cards.forEach(card => {
    card.addEventListener('mouseenter', function() {
      const img = this.querySelector('img');
      if (img) {
        img.style.transform = 'scale(1.1)';
        img.style.transition = 'transform 0.3s ease';
      }
    });
    
    card.addEventListener('mouseleave', function() {
      const img = this.querySelector('img');
      if (img) {
        img.style.transform = 'scale(1)';
      }
    });
  });
};

// Initialize all functionality
document.addEventListener('DOMContentLoaded', () => {
  initializeSlider();
  animateTrustItems();
  animateTestimonialCards();
  addStarAnimations();
  addCardInteractions();
});

// Add CSS for smooth transitions
const style = document.createElement('style');
style.textContent = `
  .testimonial-card img,
  .testimonial-author img {
    transition: transform 0.3s ease;
  }
`;
document.head.appendChild(style);