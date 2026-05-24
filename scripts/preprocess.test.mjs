import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import Ajv2020 from 'ajv/dist/2020.js';
import addFormats from 'ajv-formats';

const mons = JSON.parse(readFileSync('assets/data/mons.json', 'utf8'));
const schema = JSON.parse(readFileSync('schemas/pokedex.schema.json', 'utf8'));

const ajv = new Ajv2020({ allErrors: true, strict: true, strictTuples: false });
addFormats.default(ajv);
const validate = ajv.compile(schema);

test('committed mons.json conforms to pokedex.schema.json', () => {
  const ok = validate(mons);
  if (!ok) console.error(validate.errors.slice(0, 5));
  assert.ok(ok, 'schema validation failed');
});

test('id-0 sentinel is null', () => {
  assert.equal(mons[0], null);
});

test('1-indexed lookup: mons[1] is Bulbasaur', () => {
  assert.equal(mons[1].id, 1);
  assert.equal(mons[1].name.en, 'Bulbasaur');
});

test('single-type mons have type2 === type1 (reuse rule)', () => {
  const single = mons.slice(1).filter((m) => m.type1 === m.type2);
  assert.ok(single.length > 0, 'expected some single-type mons');
});

test('types.json contains the canonical 18-type vocabulary', () => {
  const types = JSON.parse(readFileSync('assets/data/types.json', 'utf8'));
  assert.equal(types.length, 18);
  assert.ok(types.includes('Fairy'));
});
