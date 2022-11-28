import _ from "lodash";
import parse from './parser.js';

const genDiff = (file1, file2) => {
  const obj1= parse(file1);
  const obj2 = parse(file2)
  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);
  const keys = _.union(keys1, keys2);

  const objOfDifference = keys.reduce((acc, key) => {
    if (!Object.hasOwn(obj1, key)) {
      acc.push({ diff: '+', key, value: obj2[key] });
    }
    else if (obj1[key] === obj2[key]) {
      acc.push({ diff: ' ', key, value: obj1[key] });
    }
    else if (!Object.hasOwn(obj2, key)) {
      acc.push({ diff: '-', key, value: obj1[key] });
    }
    else {
      acc.push({ diff: '-', key, value: obj1[key] });
      acc.push({ diff: '+', key, value: obj2[key] });
    }
    return acc;
  }, []);

  const sortedDifference = _.sortBy(objOfDifference, 'key');
  const result = sortedDifference.map((obj) => ` ${obj.diff} ${obj.key}: ${obj.value}`).join(',\n');
  return `{\n${result}\n}`;
}

export default genDiff;