import fs from 'fs';
import path from 'path';
import parse from './parser.js';
import getDifference from './getDifference.js';
import format from './formatters/index.js';

const readFile = (filePath) => fs.readFileSync(path.resolve(filePath));
const getExtension = (fileStr) => path.extname(fileStr).slice(1);

const genDiff = (file1, file2, formatType = 'stylish') => {
  const data1 = parse(readFile(file1), getExtension(file1));
  const data2 = parse(readFile(file2), getExtension(file2));
  const diff = getDifference(data1, data2);
  return format(diff, formatType);
};
export default genDiff;
