/**
 * Module principal
 * Initialise tous les modules et gère l'état global
 */
const AppModule = {
  init() {
    // Attendre que le DOM soit chargé
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => this.initializeModules());
    } else {
      this.initializeModules();
    }
  },

  initializeModules() {
    try {
      // Initialiser tous les modules
      NavigationModule.init();
      FAQModule.init();
      ContactFormModule.init();
      AnimationsModule.init();
      PerformanceModule.init();

      // Ajouter des écouteurs d'événements globaux
      this.addGlobalEventListeners();

      console.log('✅ Tous les modules ont été initialisés avec succès');
    } catch (error) {
      console.error('❌ Erreur lors de l\'initialisation:', error);
    }
  },

  addGlobalEventListeners() {
    // Gestion du redimensionnement de la fenêtre
    window.addEventListener('resize', UtilsModule.debounce(() => {
      this.handleWindowResize();
    }, 250));

    // Gestion des erreurs d'images
    document.addEventListener('error', (e) => {
      if (e.target.tagName === 'IMG') {
        console.warn('Erreur de chargement d\'image:', e.target.src);
        // Optionnel: remplacer par une image par défaut
        // e.target.src = '/path/to/fallback-image.jpg';
      }
    }, true);
  },

  handleWindowResize() {
    // Réajuster les animations si nécessaire
    console.log('Fenêtre redimensionnée');
  }
};



// ===== INITIALISATION DE L'APPLICATION =====
AppModule.init();
