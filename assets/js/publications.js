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

  /* Histogram container */
  const historyChart = page.querySelector('#publication-history-chart');

  let submittedExpanded = false;


  const getAreas = (record) =>
    (record.dataset.areas || '')
      .split('|')
      .filter(Boolean);


  /* =========================================================
     Year filter
     ========================================================= */

  const yearValues = [
    ...new Set(
      records
        .map(record => record.dataset.year)
        .filter(Boolean)
    )
  ].sort((a, b) => Number(b) - Number(a));


  if (yearBox) {
    yearValues.forEach(year => {
      const label = document.createElement('label');

      label.innerHTML = `
        <input
          type="checkbox"
          value="${year}"
          data-filter="year"
        >
        <span>${year}</span>
        <b data-count-year="${year}">0</b>
      `;

      yearBox.appendChild(label);
    });
  }


  const controls = () =>
    [...page.querySelectorAll('input[data-filter]')];


  const checked = kind =>
    controls()
      .filter(
        input =>
          input.dataset.filter === kind &&
          input.checked
      )
      .map(input => input.value);


  /* =========================================================
     Publication history histogram
     ========================================================= */

  function buildPublicationHistory() {
    if (!historyChart) return;

    const yearCounts = {};

    records.forEach(record => {
      const year = record.dataset.year;

      /* Ignore submitted papers without a publication year */
      if (!year) return;

      yearCounts[year] =
        (yearCounts[year] || 0) + 1;
    });


    const years = Object.keys(yearCounts)
      .sort((a, b) => Number(a) - Number(b));


    if (!years.length) return;


    const maxCount = Math.max(
      ...years.map(year => yearCounts[year])
    );


    historyChart.innerHTML = '';


    years.forEach((year, index) => {

      const wrap = document.createElement('div');
      wrap.className =
        'publication-history-bar-wrap';


      const bar = document.createElement('button');

      bar.type = 'button';
      bar.className =
        'publication-history-bar';

      bar.dataset.historyYear = year;


      /*
       * Scale each bar relative to the year
       * with the largest number of publications.
       */
      const height = Math.max(
        8,
        (yearCounts[year] / maxCount) * 100
      );

      bar.style.height = `${height}%`;


      const count = yearCounts[year];

      bar.setAttribute(
        'aria-label',
        `${year}: ${count} publication${count === 1 ? '' : 's'}`
      );

      bar.setAttribute(
        'aria-pressed',
        'false'
      );

      /*
       * Hover tooltip:
       * 2025 · 9 publications
       */
      bar.title =
        `${year} · ${count} publication${count === 1 ? '' : 's'}`;


      /* Year label below bar */
      const label =
        document.createElement('span');

      label.className =
        'publication-history-year';

      label.textContent = year;


      /*
       * Keep chart visually clean:
       * show alternating year labels,
       * while always showing first and last.
       */
      if (
        index !== 0 &&
        index !== years.length - 1 &&
        index % 2 !== 0
      ) {
        label.classList.add('is-hidden');
      }


      /*
       * Clicking a histogram bar activates
       * the existing Year filter.
       */
      bar.addEventListener('click', () => {

        const yearInput =
          page.querySelector(
            `input[data-filter="year"][value="${year}"]`
          );

        if (!yearInput) return;


        const alreadySelected =
          yearInput.checked;


        /*
         * Histogram acts as a single-year shortcut.
         * Clear other selected years first.
         */
        controls()
          .filter(
            input =>
              input.dataset.filter === 'year'
          )
          .forEach(input => {
            input.checked = false;
          });


        /*
         * Clicking an active bar again
         * removes the year filter.
         */
        yearInput.checked =
          !alreadySelected;


        render();
      });


      wrap.appendChild(bar);
      wrap.appendChild(label);

      historyChart.appendChild(wrap);
    });
  }


  /*
   * Synchronise the highlighted histogram bar
   * with the normal Year checkboxes.
   */
  function updateHistoryActiveState() {
    if (!historyChart) return;

    const selectedYears =
      checked('year');


    historyChart
      .querySelectorAll(
        '[data-history-year]'
      )
      .forEach(bar => {

        const active =
          selectedYears.includes(
            bar.dataset.historyYear
          );

        bar.classList.toggle(
          'is-active',
          active
        );

        bar.setAttribute(
          'aria-pressed',
          String(active)
        );
      });
  }


  /* =========================================================
     Deep-link support
     ========================================================= */

  function applyUrlFilters() {
    const params =
      new URLSearchParams(
        window.location.search
      );

    const requestedAreas =
      params
        .getAll('area')
        .flatMap(value =>
          value.split(',')
        )
        .map(value =>
          value.trim()
        )
        .filter(Boolean);


    if (!requestedAreas.length) return;


    controls()
      .filter(
        input =>
          input.dataset.filter === 'area'
      )
      .forEach(input => {
        input.checked =
          requestedAreas.includes(
            input.value
          );
      });
  }


  /* =========================================================
     Filter counts
     ========================================================= */

  function updateStaticCounts() {

    page
      .querySelectorAll(
        '[data-count-area]'
      )
      .forEach(el => {

        const area =
          el.dataset.countArea;

        el.textContent =
          records.filter(
            record =>
              getAreas(record)
                .includes(area)
          ).length;
      });


    page
      .querySelectorAll(
        '[data-count-type]'
      )
      .forEach(el => {

        el.textContent =
          records.filter(
            record =>
              record.dataset.section ===
              el.dataset.countType
          ).length;
      });


    page
      .querySelectorAll(
        '[data-count-year]'
      )
      .forEach(el => {

        el.textContent =
          records.filter(
            record =>
              record.dataset.year ===
              el.dataset.countYear
          ).length;
      });
  }


  function isFiltering() {
    return Boolean(
      (search?.value || '').trim()
    ) ||
    controls().some(
      input => input.checked
    );
  }


  /* =========================================================
     Publication matching
     ========================================================= */

  function matches(record) {

    const q =
      (search?.value || '')
        .trim()
        .toLowerCase();

    const areas =
      checked('area');

    const types =
      checked('type');

    const years =
      checked('year');


    if (
      q &&
      !(record.dataset.search || '')
        .includes(q)
    ) {
      return false;
    }


    if (
      areas.length &&
      !areas.some(
        area =>
          getAreas(record)
            .includes(area)
      )
    ) {
      return false;
    }


    if (
      types.length &&
      !types.includes(
        record.dataset.section
      )
    ) {
      return false;
    }


    if (
      years.length &&
      !years.includes(
        record.dataset.year
      )
    ) {
      return false;
    }


    return true;
  }


  /* =========================================================
     Sorting
     ========================================================= */

  function compare(a, b) {

    const mode =
      sort?.value || 'newest';


    if (mode === 'title') {
      return (
        a.dataset.title || ''
      ).localeCompare(
        b.dataset.title || ''
      );
    }


    const ay =
      Number(a.dataset.year || 0);

    const by =
      Number(b.dataset.year || 0);

    const ap =
      Number(
        a.dataset.position || 999
      );

    const bp =
      Number(
        b.dataset.position || 999
      );


    if (ay === by) {
      return ap - bp;
    }


    return mode === 'oldest'
      ? ay - by
      : by - ay;
  }


  /* =========================================================
     Main rendering
     ========================================================= */

  function render() {

    const filtering =
      isFiltering();

    let visible = 0;


    sections.forEach(section => {

      const list =
        section.querySelector(
          '.publication-records'
        );


      const items = [
        ...list.querySelectorAll(
          '.publication-record'
        )
      ].sort(compare);


      items.forEach(item =>
        list.appendChild(item)
      );


      let sectionVisible = 0;


      items.forEach(
        (record, index) => {

          let show =
            matches(record);


          if (
            record.dataset.section ===
              'submitted' &&
            !filtering &&
            !submittedExpanded
          ) {
            show =
              show &&
              Number(
                record.dataset.position ||
                index + 1
              ) <= 3;
          }


          record.hidden =
            !show;


          if (show) {
            visible += 1;
            sectionVisible += 1;
          }
        }
      );


      section.hidden =
        sectionVisible === 0;
    });


    if (submittedToggle) {

      submittedToggle.hidden =
        filtering;

      submittedToggle.setAttribute(
        'aria-expanded',
        String(submittedExpanded)
      );


      const total =
        records.filter(
          record =>
            record.dataset.section ===
            'submitted'
        ).length;


      const text =
        submittedExpanded
          ? 'Show only the first 3 submitted / preprint papers'
          : `View all ${total} submitted / preprint papers`;


      submittedToggle
        .querySelector(
          'span:first-child'
        ).textContent = text;


      submittedToggle
        .querySelector(
          'span:last-child'
        ).textContent =
          submittedExpanded
            ? '↑'
            : '→';
    }


    if (summary) {
      summary.textContent =
        filtering
          ? `${visible} publication${visible === 1 ? '' : 's'} match the current filters.`
          : '';
    }


    /* Keep histogram selection synchronized */
    updateHistoryActiveState();
  }


  /* =========================================================
     Events
     ========================================================= */

  controls().forEach(input =>
    input.addEventListener(
      'change',
      render
    )
  );


  search?.addEventListener(
    'input',
    render
  );


  sort?.addEventListener(
    'change',
    render
  );


  submittedToggle?.addEventListener(
    'click',
    () => {

      submittedExpanded =
        !submittedExpanded;

      render();
    }
  );


  clear?.addEventListener(
    'click',
    () => {

      controls().forEach(input => {
        input.checked = false;
      });


      if (search) {
        search.value = '';
      }


      if (sort) {
        sort.value = 'newest';
      }


      submittedExpanded = false;

      render();
    }
  );


  /* =========================================================
     Initialisation
     ========================================================= */

  applyUrlFilters();

  updateStaticCounts();

  /* Creates histogram automatically */
  buildPublicationHistory();

  render();

})();
