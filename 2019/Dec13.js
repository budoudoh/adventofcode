const readline = require('readline');
const fs = require('fs');
const computer = require('./intcode');

const rl = readline.createInterface({
    input: fs.createReadStream('Dec13.txt')
});

var intcode = [];
rl.on('line', function (line) {
    intcode = line.trim().split(",");
});

rl.on('close', function(){
    console.log(playGame(intcode, true));
});

function drawTiles(code){
    var tiles = [];
    var code = intcode;
    var running = true;
    var input = 0;
    var lastStep = 0;
    var relativeBase = 0;
    var count = 0;
    while(running){
        var output = computer.run(code, input, lastStep, relativeBase, 3, 1);
        console.log(output);
        lastStep = output.position;
        running = !output.terminated;
        relativeBase = output.relativeBase;
        var tile = output.output;
        if(tile[2] == 2){
            count++;
        }
    }
    return count;
}

function playGame(code, quarters){
    var gameScreen = {
        ball: null,
        paddle: null,
        walls: [],
        blocks: [],
        score: 0
    };
    var code = intcode;
    if(quarters){
        code[0] = 2;
    }
    var running = true;
    var input = 1;
    var lastStep = 0;
    var relativeBase = 0;
    var playing = false;

    do{
        while(running){
            var output = computer.run(code, input, lastStep, relativeBase, 3);
            //console.log(output);
            lastStep = output.position;
            running = !output.terminated;
            relativeBase = output.relativeBase;
            if(output.inputRequired){
                console.log("Move");
                continue;
            }

            var tile = output.output;
            if(output.output.length != 3)
                continue;
            
            var tile = {
                x: output.output[0],
                y: output.output[1],
                id: output.output[2]
            }
            
            if(tile.x == -1 && tile.y == 0){
                gameScreen.score = tile.id;
                continue;
            }

            switch(tile.id){
                case 1:
                    gameScreen.walls.push(tile);
                    break;
                case 2:
                    gameScreen.blocks.push(tile);
                    break;
                case 3:
                    gameScreen.paddle = tile;
                    break;
                case 4:
                    gameScreen.ball = tile;
                    break;
            }
        }

        if(gameScreen.blocks.length == 0)
            playing = false;
        
        
    }
    while(playing)

    return gameScreen.paddle;
}