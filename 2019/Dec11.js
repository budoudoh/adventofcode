const readline = require('readline');
const fs = require('fs');
const computer = require('./intcode');

const rl = readline.createInterface({
    input: fs.createReadStream('Dec11.txt')
});

var intcode = [];
rl.on('line', function (line) {
    //line = "104,1125899906842624,99";
    intcode = line.trim().split(",");
});

rl.on('close', function(){
    console.log(paintShip(intcode));
});

function paintShip(code){
    var ship = {};
    var code = intcode;
    var painting = true;
    var x = 0;
    var y = 0;
    var direction = "up";
    var currentPanel = 1;
    var lastStep = 0;
    var relativeBase = 0;
    var steps = 0;
    while(painting){
        var output = computer.run(code, currentPanel, lastStep, relativeBase, 2);
        console.log(output);
        lastStep = output.position;
        painting = !output.terminated;
        relativeBase = output.relativeBase;
        steps++;
        var index = x+","+y;
        if(!ship.hasOwnProperty(index)){
            ship[index] = {
                "color": output.output[0] == 1 ? "white" : "black",
                "paintCount": 1
            }
        }
        else{
            ship[index].color = output.output[0] == 1 ? "white" : "black";
            ship[index].paintCount = ship[index].paintCount + 1;
        }

        var switched = false;
        var added = false;
        while(!switched || !added){
            switch(direction){
                case "up":
                    if(!switched){
                        direction = output.output[1] == 0 ? "left" : "right";
                        switched = true;
                    }
                    else{
                        y = y - 1;
                        added = true;
                    }
                    break;
                case "left":
                    if(!switched){
                        direction = output.output[1] == 0 ? "down" : "up";
                        switched = true;
                    }
                    else{
                        x = x - 1;
                        added = true;
                    }
                    break;
                case "down":
                    if(!switched){
                        direction = output.output[1] == 0 ? "right" : "left";
                        switched = true;
                    }
                    else{
                        y = y + 1;
                        added = true;
                    }
                    break;
                case "right":
                    if(!switched){
                        direction = output.output[1] == 0 ? "up" : "down";
                        switched = true;
                    }
                    else{
                        x = x + 1;
                        added = true;
                    }
                    break;
            }
        }
        
        index = x+","+y;
        if(ship.hasOwnProperty(index) && ship[index].color === "white"){
            currentPanel = 1;
        }
        else{
            currentPanel = 0;
        }

    }

    //console.log(Object.keys(ship).length);
    console.log(drawRegistration(ship));
    return Object.keys(ship).length;
}

function drawRegistration(ship){
    var paint = [];
    var factor = 75;
    paint.length = factor*2;
    for(var i = 0; i < paint.length; i++){
        var row = [];
        row.length = factor*2;
        row.fill(".");
        paint[i] = row; 
    }

    var keys = Object.keys(ship);

    for(var i = 0; i < keys.length; i++){
        var coors = keys[i].trim().split(",");
        var x = parseInt(coors[0]) + factor;
        var y = parseInt(coors[1]) + factor;
        paint[y][x] = ship[keys[i]].color === "white" ? "#" : ".";
    }

    for(var i = 0; i < paint.length; i++){
        console.log(paint[i].join(""));
    }
    return paint.length;

}