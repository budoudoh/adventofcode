const readline = require('readline');
const fs = require('fs');

function exitMazeFromFile(){

    const rl = readline.createInterface({
        input: fs.createReadStream('Dec5.txt')
    });

    var jumps = [];

    rl.on('line', function (jump) {
        jumps.push(parseInt(jump));
    });
    
    rl.on('close', function(){
        exitMaze(jumps);
    })
}

function exitMaze(jumps){

    var steps = 0;
    var index = 0;

    while(index < jumps.length){
        console.log(steps);
        var current_jump = jumps[index];
        jumps[index] = current_jump + 1;
        index = Math.max(0, index+current_jump);
        steps++;
    }

    return steps;
}

//console.log(exitMaze([0, 3, 0, 1, -3]));
console.log(exitMazeFromFile());