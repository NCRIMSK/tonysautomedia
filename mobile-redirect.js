(function() {
  const isMobile = /Mobi|Android|iPhone|iPad|iPod|Opera Mini|IEMobile|BlackBerry/i.test(navigator.userAgent) ||
                   window.matchMedia('(max-width: 768px)').matches;
  if (!isMobile) return;
  const path = window.location.pathname;
  if (path.includes('_mobile')) return;
  const mobilePath = path.replace(/(\.html?|\.htm)$/i, '_mobile$1');
  fetch(mobilePath, { method: 'HEAD' }).then(function(resp) {
    if (resp.ok) {
      window.location.replace(mobilePath);
    }
  }).catch(function() {});
})();
