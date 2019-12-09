const readline = require('readline');
const fs = require('fs');

const rl = readline.createInterface({
    input: fs.createReadStream('Dec2.txt')
});

var intcode = [];
var resultTest = 19690720;
rl.on('line', function (line) {
    //line = "2,4,4,5,99,9801";
    intcode = line.trim().split(",");
});

rl.on('close', function(){
    var foundResult = false;
    for(var i = 0; i < 100; i++){
        for(var j = 0; j < 100; j++){
            var copy = intcode.slice(0);
            var result = runIntcode(copy, i, j);
            console.log("("+i+","+j+") "+result + " "+intcode[0]);
            if(result == resultTest){
                console.log(100*i+j);
                foundResult = true;
                break;
            }
        }
        if(foundResult){
            break;
        }
    }
    console.log(runIntcode(intcode, 12, 2));
    
});

function runIntcode(code, noun, verb){
    code[1] = noun;
    code[2] = verb;
    var window = 0;
    var run = true;
    while(run){
        var command = parseInt(code[window]);
        switch(command){
            case 1:
                var positionOne = parseInt(code[window+1]);
                var positionTwo = parseInt(code[window+2]);
                var sum = parseInt(code[positionOne]) + parseInt(code[positionTwo]);
                var index = parseInt(code[window+3]);
                code[index] = sum;
                break;
            case 2:
                var positionOne = parseInt(code[window+1]);
                var positionTwo = parseInt(code[window+2]);
                var multiple = parseInt(code[positionOne]) * parseInt(code[positionTwo]);
                var index = parseInt(code[window+3]);
                code[index] = multiple;
                break;
            case 99:
                run = false;
                break;
        }
        window = window + 4;
    }
    return code[0];
}