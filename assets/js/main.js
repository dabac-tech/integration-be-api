// ==========================================================================
// MAIN JAVASCRIPT
// ==========================================================================

class MobileMenu {
  constructor() {
    this.navToggle = document.getElementById("nav-toggle");
    this.navWrapper = document.getElementById("nav-wrapper");
    this.navLinks = document.querySelectorAll(".nav__link");
    this.buttons = document.querySelectorAll(".btn");
    this.body = document.body;

    this.init();
  }

  init() {
    // Event listeners
    this.navToggle.addEventListener("click", () => this.toggleMenu());

    // Fermer le menu en cliquant sur un lien
    this.navLinks.forEach((link) => {
      link.addEventListener("click", () => this.closeMenu());
    });

    // Fermer le menu en cliquant sur les boutons
    this.buttons.forEach((button) => {
      button.addEventListener("click", () => this.closeMenu());
    });

    // Fermer le menu avec la touche Escape
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && this.isMenuOpen()) {
        this.closeMenu();
      }
    });

    // Gérer le resize de la fenêtre
    window.addEventListener("resize", () => this.handleResize());
  }

  toggleMenu() {
    if (this.isMenuOpen()) {
      this.closeMenu();
    } else {
      this.openMenu();
    }
  }

  openMenu() {
    this.navWrapper.classList.add("nav__wrapper--active");
    this.navToggle.classList.add("nav__toggle--active");
    this.navToggle.setAttribute("aria-expanded", "true");

    // Empêcher le scroll du body
    this.body.style.overflow = "hidden";
  }

  closeMenu() {
    this.navWrapper.classList.remove("nav__wrapper--active");
    this.navToggle.classList.remove("nav__toggle--active");
    this.navToggle.setAttribute("aria-expanded", "false");

    // Réactiver le scroll du body
    this.body.style.overflow = "";
  }

  isMenuOpen() {
    return this.navWrapper.classList.contains("nav__wrapper--active");
  }

  handleResize() {
    // Fermer le menu si on passe en desktop
    if (window.innerWidth > 768 && this.isMenuOpen()) {
      this.closeMenu();
    }
  }
}

// Animation des cartes au scroll
class FeatureCardsAnimator {
  constructor() {
      this.cards = document.querySelectorAll('.feature__cards .card');
      this.init();
  }
  
  init() {
      const observerOptions = {
          threshold: 0.3,
          // rootMargin: '0px 0px -30px 0px'
      };
      
      const observer = new IntersectionObserver((entries) => {
          entries.forEach(entry => {
              if (entry.isIntersecting) {
                  entry.target.classList.add('animate-in');
                  // Arrêter d'observer une fois animé
                  observer.unobserve(entry.target);
              }
          });
      }, observerOptions);
      
      // Observer chaque carte
      this.cards.forEach(card => {
          observer.observe(card);
      });
  }
}

// Initialiser le menu mobile quand le DOM est chargé
document.addEventListener("DOMContentLoaded", () => {
  new MobileMenu();
  new FeatureCardsAnimator();

  const sliderElement = document.querySelector(".slider-items");

  if (sliderElement) {
    const marketingSlider = new Swiper(".slider-items", {
      // Configuration de base
      slidesPerView: 1,
      spaceBetween: 20,
      slidesPerGroup: 1,

      // Responsive
      breakpoints: {
        640: {
          slidesPerView: 1,
          spaceBetween: 12,
          slidesPerGroup: 1,
        },
        768: {
          slidesPerView: 2,
          spaceBetween: 22,
          slidesPerGroup: 2,
        },
        1024: {
          slidesPerView: 3,
          spaceBetween: 32,
          slidesPerGroup: 3,
        },
      },

      // Pagination
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
      },

      // Options
      loop: true,
    //   autoplay: {
    //     delay: 5000,
    //     disableOnInteraction: false,
    //   },

      speed: 600,

      // Debug
      on: {
        init: function () {
          console.log("Swiper initialisé avec succès");
        },
      },
    });
  } else {
    console.error("Slider element not found");
  }
});
