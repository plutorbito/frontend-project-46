import _ from 'lodash';

const getValue = (value) => {
  if (Array.isArray(value)) {
    return value;
  }
  if (_.isObject(value)) {
    return ['[complex value]'];
  }
  if (_.isString(value)) {
    return [`'${value}'`];
  }
  return [`${value}`];
};

const makePlain = (data, path = '') => {
  const result = data.flatMap((obj) => {
    switch (obj.status) {
      case 'removed':
        return `Property '${path}${obj.key}' was removed`;
      case 'added':
        return `Property '${path}${obj.key}' was added with value: ${getValue(obj.value)}`;
      case 'nested':
        return makePlain(obj.value, `${path}${obj.key}.`);
      case 'changed':
        return `Property '${path}${obj.key}' was updated. From ${getValue(obj.removedValue)} to ${getValue(obj.addedValue)}`;
      case 'unchanged':
        return [];
      default:
        throw new Error(`Unknown status: '${obj.status}'!`);
    }
  }).join('\n');
  return result;
};

export default makePlain;
