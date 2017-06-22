const test = require('tape');
const _ = require('lodash');
const { singularElementCombination } = require('../src/combination');

test('singularElementCombination should return empty array when the data source is empty', t => {
    t.plan(2);

    const result = singularElementCombination({});

    t.equal(Array.isArray(result), true);

    t.equal(result.length, 0);

    t.end();
})

test('singularElementCombination should return all the combination with on element in each field', t => {

    const sample = {
        a: ['a', 'b', 'c'],
        b: ['d', 'e'],
        c: 'f'
    };

    const result = singularElementCombination(sample);

    t.equal(Array.isArray(result), true);

    t.equal(result.length, 6);

    let target = result.find( combination => _.isEqual( combination, {
        a: 'a',
        b: 'd',
        c: 'f',
    }));
    t.equal(_.isObject(target), true);

    target = result.find ( combination => _.isEqual(combination, {
        a: 'a',
        b: 'e',
        c: 'f',
    }))
    t.equal(_.isObject(target), true);

    target = result.find ( combination => _.isEqual(combination, {
        a: 'b',
        b: 'd',
        c: 'f',
    }))
    t.equal(_.isObject(target), true);

    target = result.find ( combination => _.isEqual(combination, {
        a: 'b',
        b: 'e',
        c: 'f',
    }))
    t.equal(_.isObject(target), true);

    target = result.find ( combination => _.isEqual(combination, {
        a: 'c',
        b: 'd',
        c: 'f',
    }))
    t.equal(_.isObject(target), true);

    target = result.find ( combination => _.isEqual(combination, {
        a: 'c',
        b: 'e',
        c: 'f',
    }))
    t.equal(_.isObject(target), true);


    t.end();
})
