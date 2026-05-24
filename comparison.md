---
layout: page
title: Comparison
permalink: /comparison/
lang: en
---

## the usual suspects

Simple data visualizations are everywhere: pie charts, bar charts, and line charts. They are fine for telling simple stories. But every chart is limited by how many dimensions it can show and how much data it can hold before it falls apart. Understanding those limits is the first step toward understanding why parallel coordinates matter.

## pie charts

A pie chart is one dimension, one data point. The entire circle represents a single observation decomposed into slices - a budget broken into categories, a survey response split by answer. It shows ratios of parts to a whole, and it does that one thing well enough.

<div id="demo-pie" class="demo-chart"></div>

## bar charts

Bar charts are more flexible. A simple bar chart is one dimension with N data points (eg. sales figures for each region, test scores for each student). Flip it around and you get N dimensions for one data point (eg. one athlete's stats across strength, speed, endurance, accuracy.)

<div id="demo-bar" class="demo-chart"></div>

## line charts

A line chart is a plot chart made continuous. It takes N data points and connects them across two dimensions - typically time on the x-axis and a measured value on the y-axis. This is what makes line charts feel powerful: they show trends, trajectories, and change over time in a way that is immediately intuitive.

<div id="demo-line" class="demo-chart"></div>

## parallel coordinates plot

The parallel coordinates plot breaks through every ceiling described above. It is N dimensions and N data points, simultaneously. Data of arbitrary volume and complexity can be understood and refined.

Each vertical axis represents a different dimension. Every data point is a line that crosses all axes at once, encoding its value on each dimension as the position where it intersects that axis. There is no aggregation - you see every individual data point. On this site, that means over 1000 pokemon rendered across 10 dimensions at the same time.

**What keeps it from becoming visual chaos is interactivity.** Brushing an axis filters the data to a range. Coloring by a field reveals clusters and outliers. Hovering highlights a single path through all dimensions. A static parallel coordinates plot is overwhelming; but an interactive one is an insightful tool for discovery.

The tradeoff is real: parallel coordinates require a user who is willing to interact with it. You cannot glance at one the way you glance at a pie chart. But that is exactly the point - pie charts are for glancing, parallel coordinates are for exploring.

## why this matters

Real-world data is almost never one-dimensional. Scientific measurements, network telemetry, patient records, financial instruments, game character stats - these all live in high-dimensional space. Pie charts, bar charts, and line charts flatten that complexity into summaries that can oversimplify or mislead.

Parallel coordinates preserve the raw structure. They let the human find patterns instead of trusting that whoever made the chart chose the right aggregation. They scale to dimensions and data volumes that no other common chart type can handle.

I can imagine an AI future where the work left for humans is very hard and challenging, and the scientific puzzles left to explore require humans that can explore information at the same speed. I can imagine the parallel coordinates plot will be important to our future.

**If your data has more than three dimensions and more than a hundred rows, you should try a parallel coordinates plot to explore your data.** You may not know what you're missing.

<script>
window.__COMPARISON_LABELS__ = {{ site.data.i18n[page.lang].comparison | jsonify }};
window.__AXIS_LABELS_CMP__ = {{ site.data.i18n[page.lang].axis | jsonify }};
</script>
<script type="module">
import { renderPieChart } from '{{ "/assets/js/pieChart.js" | relative_url }}';
import { renderBarChart } from '{{ "/assets/js/barChart.js" | relative_url }}';
import { renderLineChart } from '{{ "/assets/js/lineChart.js" | relative_url }}';

const labels = { ...window.__COMPARISON_LABELS__, ...window.__AXIS_LABELS_CMP__ };

renderPieChart(document.getElementById('demo-pie'), labels);
renderBarChart(document.getElementById('demo-bar'), labels);
renderLineChart(document.getElementById('demo-line'), labels);
</script>
