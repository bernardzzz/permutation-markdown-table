#! /usr/bin/env node

'use strict'
const program = require('commander');
const { version, description } = require('../package.json')
const { inputAsync } = require('../src/input.js');
const { processor } = require('../src/process.js');
const { markdownGenerator } = require('../src/markdown.js');
const { outputAsync } = require('../src/output.js');


program
    .version(version)
    .usage('[options]')
    .description(description)
    .option('-i, --input <value>', 'path to the input file, from stdin by default')
    .option('-o, --output <value>', 'path to the output file, to stdout by default')
    .parse(process.argv)


async function main() {
    debugger
    try {
        const dataset = await inputAsync(program.input);
        const permutation = processor(dataset);
        const text = markdownGenerator(permutation, dataset);
        await outputAsync(program.output, text);
    } catch(err) {
        console.log(err.message);
        process.exit(-1);
    }
}

main();
