import { readFileSync } from 'node:fs';
import process from 'node:process';
import path from 'path';
import makeAsTree from './makeAsTree.js';

const genDiff = (filePath1, filePath2) => {
   const fullFilePath1 = path.resolve(process.cwd(), filePath1);
   const fullFilePath2 = path.resolve(process.cwd(), filePath2);
   const file1 = readFileSync(fullFilePath1);
   const file2 = readFileSync(fullFilePath2);
   const file1AsObject = JSON.parse(file1);
   const file2AsObject = JSON.parse(file2);
   const result = makeAsTree(file1AsObject, file2AsObject);
   return result;
}

export default genDiff;