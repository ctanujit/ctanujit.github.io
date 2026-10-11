(() => {
  const galleries = document.querySelectorAll('[data-media-gallery]');

  galleries.forEach((gallery) => {
    const button = gallery.querySelector('.personal-toggle');
    const extra = gallery.querySelector('.personal-extra');
    if (!button || !extra) return;

    button.addEventListener('click', () => {
      const expanded = button.getAttribute('aria-expanded') === 'true';
      button.setAttribute('aria-expanded', String(!expanded));
      extra.hidden = expanded;

      const label = button.querySelector('.toggle-label');
      if (label) label.textContent = expanded ? 'View all' : 'Show less';
    });
  });
})();
