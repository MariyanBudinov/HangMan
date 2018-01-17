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