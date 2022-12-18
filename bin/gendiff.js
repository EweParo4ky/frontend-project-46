#!/usr/bin/env node
import { Command } from "commander";
import genDiff from "../src/index.js";

const program = new Command();

program
  .description("Compares two configuration files and shows a difference.")
  .version("0.0.1", "-V, --version", "output the version number")
  .option("-f, --formatType <type>", "output format", "stylish")
  .arguments("<filepath1> <filepath2>")
 

program.parse();

const [file1, file2] = program.args;

console.log(genDiff(file1, file2, program.opts().formatType));
