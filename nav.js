document.addEventListener('DOMContentLoaded', () => {
  const mainNav = document.querySelector('.main-nav');
  const navToggle = document.querySelector('.nav-toggle');
  const navMenu = document.querySelector('.nav-menu');
  const dropdowns = Array.from(document.querySelectorAll('.nav-dropdown'));

  const language = document.documentElement.lang || 'en';
  const voiceLinkLabels = {
    he: 'ניקוי קול',
    ru: 'Очистка голоса',
  };
  const voiceLinkText = voiceLinkLabels[language] || 'Voice Clean Up';
  const isVoiceCleanupPage = /voicecleanupoffer\.html$/i.test(
    window.location.pathname,
  );

  const offerMenus = document.querySelectorAll('.dropdown-content');
  offerMenus.forEach(menu => {
    let voiceLink = menu.querySelector('[data-offer="voice-cleanup"]');
    if (!voiceLink) {
      voiceLink = document.createElement('a');
      voiceLink.href = 'voicecleanupoffer.html';
      voiceLink.dataset.offer = 'voice-cleanup';
      voiceLink.textContent = voiceLinkText;
      menu.appendChild(voiceLink);
    } else if (!voiceLink.textContent.trim()) {
      voiceLink.textContent = voiceLinkText;
    }

    if (isVoiceCleanupPage && !voiceLink.hasAttribute('aria-current')) {
      voiceLink.setAttribute('aria-current', 'page');
    }
  });

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

  if (navToggle && mainNav) {
    navToggle.addEventListener('click', () => {
      const isOpen = mainNav.classList.toggle('nav-open');
      navToggle.setAttribute('aria-expanded', String(isOpen));
      if (!isOpen) {
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
      mainNav.classList.remove('nav-open');
      navToggle.setAttribute('aria-expanded', 'false');
      closeAllDropdowns();
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
        mainNav.classList.remove('nav-open');
        navToggle.setAttribute('aria-expanded', 'false');
        closeAllDropdowns();
      }
    });
  }
});
