import _ from 'lodash';

const space = '  ';
const spaceCount = 2;
const getSpaces = (depth) => space.repeat(depth * spaceCount - 1);

const getRightLayout = (lines, depth) => {
  const outSpace = space.repeat(depth * spaceCount - spaceCount);
  const result = ['{', ...lines, `${outSpace}}`].join('\n');
  return result;
};

const transformTree = (tree, depth = 1) => {
  if (Array.isArray(tree)) {
    return tree;
  }
  if (_.isObject(tree)) {
    const result = Object.entries(tree).map(([key, value]) => `${getSpaces(depth)}${space}${key}: ${transformTree(value, depth + 1)}`);
    return getRightLayout(result, depth);
  }
  return `${tree}`;
};

const makeStylish = (values) => {
  const iter = (data, depth) => {
    const lines = data.map((obj) => {
      const preparedValue = transformTree(obj.value, depth + 1);
      switch (obj.status) {
        case 'nested':
          return `${getSpaces(depth)}${'  '}${obj.key}: ${iter(obj.value, depth + 1)}`;
        case 'unchanged':
          return `${getSpaces(depth)}${'  '}${obj.key}: ${preparedValue}`;
        case 'removed':
          return `${getSpaces(depth)}${'- '}${obj.key}: ${preparedValue}`;
        case 'added':
          return `${getSpaces(depth)}${'+ '}${obj.key}: ${preparedValue}`;
        case 'changed': {
          const removedStr = `${getSpaces(depth)}${'- '}${obj.key}: ${transformTree(obj.removedValue, depth + 1)}`;
          const addedStr = `${getSpaces(depth)}${'+ '}${obj.key}: ${transformTree(obj.addedValue, depth + 1)}`;
          return `${removedStr}\n${addedStr}`;
        }
        default:
          throw new Error(`Unknown status: '${obj.status}'!`);
      }
    });
    return getRightLayout(lines, depth);
  };
  return iter(values, 1);
};

export default makeStylish;
