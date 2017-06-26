const test = require('tape');
const { textPadding } = require('../src/markdown.js');

test('textPadding should add padding spaces at both right side and left side of the text to the given length', t => {

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
