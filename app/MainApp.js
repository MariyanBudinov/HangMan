'use strict';

const HiddenWordBuilder = require('./components/HiddenWordBuilder.js');

class MainApp {

    constructor() {
        this.enterWordButton = document.querySelector('.enter-word-button');
        this.inputElement = document.querySelector('.input-word');
        this.hiddenPanel = document.querySelector('.hidden-panel');
        this.hiddenWordBuilder = new HiddenWordBuilder();
        this._loadEnterEvents();
    }

    /**
     * @private
     */
    _loadEnterEvents() {
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
        this.inputElement.addEventListener('focus', () => {
            if (this.enterWordButton.classList.contains('disabled')) this.enterWordButton.classList.remove('disabled');
        });
    }

    /**
     * 
     * @description When press enter hidden pannel has to load inserted word.
     * @private
     */
    _enterWord() {
        this.hiddenPanel.innerHTML = "";
        if (this.hiddenPanel.classList.contains('disabled')) this.hiddenPanel.classList.remove('disabled');
        let inputWord = this.inputElement.value.toUpperCase();
        this.hiddenWordBuilder.buildSimbolBox(inputWord, this.inputElement);
        this.enterWordButton.classList.add('disabled');
        this.inputElement.blur();
    }

}

module.exports = MainApp;