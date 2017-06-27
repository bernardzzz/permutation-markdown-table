'use strict';

const Promise = require('bluebird');
const fs = Promise.promisifyAll(require('fs'));

async function outputAsync(dest, text) {
    try {
        if(dest) {
            return await outputToFile(dest, text);

        } else {
            return await outputToStdout(text);
        }
    } catch(err) {
        handleException(err);
    }
}

function outputToFile(dest, text) {
    return new Promise((resolve, reject) => {
        fs.writeFileAsync(dest, text)
            .then( data => resolve())
            .catch( err => reject(err))
    })
}

function outputToStdout(text) {
    return new Promise((resolve) => {
        process.stdout.write(text);
        resolve();
    })
}

function handleException(error) {
    switch(error.cause.code) {
        case 'EISDIR':
            throw new Error(`Error: ${error.cause.path} is a directory, not a file.`);
            break;
        default:
            throw error;
    }
}

exports.outputAsync = outputAsync;
