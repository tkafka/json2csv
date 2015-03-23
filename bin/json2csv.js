#!/usr/bin/env node

var package = require('../package.json'),
	program = require('commander'),
	Promise = require('bluebird'),
	objutils = require('objutils'),
	fs = Promise.promisifyAll(require("fs")),
	os = require('os'),
	path = require('path');

program
	.version(package.version)
	.usage('[options] <file>')
	.parse(process.argv);

var promise = Promise.resolve();
var fileNames = program.args;

fileNames.forEach(function (fileName) {
	promise = promise.then(function () {
		return processFile(fileName)
			.catch(function (e) {
				// console.error(e);
				process.exit(1);
			});
	});
});


function processFile(fileName) {
	return getInput(fileName)
		.then(parseInput)
		// .then(console.log)
		.then(jsonToCsv)
}

function jsonToCsv(jsonArray) {
	// keys
	var keys = {};
	jsonArray.forEach(function (line) {
		objutils.objForEach(line, function(value, key) {
			keys[key] = true;
		})
	});

	// csv:
	var keysArr = Object.keys(keys);
	keysArr.sort();

	// header
	var lineStr = [];
	keysArr.forEach(function(key) {
		lineStr.push(key);
	});
	console.log(lineStr.join(','));

	// body
	jsonArray.forEach(function (line) {
		var lineStr = [];
		keysArr.forEach(function(key) {
			lineStr.push(line.hasOwnProperty(key) ? line[key].toString() : '');
		});

		console.log(lineStr.join(','));
	});



}

function parseInput(str) {
	try {
		return JSON.parse(str);
	} catch (e) {
		console.error('Couldn\'t parse as JSON, trying to parse individual lines ...');

		var lines = str.split(/[\r\n]+/);
		var i = 0;
		var jsonArray = lines.reduce(function (arr, line) {
			i++;
			try {
				if (!line.match(/^\s*$/)) {
					arr.push(JSON.parse(line));
				}
			} catch (e) {
				console.error('Error parsing line as standalone json ' + i + ', ignoring: ' + line);
			}
			return arr;
		}, []);
		return jsonArray;
	}
}

function getInput(fileName) {
	if (fileName) {
		return fs.readFileAsync(fileName)
			.then(function (buffer) {
				return buffer.toString();
			});
	} else {
		return new Promise(function (resolve, reject) {
			var input = '';
			process.stdin.resume();
			process.stdin.setEncoding('utf8');

			process.stdin.on('data', function (chunk) {
				input += chunk;
			});
			process.stdin.on('error', function (err) {
				reject(err);
			});
			process.stdin.on('end', function () {
				resolve(input);
			});
		});
	}
}