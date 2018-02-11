(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

class HiddenWordBuilder {

    constructor(insertedText, input, button) {
        this.inputWord = this._validate(insertedText);
        this.input = input;
        this.button = button;
        console.warn("this.inputWord = ", this.inputWord);
        console.warn("this.input = ", this.input);
        console.warn("this.button = ", this.button);
        this._buildSimbolBox();
    }

    _validate(text) {
        let textArr = text.split(''),
            numberArr = textArr.filter(simbol => {
                return !isNaN(simbol);
            });

        if (numberArr.length !== 0) {
            alert(`You use ${numberArr}. No numbers please!`);
            return false;
        } else {
            return textArr;
        }
    }

    _buildSimbolBox() {
        if (!this.inputWord || this.inputWord.length === 0) {
            alert(`Please type some word!`);
            this.input.focus();
            return;
        }
        let hiddenPanel = document.querySelector('.hidden-panel');

        console.warn("hiddenPanel = ", hiddenPanel);

        this.inputWord.forEach(letter => {
            let box = document.createElement('div'),
                text = document.createElement('h2');
            text.innerHTML = letter;
            box.className = 'hidden-box';
            box.appendChild(text);
            hiddenPanel.appendChild(box);
        })
    }

}

module.exports = HiddenWordBuilder;
},{}],2:[function(require,module,exports){
'use strict';

document.addEventListener('DOMContentLoaded', () => {

    const HiddenWordBuilder = require('./HiddenWordBuilder.js');

    let enterWordButton = document.querySelector('.enter-word-button'),
        inputElement = document.querySelector('.input-word'),
        inputPannel = document.querySelector('.hidden-panel');

    enterWordButton.addEventListener('click', () => {
        inputPannel.innerHTML = "";
        let inputWord = inputElement.value.toUpperCase();
        new HiddenWordBuilder(inputWord, inputElement, enterWordButton);
        enterWordButton.classList.add('disable');
    });

    inputElement.addEventListener('focus', () => {
        enterWordButton.classList.remove('disable');
    });

})
},{"./HiddenWordBuilder.js":1}]},{},[2]);
