import _ from 'lodash';

const stringify = (data) => {
  if (_.isObject(data)) {
    return '[complex value]';
  }
  if (_.isString(data)) {
    return `'${data}'`;
  }
  return data;
};

const plain = (diff) => {
  const iter = (data, valuePath) => {
    const lines = data.map((node) => {
      if (node.type === 'added') {
        return `Property '${valuePath}.${node.key}' was added with value: ${stringify(node.value)}`;
      }
      if (node.type === 'removed') {
        return `Property '${valuePath}.${node.key}' was removed`;
      }
      if (node.type === 'unchanged') {
        return [];
      }
      if (node.type === 'updated') {
        return `Property '${valuePath}.${node.key}' was updated. From ${stringify(node.value1)} to ${stringify(node.value2)}`;
      }
      if (node.type === 'nested') {
        return iter(node.children, `${valuePath}.${node.key}`);
      }
      throw new Error(`Unknown node type: '${node.type}'!`);
    });
    return lines
      .flatMap((line) => line)
      .join('\n')
      .replaceAll('\'.', '\'');
  };
  return iter(diff, '');
};

export default plain;
