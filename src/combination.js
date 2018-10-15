'use strict';

const _ = require('lodash');

function singularElementCombination(dataset) {
    if (_.isEmpty(dataset)) {
        return [];
    }

    let result = [];

    for (let key in dataset) {
        if (Array.isArray(dataset[key])) {
            for (let i = 0, l = dataset[key].length; i < l; i++) {
                result = result.concat(singularElementCombination(Object.assign({}, _.cloneDeep(dataset), {
                    [key]: dataset[key][i]
                })));
            }
            break;
        }
    }

    if (result.length === 0) {
        result.push(dataset);
    }

    return result;
}

exports.singularElementCombination = singularElementCombination;
