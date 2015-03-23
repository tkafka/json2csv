# json2csv-tk

Convert json (array of objects) or json lines (like MongoHub export, every line is a valid json object) to csv.

Works-on-my-pc, no tests :).

## TODO:

- write examples
- flatten objects ( `{ a: { b: c: 1 }}` -> "a.b.c" : 1)
- add options to sort keys, maybe exclude/include filter?
- add option to process multiple files and turn them into `<inputfile.replace(/\.csv$/i, '.csv')>`

## Examples


## How to use

Install

```bash
$ npm install -g json2csv-tk
```

## Command Line Interface

```bash
Usage: json2csv-tk <files>
```

### CLI examples

#### Input file and specify fields

```bash
$ json2csv-tk input.json
```

## Formatting json2csv

Requires js-beautify.

Run

```bash
$ make format
```

or

```bash
$ npm run-script format
```

## Contributors

Install require packages for development run following command under json2csv dir.

Run

```bash
$ npm install
```

Could you please make sure code is formatted and test passed before submit Pull Requests?

See Testing and Formatting json2csv above.

## But I want streams!

Check out my other module [json2csv-stream](https://github.com/zeMirco/json2csv-stream). It transforms an incoming
stream containing `json` data into an outgoing `csv` stream.

## License

Copyright (C) 2012 [Mirco Zeiss](mailto: mirco.zeiss@gmail.com)

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
