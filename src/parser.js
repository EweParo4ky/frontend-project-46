
import path from "path";
import fs from 'fs';
import yaml from 'js-yaml';


const jsonParse = (json) => JSON.parse(fs.readFileSync(path.resolve(json)));
const ymlParser = (yml) => yaml.load(fs.readFileSync(path.resolve(yml)));

const getParser = (fileStr) => {
  const extension = path.extname(fileStr);
  if (extension === '.json') {
    return jsonParse;
  }
  if(extension === '.yaml' || extension === '.yml') {
    return ymlParser;
  }
  else {
    throw new Error('This file type is not supported');
  }
}

  const parse = (file) => {
    const fileToObject= getParser(file);
    return fileToObject(file);
  };

  export default parse;
