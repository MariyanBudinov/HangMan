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