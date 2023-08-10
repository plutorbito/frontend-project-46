import process from 'node:process';
import path from 'path';
import makeAsTree from './makeAsTree.js';
import getParsedData from './parsers.js';
import makeStylish from './formatters.js';

const genDiff = (filePath1, filePath2) => {
   const fullFilePath1 = path.resolve(process.cwd(), filePath1);
   const fullFilePath2 = path.resolve(process.cwd(), filePath2);
   const file1AsObject = getParsedData(fullFilePath1);
   const file2AsObject = getParsedData(fullFilePath2);
   const result = makeStylish(makeAsTree(file1AsObject, file2AsObject));
   return result;
}

export default genDiff;