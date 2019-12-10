const readline = require('readline');
const fs = require('fs');

const rl = readline.createInterface({
    input: fs.createReadStream('Dec5.txt')
});

var intcode = [];
var resultTest = 19690720;
rl.on('line', function (line) {
    //line = "3,21,1008,21,8,20,1005,20,22,107,8,21,20,1006,20,31,1106,0,36,98,0,0,1002,21,125,20,4,20,1105,1,46,104,999,1105,1,46,1101,1000,1,20,4,20,1105,1,46,98,99";
    intcode = line.trim().split(",");
});

rl.on('close', function(){
    console.log(runIntcode(intcode, 5));
});

function runIntcode(code, input){
    /*code[1] = noun;
    code[2] = verb;*/
    var window = 0;
    var run = true;
    var output;
    while(run){
        var command = parseInt(code[window]);
        var oppCode = command%100;
        command = Math.floor(command/100);
        var parameterOneMode = command%10;
        command = Math.floor(command/10)
        var parameterTwoMode = command%10;
        command = Math.floor(command/10)
        var parameterThreeMode = command%10;
        command = Math.floor(command/10)
        var shift;
        console.log("Opcode: "+oppCode+", parameterOneMode: "+parameterOneMode+", parameterTwoMode: "+parameterTwoMode);
        switch(oppCode){
            case 1:
                var positionOne = parseInt(code[window+1]);
                var parameterOne = parameterOneMode == 0 ? parseInt(code[positionOne]) : positionOne;
                var positionTwo = parseInt(code[window+2]);
                var parameterTwo = parameterTwoMode == 0 ? parseInt(code[positionTwo]) : positionTwo;
                var sum = parameterOne + parameterTwo;
                var index = parseInt(code[window+3]);
                code[index] = sum;
                shift = 4;
                console.log("Parameter One: "+parameterOne+", parameterTwo: "+parameterTwo+", parameterThree: "+index);
                break;
            case 2:
                var positionOne = parseInt(code[window+1]);
                var parameterOne = parameterOneMode == 0 ? parseInt(code[positionOne]) : positionOne;
                var positionTwo = parseInt(code[window+2]);
                var parameterTwo = parameterTwoMode == 0 ? parseInt(code[positionTwo]) : positionTwo;
                var multiple = parameterOne * parameterTwo;
                var index = parseInt(code[window+3]);
                code[index] = multiple;
                shift = 4;
                console.log("Parameter One:  "+parameterOne+", parameterTwo: "+parameterTwo+", parameterThree: "+index);
                break;
            case 3:
                var positionOne = parseInt(code[window+1]);
                code[positionOne] = input;
                shift = 2;
                console.log("Parameter One: "+parameterOne);
                break;
            case 4:
                var positionOne = parseInt(code[window+1]);
                output = parameterOneMode == 0 ? parseInt(code[positionOne]) : positionOne;
                shift = 2;
                console.log("Parameter One "+positionOne);
                console.log("Output: "+output);
                break;
            case 5:
                var positionOne = parseInt(code[window+1]);
                var parameterOne = parameterOneMode == 0 ? parseInt(code[positionOne]) : positionOne;
                var positionTwo = parseInt(code[window+2]);
                var parameterTwo = parameterTwoMode == 0 ? parseInt(code[positionTwo]) : positionTwo;
                if(parameterOne != 0){
                    window = parameterTwo
                    shift = 0;
                }
                else{
                    shift = 3;
                }
                
                console.log("Parameter1: "+parameterOne+", parameterTwo: "+parameterTwo+", parameterThree: "+index);
                break;
            case 6:
                var positionOne = parseInt(code[window+1]);
                var parameterOne = parameterOneMode == 0 ? parseInt(code[positionOne]) : positionOne;
                var positionTwo = parseInt(code[window+2]);
                var parameterTwo = parameterTwoMode == 0 ? parseInt(code[positionTwo]) : positionTwo;
                if(parameterOne == 0){
                    window = parameterTwo
                    shift = 0;
                }
                else{
                    shift = 3;
                }
                
                console.log("Parameter1: "+parameterOne+", parameterTwo: "+parameterTwo+", parameterThree: "+index);
                break;
            case 7:
                var positionOne = parseInt(code[window+1]);
                var parameterOne = parameterOneMode == 0 ? parseInt(code[positionOne]) : positionOne;
                var positionTwo = parseInt(code[window+2]);
                var parameterTwo = parameterTwoMode == 0 ? parseInt(code[positionTwo]) : positionTwo;
                var lessThan = parameterOne < parameterTwo ? 1 : 0;
                var index = parseInt(code[window+3]);
                code[index] = lessThan;
                shift = 4;
                console.log("Parameter1: "+parameterOne+", parameterTwo: "+parameterTwo+", parameterThree: "+index);
                break;
            case 8:
                var positionOne = parseInt(code[window+1]);
                var parameterOne = parameterOneMode == 0 ? parseInt(code[positionOne]) : positionOne;
                var positionTwo = parseInt(code[window+2]);
                var parameterTwo = parameterTwoMode == 0 ? parseInt(code[positionTwo]) : positionTwo;
                var equalTo = parameterOne == parameterTwo ? 1 : 0;
                var index = parseInt(code[window+3]);
                code[index] = equalTo;
                shift = 4;
                console.log("Parameter1: "+parameterOne+", parameterTwo: "+parameterTwo+", parameterThree: "+index);
                break;
            case 99:
                run = false;
                shift = 1;
                break;
        }
        window = window + shift;
    }
    return code[0];
}