import _ from 'lodash';

const makeTree = (obj1, obj2) => {
  const allKeys = _.sortBy(Object.keys({ ...obj1, ...obj2 }));
  return allKeys.map((key) => {
    if (_.isObject(obj1[key]) && _.isObject(obj2[key])) {
      const nestedDiff = makeTree(obj1[key], obj2[key]);
      return { key, value: nestedDiff, status: 'nested' };
    }
    if (_.has(obj1, key) && !_.has(obj2, key)) {
      return { key, value: obj1[key], status: 'removed' };
    }
    if (!_.has(obj1, key) && _.has(obj2, key)) {
      return { key, value: obj2[key], status: 'added' };
    }
    if (obj1[key] !== obj2[key]) {
      return {
        key,
        removedValue: obj1[key],
        addedValue: obj2[key],
        status: 'changed',
      };
    }
    return { key, value: obj1[key], status: 'unchanged' };
  });
};

export default makeTree;
