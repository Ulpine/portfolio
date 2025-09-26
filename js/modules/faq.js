/**
 * Module FAQ
 * Gère l'ouverture/fermeture des questions FAQ
 */
const FAQModule = {
  init() {
    this.faqItems = document.querySelectorAll('.faq-item');
    this.bindEvents();
  },

  bindEvents() {
    this.faqItems.forEach(item => {
      const question = item.querySelector('.faq-question');
      if (question) {
        question.addEventListener('click', () => this.toggleFAQ(item));
      }
    });
  },

  toggleFAQ(item) {
    const isActive = item.classList.contains('active');

    // Fermer tous les autres éléments FAQ
    this.faqItems.forEach(faqItem => {
      faqItem.classList.remove('active');
    });

    // Ouvrir/fermer l'élément cliqué
    if (!isActive) {
      item.classList.add('active');
    }
  }
};
