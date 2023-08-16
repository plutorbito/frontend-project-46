import yaml from 'js-yaml';

const getParsedData = (file, format) => {
  switch (format) {
    case '.json':
      return JSON.parse(file);
    case '.yml':
    case '.yaml':
      return yaml.load(file);
    default:
      throw new Error(`Unknown format: '${format}'!`);
  }
};

export default getParsedData;
