import _ from 'lodash';
// import genDiff from '../index.js';

const leftIndent = (depth, replacer = ' ') => replacer.repeat((depth * 4) + 2);
const bracketIndent = (depth, replacer = ' ') => replacer.repeat(depth * 4);

const stringify = (data, depth) => {
  if (!_.isObject(data)) {
    return data;
  }
  const lines = Object.keys(data).map(
    (key) => `${leftIndent(depth)}  ${key}: ${stringify(data[key], depth + 1)}`
  );
  return `{\n${lines.join('\n')}\n${bracketIndent(depth)}}`;
};

const stylish = (diff) => {
  const iter = (data, depth) => {
    const lines = data.map((node) => {
      if (node.type === 'added') {
        return `${leftIndent(depth)}+ ${node.key}: ${stringify(
          node.value,
          depth + 1
        )}`;
      }
      if (node.type === 'removed') {
        return `${leftIndent(depth)}- ${node.key}: ${stringify(
          node.value,
          depth + 1
        )}`;
      }
      if (node.type === 'saved') {
        return `${leftIndent(depth)}  ${node.key}: ${stringify(
          node.value,
          depth + 1
        )}`;
      }
      if (node.type === 'changed') {
        return [
          `${leftIndent(depth)}- ${node.key}: ${stringify(
            node.value1,
            depth + 1
          )}`,
          `${leftIndent(depth)}+ ${node.key}: ${stringify(
            node.value2,
            depth + 1
          )}`,
        ].join('\n');
      }
      if (node.type === 'nested') {
        return `${leftIndent(depth)}  ${node.key}: ${iter(
          node.children,
          depth + 1
        )}`;
      }
    });
    return `{\n${lines.join('\n')}\n${bracketIndent(depth)}}`;
  };
  return iter(diff, 0);
};

// console.log(stylish(genDiff('/home/eweparo4ky/frontend-project-46/__fixtures__/file1.json', '/home/eweparo4ky/frontend-project-46/__fixtures__/file2.json')))
export default stylish;
