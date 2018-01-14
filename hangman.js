(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

class HiddenWordBuilder {

    constructor(insertedText) {
        this.inputWord = this.validate(insertedText);
        console.log("inputWord = ", this.inputWord);

        this.buildSimbolBox();
    }

    validate(text) {
        console.log("AAAAAAAAAAAAAAAAAAAAAAAAAA");
        let textArr = text.split(''),
            numberArr = textArr.filter(simbol => {
                return parseInt(simbol) === 'number';
            });
        if (numberArr.length !== 0) {
            alert('No numbers please !');
            return false;
        } else {
            return textArr;
        }
    }

    buildSimbolBox() {
        console.log("BBBBBBBBBBBBBBBBBBBBBBB/inputWord = ", this.inputWord);

        if (!this.inputWord) return;

        let hiddenPanel = document.querySelector('.hiddenPanel');

        console.log("hiddenPanel = ", hiddenPanel);

        this.inputWord.forEach(word => {
            let box = document.createElement('div'),
                text = document.createElement('h2');
            text.innerHTML = word;
            box.className = 'hiddenBox';
            box.appendChild(text);
            hiddenPanel.appendChild(box);
        })
    }

}

module.exports = HiddenWordBuilder;
},{}],2:[function(require,module,exports){
'use strict';

let HiddenWordBuilder = require('./HiddenWordBuilder.js');

let enterWordButton = document.querySelector('.enterWordButton'),
    inputElement = document.querySelector('.inputWord');

enterWordButton.addEventListener('click', () => {
    let inputWord = inputElement.value,
        word = new HiddenWordBuilder(inputWord);
});
},{"./HiddenWordBuilder.js":1}]},{},[2]);
