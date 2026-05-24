import { renderChart } from '/assets/js/chart.js';

const chartEl = document.getElementById('chart');
const lang = chartEl.dataset.lang || 'en';
const labels = window.__AXIS_LABELS__ ?? {};
const STAT_DIMS = ['hp', 'attack', 'defense', 'spAttack', 'spDefense', 'speed'];

const detailEl = document.getElementById('mon-detail');
const statsEl = document.getElementById('mon-stats');
const typesEl = document.getElementById('mon-types');
const hintEl = document.getElementById('mon-hint');
const filtersEl = document.getElementById('mon-filters');
let hasSelection = false;
let typeColors = {};

Promise.all([
  fetch('/assets/data/mons.json').then((r) => r.json()),
  fetch('/assets/data/types.json').then((r) => r.json()),
  fetch('/assets/data/typeColors.json').then((r) => r.json()),
]).then(([mons, types, tc]) => {
  typeColors = tc;
  renderChart(chartEl, mons, { axisLabels: labels, types, typeColors });
});

chartEl.addEventListener('select', (e) => {
  const m = e.detail;
  hasSelection = true;

  const img = document.getElementById('mon-sprite');
  img.src = m.image.hires || m.image.sprite;
  img.alt = m.name[lang] || m.name.en;
  document.getElementById('mon-id').textContent = `#${String(m.id).padStart(4, '0')}`;
  document.getElementById('mon-name').textContent = m.name[lang] || m.name.en;

  detailEl.hidden = false;
  statsEl.innerHTML = STAT_DIMS.map(
    (dim) =>
      `<span class="stat-label">${labels[dim] || dim}</span><span class="stat-value">${m.stats[dim]}</span>`
  ).join('');

  const genLabel = labels.generation || 'Generation';
  const t1Label = labels.type1 || 'Type 1';
  const t2Label = labels.type2 || 'Type 2';
  const t1Color = typeColors[m.type1] || '#222';
  const t2Color = typeColors[m.type2] || '#222';
  typesEl.innerHTML =
    `<span>${genLabel}: <span class="type-value">${m.generation}</span></span>` +
    `<span>${t1Label}: <span class="type-value" style="color:${t1Color}">${m.type1}</span></span>` +
    (m.type2 ? `<span>${t2Label}: <span class="type-value" style="color:${t2Color}">${m.type2}</span></span>` : '');

  hintEl.hidden = true;
});

chartEl.addEventListener('filterchange', (e) => {
  const { filters, matched, total } = e.detail;
  if (filters.length === 0) {
    filtersEl.hidden = true;
    hintEl.hidden = hasSelection;
  } else {
    filtersEl.hidden = false;
    hintEl.hidden = true;
    const countHtml = `<span class="filter-item"><strong>${matched} / ${total}</strong></span>`;
    const filterHtml = filters
      .map((f) => {
        if (f.kind === 'numeric') {
          return `<span class="filter-item"><span class="filter-label">${f.label}:</span> ${Math.round(f.min)}–${Math.round(f.max)}</span>`;
        }
        return `<span class="filter-item"><span class="filter-label">${f.label}:</span> ${f.values.join(', ')}</span>`;
      })
      .join('');
    filtersEl.innerHTML = countHtml + filterHtml;
  }
});
