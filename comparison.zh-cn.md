---
layout: page
title: 对比
permalink: /comparison/
lang: zh-cn
---

## 常见的图表

简单的数据可视化无处不在：饼图、柱状图和折线图。它们适合讲述简单的故事。但每种图表在能展示的维度和能容纳的数据量上都有硬性限制。理解这些限制，是理解平行坐标图为何重要的第一步。

## 饼图

饼图是一个维度、一个数据点。整个圆代表一个单一观测值被分解成若干扇区 - 按类别划分的预算、按选项拆分的调查结果。它展示各部分与整体的比率，而且只做这一件事。

<div id="demo-pie" class="demo-chart"></div>

## 柱状图

柱状图更灵活。简单的柱状图是一个维度配N个数据点（例如各地区的销售额、每个学生的考试成绩）。反过来就是N个维度配一个数据点（例如一名运动员在力量、速度、耐力、精准度方面的数据。）

<div id="demo-bar" class="demo-chart"></div>

## 折线图

折线图是将散点图变为连续的结果。它将N个数据点沿两个维度连接起来 - 通常X轴是时间，Y轴是测量值。这正是折线图让人感觉强大的原因：它以一种直观的方式展示趋势、轨迹和时间变化。

<div id="demo-line" class="demo-chart"></div>

## 平行坐标图

平行坐标图突破了上述所有限制。它同时处理N个维度和N个数据点。任意体量和复杂度的数据都可以被理解和精炼。

每条纵轴代表一个不同的维度。每个数据点是一条穿过所有轴的线，通过与每条轴的交叉位置来编码该维度上的值。没有任何聚合 - 你看到的是每一个原始数据点。在本站上，这意味着超过1000只宝可梦同时展示在10个维度上。

**防止视觉混乱的关键是交互性。** 刷选一个轴可以按范围过滤数据。按字段着色可以揭示聚类和异常值。悬停可以高亮一条穿过所有维度的路径。静态的平行坐标图令人目不暇接，但交互式的平行坐标图是一个深具洞察力的发现工具。

这种权衡是真实的：平行坐标图需要一个愿意主动操作的用户。你无法像看饼图那样一瞥而过。但这正是关键所在 - 饼图是用来瞥一眼的，平行坐标图是用来探索的。

## 为什么这很重要

现实世界的数据几乎从来不是一维的。科学测量、网络遥测、患者病历、金融工具、游戏角色属性 - 这些都存在于高维空间中。饼图、柱状图和折线图将这种复杂性压平成可能过度简化或产生误导的摘要。

平行坐标图保留了原始结构。它们让人类自己去发现规律，而不是信任制图者选择了正确的聚合方式。它们能够处理其他常见图表类型无法应对的维度和数据量。

我可以想象一个AI的未来，留给人类的工作将非常艰难且充满挑战，有待探索的科学难题需要人类能以同样的速度探索信息。我相信平行坐标图对我们的未来将至关重要。

**如果你的数据超过三个维度、超过一百行，你应该尝试用平行坐标图来探索你的数据。** 你可能不知道自己错过了什么。

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
