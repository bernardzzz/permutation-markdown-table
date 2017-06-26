'use strict';
const { singularElementCombination } = require('./combination.js');
const { markdownGenerator } = require('./markdown.js');

function processor(dataset, mode) {
    if(mode) {

    } else {
        return singularElementCombination(dataset);
    }
}


exports.processor = processor;
