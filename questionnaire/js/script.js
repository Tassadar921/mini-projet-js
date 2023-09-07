import * as questions from './questions.js';
import * as Game from './Game.js';

const indicator = document.getElementById('indicator');
const question = document.getElementById('question');
const choices = document.getElementById('choices');
const result = document.getElementById('result');
const nextButton = document.getElementById('next');

const game = new Game.default(indicator, question, choices, result, nextButton, questions.default);

game.start();