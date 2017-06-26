#! /usr/bin/env node

'use strict'

const { input } = require('../src/input.js');
const program = require('commander');
const { version } = require('../package.json')

program
    .version(version)
    .usage('The permutation-markdown-table utility process input from stdin or file and generate all possible permutations or combinations. Then it outputs a table of them in markdown sytax.')
    .option('-i, --input <value>', 'path to the input file, from stdin by default')
    .option('-o, --output <value>', 'path to the output file, to stdout by default')
    .parse(process.argv)


async function main() {
    const dataset = await input({
        source: program.input,
    });

}

main();
