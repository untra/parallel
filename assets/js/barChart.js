const STATS = [
  { key: 'hp',        value: 35 },
  { key: 'attack',    value: 55 },
  { key: 'defense',   value: 40 },
  { key: 'spAttack',  value: 50 },
  { key: 'spDefense', value: 50 },
  { key: 'speed',     value: 90 },
];

const BAR_COLOR = '#F7D02C';

export function renderBarChart(el, labels) {
  if (!el) return;
  el.replaceChildren();

  const m = { top: 30, right: 20, bottom: 20, left: 60 };
  const w = 480, h = 240;
  const iw = w - m.left - m.right;
  const ih = h - m.top - m.bottom;

  const statLabels = STATS.map(s => labels[s.key] || s.key);

  const svg = d3.select(el).append('svg')
    .attr('viewBox', `0 0 ${w} ${h}`);

  svg.append('text')
    .attr('class', 'chart-title')
    .attr('x', w / 2).attr('y', 18)
    .text(labels.barTitle || "Pikachu's Base Stats");

  const g = svg.append('g').attr('transform', `translate(${m.left},${m.top})`);

  const y = d3.scaleBand()
    .domain(statLabels)
    .range([0, ih])
    .padding(0.25);

  const x = d3.scaleLinear()
    .domain([0, 255])
    .range([0, iw]);

  g.append('g')
    .attr('class', 'axis')
    .call(d3.axisLeft(y).tickSize(0).tickPadding(6))
    .call(g => g.select('.domain').remove());

  g.append('g')
    .attr('class', 'axis')
    .attr('transform', `translate(0,${ih})`)
    .call(d3.axisBottom(x).ticks(5));

  g.selectAll('rect')
    .data(STATS)
    .join('rect')
    .attr('y', (d, i) => y(statLabels[i]))
    .attr('x', 0)
    .attr('width', d => x(d.value))
    .attr('height', y.bandwidth())
    .attr('fill', BAR_COLOR)
    .attr('rx', 2);

  g.selectAll('.bar-value')
    .data(STATS)
    .join('text')
    .attr('x', d => x(d.value) + 4)
    .attr('y', (d, i) => y(statLabels[i]) + y.bandwidth() / 2)
    .attr('dominant-baseline', 'central')
    .attr('font-size', '9px')
    .attr('fill', '#222')
    .text(d => d.value);
}
