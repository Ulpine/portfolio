/**
 * Module de formulaire de contact
 * Gère la validation et l'envoi du formulaire
 */
const ContactFormModule = {
  init() {
    this.form = document.getElementById('contactForm');
    this.bindEvents();
  },

  bindEvents() {
    if (this.form) {
      this.form.addEventListener('submit', (e) => this.handleSubmit(e));

      // Validation en temps réel
      const inputs = this.form.querySelectorAll('input, textarea, select');
      inputs.forEach(input => {
        input.addEventListener('blur', () => this.validateField(input));
        input.addEventListener('input', () => this.clearFieldError(input));
      });
    }
  },

  handleSubmit(e) {
    e.preventDefault();

    if (this.validateForm()) {
      this.submitForm();
    }
  },

  validateForm() {
    const requiredFields = this.form.querySelectorAll('[required]');
    let isValid = true;

    requiredFields.forEach(field => {
      if (!this.validateField(field)) {
        isValid = false;
      }
    });

    return isValid;
  },

  validateField(field) {
    const value = field.value.trim();
    const fieldType = field.type;
    let isValid = true;
    let errorMessage = '';

    // Validation des champs requis
    if (field.hasAttribute('required') && !value) {
      isValid = false;
      errorMessage = 'Ce champ est requis';
    }

    // Validation email
    if (fieldType === 'email' && value) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) {
        isValid = false;
        errorMessage = 'Veuillez entrer une adresse email valide';
      }
    }

    // Validation téléphone
    if (fieldType === 'tel' && value) {
      const phoneRegex = /^[+]?[0-9\s\-\(\)]{10,}$/;
      if (!phoneRegex.test(value)) {
        isValid = false;
        errorMessage = 'Veuillez entrer un numéro de téléphone valide';
      }
    }

    if (!isValid) {
      this.showFieldError(field, errorMessage);
    } else {
      this.clearFieldError(field);
    }

    return isValid;
  },

  showFieldError(field, message) {
    this.clearFieldError(field);

    const errorDiv = document.createElement('div');
    errorDiv.className = 'field-error';
    errorDiv.textContent = message;
    errorDiv.style.color = '#ef4444';
    errorDiv.style.fontSize = '0.875rem';
    errorDiv.style.marginTop = '0.25rem';

    field.style.borderColor = '#ef4444';
    field.parentNode.appendChild(errorDiv);
  },

  clearFieldError(field) {
    const existingError = field.parentNode.querySelector('.field-error');
    if (existingError) {
      existingError.remove();
    }
    field.style.borderColor = '#e2e8f0';
  },

  async submitForm() {
    const formData = new FormData(this.form);
    const submitButton = this.form.querySelector('button[type="submit"]');
    const originalButtonText = submitButton.innerHTML;

    // Animation du bouton de soumission
    submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Envoi en cours...';
    submitButton.disabled = true;

    try {
      // Simuler l'envoi du formulaire (remplacez par votre endpoint)
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Afficher le message de succès
      this.showSuccessMessage();
      this.form.reset();

    } catch (error) {
      console.error('Erreur lors de l\'envoi:', error);
      this.showErrorMessage();
    } finally {
      // Restaurer le bouton
      submitButton.innerHTML = originalButtonText;
      submitButton.disabled = false;
    }
  },

  showSuccessMessage() {
    const message = document.createElement('div');
    message.className = 'form-message success-message';
    message.innerHTML = `
      <div style="
        background: #10b981;
        color: white;
        padding: 1rem;
        border-radius: 0.5rem;
        margin-bottom: 1rem;
        display: flex;
        align-items: center;
        gap: 0.5rem;
      ">
        <i class="fas fa-check-circle"></i>
        <span>Votre message a été envoyé avec succès ! Je vous répondrai dans les plus brefs délais.</span>
      </div>
    `;

    this.form.parentNode.insertBefore(message, this.form);

    // Supprimer le message après 5 secondes
    setTimeout(() => {
      message.remove();
    }, 5000);
  },

  showErrorMessage() {
    const message = document.createElement('div');
    message.className = 'form-message error-message';
    message.innerHTML = `
      <div style="
        background: #ef4444;
        color: white;
        padding: 1rem;
        border-radius: 0.5rem;
        margin-bottom: 1rem;
        display: flex;
        align-items: center;
        gap: 0.5rem;
      ">
        <i class="fas fa-exclamation-triangle"></i>
        <span>Une erreur est survenue lors de l'envoi. Veuillez réessayer ou me contacter directement.</span>
      </div>
    `;

    this.form.parentNode.insertBefore(message, this.form);

    // Supprimer le message après 5 secondes
    setTimeout(() => {
      message.remove();
    }, 5000);
  }
};
