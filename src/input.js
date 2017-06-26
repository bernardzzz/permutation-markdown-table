const Promise = require('bluebird');
const fs = Promise.promisifyAll(require('fs'));

async function inputAsync(opt) {
    try {
        if(opt.source) {
            await validateFile(opt.source);
            return await parseJSONFile(opt.source);
        }
        else {
            // read stream from stdin
            console.log('read stdin');
        }
        return ''
    } catch(err) {
        handleException(err)
    }
}

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

function parseJSONFile(filePath) {
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

function handleException(err) {
    switch(err.cause.code) {
        case 'ENOENT':
            throw new Error('Error: no such file, ' + err.cause.path);
            break;
        case 'ERROR_NOT_A_FILE':
            throw new Error('Error: ' + err.cause.path + ' is not a file');
            break;
        case 'ERROR_CANNOT_PARSE_JSON':
            throw new Error('Error: ' + err.cause.path + ' cannot be parsed as JSON file.');
            break;
        default:
            break;

    }
}

exports.inputAsync = inputAsync;
