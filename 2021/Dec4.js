const readline = require('readline');
const fs = require('fs');

const rl = readline.createInterface({
    input: fs.createReadStream('Dec4test.txt')
});

let numbers = [];
let boards = [];
let board = resetBoard(); 

function resetBoard(){
    let current = {
        horizontal: [],
        vertical: []
    };

    for(let i = 0; i < 5; i++){
        current.vertical.push(new Set());
    }
    return current;
}
rl.on('line', function (line) {
    let current = line.trim();
    if(numbers.length == 0){
        numbers = current.split(",").map( x => parseInt(x));
    }
    else if (current.length == 0){
        if(board.horizontal.length > 0){
            boards.push(board)
            board = resetBoard();
        }
    }
    else{
        row = current.split(" ").map( x => parseInt(x));
        board.horizontal.push(new Set(row));

        for(let i = 0; i < board.vertical.length; i++){
            board.vertical[i].add(row[i]);
        }
    }
});

rl.on('close', function(){
    console.log(part1(boards, numbers));
});

function isWinningRow(played_numbers, row) {
    for (let cell of row) {
        if (!played_numbers.has(cell)) {
            return false
        }
    }
    return true
}

function part1(boards, numbers){
    let played = new Set();
    let winning_board_index = -1;
    for(let i = 0; i < numbers.length; i++){
        played.add(numbers[i]);
        let winner = false;
        for(let j = 0; j < boards.length; j++){
            let winner = boards[j].horizontal.map( x => isWinningRow(played, x)).reduce( (x,y) => x||y );
            if(winner){
                winning_board_index = j;
                break;
            }
            
        }

        if(winner){
            break;
        }
    }
    console.log([...played])
    return winning_board_index;
}
