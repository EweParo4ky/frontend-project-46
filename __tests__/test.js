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

const fileFormats = ['json', 'yaml'];

describe('gendiff options test for diffrerent file format', () => {
  test.each(fileFormats)('%s', (extension) => {
    const path1 = getFixturePath(`file1.${extension}`);
    const path2 = getFixturePath(`file2.${extension}`);

    expect(genDiff(path1, path2, 'stylish')).toEqual(expectedResultStylish);
    expect(genDiff(path1, path2, 'plain')).toEqual(expectedResultPlain);
    expect(genDiff(path1, path2, 'json')).toEqual(expectedResultJson);
  });
});
