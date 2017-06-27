'use strict';

const _ = require('lodash');

function markdownGenerator(permutation, dataset) {

    // Extract table header and column widths
    const tableHeader = [];
    let colWidths = [];
    const keyToIdx = {};
    let count = 0;
    for(let key in dataset) {
        tableHeader.push(key);
        let colWidth = 0;
        if(Array.isArray(dataset[key])) {
            dataset[key].forEach( val => {
                colWidth = Math.max(`${val}`.length,colWidth, key.length);
            })
        } else {
            colWidth = Math.max(`${dataset[key]}`.length, key.length);
        }
        keyToIdx[key] = count;
        colWidths.push(colWidth);
        count++;
    }

    // add extra padding to column widths
    colWidths = colWidths.map( widths => widths + 2);

    // Add markdown header
    let text = tableHeader.reduce( (acc, headname, idx) => {
        return acc + rightPadding(headname, colWidths[idx]) + '|'
    }, '|');
    text = text + '\n';

    // Add markdown divider
    text += tableHeader.reduce( (acc, headname, idx) => {
        let divider = '';
        for(let i = 0; i < colWidths[idx]; i++) {
            divider += '-';
        }
        return acc + divider + '|'
    }, '|');
    text = text + '\n';

    // Add table body
    for(let i = 0; i < permutation.length; i++) {
        const textMap = {};
        for(let key in permutation[i]) {
            const idx = keyToIdx[key];
            textMap[key] = rightPadding(`${permutation[i][key]}`, colWidths[idx]) + '|';
        }
        let line = '';
        tableHeader.forEach( headname => {
            line += textMap[headname];
        })
        text += '|' + line + '\n';
    }


    return text;
}

/**
 * add padding spaces to both of sides of the given string to the given length.
 * If the given length is shorter than the given text, this function will return
 * the original text. When length difference can not be divided by 2, an extra
 * space will be added to the left side of the string.
 * @param  {string} text   source string
 * @param  {number} length length
 * @return {string}        padded text
 */
function textPadding(text, length) {
    if(text.length >= length) {
        return text;
    }
    let result = text;
    const lengthDiff = length - text.length;
    if(lengthDiff % 2 === 0 ) {
        result = inflateText(text, lengthDiff / 2);
    } else {
        result = inflateText(text, Math.floor(lengthDiff / 2));
        result = ' ' + result;
    }
    return result;
}

/**
 * add given number of spaces to both sides of the given string.
 * @param  {string} text   source string
 * @param  {number} length length
 * @return {string}        padded text
 */
function inflateText(text, length) {
    let result = text;
    for (let i = 0; i < length ; i++) {
        result = ' ' + result + ' ';
    }
    return result
}

function rightPadding(text, length) {
    if(text.length >= length) {
        return text;
    }
    let result = text;
    for(let i = 0; i < length - text.length - 1; i++) {
        result += ' ';
    }
    return ' ' + result;
}

exports.markdownGenerator = markdownGenerator;
exports.textPadding = textPadding;
exports.rightPadding = rightPadding;
