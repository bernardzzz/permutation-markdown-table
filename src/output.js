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
        await fs.writeFileAsync(dest, text)
            .then(() => resolve())
    })
}

function outputToStdout(text) {
    return new Promise((resolve) => {
        process.stdout.write(text);
        resolve();
    })
}

function handleException(error) {

}

exports.outputAsync = outputAsync;
