import _ from 'lodash';

const makeTree = (obj1, obj2) => {
  const allKeys = _.sortBy(Object.keys({ ...obj1, ...obj2 }));
  let result = [];
  allKeys.forEach((key) => {
    if (_.isObject(obj1[key]) && _.isObject(obj2[key])) {
      const nestedDiff = makeTree(obj1[key], obj2[key]);
      if (nestedDiff) {
        result.push({ key: key, value: nestedDiff, status: "unchanged" });
      }
    }

    if (!_.isObject(obj1[key]) || !_.isObject(obj2[key])) {
      if (obj1.hasOwnProperty(key) && !obj2.hasOwnProperty(key)) {
        result.push({ key: key, value: obj1[key], status: "removed" });
      } else if (!obj1.hasOwnProperty(key) && obj2.hasOwnProperty(key)) {
        result.push({ key: key, value: obj2[key], status: "added" });
      } else if (obj1[key] !== obj2[key]) {
        result.push({ key: key, value: obj1[key], status: "removed" });
        result.push({ key: key, value: obj2[key], status: "added" });
      } else {
        result.push({ key: key, value: obj1[key], status: "unchanged" });
      }
    }
  });

  return result;
 };

 export default makeTree;