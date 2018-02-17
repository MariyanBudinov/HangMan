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
            hiddenPanel = document.querySelector('.hidden-panel');

        if (!inputWord || inputWord.length === 0) {
            alert(`Please type some word!`);
            input.focus();
            return;
        }

        inputWord.forEach(letter => {
            let box = document.createElement('div'),
                text = document.createElement('h2');
            text.innerHTML = letter;
            box.className = 'hidden-box';
            box.appendChild(text);
            hiddenPanel.appendChild(box);
        })
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

}

module.exports = HiddenWordBuilder;