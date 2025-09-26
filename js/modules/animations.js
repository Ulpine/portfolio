/**
 * Module d'animations
 * Gère les animations d'apparition au scroll
 */
const AnimationsModule = {
    // Configuration personnalisable
  config: {
    duration: 0.3,        // Durée de l'animation (en secondes)
    stagger: 0.05,        // Délai entre chaque élément (en secondes)
    portfolioDelay: 50,   // Délai pour les items portfolio (en ms)
    bubbleDelay: 75       // Délai pour les bulles de services (en ms)
  },
  init() {
    this.observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    this.createObserver();
    this.setupScrollAnimations();
    this.initCounterAnimations();
  },

  createObserver() {
    this.observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in');

          // Animation spéciale pour les éléments portfolio
          if (entry.target.classList.contains('portfolio-item')) {
            this.animatePortfolioItem(entry.target);
          }

          // Animation spéciale pour les bulles de services
          if (entry.target.classList.contains('service-bubble')) {
            this.animateServiceBubble(entry.target);
          }
        }
      });
    }, this.observerOptions);
  },

  setupScrollAnimations() {
    // Ajouter les classes d'animation aux éléments
    const animatedElements = document.querySelectorAll(`
      .hero-text,
      .hero-visual,
      .section-header,
      .service-bubble,
      .portfolio-item,
      .faq-item,
      .contact-item,
      .contact-form
    `);

    animatedElements.forEach((element, index) => {
      element.style.opacity = '0';
      element.style.transform = 'translateY(30px)';
      element.style.transition = 'all 0.3s ease-out'; // ← Réduit de 0.6s à 0.3s
      element.style.transitionDelay = `${index * 0.05}s`; // ← Réduit de 0.1s à 0.05s

      this.observer.observe(element);
    });

    // Style pour l'animation d'entrée
    const style = document.createElement('style');
    style.textContent = `
      .animate-in {
        opacity: 1 !important;
        transform: translateY(0) !important;
      }
    `;
    document.head.appendChild(style);
  },

  animatePortfolioItem(item) {
    const delay = Array.from(item.parentNode.children).indexOf(item) * 50; // ← Réduit de 100ms à 50ms

    setTimeout(() => {
      item.style.transform = 'translateY(0) scale(1)';
      item.style.opacity = '1';
    }, delay);
  },

  animateServiceBubble(bubble) {
    const delay = Array.from(bubble.parentNode.children).indexOf(bubble) * 75; // ← Réduit de 150ms à 75ms

    setTimeout(() => {
      bubble.style.transform = 'translateY(0) scale(1)';
      bubble.style.opacity = '1';

      // Animation de pulsation pour la bulle centrale
      if (bubble.classList.contains('central-bubble')) {
        bubble.style.animation = 'pulse 2s ease-in-out infinite';
      }
    }, delay);
  },

  initCounterAnimations() {
    // Animation des compteurs (si vous en ajoutez)
    const counters = document.querySelectorAll('[data-counter]');

    counters.forEach(counter => {
      this.observer.observe(counter);
      counter.addEventListener('animateIn', () => {
        this.animateCounter(counter);
      });
    });
  },

  animateCounter(counter) {
    const target = parseInt(counter.getAttribute('data-counter'));
    const duration = 2000;
    const startTime = Date.now();

    const updateCounter = () => {
      const currentTime = Date.now();
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      const currentValue = Math.floor(progress * target);
      counter.textContent = currentValue;

      if (progress < 1) {
        requestAnimationFrame(updateCounter);
      }
    };

    requestAnimationFrame(updateCounter);
  }
};

// Export pour utilisation dans d'autres fichiers
if (typeof module !== 'undefined' && module.exports) {
  module.exports = AnimationsModule;
}
