import { test, expect } from '@jest/globals';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import genDiff from '../src/gendiff.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

console.log('sample', readFile('flatTestSample.txt').trim(), typeof readFile('flatTestSample.txt'));
console.log('function', genDiff(getFixturePath('flatFile1.json'), getFixturePath('flatFile2.json')), typeof genDiff(getFixturePath('flatFile1.json'), getFixturePath('flatFile2.json')));

test('flat JSON', () => {
  const expectedResult = readFile('flatTestSample.txt');
  expect(genDiff(getFixturePath('flatFile1.json'), getFixturePath('flatFile2.json'))).toEqual(expectedResult);
});

test('flat YAML', () => {
  const expectedResult = readFile('flatTestSample.txt');
  expect(genDiff(getFixturePath('flatFile1.yaml'), getFixturePath('flatFile2.yaml'))).toEqual(expectedResult);
});
