(() => {
  const page = document.querySelector('.talks-page');
  if (!page) return;

  const buttons = [...page.querySelectorAll('[data-talk-filter]')];
  const items = [...page.querySelectorAll('[data-talk-type]')];
  const years = [...page.querySelectorAll('.talk-year')];
  const active = new Set(buttons.map(button => button.dataset.talkFilter));

  function render() {
    if (!active.size && buttons[0]) {
      active.add(buttons[0].dataset.talkFilter);
    }

    buttons.forEach(button => {
      const on = active.has(button.dataset.talkFilter);
      button.classList.toggle('is-active', on);
      button.setAttribute('aria-pressed', String(on));
    });

    items.forEach(item => {
      item.hidden = !active.has(item.dataset.talkType);
    });

    years.forEach(year => {
      const rows = [...year.querySelectorAll('.talk-row')];
      year.hidden = rows.length > 0 && !rows.some(row => !row.hidden);
    });
  }

  buttons.forEach(button => {
    button.addEventListener('click', () => {
      const type = button.dataset.talkFilter;

      if (active.has(type)) active.delete(type);
      else active.add(type);

      render();
    });
  });

  render();
})();
