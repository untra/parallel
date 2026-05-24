---
layout: page
title: About
permalink: /about/
lang: en
---

## what is this project?

This is a project to demonstrate the power and importance of the [**Parallel Coordinates Plot**](https://en.wikipedia.org/wiki/Parallel_coordinates), a data visualization that I think is underused.

## parallel coordinate plots are so rad

They are my favorite data visualization. They are so niche; few people have heard of them or experienced the overwhelming information overload they impart. Nor do people understand why they are the data visualization of the future.

They are not hard to build; d3 has been around for more than a decade and the rapid composition of lines in a svg plot is a solved problem with javascript. Making it interactive and helping human users filter through the high volume of data points across many dimensions is what really makes a parallel coordinates plot shine. If we are going to have human analysts still interacting with data in the future, that data will need to be at a higher fidelity and size than what a typical civilian would consume.

The parallel coordinates plots help identify outliers across many dimensions, and to quickly identify patterns in vast data ranges.
It can identify data that is enumerable, especially numbers but also ordinal values.
Using colors, it becomes possible to impart more visual information to the user, that can scope to any field of the data that could be inspected.

## pokemon as data points

To demonstrate what they are capable of, this project shows a parallel coordinates plot for every pokemon across ten generations of games, over > 1000 data points, viewed across 6 different stat dimensions, including two "type" value ordinals of 18 monster types. I chose pokemon because they are just data points; I could also use sports athletes or processed network logs, but these seemed more fun.

## we need better tools 

If a human can view and understand and interact with this kind of graph, then they can also accomplish more with interactive structural data like what AI would typically use. AI is going to help humans achieve very cool advancements in science, but it is all too easy to lie with statistics and bad graphs.

If humans are going to have jobs interacting with serious no-lies data in the future, bar charts and line graphs are not going to cut it. **Scientists need better visual tools to understand data at high concentrations and complexity.** I made this project to introduce the parallel coordinates to those who are looking for a new interactive tool to help them grok the data they need at scale. I hope you too can appreciate the power of the parallel coordinates plot.