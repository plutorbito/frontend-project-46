import genDiff from "../src/index.js";
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

const expected = 
`{
 - follow: false
   host: hexlet.io
 - proxy: 123.234.53.22
 - timeout: 50
 + timeout: 20
 + verbose: true
}`;

test('genDiff for json', () => {
   expect(genDiff(getFixturePath('file1.json'), getFixturePath('file2.json'))).toEqual(expected);
});

test('genDiff for yaml', () => {
   expect(genDiff(getFixturePath('file1.yaml'), getFixturePath('file2.yaml'))).toEqual(expected);
});

test('genDiff for unknown format', () => {
   expect(() => {
      genDiff(getFixturePath('file1.abc'), getFixturePath('file2.json'))
   }).toThrow(`Unknown format: '.abc'!`);
});
