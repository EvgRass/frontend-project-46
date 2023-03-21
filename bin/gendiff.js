#!/usr/bin/env node

const { program } = require('commander');

program
  .name('gendiff')
  .description('Compares two configuration files and shows a difference.')
  .version('1.0.0', '-V, --version', 'output the version number')
  .helpOption('-h, --help', 'display help for command');

program.parse();