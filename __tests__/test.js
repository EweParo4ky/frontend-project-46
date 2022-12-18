import { test, expect } from '@jest/globals';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

console.log('sample', readFile('stylishTestSample.txt').trim(), typeof readFile('stylishTestSample.txt'));
console.log('function', genDiff(getFixturePath('file1.json'), getFixturePath('file2.json')), typeof genDiff(getFixturePath('file1.json'), getFixturePath('file2.json')));

test('flat JSON', () => {
  const expectedResult = readFile('stylishTestSample.txt');
  expect(genDiff(getFixturePath('file1.json'), getFixturePath('file2.json'))).toEqual(expectedResult);
});

test('flat YAML', () => {
  const expectedResult = readFile('stylishTestSample.txt');
  expect(genDiff(getFixturePath('file1.yaml'), getFixturePath('file2.yaml'))).toEqual(expectedResult);
});
