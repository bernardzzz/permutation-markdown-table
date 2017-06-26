'use strict';

const _ = require('lodash');

function markdownGenerator(permutation) {
    const tableHeader = []
    let colWidths = []

    // extract table header
    for(let i = 0; i < permutation.length; i++) {
        if(_.isObject(permutation[i])) {
            for(let key in permutation[i]) {
                if(!tableHeader.find( headname => headname === key)) {
                    tableHeader.push(key);
                    colWidths.push(0);
                }
                const idx = tableHeader.findIndex( headname => headname === key);
                colWidths[idx] = permutation[i][key].length > colWidths[idx] ? permutation[i][key].length : colWidths[idx]
            }
        }
    }

    // Add markdown header
    let text = tableHeader.reduce( (acc, headname, idx) => {
        return acc + textPadding(headname, colWidths[idx]) + '|'
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

    for(let i = 0; i < permutation.length; i++) {
        const textMap = tableHeader.reduce( (acc, curr) => {
            acc[curr] = '';
            return acc;
        }, {});
        for(let key in permutation[i]) {
            const idx = tableHeader.findIndex( headname => headname === key);
            textMap[key] = textPadding(permutation[i][key], colWidths[idx]) + '|';
        }

        const line = tableHeader
            .map( headname => textMap[headname])
            .reduce( (acc, curr) => acc + curr, '');
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

exports.markdownGenerator = markdownGenerator;
exports.textPadding = textPadding;
