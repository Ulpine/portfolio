/**
 * Module de navigation
 * Gère le comportement de la navbar et le menu mobile
 */
const NavigationModule = {
  init() {
    this.navbar = document.querySelector('.navbar');
    this.hamburger = document.querySelector('.hamburger');
    this.navMenu = document.querySelector('.nav-menu');
    this.navLinks = document.querySelectorAll('.nav-link');

    this.bindEvents();
    this.handleScroll();
  },

  bindEvents() {
    // Gestion du scroll pour la navbar
    window.addEventListener('scroll', () => this.handleScroll());

    // Gestion du menu hamburger
    if (this.hamburger) {
      this.hamburger.addEventListener('click', () => this.toggleMobileMenu());
    }

    // Fermeture du menu mobile lors du clic sur un lien
    this.navLinks.forEach(link => {
      link.addEventListener('click', () => this.closeMobileMenu());
    });

    // Smooth scroll pour les liens de navigation
    this.navLinks.forEach(link => {
      link.addEventListener('click', (e) => this.handleSmoothScroll(e));
    });
  },

  handleScroll() {
    const scrollY = window.scrollY;

    if (scrollY > 50) {
      this.navbar.style.background = 'rgba(255, 255, 255, 0.98)';
      this.navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    } else {
      this.navbar.style.background = 'rgba(255, 255, 255, 0.95)';
      this.navbar.style.boxShadow = 'none';
    }
  },

  toggleMobileMenu() {
    this.navMenu.classList.toggle('active');
    this.hamburger.classList.toggle('active');
  },

  closeMobileMenu() {
    this.navMenu.classList.remove('active');
    this.hamburger.classList.remove('active');
  },

  handleSmoothScroll(e) {
    const href = e.target.getAttribute('href');

    if (href && href.startsWith('#')) {
      e.preventDefault();
      const targetId = href.substring(1);
      const targetElement = document.getElementById(targetId);

      if (targetElement) {
        const offsetTop = targetElement.offsetTop - 80; // Ajustement pour la navbar fixe

        window.scrollTo({
          top: offsetTop,
          behavior: 'smooth'
        });
      }
    }
  }
};
