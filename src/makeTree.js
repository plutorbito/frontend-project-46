import _ from 'lodash';

const makeTree = (obj1, obj2) => {
  const allKeys = _.sortBy(Object.keys({ ...obj1, ...obj2 }));
  let result;
  result = allKeys.map((key) => {
    if (_.isObject(obj1[key]) && _.isObject(obj2[key])) {
      const nestedDiff = makeTree(obj1[key], obj2[key]);
      return { key: key, value: nestedDiff, status: "nested changes" };
    }
    if (obj1.hasOwnProperty(key) && !obj2.hasOwnProperty(key)) {
      return { key: key, value: obj1[key], status: "removed" };
    }
    if (!obj1.hasOwnProperty(key) && obj2.hasOwnProperty(key)) {
      return { key: key, value: obj2[key], status: "added" };
    }
    if (obj1[key] !== obj2[key]) {
      return {
        key: key,
        removedValue: obj1[key],
        addedValue: obj2[key],
        status: "changed",
      };
    } else {
      return { key: key, value: obj1[key], status: "unchanged" };
    }
  });

  return result;
 };

 export default makeTree;