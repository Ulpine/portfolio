        // Animation simple pour les badges de compétences
        document.querySelectorAll('.skill-tag').forEach(tag => {
          tag.addEventListener('mouseover', () => {
              tag.style.transform = 'scale(1.1)';
              tag.style.transition = 'transform 0.3s';
          });

          tag.addEventListener('mouseout', () => {
              tag.style.transform = 'scale(1)';
          });
      });
