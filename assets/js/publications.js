(() => {
  const page = document.querySelector('.publication-index');
  if (!page) return;

  const records = [...page.querySelectorAll('.publication-record')];
  const sections = [...page.querySelectorAll('.publication-section')];
  const search = page.querySelector('#publication-search');
  const sort = page.querySelector('#publication-sort');
  const clear = page.querySelector('#publication-clear');
  const summary = page.querySelector('#publication-results-summary');
  const submittedToggle = page.querySelector('[data-submitted-toggle]');
  const yearBox = page.querySelector('#publication-year-options');
  let submittedExpanded = false;

  const getAreas = (record) => (record.dataset.areas || '').split('|').filter(Boolean);
  const yearValues = [...new Set(records.map(r => r.dataset.year).filter(Boolean))]
    .sort((a,b) => Number(b) - Number(a));

  yearValues.forEach(year => {
    const label = document.createElement('label');
    label.innerHTML = `<input type="checkbox" value="${year}" data-filter="year"><span>${year}</span><b data-count-year="${year}">0</b>`;
    yearBox.appendChild(label);
  });

  const controls = () => [...page.querySelectorAll('input[data-filter]')];
  const checked = kind => controls().filter(i => i.dataset.filter === kind && i.checked).map(i => i.value);

  // Deep-link support from Research theme cards:
  // /publications/?area=spatiotemporal-forecasting
  function applyUrlFilters() {
    const params = new URLSearchParams(window.location.search);
    const requestedAreas = params.getAll('area')
      .flatMap(value => value.split(','))
      .map(value => value.trim())
      .filter(Boolean);

    if (!requestedAreas.length) return;

    controls()
      .filter(input => input.dataset.filter === 'area')
      .forEach(input => {
        input.checked = requestedAreas.includes(input.value);
      });
  }

  function updateStaticCounts() {
    page.querySelectorAll('[data-count-area]').forEach(el => {
      const area = el.dataset.countArea;
      el.textContent = records.filter(r => getAreas(r).includes(area)).length;
    });
    page.querySelectorAll('[data-count-type]').forEach(el => {
      el.textContent = records.filter(r => r.dataset.section === el.dataset.countType).length;
    });
    page.querySelectorAll('[data-count-year]').forEach(el => {
      el.textContent = records.filter(r => r.dataset.year === el.dataset.countYear).length;
    });
  }

  function isFiltering() {
    return Boolean((search?.value || '').trim()) || controls().some(i => i.checked);
  }

  function matches(record) {
    const q = (search?.value || '').trim().toLowerCase();
    const areas = checked('area');
    const types = checked('type');
    const years = checked('year');
    if (q && !(record.dataset.search || '').includes(q)) return false;
    if (areas.length && !areas.some(a => getAreas(record).includes(a))) return false;
    if (types.length && !types.includes(record.dataset.section)) return false;
    if (years.length && !years.includes(record.dataset.year)) return false;
    return true;
  }

  function compare(a,b) {
    const mode = sort?.value || 'newest';
    if (mode === 'title') return (a.dataset.title || '').localeCompare(b.dataset.title || '');
    const ay = Number(a.dataset.year || 0), by = Number(b.dataset.year || 0);
    const ap = Number(a.dataset.position || 999), bp = Number(b.dataset.position || 999);
    if (ay === by) return ap - bp;
    return mode === 'oldest' ? ay - by : by - ay;
  }

  function render() {
    const filtering = isFiltering();
    let visible = 0;

    sections.forEach(section => {
      const list = section.querySelector('.publication-records');
      const items = [...list.querySelectorAll('.publication-record')].sort(compare);
      items.forEach(item => list.appendChild(item));

      let sectionVisible = 0;
      items.forEach((record, index) => {
        let show = matches(record);
        if (record.dataset.section === 'submitted' && !filtering && !submittedExpanded) {
          show = show && Number(record.dataset.position || index + 1) <= 3;
        }
        record.hidden = !show;
        if (show) { visible += 1; sectionVisible += 1; }
      });
      section.hidden = sectionVisible === 0;
    });

    if (submittedToggle) {
      submittedToggle.hidden = filtering;
      submittedToggle.setAttribute('aria-expanded', String(submittedExpanded));
      const total = records.filter(r => r.dataset.section === 'submitted').length;
      const text = submittedExpanded ? 'Show only the first 3 submitted / preprint papers' : `View all ${total} submitted / preprint papers`;
      submittedToggle.querySelector('span:first-child').textContent = text;
      submittedToggle.querySelector('span:last-child').textContent = submittedExpanded ? '↑' : '→';
    }

    if (summary) {
      summary.textContent = filtering ? `${visible} publication${visible === 1 ? '' : 's'} match the current filters.` : '';
    }
  }

  controls().forEach(i => i.addEventListener('change', render));
  search?.addEventListener('input', render);
  sort?.addEventListener('change', render);
  submittedToggle?.addEventListener('click', () => { submittedExpanded = !submittedExpanded; render(); });
  clear?.addEventListener('click', () => {
    controls().forEach(i => { i.checked = false; });
    if (search) search.value = '';
    if (sort) sort.value = 'newest';
    submittedExpanded = false;
    render();
  });

  applyUrlFilters();
  updateStaticCounts();
  render();
})();
