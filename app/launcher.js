'use strict';

const MainApp = require('./MainApp.js');
const { Howl, Howler } = require('howler');

document.addEventListener('DOMContentLoaded', () => {
    let backgroundLoop = new Howl({
        src: ['./app/assets/sounds/backgroundLoop.ogg'],
        autoplay: true,
        loop: true,
        volume: 0.5
    });
    new MainApp()
});