const _ = require('lodash');

function singularElementCombination(dataset) {

    if (_.isEmpty(dataset)) {
        return [];
    }

    let result = [];

    for (let key in dataset) {
        if(Array.isArray(dataset[key]) && dataset[key].length > 1) {
            for (let i = 0; i < dataset[key].length; i++) {
                result = result.concat(singularElementCombination(Object.assign({}, _.cloneDeep(dataset), {
                    [key]: dataset[key][i],
                })))
            }
            break;
        }
    }

    if(noArrayInField(dataset)) {
        result.push(dataset);
    }

    return result
}

function noArrayInField(dataset) {
    let hasFoundArray = false;
    for(key in dataset) {
        if(Array.isArray(dataset[key])) {
            hasFoundArray = true;
            break;
        }
    }
    return !hasFoundArray;
}

exports.singularElementCombination = singularElementCombination;
