#! /usr/bin/env node

'use strict'

const program = require('commander');

program
    .option('-i, --input <value>', 'path to the input file, from stdin by default')
    .option('-o, --output <value>', 'path to the output file, to stdout by default')
    .parse(process.argv)


console.log(program.output);
