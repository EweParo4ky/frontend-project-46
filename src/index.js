import parse from './parser.js';
import getDifference from './getDifference.js';

const genDiff = (file1, file2) => {
  const data1 = parse(file1);
  const data2 = parse(file2);
  return getDifference(data1, data2);
};
export default genDiff;
