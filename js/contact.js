// ===== CONTACT PAGE FUNCTIONALITY =====

// Form validation
const validateForm = () => {
  const form = document.getElementById('contactForm');
  const name = document.getElementById('name');
  const email = document.getElementById('email');
  const subject = document.getElementById('subject');
  const message = document.getElementById('message');

  let isValid = true;

  // Validate name
  if (name.value.trim().length < 2) {
    showError('name', 'Name must be at least 2 characters');
    isValid = false;
  } else {
    showSuccess('name');
  }

  // Validate email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email.value.trim())) {
    showError('email', 'Please enter a valid email address');
    isValid = false;
  } else {
    showSuccess('email');
  }

  // Validate subject
  if (subject.value.trim().length < 3) {
    showError('subject', 'Subject must be at least 3 characters');
    isValid = false;
  } else {
    showSuccess('subject');
  }

  // Validate message
  if (message.value.trim().length < 10) {
    showError('message', 'Message must be at least 10 characters');
    isValid = false;
  } else {
    showSuccess('message');
  }

  return isValid;
};

// Show error message
const showError = (fieldId, message) => {
  const field = document.getElementById(fieldId);
  const formGroup = field.closest('.form-group');
  const errorElement = document.getElementById(fieldId + 'Error');

  formGroup.classList.add('error');
  formGroup.classList.remove('success');
  errorElement.textContent = message;
};

// Show success state
const showSuccess = (fieldId) => {
  const field = document.getElementById(fieldId);
  const formGroup = field.closest('.form-group');
  const errorElement = document.getElementById(fieldId + 'Error');

  formGroup.classList.add('success');
  formGroup.classList.remove('error');
  errorElement.textContent = '';
};

// Real-time validation
const initializeRealTimeValidation = () => {
  const inputs = document.querySelectorAll('.contact-form input, .contact-form textarea');

  inputs.forEach(input => {
    input.addEventListener('blur', () => {
      validateField(input);
    });

    input.addEventListener('input', () => {
      if (input.closest('.form-group').classList.contains('error')) {
        validateField(input);
      }
    });
  });
};

// Validate individual field
const validateField = (field) => {
  const fieldId = field.id;
  const value = field.value.trim();

  switch(fieldId) {
    case 'name':
      if (value.length < 2) {
        showError(fieldId, 'Name must be at least 2 characters');
      } else {
        showSuccess(fieldId);
      }
      break;
    case 'email':
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) {
        showError(fieldId, 'Please enter a valid email address');
      } else {
        showSuccess(fieldId);
      }
      break;
    case 'subject':
      if (value.length < 3) {
        showError(fieldId, 'Subject must be at least 3 characters');
      } else {
        showSuccess(fieldId);
      }
      break;
    case 'message':
      if (value.length < 10) {
        showError(fieldId, 'Message must be at least 10 characters');
      } else {
        showSuccess(fieldId);
      }
      break;
  }
};

// Form submission
const initializeFormSubmission = () => {
  const form = document.getElementById('contactForm');
  const submitBtn = document.getElementById('submitBtn');
  const formStatus = document.getElementById('formStatus');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Validate form
    if (!validateForm()) {
      formStatus.className = 'form-status error';
      formStatus.textContent = '⚠️ Please fix the errors above';
      return;
    }

    // Show loading state
    submitBtn.disabled = true;
    submitBtn.classList.add('loading');
    submitBtn.querySelector('.btn-text').textContent = 'Sending';
    formStatus.style.display = 'none';

    try {
      // Submit form using Fetch API
      const formData = new FormData(form);
      const response = await fetch(form.action, {
        method: 'POST',
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      });

      if (response.ok) {
        // Success
        formStatus.className = 'form-status success';
        formStatus.textContent = '✓ Message sent successfully! I\'ll get back to you soon.';
        form.reset();
        
        // Remove success classes from form groups
        document.querySelectorAll('.form-group').forEach(group => {
          group.classList.remove('success', 'error');
        });
      } else {
        throw new Error('Form submission failed');
      }
    } catch (error) {
      // Error
      formStatus.className = 'form-status error';
      formStatus.textContent = '✗ Oops! Something went wrong. Please try again.';
    } finally {
      // Reset button state
      submitBtn.disabled = false;
      submitBtn.classList.remove('loading');
      submitBtn.querySelector('.btn-text').textContent = 'Send Message';
    }
  });
};

// Animate info cards on scroll
const animateInfoCards = () => {
  const infoCards = document.querySelectorAll('.info-card');

  const cardObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting && !entry.target.classList.contains('visible')) {
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, index * 150);
      }
    });
  }, {
    threshold: 0.2
  });

  infoCards.forEach(card => {
    cardObserver.observe(card);
  });
};

// Animate form container
const animateFormContainer = () => {
  const formContainer = document.querySelector('.form-container');

  const formObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, {
    threshold: 0.1
  });

  if (formContainer) {
    formObserver.observe(formContainer);
  }
};

// Auto-resize textarea
const initializeTextareaResize = () => {
  const textarea = document.getElementById('message');
  
  if (textarea) {
    textarea.addEventListener('input', function() {
      this.style.height = 'auto';
      this.style.height = (this.scrollHeight) + 'px';
    });
  }
};

// Character counter for message (optional)
const addCharacterCounter = () => {
  const message = document.getElementById('message');
  const formGroup = message.closest('.form-group');
  
  const counter = document.createElement('div');
  counter.className = 'char-counter';
  counter.style.cssText = 'text-align: right; color: #6b7280; font-size: 0.85rem; margin-top: 0.5rem;';
  formGroup.appendChild(counter);

  message.addEventListener('input', () => {
    const length = message.value.length;
    counter.textContent = `${length} characters`;
    
    if (length >= 500) {
      counter.style.color = '#f59e0b';
    } else {
      counter.style.color = '#6b7280';
    }
  });
};

// Initialize all functionality
document.addEventListener('DOMContentLoaded', () => {
  initializeRealTimeValidation();
  initializeFormSubmission();
  animateInfoCards();
  animateFormContainer();
  initializeTextareaResize();
  addCharacterCounter();
});

// Prevent form submission on Enter key (except in textarea)
document.addEventListener('keydown', (e) => {
  if (e.key === 'Enter' && e.target.tagName !== 'TEXTAREA') {
    const form = document.getElementById('contactForm');
    if (document.activeElement && form.contains(document.activeElement)) {
      e.preventDefault();
    }
  }
});