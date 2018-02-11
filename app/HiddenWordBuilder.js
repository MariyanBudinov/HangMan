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