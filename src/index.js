import { readFileSync } from 'node:fs';
import process from 'node:process';
import path from 'path';
import makeTree from './makeTree.js';
import getParsedData from './parsers.js';
import selectFormatter from './formatters/index.js';

const genDiff = (filePath1, filePath2, formatName = 'stylish') => {
  const fullFilePath1 = path.resolve(process.cwd(), filePath1);
  const fullFilePath2 = path.resolve(process.cwd(), filePath2);
  const format1 = (path.extname(fullFilePath1)).substring(1);
  const format2 = (path.extname(fullFilePath2)).substring(1);
  const file1AsObject = getParsedData(readFileSync(fullFilePath1), format1);
  const file2AsObject = getParsedData(readFileSync(fullFilePath2), format2);
  const result = selectFormatter(makeTree(file1AsObject, file2AsObject), formatName);
  return result;
};

export default genDiff;
