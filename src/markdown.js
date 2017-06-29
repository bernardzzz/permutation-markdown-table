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

    // Calculate the String Buffer needed
    const lineSize = colWidths.reduce((sum, width) => sum + width + 3, 0) + 1 + 1
    const bufferSize = (lineSize + 2) * ( permutation.length + 2 );
    const buf = Buffer.alloc(bufferSize);
    let bufOffset = 0;

    // add extra padding to column widths
    colWidths = colWidths.map( widths => widths + 2);

    // Add markdown header
    buf.write('|', bufOffset);
    bufOffset += 1;
    for(let i = 0; i < tableHeader.length; i++) {
        let writable = rightPadding(tableHeader[i], colWidths[i]) + '|'
        buf.write(writable, bufOffset);
        bufOffset += writable.length;
    }
    buf.write('\n', bufOffset);
    bufOffset += 1;

    // Add markdown divider
    buf.write('|', bufOffset);
    bufOffset += 1;
    for(let i = 0; i < tableHeader.length; i++) {
        let divider = '';
        for(let j = 0; j < colWidths[i]; j++) {
            divider += '-';
        }
        divider = divider + '|'
        buf.write(divider, bufOffset);
        bufOffset += divider.length;
    }
    buf.write('\n', bufOffset);
    bufOffset += 1;

    // Add table body
    for(let i = 0; i < permutation.length; i++) {
        const textMap = {};
        for(let key in permutation[i]) {
            const idx = keyToIdx[key];
            textMap[key] = rightPadding(`${permutation[i][key]}`, colWidths[idx]) + '|';
        }

        buf.write('|', bufOffset);
        bufOffset += 1;
        tableHeader.forEach( headname => {
            buf.write(textMap[headname], bufOffset);
            bufOffset += textMap[headname].length
        })
        buf.write('\n', bufOffset);
        bufOffset += 1;

    }

    return buf.toString();
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
