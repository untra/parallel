---
layout: page
title: Comparaison
description: "Comparaison des coordonnées parallèles avec les diagrammes circulaires, en barres et linéaires pour la DataViz multidimensionnelle"
permalink: /comparison/
lang: fr
---

## les suspects habituels

Les visualisations de données simples sont partout : diagrammes circulaires, diagrammes en barres et graphiques linéaires. Elles conviennent pour raconter des histoires simples. Mais chaque type de graphique est limité par le nombre de dimensions qu'il peut afficher et la quantité de données qu'il peut contenir avant de s'effondrer. Comprendre ces limites est la première étape pour comprendre pourquoi les coordonnées parallèles sont importantes.

## diagrammes circulaires

Un diagramme circulaire, c'est une dimension, un point de données. Le cercle entier représente une seule observation décomposée en tranches - un budget réparti en catégories, un sondage divisé par réponse. Il montre les proportions des parties par rapport au tout, et il fait cette unique chose assez bien.

<div id="demo-pie" class="demo-chart"></div>

## diagrammes en barres

Les diagrammes en barres sont plus flexibles. Un diagramme en barres simple, c'est une dimension avec N points de données (ex. chiffres de ventes par région, notes d'examen par étudiant). Inversez et vous obtenez N dimensions pour un seul point de données (ex. les stats d'un athlète en force, vitesse, endurance, précision.)

<div id="demo-bar" class="demo-chart"></div>

## graphiques linéaires

Un graphique linéaire est un nuage de points rendu continu. Il prend N points de données et les relie à travers deux dimensions - typiquement le temps sur l'axe X et une valeur mesurée sur l'axe Y. C'est ce qui rend les graphiques linéaires si puissants : ils montrent les tendances, les trajectoires et l'évolution dans le temps d'une manière immédiatement intuitive.

<div id="demo-line" class="demo-chart"></div>

## coordonnées parallèles

Le diagramme en coordonnées parallèles dépasse tous les plafonds décrits ci-dessus. C'est N dimensions et N points de données, simultanément. Des données de volume et de complexité arbitraires peuvent être comprises et affinées.

Chaque axe vertical représente une dimension différente. Chaque point de données est une ligne qui traverse tous les axes à la fois, encodant sa valeur sur chaque dimension par la position où elle croise cet axe. Il n'y a pas d'agrégation - vous voyez chaque point de données individuel. Sur ce site, cela signifie plus de 1000 Pokémon affichés simultanément à travers 10 dimensions.

**Ce qui empêche le chaos visuel, c'est l'interactivité.** L'interactivité est au cœur de l'expérience utilisateur. Le brossage d'un axe filtre les données sur une plage. La coloration par champ révèle les groupes et les valeurs aberrantes. Le survol met en évidence un chemin unique à travers toutes les dimensions. Par exemple, vous pouvez filtrer les Pokémon dont la Vitesse dépasse 100 et l'Attaque Spéciale 120 pour trouver instantanément les attaquants spéciaux rapides — puis colorier par type pour voir lesquels dominent ce créneau. Un graphique statique est écrasant ; un graphique interactif avec des transitions D3.js fluides et un design responsive est un outil de découverte.

Le compromis est réel : les coordonnées parallèles nécessitent un utilisateur prêt à interagir avec. On ne peut pas y jeter un simple coup d'œil comme on le ferait avec un diagramme circulaire. Mais c'est exactement le but - les diagrammes circulaires sont faits pour être vus d'un coup d'œil, les coordonnées parallèles sont faites pour explorer.

## pourquoi c'est important

Les données du monde réel ne sont presque jamais unidimensionnelles. Mesures scientifiques, télémétrie réseau, dossiers médicaux, instruments financiers, statistiques de personnages de jeux - tout cela existe dans un espace à haute dimensionnalité. Les diagrammes circulaires, en barres et linéaires aplatissent cette complexité en résumés qui peuvent simplifier à l'excès ou induire en erreur.

Les coordonnées parallèles préservent la structure brute. Elles permettent à l'humain de trouver des motifs au lieu de faire confiance à celui qui a choisi la bonne agrégation pour le graphique. Elles s'adaptent à des dimensions et des volumes de données qu'aucun autre type de graphique courant ne peut gérer.

**Si vos données ont plus de trois dimensions et plus d'une centaine de lignes, vous devriez essayer les coordonnées parallèles pour les explorer.** Que ce soit pour la science des données, un portfolio UI/UX ou un projet open-source, cet outil de DataViz est conçu pour rendre la complexité lisible. Ce projet est [open-source](https://github.com/untra/parallel) — explorez le code, adaptez-le à vos propres données, ou contribuez.

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
