/*eslint-env node, mocha */
var chai = require('chai');
var assert = chai.assert,
    expect = chai.expect,
    should = chai.should();

var replacements = require('../scripts/replacements.js');
var cleanup = require('../scripts/cleanup.js');

describe("common contractions", function() {
    it("should fix I'd", function() {
        var testString = "But they'd never met anyone from LoD.  Even some of the";  // Hacker Crackdown
        var tryThis = cleanup(testString);
        expect(tryThis).to.equal("But they’d never met anyone from LoD.  Even some of the")
    });
    it("should fix he'll", function() {
        var testString = "He'll shrieve my soul, he'll wash away";  // Rime of the Ancient Mariner
        var tryThis = cleanup(testString);
        expect(tryThis).to.equal("He’ll shrieve my soul, he’ll wash away")
    });
    it("should fix I'm", function() {
        var testString = "SCARED of a guy like that.  But I'm not scared.\nI'm from Chicago.  I'm gonna hunt him down.";  // Hacker Crackdown
        var tryThis = cleanup(testString);
        expect(tryThis).to.equal("SCARED of a guy like that.  But I’m not scared.\nI’m from Chicago.  I’m gonna hunt him down.")
    });
    it("should fix you're", function() {
        var testString = "They're not black or white, or Establishment or Underground,";  // Hacker Crackdown
        var tryThis = cleanup(testString);
        expect(tryThis).to.equal("They’re not black or white, or Establishment or Underground,")
    });
    it("should fix it's", function() {
        var testString = "digital underground: it's probably the most pirated piece";  // Hacker Crackdown
        var tryThis = cleanup(testString);
        expect(tryThis).to.equal("digital underground: it’s probably the most pirated piece")
    });
    it("should fix don't", function() {
        var testString = "everlasting fire... don't you feel it? Blind, chockfull of sin! Repent,";  // Conrad 'Narcissus'
        var tryThis = cleanup(testString);
        expect(tryThis).to.equal("everlasting fire... don’t you feel it? Blind, chockfull of sin! Repent,")
    });
    it("should fix I've", function() {
        var testString = "Carlton Fitzpatrick is the only person I've met in cyberspace circles";  // Hacker Crackdown
        var tryThis = cleanup(testString);
        expect(tryThis).to.equal("Carlton Fitzpatrick is the only person I’ve met in cyberspace circles")
    });
});
describe("possessives", function() {
    it("should fix singular possessive: boy's", function() {
        var testString = "So:  from the law's point of view, why risk missing anything?  Take the works.";  // Hacker Crackdown
        var tryThis = cleanup(testString);
        expect(tryThis).to.equal("So:  from the law’s point of view, why risk missing anything?  Take the works.")
    });
    it("should fix upper-case singular possessive: GRIMM'S", function() {
        var testString = "  than the wealth of all the world.” GRIMM’S TALES.";  // Youth
        var tryThis = cleanup(testString);
        expect(tryThis).to.equal("  than the wealth of all the world.” GRIMM’S TALES.")
    });
    it("should fix plural possessive: boys' ", function() {
        var testString = "and some WWII vintage blockhouses and officers' quarters.";  // Hacker Crackdown
        var tryThis = cleanup(testString);
        expect(tryThis).to.equal("and some WWII vintage blockhouses and officers’ quarters.")
    });
});
