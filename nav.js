document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.nav-dropdown .nav-btn').forEach(btn => {
    btn.addEventListener('click', e => {
      e.preventDefault();
      const dropdown = btn.parentElement;
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
