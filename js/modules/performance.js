/**
 * Module de gestion des performances
 * Optimise les performances et le chargement
 */
const PerformanceModule = {
  init() {
    this.lazyLoadImages();
    this.optimizeAnimations();
    this.handlePreloading();
  },

  lazyLoadImages() {
    const images = document.querySelectorAll('img[data-src]');

    const imageObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src;
          img.classList.remove('lazy');
          imageObserver.unobserve(img);
        }
      });
    });

    images.forEach(img => {
      imageObserver.observe(img);
    });
  },

  optimizeAnimations() {
    // Réduire les animations si l'utilisateur préfère moins de mouvement
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      document.documentElement.style.setProperty('--transition-fast', '0s');
      document.documentElement.style.setProperty('--transition-normal', '0s');
      document.documentElement.style.setProperty('--transition-slow', '0s');
    }
  },

  handlePreloading() {
    // Précharger les images importantes
    const criticalImages = [
      // Ajoutez ici les URLs des images critiques
    ];

    criticalImages.forEach(src => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'image';
      link.href = src;
      document.head.appendChild(link);
    });
  }
};
