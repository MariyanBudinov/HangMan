'use strict';

const ALLOWED_SIGNS = require('../config/signsConfig.js').allowedSigns;
const { TweenMax, TweenLite, Bounce, Power3 } = require('gsap');

class HiddenWordBuilder {

    constructor() {

    }

    /**
     * @description Creates box for every letter in word.
     * @param {String} insertedText
     * @param {Object} input
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
        this._loadExitGuessButtons(guessBox, input, hiddenPanel, inputWord);
        inputWord.forEach(letter => this._createAppendElement('div', 'hidden-box', hiddenPanel, '?'));
    }

    /**
     * 
     * @param {HTMLElement} guessBox 
     * @param {HTMLElement} input
     * @param {HTMLElement} hiddenPanel
     * @param {Array} inputWord 
     * @private 
     */
    _loadExitGuessButtons(guessBox, input, hiddenPanel, inputWord) {
        let exitButton = document.querySelector('.exit-button'),
            guessButton = document.querySelector('.guess-button'),

            guessListener = (event) => {
                event.preventDefault();
                let guessInput = document.querySelector('.guess-input'),
                    inputWordString = inputWord.toString(),
                    hiddenBoxes = document.querySelectorAll('.hidden-box'),
                    guessLetter = guessInput.value.toUpperCase();
                if (guessLetter !== inputWordString.replace(/,/g, '')) {
                    if (guessLetter.length > 1) {
                        return alert('No no no, you can only guess one by one letters in word !');
                    }
                    if (!guessLetter || !inputWord.includes(guessLetter.toUpperCase())) {
                        guessInput.value = '';
                        guessInput.focus();
                        return alert('WRONG !');
                    }
                    inputWord.forEach((letter, index) => {
                        if (letter === guessLetter) {
                            if (guessInput.value) {
                                guessInput.value = '';
                                guessInput.focus();
                            }
                            if (hiddenBoxes[index].innerHTML === '?') {
                                hiddenBoxes[index].innerHTML = '';
                                this._createAppendElement('h2', 'signs', hiddenBoxes[index], letter);
                            }
                        }
                    });
                } else {
                    inputWord.forEach((letter, index) => {
                        guessInput.value = '';
                        guessInput.focus();
                        if (hiddenBoxes[index].innerHTML === '?') {
                            hiddenBoxes[index].innerHTML = '';
                            this._createAppendElement('h2', 'signs', hiddenBoxes[index], letter);
                        }
                    });
                }
                if ([...hiddenBoxes].every(hiddenBox => hiddenBox.innerHTML && hiddenBox.innerHTML !== '?')) {
                    TweenMax.staggerTo(hiddenBoxes, 1, {
                        rotation: 360,
                        onCompleteAll: () => {
                            [...document.querySelectorAll('.signs')].forEach(sign => {
                                TweenLite.set(sign, { backgroundColor: "hsl(212 , 100%, 30%)" });
                            });
                        },
                    }, 0.5)
                };
            },

            exitListener = (event) => {
                if (confirm('Are you shure ?')) {
                    event.preventDefault();
                    hiddenPanel.innerHTML = '';
                    guessBox.classList.toggle('disabled', true);
                    input.classList.toggle('disabled', false);
                    input.focus();
                    exitButton.removeEventListener('click', exitListener);
                    guessButton.removeEventListener('click', guessListener);
                }
            };

        exitButton.addEventListener('click', exitListener);
        guessButton.addEventListener('click', guessListener);
    }

    /**
     * 
     * @param {String} element 
     * @param {String} className 
     * @param {HTMLElement} parent 
     * @param {String} addText 
     * @private
     */
    _createAppendElement(element, className, parent, addText) {
        let newElement = document.createElement(element);
        newElement.className = className;

        if (addText) newElement.innerHTML = addText;

        parent.appendChild(newElement);

        if (className === 'hidden-box') {
            TweenMax.fromTo(newElement, 5, {
                opacity: 0,
                width: '1000px',
                height: '1000px'
            }, {
                opacity: 1,
                width: '50px',
                height: '50px',
                ease: Power3.easeOut
            });
        }

        if (className === 'signs') {
            TweenMax.fromTo(newElement, 1, {
                scale: 0
            }, {
                scale: 1,
                ease: Bounce.easeOut
            });
        }

    }

    /**
     * @description Check if there are some unallowed signs in word.
     * @param {String} text 
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