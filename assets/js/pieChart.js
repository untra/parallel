const TYPE_COLORS = {
  Water: '#6390F0', Normal: '#A8A77A', Grass: '#7AC74C',
  Bug: '#A6B91A', Fire: '#EE8130', Psychic: '#F95587',
};
const OTHER_COLOR = '#999';

const DATA = [
  { type: 'Water',   count: 133 },
  { type: 'Normal',  count: 109 },
  { type: 'Grass',   count: 95 },
  { type: 'Bug',     count: 77 },
  { type: 'Fire',    count: 68 },
  { type: 'Psychic', count: 62 },
];
const OTHER_COUNT = 456;

export function renderPieChart(el, labels) {
  if (!el) return;
  el.replaceChildren();

  const data = [...DATA, { type: labels.pieOther || 'Other', count: OTHER_COUNT }];
  const w = 300, h = 300, radius = 110;
  const cx = w / 2, cy = h / 2;

  const svg = d3.select(el).append('svg')
    .attr('viewBox', `0 0 ${w} ${h}`);

  svg.append('text')
    .attr('class', 'chart-title')
    .attr('x', cx).attr('y', 20)
    .text(labels.pieTitle || 'Pokemon by Type');

  const pie = d3.pie().value(d => d.count).sort(null);
  const arc = d3.arc().innerRadius(0).outerRadius(radius);
  const labelArc = d3.arc().innerRadius(radius * 0.65).outerRadius(radius * 0.65);

  const g = svg.append('g').attr('transform', `translate(${cx},${cy + 10})`);

  g.selectAll('path')
    .data(pie(data))
    .join('path')
    .attr('d', arc)
    .attr('fill', d => TYPE_COLORS[d.data.type] || OTHER_COLOR)
    .attr('stroke', '#fff')
    .attr('stroke-width', 1.5);

  g.selectAll('text')
    .data(pie(data))
    .join('text')
    .attr('transform', d => `translate(${labelArc.centroid(d)})`)
    .attr('text-anchor', 'middle')
    .attr('dominant-baseline', 'central')
    .attr('font-size', '9px')
    .attr('fill', '#fff')
    .attr('font-weight', 'bold')
    .text(d => d.data.type);
}
