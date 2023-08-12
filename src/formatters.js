import _ from 'lodash';

const getStatusIndicator = (obj) => {
  switch (obj.status) {
    case "unchanged":
      return "  ";
    case "removed":
      return "- ";
    case "added":
      return "+ ";
    default:
      throw new Error(`Unknown status: '${obj.status}'!`);
  }
};

const makeStylish = (values) => {
  const space = "  ";
  const spaceCount = 2;
  const iter = (data, depth) => {
    let lines = [];
    const spaces = space.repeat(depth * spaceCount - 1);
    let preparedValue;
    if (Array.isArray(data)) {
      lines = data.map((obj) => {
        const status = getStatusIndicator(obj);
        preparedValue = iter(obj.value, depth + 1);
        return `${spaces}${status}${obj.key}: ${preparedValue}`;
      });
    } else if (_.isObject(data)) {
      lines = Object.entries(data).map(([key, value]) => {
        preparedValue = iter(value, depth + 1);
        return `${spaces}${space}${key}: ${preparedValue}`;
      });
    } else return `${data}`;

    const outSpace = space.repeat(depth * spaceCount - spaceCount);
    const result = ["{", ...lines, `${outSpace}}`].join("\n");
    return result;
  };
  return iter(values, 1);
 };

 export default makeStylish;