import { test, expect, describe } from '@jest/globals';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

const expectedResultStylish = readFile('stylishTestSample.txt');
const expectedResultPlain = readFile('plainTestSample.txt');
const expectedResultJson = readFile('jsonTestSample.txt');

describe('gendiff options test for diffrerent file format', () => {
  test.each([
    ['file1.json', 'file2.json', expectedResultStylish, 'stylish'],
    ['file1.json', 'file2.json', expectedResultPlain, 'plain'],
    ['file1.json', 'file2.json', expectedResultJson, 'json'],
    ['file1.yaml', 'file2.yaml', expectedResultStylish, 'stylish'],
    ['file1.yaml', 'file2.yaml', expectedResultPlain, 'plain'],
    ['file1.yaml', 'file2.yaml', expectedResultJson, 'json'],
  ])('Compares the operation of a "gendiff" function with different file (%s, %s) formats and the expected result', (file1, file2, expectedResult, formatType) => {
    expect(genDiff(getFixturePath(file1), getFixturePath(file2), formatType)).toBe(expectedResult);
  });
});
