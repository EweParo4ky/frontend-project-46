import parse from './parser.js';
import getDifference from './getDifference.js';
import formatter from './formatters/index.js';

const genDiff = (file1, file2, formatType = 'stylish') => {
  const data1 = parse(file1);
  const data2 = parse(file2);
  const tree = getDifference(data1, data2);
  return formatter(tree, formatType);
};
export default genDiff;
