import _ from "lodash";
import parse from './parsers.js';
// const file1 = {
//   "host": "hexlet.io",
//   "timeout": 50,
//   "proxy": "123.234.53.22",
//   "follow": false
// };

// const file2 = {
//   "timeout": 20,
//   "verbose": true,
//   "host": "hexlet.io"
// };

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

  return result;
}

export default genDiff;