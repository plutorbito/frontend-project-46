import _ from 'lodash';

const makePlain = (data, path = '') => {
  if (Array.isArray(data)) {
    return data.flatMap((obj) => {
      switch (obj.status) {
        case 'removed':
          return [`Property '${path}${obj.key}' was removed`];
        case 'added':
          return [`Property '${path}${obj.key}' was added with value: ${makePlain(obj.value)}`];
        case 'nested changes':
          return makePlain(obj.value, `${path}${obj.key}.`);
        case 'changed':
          return [`Property '${path}${obj.key}' was updated. From ${makePlain(obj.removedValue)} to ${makePlain(obj.addedValue)}`];
        case 'unchanged':
          return [];
        default:
          throw new Error(`Unknown status: '${obj.status}'!`);
      }
    }).join('\n');
  }
  if (_.isObject(data)) {
    return ['[complex value]'];
  }
  if (_.isString(data)) {
    return [`'${data}'`];
  }
  return [`${data}`];
};

export default makePlain;