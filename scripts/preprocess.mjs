import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { dirname } from 'node:path';
import Ajv2020 from 'ajv/dist/2020.js';
import addFormats from 'ajv-formats';

const SRC = 'vendor/pokedex.json';
const OUT = 'assets/data/mons.json';
const TYPES_OUT = 'assets/data/types.json';
const COLORS_OUT = 'assets/data/typeColors.json';
const SCHEMA = 'schemas/pokedex.schema.json';

const TYPES = ['Normal', 'Fire', 'Water', 'Electric', 'Grass', 'Ice', 'Fighting', 'Poison', 'Ground', 'Flying', 'Psychic', 'Bug', 'Rock', 'Ghost', 'Dragon', 'Dark', 'Steel', 'Fairy'];

const TYPE_COLORS = {
  Normal:   '#A8A77A',
  Fire:     '#EE8130',
  Water:    '#6390F0',
  Electric: '#F7D02C',
  Grass:    '#7AC74C',
  Ice:      '#96D9D6',
  Fighting: '#C22E28',
  Poison:   '#A33EA1',
  Ground:   '#E2BF65',
  Flying:   '#A98FF3',
  Psychic:  '#F95587',
  Bug:      '#A6B91A',
  Rock:     '#B6A136',
  Ghost:    '#735797',
  Dragon:   '#6F35FC',
  Dark:     '#705746',
  Steel:    '#B7B7CE',
  Fairy:    '#D685AD',
};

const GEN_BOUNDS = [151, 251, 386, 493, 649, 721, 809, 905, 1025];
const generationOf = (id) => {
  const i = GEN_BOUNDS.findIndex((max) => id <= max);
  return i === -1 ? GEN_BOUNDS.length : i + 1;
};

const NAME_MAP = { en: 'english', 'zh-cn': 'chinese', fr: 'french', ja: 'japanese' };

const prune = (obj) =>
  Object.fromEntries(Object.entries(obj).filter(([, v]) => v != null));

const src = JSON.parse(readFileSync(SRC, 'utf8'));
const maxId = src.reduce((m, p) => Math.max(m, p.id), 0);
const out = new Array(maxId + 1).fill(null);

for (const p of src) {
  const types = p.type ?? [];
  const type1 = types[0];
  const type2 = types[1] ?? type1;
  out[p.id] = {
    id: p.id,
    name: Object.fromEntries(
      Object.entries(NAME_MAP).map(([k, v]) => [k, p.name?.[v] ?? p.name?.english ?? ''])
    ),
    type1,
    type2,
    stats: {
      hp: p.base?.HP,
      attack: p.base?.Attack,
      defense: p.base?.Defense,
      spAttack: p.base?.['Sp. Attack'],
      spDefense: p.base?.['Sp. Defense'],
      speed: p.base?.Speed,
    },
    generation: generationOf(p.id),
    image: prune({
      sprite: p.image?.sprite,
      thumbnail: p.image?.thumbnail,
      hires: p.image?.hires,
    }),
  };
}

const ajv = new Ajv2020({ allErrors: true, strict: true, strictTuples: false });
addFormats.default(ajv);
const schema = JSON.parse(readFileSync(SCHEMA, 'utf8'));
const validate = ajv.compile(schema);
if (!validate(out)) {
  console.error('Schema validation failed:');
  for (const err of validate.errors.slice(0, 20)) {
    console.error('  ', err.instancePath, err.message, err.params);
  }
  process.exit(1);
}

mkdirSync(dirname(OUT), { recursive: true });
writeFileSync(OUT, JSON.stringify(out));
writeFileSync(TYPES_OUT, JSON.stringify(TYPES));
writeFileSync(COLORS_OUT, JSON.stringify(TYPE_COLORS));
console.log(`wrote ${OUT}, ${TYPES_OUT}, ${COLORS_OUT} (${out.length} slots, ${out.filter(Boolean).length} mons), validated against ${SCHEMA}`);
