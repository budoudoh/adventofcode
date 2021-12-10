const readline = require('readline');
const fs = require('fs');

const rl = readline.createInterface({
    input: fs.createReadStream('Dec4.txt')
});

let numbers = [];
let boards = [];
let board = resetBoard(); 

function resetBoard(){
    let current = {
        horizontal: [],
        vertical: [],
        winner: false
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
        row = row.filter(x => Number.isInteger(x))
        board.horizontal.push(new Set(row));

        for(let i = 0; i < board.vertical.length; i++){
            board.vertical[i].add(row[i]);
        }
    }
});

rl.on('close', function(){
    console.log(part1(boards.slice(), numbers.slice()));
    console.log(part2(boards.slice(), numbers.slice()));
});

function isWinningRow(played_numbers, row) {
    for (let cell of row) {
        if (!played_numbers.has(cell)) {
            return false
        }
    }
    return true
}

function difference(setA, setB) {
    let _difference = new Set(setA)
    for (let elem of setB) {
        _difference.delete(elem)
    }
    return _difference
}

function part1(boards, numbers){
    let played = new Set();
    let winning_board_index = -1;
    let last_number;
    while(winning_board_index < 0){
        last_number = numbers.shift();
        played.add(last_number);
        for(let j = 0; j < boards.length; j++){
            boards[j].winner = boards[j].horizontal.map( x => isWinningRow(played, x)).reduce( (x,y) => x||y );
            boards[j].winner = boards[j].winner || boards[j].vertical.map( x => isWinningRow(played, x)).reduce( (x,y) => x||y );
            if(boards[j].winner){
                winning_board_index = j;
                break;
            }
        }
    }
    
    let sum = 0;
    boards[winning_board_index].horizontal.forEach(element => {
        let current = [...difference(element, played)];
        if(current.length > 0){
            sum = sum + current.reduce((x, y) => x+y);
        }
    });
    return sum*last_number;
}

function part2(boards, numbers){
    let played = new Set();
    let losing_board_index = -1;
    let last_number;

    while(losing_board_index < 0){
        last_number = numbers.shift()
        played.add(last_number);
        for(let j = 0; j < boards.length; j++){
            if(!boards[j].winner){
                boards[j].winner = boards[j].horizontal.map( x => isWinningRow(played, x)).reduce( (x,y) => x||y );
                boards[j].winner = boards[j].winner || boards[j].vertical.map( x => isWinningRow(played, x)).reduce( (x,y) => x||y );
                if(boards[j].winner && boards.reduce((x,y) => x&&y.winner)){
                    losing_board_index = j;
                    break;
                }
            }
        }
    }
    
    let sum = 0;
    boards[losing_board_index].horizontal.forEach(element => {
        let current = [...difference(element, played)];
        if(current.length > 0){
            sum = sum + current.reduce((x, y) => x+y);
        }
    });
    return sum*last_number;   
}