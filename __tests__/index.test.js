import { readFileSync } from 'node:fs';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

const expectedStylishResult = readFileSync(getFixturePath('expectedStylishResult.txt'), 'utf-8');
const expectedPlainResult = readFileSync(getFixturePath('expectedPlainResult.txt'), 'utf-8');
const expectedJsonResult = readFileSync(getFixturePath('expectedJsonResult.txt'), 'utf-8');

test.each([
  ['file1.json', 'file2.json', expectedStylishResult],
  ['file1.yaml', 'file2.yaml', expectedStylishResult],
])('gendiff for %s, %s in default format', (a, b, expected) => {
  expect(genDiff(getFixturePath(a), getFixturePath(b))).toEqual(expected);
});

test.each([
  ['file1.json', 'file2.json', 'stylish', expectedStylishResult],
  ['file1.yaml', 'file2.yaml', 'stylish', expectedStylishResult],
  ['file1.json', 'file2.json', 'plain', expectedPlainResult],
  ['file1.yaml', 'file2.yaml', 'plain', expectedPlainResult],
  ['file1.json', 'file2.json', 'json', expectedJsonResult],
  ['file1.yaml', 'file2.yaml', 'json', expectedJsonResult],
])('gendiff for %s, %s in %s format', (a, b, format, expected) => {
  expect(genDiff(getFixturePath(a), getFixturePath(b), format)).toEqual(expected);
});
