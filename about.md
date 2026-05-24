---
layout: page
title: About
description: "Why parallel coordinates plots matter for high-dimensional data visualization, demonstrated with Pokemon stats"
permalink: /about/
lang: en
---

## what is this project?

This is an interactive [**parallel coordinates plot**](https://en.wikipedia.org/wiki/Parallel_coordinates) of every Pokemon across ten generations of games. Over 1000 data points are rendered across 10 dimensions simultaneously; six base stats, two type ordinals, Pokedex number, and generation. You can brush, filter, and color the data to explore patterns that no simpler chart could reveal. The project is [open-source](https://github.com/untra/parallel) and built with D3.js on GitHub Pages.

## why parallel coordinates

Parallel coordinates are an underused data visualization. Few people have encountered them, and fewer understand why they matter. Each vertical axis represents a different dimension. Every data point is a line that crosses all axes at once, encoding its value on each dimension as the position where it intersects that axis. There is no aggregation; you see every individual observation.

What makes the visualization powerful is interactivity. Brushing an axis filters the data to a range. Coloring by a field reveals clusters and outliers. Hovering highlights a single path through all dimensions. A static parallel coordinates plot is overwhelming; an interactive one is a discovery tool.

Parallel coordinates help identify outliers across many dimensions and spot patterns in vast data ranges. They handle enumerable data; numbers and ordinal values alike. Using color, additional visual information can be scoped to any field in the dataset.

## pokemon as data points

To demonstrate what parallel coordinates are capable of, this project uses Pokemon as the dataset. Every Pokemon from ten generations of games is plotted across six base stat dimensions (HP, Attack, Defense, Sp. Atk, Sp. Def, Speed) plus two type ordinals of 18 monster types. You can filter to find stat outliers, discover type-stat correlations, and compare generational trends. I chose Pokemon because they are familiar, richly structured, and more fun than network logs.

## we need better tools

Real-world data is almost never one-dimensional. Scientific measurements, network telemetry, patient records, financial instruments; these all live in high-dimensional space. Pie charts, bar charts, and line charts flatten that complexity into summaries that can oversimplify or mislead.

**Analysts and scientists need better visual tools to understand data at high concentrations and complexity.** Parallel coordinates preserve the raw structure and let the human find patterns instead of trusting that whoever made the chart chose the right aggregation. They scale to dimensions and data volumes that no other common chart type can handle.

I made this project to introduce parallel coordinates to those looking for a new interactive tool to help them explore data at scale. The source code is available on [GitHub](https://github.com/untra/parallel); contributions and adaptations are welcome. I hope you too can appreciate the power of the parallel coordinates plot.