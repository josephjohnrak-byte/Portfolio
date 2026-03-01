// Navigation mobile toggle
const navToggle = document.getElementById('navToggle');
const mainNav = document.getElementById('mainNav');

if (navToggle && mainNav) {
  navToggle.addEventListener('click', () => {
    mainNav.classList.toggle('active');
    navToggle.textContent = mainNav.classList.contains('active') ? '✕' : '☰';
  });

  // Close menu when clicking on a link
  mainNav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      mainNav.classList.remove('active');
      navToggle.textContent = '☰';
    });
  });
}

// Typing animation
const texts = ['Joseph John', 'an Innovator', 'a Scientist', 'a Leader'];
let textIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typingElement = document.getElementById('typing');

function type() {
  if (!typingElement) return; // ✅ PROTECTION AJOUTÉE
  
  const currentText = texts[textIndex];
  
  if (isDeleting) {
    typingElement.textContent = currentText.substring(0, charIndex - 1);
    charIndex--;
  } else {
    typingElement.textContent = currentText.substring(0, charIndex + 1);
    charIndex++;
  }

  if (!isDeleting && charIndex === currentText.length) {
    isDeleting = true;
    setTimeout(type, 2000);
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    textIndex = (textIndex + 1) % texts.length;
    setTimeout(type, 500);
  } else {
    setTimeout(type, isDeleting ? 50 : 100);
  }
}

if (typingElement) {
  type();
}

// Hire button action
const hireBtn = document.getElementById('hireBtn');
if (hireBtn) {
  hireBtn.addEventListener('click', () => {
    window.location.href = 'contact.html';
  });
}

// Navbar scroll effect
let lastScroll = 0;
const navbar = document.querySelector('.navbar');

if (navbar) {
  window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
      navbar.style.padding = '0.5rem 1rem';
      navbar.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.15)';
    } else {
      navbar.style.padding = '1rem';
      navbar.style.boxShadow = 'var(--shadow)';
    }
    
    lastScroll = currentScroll;
  });
}

// ===== SMOOTH SCROLL WITH OFFSET FOR NAVBAR =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    
    const targetId = this.getAttribute('href');
    if (targetId === '#') return;
    
    const targetElement = document.querySelector(targetId);
    
    if (targetElement) {
      const navbarHeight = 80; // Hauteur de ta navbar
      const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navbarHeight;
      
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
    }
  });
});

// ===== MODAL FUNCTIONALITY =====

// Get all modal triggers
const modalTriggers = document.querySelectorAll('.open-modal');
const modals = document.querySelectorAll('.modal');

// Open modal function
modalTriggers.forEach(trigger => {
  trigger.addEventListener('click', () => {
    const modalId = trigger.getAttribute('data-modal');
    const modal = document.getElementById(modalId);
    if (modal) {
      modal.classList.add('active');
      document.body.style.overflow = 'hidden'; // Prevent background scroll
    }
  });
});

// Close modal function
function closeModal(modal) {
  modal.classList.remove('active');
  document.body.style.overflow = ''; // Restore scroll
}

// Close modal on X button click
modals.forEach(modal => {
  const closeBtn = modal.querySelector('.modal-close');
  if (closeBtn) {
    closeBtn.addEventListener('click', () => closeModal(modal));
  }
});

// Close modal on overlay click
modals.forEach(modal => {
  const overlay = modal.querySelector('.modal-overlay');
  if (overlay) {
    overlay.addEventListener('click', () => closeModal(modal));
  }
});

// Close modal on ESC key press
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    modals.forEach(modal => {
      if (modal.classList.contains('active')) {
        closeModal(modal);
      }
    });
  }
});

// ===== SCROLL ANIMATIONS (AOS-like) =====

// Simple scroll animation observer
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const animateOnScroll = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, observerOptions);

// Observe all project cards
document.querySelectorAll('.project-card').forEach((card, index) => {
  card.style.opacity = '0';
  card.style.transform = 'translateY(30px)';
  card.style.transition = `all 0.6s ease-out ${index * 0.1}s`;
  animateOnScroll.observe(card);
});

// Observe aussi les éléments fade-in
document.querySelectorAll('.fade-in').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(30px)';
  el.style.transition = 'all 0.6s ease-out';
  animateOnScroll.observe(el);
});