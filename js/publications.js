// ===== PUBLICATIONS PAGE FUNCTIONALITY =====

// Animate stat boxes on scroll
const animateStats = () => {
  const statBoxes = document.querySelectorAll('.stat-box');

  const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting && !entry.target.classList.contains('visible')) {
        setTimeout(() => {
          entry.target.classList.add('visible');
          
          // Animate the number
          const numberElement = entry.target.querySelector('.stat-number');
          if (numberElement) {
            animateNumber(numberElement);
          }
        }, index * 150);
      }
    });
  }, {
    threshold: 0.3
  });

  statBoxes.forEach(box => statsObserver.observe(box));
};

// Animate numbers counting up
const animateNumber = (element) => {
  const text = element.textContent;
  
  // Extract number and suffix (like "K+" or just number)
  const matches = text.match(/(\d+)([K\+]*)/);
  if (!matches) return;
  
  const targetNum = parseInt(matches[1]);
  const suffix = matches[2] || '';
  
  const duration = 1500;
  const steps = 60;
  const increment = targetNum / steps;
  let current = 0;
  let step = 0;

  const timer = setInterval(() => {
    current += increment;
    step++;
    element.textContent = Math.floor(current) + suffix;

    if (step >= steps) {
      element.textContent = targetNum + suffix;
      clearInterval(timer);
    }
  }, duration / steps);
};

// Filter publications by type
const initializeFilters = () => {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const pubCards = document.querySelectorAll('.pub-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Remove active class
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      // Filter cards
      pubCards.forEach((card, index) => {
        const type = card.getAttribute('data-type');
        
        if (filter === 'all' || type === filter) {
          setTimeout(() => {
            card.classList.remove('hidden');
            card.classList.add('visible');
          }, index * 100);
        } else {
          card.classList.add('hidden');
          card.classList.remove('visible');
        }
      });

      // Check if no results
      checkNoResults();
    });
  });
};

// Search functionality
const initializeSearch = () => {
  const searchInput = document.getElementById('searchPublications');
  const pubCards = document.querySelectorAll('.pub-card');

  if (!searchInput) return;

  searchInput.addEventListener('input', (e) => {
    const searchTerm = e.target.value.toLowerCase();

    pubCards.forEach(card => {
      const title = card.querySelector('h3').textContent.toLowerCase();
      const description = card.querySelector('p').textContent.toLowerCase();
      const tags = Array.from(card.querySelectorAll('.tag'))
        .map(tag => tag.textContent.toLowerCase())
        .join(' ');

      if (title.includes(searchTerm) || description.includes(searchTerm) || tags.includes(searchTerm)) {
        card.classList.remove('hidden');
        card.classList.add('visible');
      } else {
        card.classList.add('hidden');
        card.classList.remove('visible');
      }
    });

    // Check if no results
    checkNoResults();
  });
};

// Check if no results found
const checkNoResults = () => {
  const visibleCards = document.querySelectorAll('.pub-card.visible:not(.hidden)');
  const grid = document.querySelector('.publications-grid');
  let noResultsMsg = document.querySelector('.no-results-message');

  if (visibleCards.length === 0) {
    if (!noResultsMsg) {
      noResultsMsg = document.createElement('div');
      noResultsMsg.className = 'no-results-message';
      noResultsMsg.innerHTML = `
        <h3>🔍 Aucune publication trouvée</h3>
        <p>Essayez de modifier vos filtres de recherche</p>
      `;
      grid.appendChild(noResultsMsg);
    }
  } else {
    if (noResultsMsg) {
      noResultsMsg.remove();
    }
  }
};

// Animate publication cards
const animatePubCards = () => {
  const pubCards = document.querySelectorAll('.pub-card');

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

  pubCards.forEach(card => cardObserver.observe(card));
};

// Share functionality
const initializeShareButtons = () => {
  const shareBtn = document.querySelector('.share-btn');
  
  if (shareBtn) {
    shareBtn.addEventListener('click', async () => {
      const shareData = {
        title: document.querySelector('.featured-content h2').textContent,
        text: document.querySelector('.pub-abstract').textContent,
        url: window.location.href
      };

      try {
        if (navigator.share) {
          await navigator.share(shareData);
        } else {
          // Fallback: Copy to clipboard
          await navigator.clipboard.writeText(window.location.href);
          showNotification('Lien copié dans le presse-papier !');
        }
      } catch (err) {
        console.log('Error sharing:', err);
      }
    });
  }
};

// Show notification
const showNotification = (message) => {
  const notification = document.createElement('div');
  notification.style.cssText = `
    position: fixed;
    bottom: 2rem;
    right: 2rem;
    background: #10b981;
    color: white;
    padding: 1rem 2rem;
    border-radius: 12px;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
    z-index: 1000;
    animation: slideIn 0.3s ease-out;
  `;
  notification.textContent = message;
  document.body.appendChild(notification);

  setTimeout(() => {
    notification.style.animation = 'slideOut 0.3s ease-out';
    setTimeout(() => notification.remove(), 300);
  }, 3000);
};

// Quick view modal (placeholder)
const initializeQuickView = () => {
  const quickViewBtns = document.querySelectorAll('.quick-view-btn');
  
  quickViewBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const pubId = btn.getAttribute('data-pub');
      showNotification(`Aperçu rapide pour "${pubId}" - Fonctionnalité à venir !`);
    });
  });
};

// Download tracking
const trackDownloads = () => {
  const downloadLinks = document.querySelectorAll('.download-link, .action-btn.primary');
  
  downloadLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      const card = link.closest('.pub-card, .featured-publication');
      if (card) {
        const pubTitle = card.querySelector('h3, h2').textContent;
        console.log(`Téléchargement suivi: ${pubTitle}`);
        showNotification('Téléchargement démarré !');
        // Here you could send analytics data
      }
    });
  });
};

// Initialize all functionality
document.addEventListener('DOMContentLoaded', () => {
  animateStats();
  initializeFilters();
  initializeSearch();
  animatePubCards();
  initializeShareButtons();
  initializeQuickView();
  trackDownloads();
});

// Add CSS for notifications
const style = document.createElement('style');
style.textContent = `
  @keyframes slideIn {
    from {
      transform: translateX(100%);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }
  
  @keyframes slideOut {
    from {
      transform: translateX(0);
      opacity: 1;
    }
    to {
      transform: translateX(100%);
      opacity: 0;
    }
  }
`;
document.head.appendChild(style);