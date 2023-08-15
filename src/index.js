import process from 'node:process';
import path from 'path';
import makeTree from './makeTree.js';
import getParsedData from './parsers.js';
import selectFormatter from './formatters/index.js';

const genDiff = (filePath1, filePath2, formatName = 'stylish') => {
  const fullFilePath1 = path.resolve(process.cwd(), filePath1);
  const fullFilePath2 = path.resolve(process.cwd(), filePath2);
  const file1AsObject = getParsedData(fullFilePath1);
  const file2AsObject = getParsedData(fullFilePath2);
  const result = selectFormatter(makeTree(file1AsObject, file2AsObject), formatName);
  return result;
};

export default genDiff;
