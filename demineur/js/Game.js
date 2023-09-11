export default class Game {

    grid = [];
    playing = false;

    constructor(body, size, bombsNumber) {
        this.body = body;
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
            this.grid[Math.floor(Math.random() * size)][Math.floor(Math.random() * size)] = 'B';
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
        console.log(count);
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

    render() {
        let rawNumber = this.grid.length;
        let columnNumber = this.grid[0].length;

        while (rawNumber > 0) {
            let newDiv = document.createElement('div');
            newDiv.classList.add('row', 'd-flex');
            this.body.appendChild(newDiv);
            rawNumber = rawNumber - 1;
        }

        let raw = document.querySelectorAll('.row');
        while (columnNumber > 0) {
            let i = 0;
            raw.forEach(element => {
                const newCase = document.createElement('p');
                newCase.classList.add('case');
                newCase.setAttribute('id', `${raw.length - columnNumber}.${i}`);
                element.appendChild(newCase);
                newCase.addEventListener('click', () => {
                    if(this.playing){
                    let x = Number(newCase.getAttribute('id').split('.')[0]);
                    let y = Number(newCase.getAttribute('id').split('.')[1]);
                    if (this.grid[x][y] === 'B') {
                        newCase.classList.add('bomb');
                        console.log('perdu');
                    }else{
                        newCase.textContent = this.grid[x][y];
                    }
                }
                });
                i = i + 1;
            });
            columnNumber = columnNumber - 1;
        }
    }

    
}
