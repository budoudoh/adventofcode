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
        exitMazeLarger(jumps);
    })
}

function exitMaze(jumps){

    var steps = 0;
    var index = 0;

    while(index < jumps.length){
        var current_jump = jumps[index];
        console.log("current steps: "+steps+"- current index: "+index+" - jump value: "+ current_jump);
        jumps[index] = current_jump + 1;
        index = index + current_jump;
        steps++;
    }

    return steps;
}

function exitMazeLarger(jumps){
    
        var steps = 0;
        var index = 0;
    
        while(index < jumps.length){
            var current_jump = jumps[index];
            console.log(steps);
            if(current_jump >= 3){
                jumps[index] = current_jump - 1;
            }
            else{
                jumps[index] = current_jump + 1;
            }
            index = index + current_jump;
            steps++;
        }
    
        return steps;
    }

//console.log(exitMaze([0, 3, 0, 1, -3]));
console.log(exitMazeFromFile());