'use strict';

const Promise = require('bluebird');
const fs = Promise.promisifyAll(require('fs'));

//////////////////////////////////
// Begining of Input Processing //
//////////////////////////////////


async function inputAsync(source) {
    try {
        if(source) {
            await validateFile(opt.source);
            return await parseJSONFromFile(opt.source);
        }
        else {
            return await parseJSONFromStdin();
        }
    } catch(err) {
        handleException(err)
    }
}

/////////////////////////////
// End of Input Processing //
/////////////////////////////


function validateFile(filePath) {
    return fs.statAsync(filePath)
    .then(stats => {
        if(!stats.isFile()) {
            const err = new Error()
            err.cause = {
                code: 'ERROR_NOT_A_FILE',
                path: filePath,
            }
            throw err;
        }
    })
}

function parseJSONFromFile(filePath) {
    return fs.readFileAsync(filePath, 'utf8')
    .then(data => {
        try {
            return JSON.parse(data)
        } catch(err) {
            const error = new Error();
            error.cause = {
                code: 'ERROR_CANNOT_PARSE_JSON',
                path: 'filePath',
            };
            throw error;
        }
    })
}

function parseJSONFromStdin() {
    return new Promise((resolve, reject) => {
        let data = '';
        process.stdin.setEncoding('utf8');
        process.stdin.on('readable', () => {
            const chunk = process.stdin.read();
            if(chunk) {
                data += chunk;
            } else if (chunk === null) {
                process.stdin.end();
            }
        })

        process.stdin.on('close', () => {
            if(data) {
                try {
                    resolve(JSON.parse(data));
                } catch(err) {
                    const error = new Error();
                    error.cause = {
                        code: 'ERROR_CANNOT_PARSE_JSON',
                        path: 'stdin',
                    }
                    reject(error);
                }
            } else {
                const err = new Error();
                err.cause = {
                    code : 'ERROR_EMPTY_STDIN',
                }
                reject(err);
            }
        })
    })
}

function handleException(err) {
    switch(err.cause.code) {
        case 'ENOENT':
            throw new Error('Error: no such file, ' + err.cause.path);
            break;
        case 'ERROR_NOT_A_FILE':
            throw new Error('Error: ' + err.cause.path + ' is not a file.');
            break;
        case 'ERROR_CANNOT_PARSE_JSON':
            throw new Error('Error: ' + err.cause.path + ' cannot be parsed as JSON file.');
            break;
        case 'ERROR_EMPTY_STDIN':
            throw new Error('Error: no input.')
            break;
        default:
            throw err;
            break;

    }
}

exports.inputAsync = inputAsync;
