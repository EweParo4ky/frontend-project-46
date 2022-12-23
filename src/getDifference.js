import _ from 'lodash';

const getDifference = (data1, data2) => {
  const keys1 = Object.keys(data1);
  const keys2 = Object.keys(data2);
  const keys = _.sortBy(_.union(keys1, keys2));
  const makeDifference = keys.map((key) => {
    if (_.isPlainObject(data1[key]) && _.isPlainObject(data2[key])) {
      return {
        key,
        type: 'nested',
        children: getDifference(data1[key], data2[key]),
      };
    }

    if (!_.has(data1, key)) {
      return { key, type: 'added', value: data2[key] };
    }

    if (!_.has(data2, key)) {
      return { key, type: 'removed', value: data1[key] };
    }

    if (!_.isEqual(data1[key], data2[key])) {
      return {
        key,
        type: 'updated',
        value1: data1[key],
        value2: data2[key],
      };
    }
    return { key, type: 'unchanged', value: data1[key] };
  });
  return makeDifference;
};
// console.log(getDifference(data1, data2));
export default getDifference;
