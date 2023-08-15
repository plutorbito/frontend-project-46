import _ from 'lodash';

const space = "  ";
const spaceCount = 2;

const getSpaces = (depth) => {
  const spaces = space.repeat(depth * spaceCount - 1);
  return spaces;
};

const makeStylish = (values) => {
  const iter = (data, depth) => {
    let lines;
    let preparedValue;
    if (Array.isArray(data)) {
      lines = data.map((obj) => {
        switch (obj.status) {
          case "nested changes":
          case "unchanged": {
            preparedValue = iter(obj.value, depth + 1);
            return `${getSpaces(depth)}${"  "}${obj.key}: ${preparedValue}`;
          }
          case "removed": {
            preparedValue = iter(obj.value, depth + 1);
            return `${getSpaces(depth)}${"- "}${obj.key}: ${preparedValue}`;
          }
          case "added": {
            preparedValue = iter(obj.value, depth + 1);
            return `${getSpaces(depth)}${"+ "}${obj.key}: ${preparedValue}`;
          }
          case "changed": {
            const preparedRemovedValue = iter(obj.removedValue, depth + 1);
            const preparedAddedValue = iter(obj.addedValue, depth + 1);
            return `${getSpaces(depth)}${"- "}${obj.key}: ${preparedRemovedValue}\n${getSpaces(depth)}${"+ "}${obj.key}: ${preparedAddedValue}`;
          }
          default:
            throw new Error(`Unknown status: '${obj.status}'!`);
        }
      });
    } else if (_.isObject(data)) {
      lines = Object.entries(data).map(([key, value]) => {
        preparedValue = iter(value, depth + 1);
        return `${getSpaces(depth)}${space}${key}: ${preparedValue}`;
      });
    } else return `${data}`;

    const outSpace = space.repeat(depth * spaceCount - spaceCount);
    const result = ["{", ...lines, `${outSpace}}`].join("\n");
    return result;
  };
  return iter(values, 1);
};
 export default makeStylish;