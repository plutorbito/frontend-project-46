import { readFileSync } from 'node:fs';
import path from 'path';
import yaml from 'js-yaml';

const getParsedData = (fullFilePath) => {
   const format = path.extname(fullFilePath);
   switch (format) {
      case '.json':
         return JSON.parse(readFileSync(fullFilePath));
      case '.yml':
      case '.yaml':
         return yaml.load(readFileSync(fullFilePath));
      default:
         throw new Error(`Unknown format: '${format}'!`);
   }
}

export default getParsedData;