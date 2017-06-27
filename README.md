# permutation-markdown-table

This utility reads JSON in certain format from STDIN or a file, generates combination of values, and outputs to STDOUT or a file.

## Sample Input

```js
{
  	"breakfast": ["milk", "toast", "bacon & eggs"],
 	"lunch": ["sandwich", "oily Asian take-away"],
    "supper": "some microwave food",
    "snacks": ["Mars", "Oreo"],
    "budget": 9.99
}
```

## Input Schema

* Input should be a valid JSON in text
* Each field should be either a scalar value or an array of scalar values

## Sample Output

```markdown
| breakfast    | lunch                | supper              | snacks | budget |
|--------------|----------------------|---------------------|--------|--------|
| milk         | sandwich             | some microwave food | Mars   | 9.99   |
| milk         | sandwich             | some microwave food | Oreo   | 9.99   |
| milk         | oily Asian take-away | some microwave food | Mars   | 9.99   |
| milk         | oily Asian take-away | some microwave food | Oreo   | 9.99   |
| toast        | sandwich             | some microwave food | Mars   | 9.99   |
| toast        | sandwich             | some microwave food | Oreo   | 9.99   |
| toast        | oily Asian take-away | some microwave food | Mars   | 9.99   |
| toast        | oily Asian take-away | some microwave food | Oreo   | 9.99   |
| bacon & eggs | sandwich             | some microwave food | Mars   | 9.99   |
| bacon & eggs | sandwich             | some microwave food | Oreo   | 9.99   |
| bacon & eggs | oily Asian take-away | some microwave food | Mars   | 9.99   |
| bacon & eggs | oily Asian take-away | some microwave food | Oreo   | 9.99   |
```



## Usage

Read from STDIN and output to STDOUT

```bash
cat some.json | permutation-markdown-table
```

Read from file and output to STDOUT

```bash
permutation-markdown-table -i ./some.json
```

Output to a file

```bash
permutation-markdown-table -o ./test-case.md
```

## Options

| option              | description               | example           |
| ------------------- | ------------------------- | ----------------- |
| -h, —help           | output  usage information |                   |
| -V, —version        | output the version number |                   |
| -i, —input <value>  | path to the input file    | -i ./some.json    |
| -o, —output <value> | path to the output file   | -o ./test-case.md |



## Install

For convinience, the recommended installation is via NPM.

```bash
npm install -g permutation-markdown-table
```

