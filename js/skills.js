// ===== SKILLS PAGE ANIMATIONS - VERSION CORRIGÉE =====

// Animate progress bars when visible
const animateProgressBars = () => {
  const progressBars = document.querySelectorAll('.progress-bar');

  const progressObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
        const progressValue = entry.target.getAttribute('data-progress');
        const progressText = entry.target.querySelector('.progress-text');
        
        // Set CSS variable for width
        entry.target.style.setProperty('--progress-width', progressValue + '%');
        
        // Add animated class to trigger transition
        setTimeout(() => {
          entry.target.classList.add('animated');
        }, 200);
        
        // Animate the text counter
        setTimeout(() => {
          animateCounter(progressText, 0, progressValue, 1500);
        }, 500);
      }
    });
  }, {
    threshold: 0.3
  });

  progressBars.forEach(bar => {
    // Create progress fill element dynamically
    const fill = document.createElement('div');
    fill.className = 'progress-fill';
    bar.insertBefore(fill, bar.firstChild);
    
    progressObserver.observe(bar);
  });
};

// Counter animation function
const animateCounter = (element, start, end, duration) => {
  let startTime = null;
  
  const step = (currentTime) => {
    if (!startTime) startTime = currentTime;
    const progress = Math.min((currentTime - startTime) / duration, 1);
    const value = Math.floor(progress * (end - start) + start);
    element.textContent = value + '%';
    
    if (progress < 1) {
      requestAnimationFrame(step);
    }
  };
  
  requestAnimationFrame(step);
};

// Animate skill cards on scroll
const animateSkillCards = () => {
  const skillCards = document.querySelectorAll('.skill-card');

  const cardObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting && !entry.target.classList.contains('visible')) {
        setTimeout(() => {
          entry.target.classList.add('visible');
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
        }, index * 100); // Stagger animation
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });

  skillCards.forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = 'all 0.6s ease-out';
    cardObserver.observe(card);
  });
};

// Animate soft skill cards
const animateSoftSkills = () => {
  const softSkillCards = document.querySelectorAll('.soft-skill-card');

  const softSkillObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting && !entry.target.classList.contains('visible')) {
        setTimeout(() => {
          entry.target.classList.add('visible');
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
        }, index * 80);
      }
    });
  }, {
    threshold: 0.2
  });

  softSkillCards.forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'all 0.5s ease-out';
    softSkillObserver.observe(card);
  });
};

// Animate tool categories
const animateToolCategories = () => {
  const toolCategories = document.querySelectorAll('.tool-category');

  const toolObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting && !entry.target.classList.contains('visible')) {
        setTimeout(() => {
          entry.target.classList.add('visible');
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
        }, index * 100);
      }
    });
  }, {
    threshold: 0.2
  });

  toolCategories.forEach(category => {
    category.style.opacity = '0';
    category.style.transform = 'translateY(30px)';
    category.style.transition = 'all 0.6s ease-out';
    toolObserver.observe(category);
  });
};

// Animate certification cards
const animateCertifications = () => {
  const certCards = document.querySelectorAll('.cert-card');

  const certObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting && !entry.target.classList.contains('visible')) {
        setTimeout(() => {
          entry.target.classList.add('visible');
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'scale(1)';
        }, index * 100);
      }
    });
  }, {
    threshold: 0.2
  });

  certCards.forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'scale(0.9)';
    card.style.transition = 'all 0.5s ease-out';
    certObserver.observe(card);
  });
};

// Add hover effect to skill tags
const addTagInteractions = () => {
  const tags = document.querySelectorAll('.tag');
  
  tags.forEach(tag => {
    tag.addEventListener('mouseenter', function() {
      this.style.transform = 'translateY(-3px) scale(1.05)';
    });
    
    tag.addEventListener('mouseleave', function() {
      this.style.transform = 'translateY(0) scale(1)';
    });
  });
};

// Initialize all animations when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  animateProgressBars();
  animateSkillCards();
  animateSoftSkills();
  animateToolCategories();
  animateCertifications();
  addTagInteractions();
});

// Optional: Add keyboard navigation for accessibility
document.addEventListener('keydown', (e) => {
  if (e.key === 'Tab') {
    document.body.classList.add('keyboard-nav');
  }
});

document.addEventListener('mousedown', () => {
  document.body.classList.remove('keyboard-nav');
});