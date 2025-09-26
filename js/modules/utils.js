/**
 * Module utilitaire
 * Fonctions utilitaires diverses
 */
const UtilsModule = {
  // Fonction de debounce pour optimiser les événements
  debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  },

  // Fonction pour obtenir la position d'un élément
  getElementPosition(element) {
    const rect = element.getBoundingClientRect();
    return {
      top: rect.top + window.scrollY,
      left: rect.left + window.scrollX,
      width: rect.width,
      height: rect.height
    };
  },

  // Fonction pour vérifier si un élément est visible
  isElementVisible(element) {
    const rect = element.getBoundingClientRect();
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= window.innerHeight &&
      rect.right <= window.innerWidth
    );
  },

  // Fonction pour animer un élément vers une position
  animateToPosition(element, targetPosition, duration = 500) {
    const startPosition = this.getElementPosition(element);
    const startTime = Date.now();

    const animate = () => {
      const currentTime = Date.now();
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      const easeInOutCubic = t => t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
      const easedProgress = easeInOutCubic(progress);

      const currentTop = startPosition.top + (targetPosition.top - startPosition.top) * easedProgress;
      const currentLeft = startPosition.left + (targetPosition.left - startPosition.left) * easedProgress;

      element.style.transform = `translate(${currentLeft - startPosition.left}px, ${currentTop - startPosition.top}px)`;

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }
};
