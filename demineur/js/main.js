import * as Game from './Game.js';

const difficulties = {
    easy: {gridSize: 5, bombsNumber: 6},
    normal: {gridSize: 8, bombsNumber: 15},
    hard: {gridSize: 15, bombsNumber: 50},
    extreme: {gridSize: 25, bombsNumber: 200},
};

const body = document.querySelector('.direction-column');

const gridSize = document.getElementById('gridSize');
const bombsNumber = document.getElementById('bombsNumber');
const difficulty = document.getElementById('difficulty');

document.getElementById('game').hidden = true;

const setValues = (gridSizeValue = gridSize.value, custom = true, difficulty = 'custom') => {
    gridSize.value = gridSizeValue;
    if (custom) {
        bombsNumber.value = Math.floor(bombsNumber.max / 2);
        bombsNumber.max = Math.floor(Math.pow(gridSize.value, 2) * 0.35);
    } else {
        bombsNumber.max = difficulties[difficulty].bombsNumber * 2;
        bombsNumber.value = Math.floor(difficulties[difficulty].bombsNumber);
    }
    document.getElementById('gridSizeLabel').textContent = gridSize.value.toString();
    document.getElementById('bombsNumberLabel').textContent = bombsNumber.value.toString();
};

const initSelect = () => {
    difficulty.value = 'normal';
    gridSize.value = difficulties.normal.gridSize;
    bombsNumber.value = difficulties.normal.bombsNumber;
    setValues(gridSize.value, false, difficulty.value);
};

initSelect();

difficulty.addEventListener('change', (e) => {
    setValues(difficulties[difficulty.value].gridSize, false, difficulty.value);
});

document.getElementById('play').addEventListener('click', () => {
    document.getElementById('home').hidden = true;
    document.getElementById('game').hidden = false;
    const game = new Game.default(body, gridSize.value, bombsNumber.value);
    game.render();
});
gridSize.addEventListener('input', () => {
    setValues();
    difficulty.value = 'custom';
});

bombsNumber.addEventListener('input', () => {
    document.getElementById('bombsNumberLabel').textContent = bombsNumber.value.toString();
    difficulty.value = 'custom';
});