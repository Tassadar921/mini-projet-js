import Game from './Game.js';

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

//on cache le jeu au chargement de la page
document.getElementById('game').hidden = true;

//set l'affichage en fonction d'une difficulté donnée
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

//initialise toutes les datas au niveau normal
const initSelect = () => {
    difficulty.value = 'normal';
    gridSize.value = difficulties.normal.gridSize;
    bombsNumber.value = difficulties.normal.bombsNumber;
    setValues(gridSize.value, false, difficulty.value);
};

initSelect();

//select de la difficulté
difficulty.addEventListener('change', (e) => {
    setValues(difficulties[difficulty.value].gridSize, false, difficulty.value);
});

//bouton play : on lance la partie au clic
document.getElementById('play').addEventListener('click', () => {
    document.getElementById('home').hidden = true;
    document.getElementById('game').hidden = false;
    new Game(body, gridSize.value, bombsNumber.value);
});

//range de la taille de la grid
gridSize.addEventListener('input', () => {
    setValues();
    difficulty.value = 'custom';
});

//range du nombre de bombes
bombsNumber.addEventListener('input', () => {
    document.getElementById('bombsNumberLabel').textContent = bombsNumber.value.toString();
    difficulty.value = 'custom';
});
