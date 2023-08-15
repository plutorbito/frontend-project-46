import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

const expectedStylishResult = `{
    common: {
      + follow: false
        setting1: Value 1
      - setting2: 200
      - setting3: true
      + setting3: null
      + setting4: blah blah
      + setting5: {
            key5: value5
        }
        setting6: {
            doge: {
              - wow: 
              + wow: so much
            }
            key: value
          + ops: vops
        }
    }
    group1: {
      - baz: bas
      + baz: bars
        foo: bar
      - nest: {
            key: value
        }
      + nest: str
    }
  - group2: {
        abc: 12345
        deep: {
            id: 45
        }
    }
  + group3: {
        deep: {
            id: {
                number: 45
            }
        }
        fee: 100500
    }
}`;

const expectedPlainResult = `Property 'common.follow' was added with value: false
Property 'common.setting2' was removed
Property 'common.setting3' was updated. From true to null
Property 'common.setting4' was added with value: 'blah blah'
Property 'common.setting5' was added with value: [complex value]
Property 'common.setting6.doge.wow' was updated. From '' to 'so much'
Property 'common.setting6.ops' was added with value: 'vops'
Property 'group1.baz' was updated. From 'bas' to 'bars'
Property 'group1.nest' was updated. From [complex value] to 'str'
Property 'group2' was removed
Property 'group3' was added with value: [complex value]`;

const expectedJsonResult = `[{"key":"common","value":[{"key":"follow","value":false,"status":"added"},{"key":"setting1","value":"Value 1","status":"unchanged"},{"key":"setting2","value":200,"status":"removed"},{"key":"setting3","removedValue":true,"addedValue":null,"status":"changed"},{"key":"setting4","value":"blah blah","status":"added"},{"key":"setting5","value":{"key5":"value5"},"status":"added"},{"key":"setting6","value":[{"key":"doge","value":[{"key":"wow","removedValue":"","addedValue":"so much","status":"changed"}],"status":"nested changes"},{"key":"key","value":"value","status":"unchanged"},{"key":"ops","value":"vops","status":"added"}],"status":"nested changes"}],"status":"nested changes"},{"key":"group1","value":[{"key":"baz","removedValue":"bas","addedValue":"bars","status":"changed"},{"key":"foo","value":"bar","status":"unchanged"},{"key":"nest","removedValue":{"key":"value"},"addedValue":"str","status":"changed"}],"status":"nested changes"},{"key":"group2","value":{"abc":12345,"deep":{"id":45}},"status":"removed"},{"key":"group3","value":{"deep":{"id":{"number":45}},"fee":100500},"status":"added"}]`;

test('Stylish genDiff for json', () => {
  expect(genDiff(getFixturePath('file1.json'), getFixturePath('file2.json'))).toEqual(expectedStylishResult);
});

test('Stylish genDiff for yaml', () => {
  expect(genDiff(getFixturePath('file1.yaml'), getFixturePath('file2.yaml'))).toEqual(expectedStylishResult);
});

test('genDiff for unknown format', () => {
  expect(() => {
    genDiff(getFixturePath('file1.abc'), getFixturePath('file2.json'))
  }).toThrow(`Unknown format: '.abc'!`);
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
