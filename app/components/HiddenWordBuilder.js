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