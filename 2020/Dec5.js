const readline = require('readline');
const fs = require('fs');

const rl = readline.createInterface({
    input: fs.createReadStream('Dec5.txt')
});

let highestId = 0;
let seats = {}
rl.on('line', function (line) {
    line = line.trim();
    processPass(line, 128, 8)
});

rl.on('close', function(){
    console.log(highestId);
});

function processPass(pass, rows, columns){
    let min_row = 0;
    let max_row = rows - 1;
    for(let i = 0; i < 6; i++){
        let current = pass.charAt(i);
        rows = rows / 2;
        if(current === "F")
            max_row = max_row - rows;
        else
            min_row = min_row + rows;
        
    }
    let row = pass.charAt(6) == "F" ? min_row : max_row;
    
    let min_col = 0;
    let max_col = columns - 1;
    for(let i = 7; i < 9; i++){
        let current = pass.charAt(i);
        columns = columns / 2;
        if(current === "L")
            max_col = max_col - columns;
        else
            min_col = min_col + columns;
        
    }
    let column  = pass.charAt(9) == "L" ? min_col : max_col;
    
    if(!seats.hasOwnProperty(row)){
        seats[row] = [];
    }
    seats[row].push(column);
    highestId = Math.max(highestId, (row*8 + column));
}

