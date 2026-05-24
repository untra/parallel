export function renderChart(rootEl, mons, opts = {}) {
  const { axisLabels = {}, types, typeColors = {} } = opts;
  const data = mons.filter(Boolean);
  const DIMS = ['id', 'hp', 'attack', 'defense', 'spAttack', 'spDefense', 'speed', 'type1', 'type2', 'generation'];

  const margin = { top: 30, right: 40, bottom: 20, left: 40 };

  const value = (d, dim) => {
    if (dim === 'id' || dim === 'generation' || dim === 'type1' || dim === 'type2') return d[dim];
    return d.stats[dim];
  };

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

  function render() {
    rootEl.replaceChildren();

    const width = rootEl.clientWidth || 1200;
    const height = rootEl.clientHeight || Math.max(480, Math.round(window.innerHeight * 0.7));
    const iw = width - margin.left - margin.right;
    const ih = height - margin.top - margin.bottom;

    const x = d3.scalePoint().domain(DIMS).range([0, iw]).padding(0.5);

    const y = {};
    const stat = () => d3.scaleLinear().domain([0, 255]).range([ih, 0]);
    y.hp = stat();
    y.attack = stat();
    y.defense = stat();
    y.spAttack = stat();
    y.spDefense = stat();
    y.speed = stat();
    y.id = d3.scaleLinear().domain(d3.extent(data, (d) => d.id)).range([ih, 0]);
    y.generation = d3.scaleLinear().domain([1, 9]).range([ih, 0]);
    y.type1 = d3.scalePoint().domain(types).range([0, ih]).padding(0.5);
    y.type2 = d3.scalePoint().domain(types).range([0, ih]).padding(0.5);

    const line = d3
      .line()
      .defined(([, v]) => v != null)
      .x(([dim]) => x(dim))
      .y(([dim, v]) => y[dim](v));

    const svgRoot = d3
      .select(rootEl)
      .append('svg')
      .attr('viewBox', `0 0 ${width} ${height}`)
      .attr('preserveAspectRatio', 'none');

    // <defs> with one gradient per unique (type1, type2) pair.
    const pairs = new Map();
    for (const m of data) {
      const key = `${m.type1}-${m.type2}`;
      if (!pairs.has(key)) pairs.set(key, [m.type1, m.type2]);
    }
    const defs = svgRoot.append('defs');
    for (const [key, [t1, t2]] of pairs) {
      const g = defs
        .append('linearGradient')
        .attr('id', `grad-${key}`)
        .attr('x1', '0%')
        .attr('y1', '0%')
        .attr('x2', '100%')
        .attr('y2', '0%');
      g.append('stop').attr('offset', '0%').attr('stop-color', typeColors[t1] ?? '#888');
      g.append('stop').attr('offset', '100%').attr('stop-color', typeColors[t2] ?? '#888');
    }

    const svg = svgRoot.append('g').attr('transform', `translate(${margin.left},${margin.top})`);

    const paths = svg
      .append('g')
      .attr('class', 'lines')
      .selectAll('path')
      .data(data)
      .join('path')
      .attr('class', 'line')
      .attr('data-id', (d) => d.id)
      .attr('stroke', (d) => `url(#grad-${d.type1}-${d.type2})`)
      .attr('d', (d) => line(DIMS.map((dim) => [dim, value(d, dim)])));

    paths.on('click', (event, d) => {
      rootEl.dispatchEvent(new CustomEvent('select', { detail: d }));
      paths.classed('selected', (p) => p === d);
    });

    const axisG = svg.append('g').attr('class', 'axes');
    const ranges = new Map();

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

  let resizeTimer = null;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(render, 150);
  });

  render();
}
