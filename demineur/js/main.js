import * as Game from './Game.js';

let body = document.querySelector('.direction-column');

const game = new Game.default(35, 200);

game.createGrid(grid);
game.fillHTMLGrid(grid);