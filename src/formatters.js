import _ from 'lodash';

const makeStylish = (values) => {
   const space = " ";
   const spaceCount = 1;
   const iter = (data, depth) => {
     if (!_.isObject(data)) return `${data}`;
     const lines = Object.entries(data).map(([key, value]) => {
       const preparedValue = iter(value, depth + 4);
       const spaces = space.repeat(depth * spaceCount + 1);
       return `${spaces}${key}: ${preparedValue}`;
     });
     const outSpace = space.repeat(depth * spaceCount - spaceCount);
     const result = ["{", ...lines, `${outSpace}}`].join("\n");
     return result;
   };
   return iter(values, 1);
 };

 export default makeStylish;