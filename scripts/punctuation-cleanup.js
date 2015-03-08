//  punctuation-cleanup.js
//  use:   $ node punctuation-cleanup.js  file-to-clean.txt  cleaned-file.txt
/*
 * MIT license http://opensource.org/licenses/MIT
 *
 * Author: rsperberg@gmail.com
 */

var fs = require("fs");
var replacements = require('./replacements');  //  file containing all the regex patterns and their replacements
var cleanup = require('./cleanup');  //  file containing the function that actually does the substitution

//  identify each type of change, particularly for the apostrophe, since global change (e.g., /.'./g or /(\w|\d)'(\w|\d)/g) is just too risky
//  By making only known changes, stray apostrophes and quotes (that elude characterization or rules) can be located easily
//  Not yet defined:  single quotes within double quotes
//  Not yet defined:  height, e.g., he was 6'2"
//  Not yet defined:  code sections
//  Not yet defined:  attribute values within HTML or XML markup

var inFile = process.argv[2] || '/dev/stdin';
var outFile = process.argv[3]  ||  'build/cleaned-file';

// or use package.json script: cleanup to read rime.txt via cat
var aFile = fs.readFile(inFile, 'utf8', function (err,data) {
    if (err) {
        return console.log(err);
    }

    var result = cleanup(data);
    // now pipe the result to be stored in build/rime.txt
//    console.log(result);  //  uncomment if using npm cleanup

    fs.writeFile(outFile, result, function (err) {
        if (err) throw err;
        console.log('It\'s saved!');
    });

});
