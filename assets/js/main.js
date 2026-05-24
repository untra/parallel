import { renderChart } from '/assets/js/chart.js';

const chartEl = document.getElementById('chart');
const lang = chartEl.dataset.lang || 'en';

Promise.all([
  fetch('/assets/data/mons.json').then((r) => r.json()),
  fetch('/assets/data/types.json').then((r) => r.json()),
]).then(([mons, types]) => {
  const labels = window.__AXIS_LABELS__ ?? {};
  renderChart(chartEl, mons, { axisLabels: labels, types });
});

chartEl.addEventListener('select', (e) => {
  const m = e.detail;
  const img = document.getElementById('mon-sprite');
  img.src = m.image.hires || m.image.sprite;
  img.alt = m.name[lang] || m.name.en;
  document.getElementById('mon-id').textContent = `#${String(m.id).padStart(4, '0')}`;
  document.getElementById('mon-name').textContent = m.name[lang] || m.name.en;
});
