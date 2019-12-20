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
    console.log(drawTiles(intcode));
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
        var output = computer.run(code, input, lastStep, relativeBase, 3);
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