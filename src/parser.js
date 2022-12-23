import yaml from 'js-yaml';

const parse = (data, extension) => {
  if (extension === '.json') {
    return JSON.parse(data);
  }
  if (extension === '.yaml' || extension === '.yml') {
    return yaml.load(data);
  }
  throw new Error('This file type is not supported');
};

export default parse;
