import _ from 'lodash';

const makeAsTree = (obj1, obj2) => {
   const allKeys = _.sortBy(Object.keys({ ...obj1, ...obj2 }));
   let differenceData = [];
   allKeys.forEach((key) => {
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
   });
 
   const result = ["{", ...differenceData, "}"].join("\n");
   return result;
 };

 export default makeAsTree;