//  punctuation-cleanup.js
//  use:   $ node punctuation-cleanup.js  file-to-clean.txt  cleaned-file.txt
/*
 * MIT license http://opensource.org/licenses/MIT
 *
 * Author: rsperberg@gmail.com
 */

var fs = require("fs");

//  identify each type of change, particularly for the apostrophe, since global change (e.g., /.'./g or /(\w|\d)'(\w|\d)/g) is just too risky
//  By making only known changes, stray apostrophes and quotes (that elude characterization or rules) can be located easily
//  Not yet defined:  single quotes within double quotes
//  Not yet defined:  height, e.g., he was 6'2"
//  Not yet defined:  code sections
//  Not yet defined:  attribute values within HTML or XML markup

var replacements = [
    { searchFor: /'d\b/g, replaceWith: "’d"},    // I'd
    { searchFor: /'ll\b/g, replaceWith: "’ll"},    //  you'll
    { searchFor: /'m\b/g, replaceWith: "’m"},    //  I'm
    { searchFor: /'re\b/g, replaceWith: "’re"},    //  you're
    { searchFor: /'(s|S)\b/g, replaceWith: "’$1"},    //  it's, GRIMM'S
    { searchFor: /s'(\s)/g, replaceWith: "s’$1"},    //  plural possessive
    { searchFor: /'st\b/g, replaceWith: "’st"},    //  look'st (Rime of the Ancient Mariner)
    { searchFor: /'t\b/g, replaceWith: "’t"},   //  don't
    { searchFor: /'ve\b/g, replaceWith: "’ve"},   //  I've
    { searchFor: /(\s)'(\d\ds)/g, replaceWith: "$1’$2"},   //  ’90s
    { searchFor: /O'([A-Z])/g, replaceWith: "O’$1"},    //  O'Reilly
    { searchFor: /o'clock/g, replaceWith: "o’clock"},    //  o'clock
    { searchFor: /(o|e)'e/g, replaceWith: "$1’e"},    //  o'er, ne'er (as in Rime of the Ancient Mariner)
    { searchFor: /'(em)\b/g, replaceWith: "’em"},    //  'em  (Rime)
//    { searchFor: /",/g, replaceWith: ',”'},    // comma outside quote mark
//    { searchFor: /"\./g, replaceWith: '.”'},    // period outside quote mark (transpose only)
    { searchFor: /"\b/g, replaceWith: '“'},    //  open quote (eg, precedes a 'word boundary')
    { searchFor: /\b"/g, replaceWith: '”'},    //  close quote (eg, is preceded by a 'word boundary') needs to be set to follow punctuation as well
    { searchFor: /^(\s*)?"'\b/gm, replaceWith: '$1“‘'},    //  open double quote preceding open single quote at line beginning (eg, precedes a 'word boundary')
    { searchFor: / '([A-Z])/g, replaceWith: " ‘$1"},    //  'Word (inner quote) (general principle of open single quote)
    { searchFor: / '([a-z])/g, replaceWith: " ‘$1"},    //  'word (inner quote with lower case, as found in Heart of Darkness)
//  should these be /(\s)'(\w)/g  ?
    { searchFor: /\b([\.|,|\?|!|;|:|-])"/g, replaceWith: '$1”'},    //  close quote after period (eg, is preceded by a 'word boundary')
    { searchFor: /(\w|,|\.|\?|!|;|:|-)' /g, replaceWith: "$1’ "},    //  close single quote and space after period etc
    { searchFor: /(\w|,|\.|\?|!|;|:|-)'$/gm, replaceWith: "$1’"},    //  close single quote after period etc at end of line
    { searchFor: /(\w)'; /g, replaceWith: "$1’; "},    //  apostrophe after character followed by semi-colon and space
    { searchFor: /'(Twas|Tis|Twere|twas|tis|twere)/g, replaceWith: '’$1'},    //  'Twas, 'tis
    { searchFor: / -(-)? /g, replaceWith: " — "},    //  em dash between spaces
    { searchFor: /(\w)-- /g, replaceWith: "$1— "},    //  em dash after character followed by space
    { searchFor: /(\?)--\b/g, replaceWith: "$1—"},    //  em dash after question mark followed by word boundary
    { searchFor: /(\w|!|,|\?|”)--$/gm, replaceWith: "$1—"},    //  em dash after character at end of line
    { searchFor: /(\w|”)--(\w|“|\s)/gm, replaceWith: "$1—$2"},    //  em dash between characters (and between quotes)
    { searchFor: / '(C)/g, replaceWith: " ’$1"},    //  'Change (Heart of Darkness)
    { searchFor: /(:|,) '_(\w)/g, replaceWith: "$1 ‘_$2"},   //  italic inside single quote, markdown (Youth)
    { searchFor: /(D|d)'ye/g, replaceWith: "$1’ye"}   //  d'ye (Heart of Darkness)
];

var inFile = process.argv[2] || '/dev/stdin';
var outFile = process.argv[3]  ||  'build/cleaned-file';

// or use package.json script: cleanup to read rime.txt via cat
var aFile = fs.readFile(inFile, 'utf8', function (err,data) {
    if (err) {
        return console.log(err);
    }

    //  for each object in the replacements array, go through the document and make the replacement
    function cleanUp(someFile) {
        replacements.forEach(function(replacement) {
            someFile = someFile.replace(replacement.searchFor, replacement.replaceWith);
        })
        return someFile;
   }
    var result = cleanUp(data);
    // now pipe the result to be stored in build/rime.txt
//    console.log(result);  //  uncomment if using npm cleanup

    fs.writeFile(outFile, result, function (err) {
        if (err) throw err;
        console.log('It\'s saved!');
    });

});
