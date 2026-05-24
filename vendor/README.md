# Vendored data

`pokedex.json` is a committed snapshot of
https://raw.githubusercontent.com/Purukitto/pokemon-data.json/master/pokedex.json
(MIT licensed). Snapshot date: 2026-05-23 UTC.

Refresh: trigger the **Preprocess data** GitHub Actions workflow with
`refresh_upstream=true`, or locally:

    curl -fsSL https://raw.githubusercontent.com/Purukitto/pokemon-data.json/master/pokedex.json -o vendor/pokedex.json
    npm run build:data
    npm run test:data
