document.addEventListener('DOMContentLoaded', () => {
  const mainNav = document.querySelector('.main-nav');
  const navToggle = document.querySelector('.nav-toggle');
  const navMenu = document.querySelector('.nav-menu');
  const dropdowns = Array.from(document.querySelectorAll('.nav-dropdown'));

  const setNavExpanded = isOpen => {
    if (!mainNav || !navToggle) {
      return;
    }

    mainNav.classList.toggle('nav-open', isOpen);
    navToggle.setAttribute('aria-expanded', String(isOpen));

    if (navMenu) {
      navMenu.toggleAttribute('data-nav-open', isOpen);
    }
  };

  const closeDropdown = dropdown => {
    dropdown.classList.remove('open');
    const trigger = dropdown.querySelector('.nav-btn');
    if (trigger) {
      trigger.setAttribute('aria-expanded', 'false');
    }
  };

  const closeAllDropdowns = () => {
    dropdowns.forEach(closeDropdown);
  };

  const closeNav = () => {
    setNavExpanded(false);
    closeAllDropdowns();
  };

  if (navToggle && mainNav) {
    navToggle.addEventListener('click', () => {
      const willOpen = !mainNav.classList.contains('nav-open');
      setNavExpanded(willOpen);

      if (!willOpen) {
        closeAllDropdowns();
      }
    });
  }

  dropdowns.forEach(dropdown => {
    const trigger = dropdown.querySelector('.nav-btn');
    if (!trigger) {
      return;
    }

    trigger.setAttribute('aria-expanded', 'false');
    trigger.addEventListener('click', event => {
      event.preventDefault();
      const willOpen = !dropdown.classList.contains('open');

      closeAllDropdowns();

      dropdown.classList.toggle('open', willOpen);
      trigger.setAttribute('aria-expanded', String(willOpen));
    });
  });

  document.addEventListener('click', event => {
    dropdowns.forEach(dropdown => {
      if (!dropdown.contains(event.target)) {
        closeDropdown(dropdown);
      }
    });

    if (
      mainNav &&
      navToggle &&
      mainNav.classList.contains('nav-open') &&
      !mainNav.contains(event.target)
    ) {
      closeNav();
    }
  });

  document.addEventListener('keydown', event => {
    if (event.key === 'Escape') {
      closeNav();
    }
  });

  if (navMenu && navToggle && mainNav) {
    navMenu.addEventListener('click', event => {
      const link = event.target.closest('a');
      if (!link) {
        return;
      }

      if (link.closest('.nav-dropdown') && !link.closest('.dropdown-content')) {
        return;
      }

      if (mainNav.classList.contains('nav-open')) {
        closeNav();
      }
    });
  }
});
