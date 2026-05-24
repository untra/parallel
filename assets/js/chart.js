export function renderChart(rootEl, mons, opts = {}) {
  const { axisLabels = {}, types } = opts;
  const data = mons.filter(Boolean);
  const DIMS = ['id', 'hp', 'attack', 'defense', 'spAttack', 'spDefense', 'speed', 'type1', 'type2', 'generation'];

  const margin = { top: 30, right: 40, bottom: 20, left: 40 };
  const width = rootEl.clientWidth;
  const height = 600;
  const iw = width - margin.left - margin.right;
  const ih = height - margin.top - margin.bottom;

  const x = d3.scalePoint().domain(DIMS).range([0, iw]).padding(0.5);

  const value = (d, dim) => {
    if (dim === 'id' || dim === 'generation' || dim === 'type1' || dim === 'type2') return d[dim];
    return d.stats[dim];
  };

  const y = {};
  const numeric = (key) =>
    d3
      .scaleLinear()
      .domain(d3.extent(data, (d) => d.stats[key]))
      .nice()
      .range([ih, 0]);
  y.hp = numeric('hp');
  y.attack = numeric('attack');
  y.defense = numeric('defense');
  y.spAttack = numeric('spAttack');
  y.spDefense = numeric('spDefense');
  y.speed = numeric('speed');
  y.id = d3.scaleLinear().domain(d3.extent(data, (d) => d.id)).range([ih, 0]);
  y.generation = d3.scaleLinear().domain([1, 9]).range([ih, 0]);
  y.type1 = d3.scalePoint().domain(types).range([0, ih]).padding(0.5);
  y.type2 = d3.scalePoint().domain(types).range([0, ih]).padding(0.5);

  const line = d3
    .line()
    .defined(([, v]) => v != null)
    .x(([dim]) => x(dim))
    .y(([dim, v]) => y[dim](v));

  rootEl.replaceChildren();
  const svg = d3
    .select(rootEl)
    .append('svg')
    .attr('viewBox', `0 0 ${width} ${height}`)
    .append('g')
    .attr('transform', `translate(${margin.left},${margin.top})`);

  const paths = svg
    .append('g')
    .attr('class', 'lines')
    .selectAll('path')
    .data(data)
    .join('path')
    .attr('class', 'line')
    .attr('data-id', (d) => d.id)
    .attr('d', (d) => line(DIMS.map((dim) => [dim, value(d, dim)])));

  paths.on('click', (event, d) => {
    rootEl.dispatchEvent(new CustomEvent('select', { detail: d }));
    paths.classed('selected', (p) => p === d);
  });

  const axisG = svg.append('g').attr('class', 'axes');
  const ranges = new Map();

  function invertPoint(scale, px) {
    const domain = scale.domain();
    let best = domain[0];
    let bestD = Infinity;
    for (const d of domain) {
      const dd = Math.abs(scale(d) - px);
      if (dd < bestD) {
        bestD = dd;
        best = d;
      }
    }
    return best;
  }

  let raf = null;
  function scheduleUpdate() {
    if (raf) return;
    raf = requestAnimationFrame(() => {
      raf = null;
      applyBrush();
    });
  }

  function applyBrush() {
    paths.classed('muted', (d) => {
      for (const [dim, range] of ranges) {
        if (!range) continue;
        const v = value(d, dim);
        if (dim === 'type1' || dim === 'type2') {
          const order = y[dim].domain();
          const lo = order.indexOf(range[0]);
          const hi = order.indexOf(range[1]);
          const idx = order.indexOf(v);
          if (idx < Math.min(lo, hi) || idx > Math.max(lo, hi)) return true;
        } else {
          const [a, b] = range;
          const lo = Math.min(a, b);
          const hi = Math.max(a, b);
          if (v < lo || v > hi) return true;
        }
      }
      return false;
    });
  }

  for (const dim of DIMS) {
    const g = axisG
      .append('g')
      .attr('class', `axis axis-${dim}`)
      .attr('transform', `translate(${x(dim)},0)`);

    const isPoint = dim === 'type1' || dim === 'type2';
    const axisGen = isPoint ? d3.axisLeft(y[dim]) : d3.axisLeft(y[dim]).ticks(6);
    g.call(axisGen);

    g.append('text')
      .attr('class', 'axis-label')
      .attr('y', -10)
      .attr('text-anchor', 'middle')
      .text(axisLabels[dim] ?? dim);

    const brush = d3
      .brushY()
      .extent([
        [-12, 0],
        [12, ih],
      ])
      .on('brush end', (event) => {
        if (!event.selection) {
          ranges.set(dim, null);
        } else if (isPoint) {
          ranges.set(dim, event.selection.map((px) => invertPoint(y[dim], px)));
        } else {
          ranges.set(dim, event.selection.map(y[dim].invert));
        }
        scheduleUpdate();
      });
    g.append('g').attr('class', 'brush').call(brush);
  }
}
