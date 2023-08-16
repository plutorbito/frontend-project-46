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
    const result2 = getRightLayout(result, depth);
    return result2;
  }
  return `${tree}`;
};

const makeStylish = (values) => {
  const iter = (data, depth) => {
    const lines = data.map((obj) => {
      switch (obj.status) {
        case 'nested changes':
          return `${getSpaces(depth)}${'  '}${obj.key}: ${iter(obj.value, depth + 1)}`;
        case 'unchanged':
          return `${getSpaces(depth)}${'  '}${obj.key}: ${transformTree(obj.value, depth + 1)}`;
        case 'removed':
          return `${getSpaces(depth)}${'- '}${obj.key}: ${transformTree(obj.value, depth + 1)}`;
        case 'added':
          return `${getSpaces(depth)}${'+ '}${obj.key}: ${transformTree(obj.value, depth + 1)}`;
        case 'changed':
          return `${getSpaces(depth)}${'- '}${obj.key}: ${transformTree(obj.removedValue, depth + 1)}\n${getSpaces(depth)}${'+ '}${obj.key}: ${transformTree(obj.addedValue, depth + 1)}`;
        default:
          throw new Error(`Unknown status: '${obj.status}'!`);
      }
    });
    const result = getRightLayout(lines, depth);
    return result;
  };
  return iter(values, 1);
};

export default makeStylish;
