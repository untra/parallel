const DATA = [
  { gen: 1, bst: 425 },
  { gen: 2, bst: 416 },
  { gen: 3, bst: 422 },
  { gen: 4, bst: 439 },
  { gen: 5, bst: 422 },
  { gen: 6, bst: 435 },
  { gen: 7, bst: 432 },
  { gen: 8, bst: 441 },
  { gen: 9, bst: 440 },
];

const LINE_COLOR = '#306230';

export function renderLineChart(el, labels) {
  if (!el) return;
  el.replaceChildren();

  const m = { top: 30, right: 20, bottom: 36, left: 50 };
  const w = 480, h = 240;
  const iw = w - m.left - m.right;
  const ih = h - m.top - m.bottom;

  const svg = d3.select(el).append('svg')
    .attr('viewBox', `0 0 ${w} ${h}`);

  svg.append('text')
    .attr('class', 'chart-title')
    .attr('x', w / 2).attr('y', 18)
    .text(labels.lineTitle || 'Avg. Base Stat Total by Generation');

  const g = svg.append('g').attr('transform', `translate(${m.left},${m.top})`);

  const x = d3.scaleLinear()
    .domain([1, 9])
    .range([0, iw]);

  const y = d3.scaleLinear()
    .domain([400, 460])
    .range([ih, 0]);

  g.append('g')
    .attr('class', 'axis')
    .attr('transform', `translate(0,${ih})`)
    .call(d3.axisBottom(x).ticks(9).tickFormat(d3.format('d')));

  g.append('text')
    .attr('x', iw / 2).attr('y', ih + 30)
    .attr('text-anchor', 'middle')
    .attr('font-size', '10px')
    .attr('fill', '#222')
    .text(labels.lineXLabel || 'Generation');

  g.append('g')
    .attr('class', 'axis')
    .call(d3.axisLeft(y).ticks(4));

  g.append('text')
    .attr('transform', 'rotate(-90)')
    .attr('x', -ih / 2).attr('y', -36)
    .attr('text-anchor', 'middle')
    .attr('font-size', '10px')
    .attr('fill', '#222')
    .text(labels.lineYLabel || 'Avg BST');

  const line = d3.line()
    .x(d => x(d.gen))
    .y(d => y(d.bst));

  g.append('path')
    .datum(DATA)
    .attr('fill', 'none')
    .attr('stroke', LINE_COLOR)
    .attr('stroke-width', 2)
    .attr('d', line);

  g.selectAll('circle')
    .data(DATA)
    .join('circle')
    .attr('cx', d => x(d.gen))
    .attr('cy', d => y(d.bst))
    .attr('r', 3.5)
    .attr('fill', LINE_COLOR);
}
