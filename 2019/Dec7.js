const readline = require('readline');
const fs = require('fs');

const rl = readline.createInterface({
    input: fs.createReadStream('Dec7.txt')
});

var intcode = [];
var resultTest = 19690720;
rl.on('line', function (line) {
    //line = "3,52,1001,52,-5,52,3,53,1,52,56,54,1007,54,5,55,1005,55,26,1001,54,-5,54,1105,1,12,1,53,54,53,1008,54,0,55,1001,55,1,55,2,53,55,53,4,53,1001,56,-1,56,1005,56,6,99,0,0,0,0,10";
    intcode = line.trim().split(",");
});

rl.on('close', function(){
    console.log(checkAmps(intcode));
});

function checkAmps(intcode){
    var settings = "56789";
    var maxCombinations = 120;
    var ampsValues = {};
    var maxValue = 0;
    var maxAmpsSetting = settings;
    while(Object.keys(ampsValues).length < maxCombinations){
        var shuffled = settings.split('').sort(function(){return 0.5-Math.random()}).join('');
        if(ampsValues.hasOwnProperty(shuffled)){
            continue;
        }
        var amps = calculateAmpsPt2(intcode, shuffled);
        ampsValues[shuffled] = amps;
        if(amps > maxValue){
            maxValue = amps;
            maxAmpsSetting = shuffled;
        }
    }
    return maxAmpsSetting+":"+maxValue;
}

function calculateAmps(intcode, settings){
    var lastAmps = 0;
    console.log(settings);

    for(var i = 0; i < settings.length; i++){
        var copy = intcode.slice(0);
        var phase = parseInt(settings.charAt(i));
        var output = runIntcode(copy, phase, lastAmps, 0, false);
        lastAmps = output.Output;
        running = !output.Halt;
    } 
    return lastAmps;
}

function calculateAmpsPt2(intcode, settings){
    var lastAmps = 0;
    console.log(settings);
    var running = true;
    var ignoreInputOne = false;
    var state = [];
    while(running){
        console.log("LastAmps: "+lastAmps);
        for(var i = 0; i < settings.length; i++){
            if(state.length <= i){
                var copy = intcode.slice(0);
                state.push({});
                state[i].endPoint = 0;
                state[i].intcode = copy;
            }
            
            var phase = parseInt(settings.charAt(i));
            var output = runIntcode(state[i].intcode, phase, lastAmps, state[i].endPoint, ignoreInputOne);
            state[i].lastAmps = output.Output;
            state[i].endPoint = output.EndPoint;
            state[i].halt = output.Halt;
            lastAmps = output.Output;
            running = !output.Halt;
        }
        ignoreInputOne = true;

    }
    return lastAmps;
}

function runIntcode(code, inputOne, inputTwo, startingPoint, ignoreInputOne){
    var window = startingPoint;
    var run = true;
    var inputOneUsed = false;
    var inputTwoUsed = false;
    var output;
    var halt = false;
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
        //console.log("Opcode: "+oppCode+", parameterOneMode: "+parameterOneMode+", parameterTwoMode: "+parameterTwoMode);
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
                console.log("Add - Parameter One: "+parameterOne+", parameterTwo: "+parameterTwo+", parameterThree: "+index);
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
                console.log("Multiply - Parameter One:  "+parameterOne+", parameterTwo: "+parameterTwo+", parameterThree: "+index);
                break;
            case 3:
                var positionOne = parseInt(code[window+1]);
                if(!inputOneUsed && !ignoreInputOne){
                    code[positionOne] = inputOne;
                    inputOneUsed = true;
                    shift = 2;
                    console.log("Set Input One - Parameter One: "+positionOne);
                }
                else if (!inputTwoUsed){
                    code[positionOne] = inputTwo;
                    inputTwoUsed = true;
                    shift = 2;
                    console.log("Set Input Two - Parameter One: "+positionOne);
                }
                else{
                    run = false;
                    shift = 0;
                    console.log("No Input");
                }
                break;
            case 4:
                var positionOne = parseInt(code[window+1]);
                output = parameterOneMode == 0 ? parseInt(code[positionOne]) : positionOne;
                inputTwo = output;
                shift = 2;
                console.log("Set Output - Parameter One "+positionOne);
                console.log("Output: "+output);
                //run = false;
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
                
                console.log("Jump if Not Zero - Parameter1: "+parameterOne+", parameterTwo: "+parameterTwo+", parameterThree: "+index);
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
                
                console.log("Jump if Zero - Parameter1: "+parameterOne+", parameterTwo: "+parameterTwo+", parameterThree: "+index);
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
                console.log("Less Than - Parameter1: "+parameterOne+", parameterTwo: "+parameterTwo+", parameterThree: "+index);
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
                console.log("Equal To - Parameter1: "+parameterOne+", parameterTwo: "+parameterTwo+", parameterThree: "+index);
                break;
            case 99:
                run = false;
                halt = true;
                shift = 1;
                console.log("Done");
                //throw "HALT";
                break;
        }
        window = window + shift;
    }
    return {"Output": output, "Halt": halt, "EndPoint": window};
}
