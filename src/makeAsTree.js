import _ from 'lodash';

const makeAsTree = (obj1, obj2) => {
   const allKeys = _.sortBy(Object.keys({ ...obj1, ...obj2 }));
   let result = {};
  allKeys.forEach((key) => {
    if (!_.isObject(obj1[key]) && !_.isObject(obj2[key])) {
      if (obj1.hasOwnProperty(key) && !obj2.hasOwnProperty(key)) {
        result[`- ${key}`] = obj1[key];
      } else if (!obj1.hasOwnProperty(key) && obj2.hasOwnProperty(key)) {
        result[`+ ${key}`] = obj2[key];
      } else if (obj1[key] !== obj2[key]) {
        result[`- ${key}`] = obj1[key];
        result[`+ ${key}`] = obj2[key];
      } else {
        result[`  ${key}`] = obj1[key];
      }
    }
    if (_.isObject(obj1[key]) && _.isObject(obj2[key])) {
      const nestedDiff = makeAsTree(obj1[key], obj2[key]);
      if (nestedDiff) {
        result[`  ${key}`] = nestedDiff;
      }
    }

    if (_.isObject(obj1[key]) && !obj2.hasOwnProperty(key)) {
      result[`- ${key}`] = obj1[key];
    }

    if (!obj1.hasOwnProperty(key) && _.isObject(obj2[key])) {
      result[`+ ${key}`] = obj2[key];
    }
  });

  return result;
 };

 export default makeAsTree;