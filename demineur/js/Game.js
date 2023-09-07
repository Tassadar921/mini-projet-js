export default class Game {

    constructor(size, bombsNumber) {}

genBombs(size, bombsNumber){
    this.grid = [];
    for(let i = 0; i<size; i++){
        grid.push([]);
        for(let j = 0; j<size; j++){
            grid[i].push(0);
        }
    }

    for(let i = 0; i<bombsNumber; i++){
        grid[Math.floor(Math.random()*size)][Math.floor(Math.random()*size)] = 'B';;
    }
    return grid;
}

checkIfIsBomb(grid, x, y, count){
    if(grid[x][y] === 'B'){
        return count+1;
    }else{
        return count;
    }
}

getBombsNumber(grid, x, y){
    let count = 0;
    if(x>0){
        if(y>0){
            count = checkIfIsBomb(grid, x-1, y-1, count);
        }
        count = checkIfIsBomb(grid, x-1, y, count);
        if(y<grid.length-1){
            count = checkIfIsBomb(grid, x-1, y+1, count);
        }
    }
    if(x<grid.length-1){
        if(y>0){
            count = checkIfIsBomb(grid, x+1, y-1, count);
        }
        count = checkIfIsBomb(grid, x+1, y, count);
        if(y<grid.length-1){
            count = checkIfIsBomb(grid, x+1, y+1, count);
        }
    }
    if(y>0){
        count = checkIfIsBomb(grid, x, y-1, count);
    }
    if(y<grid.length){
        count = checkIfIsBomb(grid, x, y+1, count);
    }
    return count;
}

fillGrid(size, bombsNumber){
    const grid = genBombs(size, bombsNumber);
    for(let x = 0; x < grid.length; x++){
        for(let y = 0; y < grid.length; y++){
            if(grid[x][y] !== 'B'){
                grid[x][y] = getBombsNumber(grid, x, y);
            }
        }
    }
    return grid;
}

createGrid (grid){
    let rawNumber = grid.length;
    let columnNumber = grid[0].length;
  
    while (rawNumber > 0){
      let newDiv = document.createElement("div");
      newDiv.classList.add('row','d-flex');
      body.appendChild(newDiv)
      rawNumber = rawNumber - 1;
    }
  
    let raw = document.querySelectorAll('.row')
    while (columnNumber > 0) {
      i = 0;
      raw.forEach(element => {
        const newCase = document.createElement("p")
        newCase.classList.add('case')
        newCase.setAttribute('id', `${raw.length - columnNumber}.${i}`)
        element.appendChild(newCase)
        i = i +1;
      });
      columnNumber = columnNumber - 1;
    }
  }

fillHTMLGrid(grid){
    let rowNumber = grid.length;
    let columnNumber = grid[0].length;
  
    for (let i = 0; i < columnNumber; i++) {
      for (let j = 0; j < rowNumber; j++) {
        let caseSelected = document.getElementById(`${i}.${j}`); 
        caseSelected.textContent = grid[j][i];
        if (caseSelected.textContent === 'B'){
            caseSelected.classList.add('bomb')
        } 
      }
    }
  }
}
