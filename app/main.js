'use strict';

let HiddenWordBuilder = require('./HiddenWordBuilder.js');

let enterWordButton = document.querySelector('.enterWordButton'),
    inputElement = document.querySelector('.inputWord');

enterWordButton.addEventListener('click', () => {
    let inputWord = inputElement.value,
        word = new HiddenWordBuilder(inputWord);
});