import _ from 'lodash';

const makeAsTree = (obj1, obj2) => {
   const allKeys = _.sortBy(Object.keys({ ...obj1, ...obj2 }));
   let differenceData = [];
   allKeys.forEach((key) => {
    if (!_.isObject(obj1[key]) && !_.isObject(obj2[key])) {
      if (obj1.hasOwnProperty(key) && !obj2.hasOwnProperty(key)) {
        differenceData.push(` - ${key}: ${obj1[key]}`);
      } else if (!obj1.hasOwnProperty(key) && obj2.hasOwnProperty(key)) {
        differenceData.push(` + ${key}: ${obj2[key]}`);
      } else if (obj1[key] !== obj2[key]) {
        differenceData.push(` - ${key}: ${obj1[key]}`);
        differenceData.push(` + ${key}: ${obj2[key]}`);
      } else {
        differenceData.push(`   ${key}: ${obj1[key]}`);
      }
    }
    if (_.isObject(obj1[key]) && _.isObject(obj2[key])) {
      const nestedDiff = makeAsTree(obj1[key], obj2[key]);
      if (nestedDiff) {
        differenceData.push(` ${key}: ${nestedDiff}`);
      }
    }

    if (_.isObject(obj1[key]) && !obj2.hasOwnProperty(key)) {
      differenceData.push(
        `- ${key}: ${JSON.stringify(obj1[key], null, 1).replace(/\"/g, "")}`
      );
    }

    if (!obj1.hasOwnProperty(key) && _.isObject(obj2[key])) {
      differenceData.push(
        `+ ${key}: ${JSON.stringify(obj2[key], null, 1).replace(/\"/g, "")}`
      );
    }
   });
 
   const result = ["{", ...differenceData, "}"].join("\n");
   return result;
 };

 export default makeAsTree;