export default class Game {

    grid;
    playing = false;

    constructor(body, size, bombsNumber) {
        this.body = body;
        this.genGrid(size);
        this.genBombs(bombsNumber);
        this.fillGrid();
        this.playing = true;
        this.render(size*size-bombsNumber);
    }

    genGrid(size) {
        this.grid = [];
        for (let i = 0; i < size; i++) {
            this.grid.push([]);
            for (let j = 0; j < size; j++) {
                this.grid[i].push(0);
            }
        }
    }

    genBombs(bombsNumber) {
        for (let i = 0; i < bombsNumber; i++) {
            const x = Math.floor(Math.random() * this.grid.length);
            const y = Math.floor(Math.random() * this.grid.length);
            if (this.grid[x][y] === 'B') {
                i--;
            } else {
                this.grid[x][y] = 'B';
            }
        }
    }

    checkIfIsBomb(x, y, count) {
        if (this.grid[x][y] === 'B') {
            return count + 1;
        } else {
            return count;
        }
    }

    getBombsNumber(x, y) {
        let count = 0;
        if (x > 0) {
            if (y > 0) {
                count = this.checkIfIsBomb(x - 1, y - 1, count);
            }
            count = this.checkIfIsBomb(x - 1, y, count);
            if (y < this.grid.length - 1) {
                count = this.checkIfIsBomb(x - 1, y + 1, count);
            }
        }
        if (x < this.grid.length - 1) {
            if (y > 0) {
                count = this.checkIfIsBomb(x + 1, y - 1, count);
            }
            count = this.checkIfIsBomb(x + 1, y, count);
            if (y < this.grid.length - 1) {
                count = this.checkIfIsBomb(x + 1, y + 1, count);
            }
        }
        if (y > 0) {
            count = this.checkIfIsBomb(x, y - 1, count);
        }
        if (y < this.grid.length) {
            count = this.checkIfIsBomb(x, y + 1, count);
        }
        return count;
    }

    fillGrid() {
        for (let x = 0; x < this.grid.length; x++) {
            for (let y = 0; y < this.grid.length; y++) {
                if (this.grid[x][y] !== 'B') {
                    this.grid[x][y] = this.getBombsNumber(x, y);
                }
            }
        }
    }

    reveal() {
        for (let i = 0; i < this.grid.length; i++) {
            for (let j = 0; j < this.grid.length; j++) {
                const selectedCase = document.getElementById(`${i}.${j}`);
                if (selectedCase.classList.contains('flag')) {
                    this.removeFlag(selectedCase);
                }
                if (this.grid[i][j] === 'B') {
                    selectedCase.classList.add('bomb');
                    const bombImage = document.createElement('img');
                    bombImage.src = '../assets/bomb.png';
                    bombImage.classList.add('bombImage');
                    selectedCase.appendChild(bombImage);
                } else {
                    selectedCase.textContent = this.grid[i][j];
                }
            }
        }
        this.endGame();
    }

    removeFlag(gridCase) {
        gridCase.classList.remove('flag');
        gridCase.innerHTML = '';
    }

    isChecked(checked, x, y) {
        return checked.some(item => item.x === x && item.y === y);
    }

    revealAround(x, y, checked) {
        if (checked.some(item => item.x === x && item.y === y)) {
            return;
        }

        checked.push({x, y});

        const coo = [
            {x: x - 1, y},
            {x, y: y - 1},
            {x: x + 1, y},
            {x, y: y + 1},
            {x: x - 1, y: y - 1},
            {x: x - 1, y: y + 1},
            {x: x + 1, y: y + 1},
            {x: x + 1, y: y - 1}
        ];

        for (const pair of coo) {
            if (pair.x >= 0 && pair.x < this.grid.length && pair.y >= 0 && pair.y < this.grid[0].length) {
                const cell = document.getElementById(`${pair.x}.${pair.y}`);
                cell.classList.add('revealed');
                if (cell && !this.isChecked(checked, pair.x, pair.y)) {
                    cell.textContent = this.grid[pair.x][pair.y];
                    if (this.grid[pair.x][pair.y] === 0) {
                        this.revealAround(pair.x, pair.y, checked);
                    }
                }
            }
        }
    }

    render(freeTiles) {
        let rawNumber = this.grid.length;
        let columnNumber = this.grid[0].length;

        while (rawNumber > 0) {
            let newDiv = document.createElement('div');
            newDiv.classList.add('row', 'd-flex');
            this.body.appendChild(newDiv);
            rawNumber--;
        }

        const raw = document.querySelectorAll('.row');
        while (columnNumber > 0) {
            let i = 0;
            raw.forEach(element => {
                const newCase = document.createElement('p');
                newCase.classList.add('case');
                newCase.setAttribute('id', `${raw.length - columnNumber}.${i}`);
                element.appendChild(newCase);
                newCase.addEventListener('click', () => {
                    if (this.playing && !newCase.classList.contains('flag') && !newCase.classList.contains('revealed')) {
                        newCase.classList.add('revealed');
                        const x = Number(newCase.getAttribute('id').split('.')[0]);
                        const y = Number(newCase.getAttribute('id').split('.')[1]);
                        if (this.grid[x][y] === 'B') {
                            newCase.classList.add('bomb');
                            this.playing = false;
                              document.getElementById('message').textContent = 'Perdu !';
                            this.reveal();
                        } else {
                            newCase.textContent = this.grid[x][y];
                            if (newCase.textContent === '0') {
                                this.revealAround(x, y, []);
                            }
                            if (document.getElementsByClassName('revealed').length === freeTiles) {
                                this.playing = false;
                                document.getElementById('message').textContent = 'Gagné !'
                                document.getElementById('resultEffect').classList.add('pyro');
                                this.reveal();
                            }
                        }
                    }
                });
                newCase.addEventListener("contextmenu", (event) => {
                    event.preventDefault();
                    if (this.playing && !newCase.classList.contains('revealed')) {
                        if (!newCase.classList.contains('flag')) {
                            newCase.classList.add('flag');
                            const flagImage = document.createElement('img');
                            flagImage.src = '../assets/flag.png';
                            flagImage.classList.add('flagImage');
                            newCase.appendChild(flagImage);
                        } else {
                            this.removeFlag(newCase);
                        }
                    }
                    event.preventDefault();
                });
                i = i + 1;
            });
            columnNumber--;
        }
    }

    endGame() {
        const button = document.createElement('button');
        button.addEventListener('click', () => window.location.reload());
        button.textContent = 'Reset';
        document.body.appendChild(button);
    }
}
