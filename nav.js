document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.nav-dropdown .nav-link').forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      const dropdown = link.parentElement;
      dropdown.classList.toggle('open');
    });
  });

  document.addEventListener('click', e => {
    document.querySelectorAll('.nav-dropdown').forEach(dd => {
      if (!dd.contains(e.target)) {
        dd.classList.remove('open');
      }
    });
  });
});
