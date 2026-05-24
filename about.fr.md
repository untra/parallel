---
layout: page
title: À propos
description: "Projet open-source de visualisation interactive en coordonnées parallèles appliqué aux statistiques Pokémon"
permalink: /about/
lang: fr
---

## qu'est-ce que ce projet ?

Ce projet est un [**diagramme en coordonnées parallèles**](https://en.wikipedia.org/wiki/Parallel_coordinates) interactif de chaque Pokémon à travers dix générations de jeux. Plus de 1000 points de données sont rendus simultanément sur 10 dimensions — six statistiques de base, deux ordinaux de type, numéro de Pokédex et génération. Vous pouvez brosser, filtrer et colorier les données pour explorer des motifs qu'aucun graphique plus simple ne pourrait révéler. C'est un projet open-source de DataViz, construit avec D3.js et hébergé sur GitHub Pages. Le code source est disponible sur [GitHub](https://github.com/untra/parallel).

## la puissance des coordonnées parallèles

Les coordonnées parallèles sont une visualisation de données sous-exploitée. Peu de gens les ont rencontrées, et encore moins comprennent pourquoi elles comptent. Chaque axe vertical représente une dimension différente. Chaque point de données est une ligne qui traverse tous les axes à la fois, encodant sa valeur sur chaque dimension par la position où elle croise cet axe. Il n'y a aucune agrégation — vous voyez chaque observation individuelle.

Ce qui rend cette DataViz puissante, c'est l'interactivité. Le brossage d'un axe filtre les données sur une plage. La coloration par champ révèle les groupes et les valeurs aberrantes. Le survol met en évidence un chemin unique à travers toutes les dimensions. Un graphique statique est écrasant ; un graphique interactif avec des transitions D3.js fluides et un design responsive devient un véritable outil de découverte.

Les coordonnées parallèles aident à identifier les valeurs aberrantes à travers de nombreuses dimensions et à repérer des motifs dans de vastes plages de données. Elles gèrent les données énumérables — nombres et valeurs ordinales. En utilisant la couleur, l'information visuelle supplémentaire peut être appliquée à n'importe quel champ du jeu de données.

## les pokémon comme points de données

Ce site fonctionne aussi comme un annuaire interactif de plus de 1000 Pokémon, où chaque créature peut être explorée à travers ses statistiques, ses types et sa génération. Chaque Pokémon de dix générations de jeux est tracé sur six dimensions de statistiques de base (PV, Attaque, Défense, Atq. Spé., Déf. Spé., Vitesse) plus deux ordinaux de type parmi 18 types de monstres. Vous pouvez filtrer pour trouver les aberrations statistiques, découvrir les corrélations type-statistique, et comparer les tendances générationnelles. J'ai choisi les Pokémon parce qu'ils sont familiers, richement structurés, et bien plus amusants que des logs réseau.

## pourquoi cet outil existe

Les données du monde réel ne sont presque jamais unidimensionnelles. Mesures scientifiques, télémétrie réseau, dossiers médicaux, instruments financiers — tout cela vit dans un espace à haute dimensionnalité. Les diagrammes circulaires, en barres et linéaires aplatissent cette complexité en résumés qui peuvent simplifier à l'excès ou induire en erreur.

**Les analystes et les scientifiques ont besoin de meilleurs outils visuels pour comprendre les données à haute concentration et complexité.** Les coordonnées parallèles préservent la structure brute et permettent à l'humain de trouver des motifs au lieu de faire confiance à celui qui a choisi la bonne agrégation. Elles s'adaptent à des dimensions et des volumes de données qu'aucun autre type de graphique courant ne peut gérer.

J'ai créé ce projet pour contribuer à la communauté DataViz et présenter les coordonnées parallèles à ceux qui cherchent un outil interactif pour explorer leurs données à grande échelle — que ce soit pour la science des données, un portfolio UI/UX, ou un projet open-source. Le code source est disponible sur [GitHub](https://github.com/untra/parallel) — les contributions et adaptations sont les bienvenues.
