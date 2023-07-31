#!/usr/bin/env node

import { program } from 'commander';

program
   .description('Compares two configuration files and shows a difference.')
   .version('', '-V, --version');
   program.parse();