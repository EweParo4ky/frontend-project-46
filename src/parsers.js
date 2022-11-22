import * as fs from 'node:fs';
import * as path from 'node:path';
import { cwd } from 'node:process';
import _ from 'lodash';
import yaml from 'js-yaml';

const jsonParser = (json) => JSON.parse(json);

const ymlParser = (yml) => yaml.load(yml);

const getParser = (fileStr) => {
  const extension = _.last(fileStr.split('.'));
  switch (extension) {
    case 'json':
      return jsonParser;
    case 'yaml':
      return ymlParser;
    case 'yml':
      return ymlParser;
    default:
      throw new Error('File extension not supported');
  }
};

const parse = (file) => {
  const filePath = path.resolve(cwd(), file);
  const fileToObjectFunction = getParser(file);
  return fileToObjectFunction(fs.readFileSync(filePath, 'utf8'));
};

export default parse;