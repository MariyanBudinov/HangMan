(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

const HiddenWordBuilder = require('./components/HiddenWordBuilder.js');

class MainApp {

    constructor() {
        this.enterWordButton = document.querySelector('.enter-word-button');
        this.inputElement = document.querySelector('.input-word');
        this.hiddenPannel = document.querySelector('.hidden-panel');
        this.hiddenWordBuilder = new HiddenWordBuilder();
        this.loadEnterEvents();
    }

    loadEnterEvents() {
        this.enterWordButton.addEventListener('click', event => {
            event.preventDefault();
            this._enterWord();
        });
        document.body.addEventListener('keydown', event => {
            let isEnterDisabled = !this.enterWordButton.classList.contains('disabled');
            if (event.keyCode === 13 && isEnterDisabled) {
                event.preventDefault();
                this._enterWord();
            }
        });
        this.inputElement.addEventListener('focus', () => this.enterWordButton.classList.remove('disabled'));
    }

    /**
     * 
     * @description When press enter hidden pannel has to load inserted word.
     * @private
     */
    _enterWord() {
        this.hiddenPannel.innerHTML = "";
        let inputWord = this.inputElement.value.toUpperCase();
        this.hiddenWordBuilder.buildSimbolBox(inputWord, this.inputElement);
        this.enterWordButton.classList.add('disabled');
        this.inputElement.blur();
    }



}

module.exports = MainApp;
},{"./components/HiddenWordBuilder.js":2}],2:[function(require,module,exports){
'use strict';

const ALLOWED_SIGNS = require('../config/signsConfig.js').allowedSigns;

class HiddenWordBuilder {

    constructor() {}

    /**
     * @param {String} insertedText
     * @param {Object} input
     * @description Creates box for every letter in word.
     * @private
     */
    buildSimbolBox(insertedText, input) {
        let inputWord = this._validate(insertedText),
            hiddenPanel = document.querySelector('.hidden-panel'),
            guessBox = document.querySelector('.guess-box');

        if (!inputWord || inputWord.length === 0) {
            alert(`Please type some word!`);
            input.focus();
            return;
        }

        guessBox.classList.toggle('disabled', false);
        input.classList.toggle('disabled', true);

        this._loadExitButton(guessBox, input);
        this._loadGuessButton(inputWord);

        inputWord.forEach(letter => {
            let box = document.createElement('div'),
                text = document.createElement('h2');
            text.style.backgroundColor = 'white';
            text.innerHTML = letter;
            text.className = 'signs';
            box.className = 'hidden-box';
            box.appendChild(text);
            hiddenPanel.appendChild(box);
        });
    }

    /**
     * 
     * @param {String} text 
     * @description Check if there are some unallowed signs in word.
     * @private
     */
    _validate(text) {
        let textArr = text.split(''),
            unallowedSigns = textArr.filter(simbol => {
                return !ALLOWED_SIGNS.en.includes(simbol.toLowerCase()) &&
                    !ALLOWED_SIGNS.bg.includes(simbol.toLowerCase());
            });

        if (unallowedSigns.length !== 0) {
            alert(`You use unallowed signs: ${unallowedSigns} !`);
            return false;
        } else {
            return textArr.map(sign => sign.toUpperCase());
        }
    }

    _loadExitButton(guessBox, input) {
        let exitButton = document.querySelector('.exit-button');
        exitButton.addEventListener('click', (event) => {
            if (confirm('Are you shure ?')) {
                event.preventDefault();
                guessBox.classList.toggle('disabled', true);
                input.classList.toggle('disabled', false);
                input.focus();
            }
        })
    }

    _loadGuessButton(inputWord) {
        let guessButton = document.querySelector('.guess-button');
        guessButton.addEventListener('click', (event) => {
            event.preventDefault();
            let guessInput = document.querySelector('.guess-input'),
                allSigns = document.querySelectorAll('.signs'),
                guessLetter = guessInput.value.toUpperCase();
            if (guessLetter.length !== 1) {
                return alert('No no no, you can only guess one by one letters in word !');
            }
            if (!inputWord.includes(guessLetter.toUpperCase())) {
                guessInput.value = '';
                guessInput.focus();
                return alert('WRONG !');
            }
            allSigns.forEach(signElement => {
                if (signElement.textContent === guessLetter) {
                    guessInput.value = '';
                    guessInput.focus();
                    signElement.style.backgroundColor = 'green';
                }
            });
        })
    }

}

module.exports = HiddenWordBuilder;
},{"../config/signsConfig.js":3}],3:[function(require,module,exports){
'use strict';

module.exports = {
    allowedSigns: {
        en: ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'z', 'x', 'c', 'v', 'b', 'n', 'm'],
        bg: ['ч', 'ю', 'щ', 'ш', 'я', 'в', 'е', 'р', 'т', 'ъ', 'у', 'и', 'о', 'п', 'а', 'с', 'д', 'ф', 'г', 'х', 'й', 'к', 'л', 'з', 'ь', 'ц', 'ж', 'б', 'н', 'м']
    }
};
},{}],4:[function(require,module,exports){
'use strict';

const MainApp = require('./MainApp.js');

document.addEventListener('DOMContentLoaded', () => new MainApp());
},{"./MainApp.js":1}]},{},[4]);
