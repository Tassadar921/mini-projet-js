export default class Game {

    grid = [];
    playing = false;

    constructor(body, size, bombsNumber) {
        this.body = body;
        this.remainingTile = size * size;
        this.genBombs(size, bombsNumber);
        this.fillGrid();
        this.playing = true;
    }

    genBombs(size, bombsNumber) {
        this.grid = [];
        for (let i = 0; i < size; i++) {
            this.grid.push([]);
            for (let j = 0; j < size; j++) {
                this.grid[i].push(0);
            }
        }
        for (let i = 0; i < bombsNumber; i++) {
            const x = Math.floor(Math.random() * size);
            const y = Math.floor(Math.random() * size);
            if (this.grid[x][y] !== 'B') {
                this.remainingTile--;
            }
            this.grid[x][y] = 'B';
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
    }

    removeFlag(gridCase) {
        gridCase.classList.remove('flag');
        gridCase.innerHTML = '';
    }

    isChecked(checked, x, y) {
        return checked.some(item => item.x === x && item.y === y);
    }


    revealAround(x, y, checked) {
        checked.push({x, y});

        if (x - 1 >= 0) {
            document.getElementById(`${x - 1}.${y}`).textContent = this.grid[x - 1][y];
            this.remainingTile--;
            if (this.grid[x - 1][y] === 0 && !this.isChecked(checked, x - 1, y)) {
                this.revealAround(x - 1, y, checked);
            }
        }
        if (y - 1 >= 0) {
            document.getElementById(`${x}.${y - 1}`).textContent = this.grid[x][y - 1];
            this.remainingTile--;
            if (this.grid[x][y - 1] === 0 && !this.isChecked(checked, x, y - 1)) {
                this.revealAround(x, y - 1, checked);
            }
        }
        if (x + 1 < this.grid.length) {
            document.getElementById(`${x + 1}.${y}`).textContent = this.grid[x + 1][y];
            this.remainingTile--;
            if (this.grid[x + 1][y] === 0 && !this.isChecked(checked, x + 1, y)) {
                this.revealAround(x + 1, y, checked);
            }
        }
        if (y + 1 < this.grid.length) {
            document.getElementById(`${x}.${y + 1}`).textContent = this.grid[x][y + 1];
            this.remainingTile--;
            if (this.grid[x][y + 1] === 0 && !this.isChecked(checked, x, y + 1)) {
                this.revealAround(x, y + 1, checked);
            }
        }
        if (x - 1 >= 0 && y - 1 >= 0) {
            document.getElementById(`${x - 1}.${y - 1}`).textContent = this.grid[x - 1][y - 1];
            this.remainingTile--;
            if (this.grid[x - 1][y - 1] === 0 && !this.isChecked(checked, x - 1, y - 1)) {
                this.revealAround(x - 1, y - 1, checked);
            }
        }
        if (x - 1 >= 0 && y + 1 < this.grid.length) {
            document.getElementById(`${x - 1}.${y + 1}`).textContent = this.grid[x - 1][y + 1];
            this.remainingTile--;
            if (this.grid[x - 1][y + 1] === 0 && !this.isChecked(checked, x - 1, y + 1)) {
                this.revealAround(x - 1, y + 1, checked);
            }
        }
        if (x + 1 < this.grid.length && y - 1 >= 0) {
            document.getElementById(`${x + 1}.${y - 1}`).textContent = this.grid[x + 1][y - 1];
            this.remainingTile--;
            if (this.grid[x + 1][y - 1] === 0 && !this.isChecked(checked, x + 1, y - 1)) {
                this.revealAround(x + 1, y - 1, checked);
            }
        }
        if (x + 1 < this.grid.length && y + 1 < this.grid.length) {
            document.getElementById(`${x + 1}.${y + 1}`).textContent = this.grid[x + 1][y + 1];
            this.remainingTile--;
            if (this.grid[x + 1][y + 1] === 0 && !this.isChecked(checked, x + 1, y + 1)) {
                this.revealAround(x + 1, y + 1, checked);
            }
        }
    }

    render() {
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
                            this.remainingTile--;
                            if (newCase.textContent === '0') {
                                this.revealAround(x, y, []);
                            }
                            if (!this.remainingTile) {
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
}
