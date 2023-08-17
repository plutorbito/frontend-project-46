import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import genDiff from '../src/index.js';
import { readFileSync } from 'node:fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

const expectedStylishResult = readFileSync(getFixturePath('expectedStylishResult.txt'), 'utf-8');
const expectedPlainResult = readFileSync(getFixturePath('expectedPlainResult.txt'), 'utf-8');
const expectedJsonResult = readFileSync(getFixturePath('expectedJsonResult.txt'), 'utf-8');

test('Stylish genDiff for json', () => {
  expect(genDiff(getFixturePath('file1.json'), getFixturePath('file2.json'))).toEqual(expectedStylishResult);
});

test('Stylish genDiff for yaml', () => {
  expect(genDiff(getFixturePath('file1.yaml'), getFixturePath('file2.yaml'))).toEqual(expectedStylishResult);
});

test('Plain genDiff for json', () => {
  expect(genDiff(getFixturePath('file1.json'), getFixturePath('file2.json'), 'plain')).toEqual(expectedPlainResult);
});

test('Plain genDiff for yaml', () => {
  expect(genDiff(getFixturePath('file1.yaml'), getFixturePath('file2.yaml'), 'plain')).toEqual(expectedPlainResult);
});

test('Json genDiff for json', () => {
  expect(genDiff(getFixturePath('file1.json'), getFixturePath('file2.json'), 'json')).toEqual(expectedJsonResult);
});

test('Json genDiff for yaml', () => {
  expect(genDiff(getFixturePath('file1.yaml'), getFixturePath('file2.yaml'), 'json')).toEqual(expectedJsonResult);
});
