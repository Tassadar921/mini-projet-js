import * as Game from './Game.js';

let body = document.querySelector('.direction-column');

const game = new Game.default(body, 25, 200);

console.log(game.grid);

game.render();