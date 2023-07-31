#!/usr/bin/env node

import { program } from 'commander';

program
  .description('Compares two configuration files and shows a difference.')
  .argument('<filepath1>')
  .argument('<filepath2>')
  .version('1.0.0', '-V, --version')
  .option('-f, --format <type>', 'output format');
  program.parse();