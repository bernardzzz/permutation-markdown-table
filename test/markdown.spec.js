const test = require('tape');
const { textPadding, rightPadding } = require('../src/markdown.js');

test('textPadding should add padding spaces at both right side and left side of the text to the given length', t => {
    t.plan(5)

    let result = textPadding('abc', 0);
    t.equal(result, 'abc');

    result = textPadding('abc', 3);
    t.equal(result, 'abc');

    result = textPadding('abc', 4);
    t.equal(result, ' abc');

    result = textPadding('abc', 5);
    t.equal(result, ' abc ');

    result = textPadding('abc', 6);
    t.equal(result, '  abc ');
    t.end();
})

test('right padding should add padding spaces to the right side of the string to the given length', t => {

    let result = rightPadding('abc', 0);
    t.equal(result, 'abc');

    result = rightPadding('abc', 3);
    t.equal(result, 'abc');

    result = rightPadding('abc', 4);
    t.equal(result, ' abc');

    result = rightPadding('abc', 5);
    t.equal(result, ' abc ');

    result = rightPadding('abc', 6);
    t.equal(result, ' abc  ');

    result = rightPadding('abc', 7);
    t.equal(result, ' abc   ');

    t.end();
})
