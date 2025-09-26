// ===== AJOUT DE STYLES CSS DYNAMIQUES =====
const DynamicStyles = `
  /* Animation de pulsation pour la bulle centrale */
  @keyframes pulse {
    0%, 100% {
      transform: scale(1.1);
    }
    50% {
      transform: scale(1.15);
    }
  }

  /* Styles pour le menu mobile */
  @media (max-width: 768px) {
    .nav-menu {
      position: fixed;
      top: 70px;
      left: -100%;
      width: 100%;
      height: calc(100vh - 70px);
      background: rgba(255, 255, 255, 0.98);
      backdrop-filter: blur(10px);
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      gap: 2rem;
      transition: left 0.3s ease-in-out;
      z-index: 999;
    }

    .nav-menu.active {
      left: 0;
    }

    .hamburger.active span:nth-child(1) {
      transform: rotate(45deg) translate(5px, 5px);
    }

    .hamburger.active span:nth-child(2) {
      opacity: 0;
    }

    .hamburger.active span:nth-child(3) {
      transform: rotate(-45deg) translate(7px, -6px);
    }
  }

  /* Animation d'apparition fluide */
  .fade-in {
    animation: fadeInUp 0.6s ease-out forwards;
  }

  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(30px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

// Injecter les styles dynamiques
const styleSheet = document.createElement('style');
styleSheet.textContent = DynamicStyles;
document.head.appendChild(styleSheet);
