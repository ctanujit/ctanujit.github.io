(() => {
  const phraseNode = document.getElementById('foreml-phrase');
  const dataNode = document.getElementById('foreml-phrases');
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  let phrases = [];
  try { phrases = JSON.parse(dataNode?.textContent || '[]'); } catch (_) {}

  if (phraseNode && phrases.length > 1 && !reduced) {
    let index = 0;
    let generation = 0;

    const typeTo = (text, done) => {
      const gen = ++generation;
      const erase = () => {
        if (gen !== generation) return;
        const current = phraseNode.textContent || '';
        if (!current.length) return type(0);
        phraseNode.textContent = current.slice(0, -1);
        window.setTimeout(erase, 20);
      };
      const type = (n) => {
        if (gen !== generation) return;
        phraseNode.textContent = text.slice(0, n);
        if (n >= text.length) return done?.();
        window.setTimeout(() => type(n + 1), 34);
      };
      erase();
    };

    const rotate = () => {
      index = (index + 1) % phrases.length;
      typeTo(phrases[index], () => window.setTimeout(rotate, 1700));
    };
    window.setTimeout(rotate, 1900);
  }

  if (!reduced && 'IntersectionObserver' in window) {
    const items = [...document.querySelectorAll('.reveal')];
    items.forEach(el => el.classList.add('is-waiting'));
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-in');
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.1 });
    items.forEach(el => observer.observe(el));
  }
})();
