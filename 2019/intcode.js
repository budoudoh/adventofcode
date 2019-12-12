function runIntcode(code, input){
    var window = 0;
    var run = true;
    var output = [];
    var relativeBase = 0;
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
        console.log("Opcode: "+oppCode+", parameterOneMode: "+parameterOneMode+", parameterTwoMode: "+parameterTwoMode+", parameterThreeMode: "+parameterThreeMode);
        switch(oppCode){
            case 1:
                var parameterOne = getValue(parameterOneMode, code, parseInt(code[window+1]), relativeBase);
                var parameterTwo = getValue(parameterTwoMode, code, parseInt(code[window+2]), relativeBase);
                var sum = parameterOne + parameterTwo;
                var index = getValue(parameterThreeMode, code, parseInt(code[window+3]), relativeBase, true);
                code[index] = sum;
                shift = 4;
                console.log("Parameter One: "+parameterOne+", parameterTwo: "+parameterTwo+", parameterThree: "+index);
                break;
            case 2:
                var parameterOne = getValue(parameterOneMode, code, parseInt(code[window+1]), relativeBase);
                var parameterTwo = getValue(parameterTwoMode, code, parseInt(code[window+2]), relativeBase);
                var multiple = parameterOne * parameterTwo;
                var index = getValue(parameterThreeMode, code, parseInt(code[window+3]), relativeBase, true);
                code[index] = multiple;
                shift = 4;
                console.log("Parameter One:  "+parameterOne+", parameterTwo: "+parameterTwo+", parameterThree: "+index);
                break;
            case 3:
                var parameterOne = getValue(parameterOneMode, code, parseInt(code[window+1]), relativeBase, true);
                code[parameterOne] = input;
                shift = 2;
                console.log(parseInt(code[window+1])+"Parameter One: "+parameterOne);
                break;
            case 4:
                output.push(getValue(parameterOneMode, code, parseInt(code[window+1]), relativeBase));
                shift = 2;
                console.log("Output: "+output);
                break;
            case 5:
                var parameterOne = getValue(parameterOneMode, code, parseInt(code[window+1]), relativeBase);
                var parameterTwo = getValue(parameterTwoMode, code, parseInt(code[window+2]), relativeBase);
                if(parameterOne != 0){
                    window = parameterTwo
                    shift = 0;
                }
                else{
                    shift = 3;
                }
                
                console.log("Parameter1: "+parameterOne+", parameterTwo: "+parameterTwo);
                break;
            case 6:
                var parameterOne = getValue(parameterOneMode, code, parseInt(code[window+1]), relativeBase);
                var parameterTwo = getValue(parameterTwoMode, code, parseInt(code[window+2]), relativeBase);
                if(parameterOne == 0){
                    window = parameterTwo
                    shift = 0;
                }
                else{
                    shift = 3;
                }
                
                console.log("Parameter1: "+parameterOne+", parameterTwo: "+parameterTwo);
                break;
            case 7:
                var parameterOne = getValue(parameterOneMode, code, parseInt(code[window+1]), relativeBase);
                var parameterTwo = getValue(parameterTwoMode, code, parseInt(code[window+2]), relativeBase);
                var lessThan = parameterOne < parameterTwo ? 1 : 0;
                var index = getValue(parameterThreeMode, code, parseInt(code[window+3]), relativeBase, true);
                code[index] = lessThan;
                shift = 4;
                console.log("Parameter1: "+parameterOne+", parameterTwo: "+parameterTwo+", parameterThree: "+index);
                break;
            case 8:
                var parameterOne = getValue(parameterOneMode, code, parseInt(code[window+1]), relativeBase);
                var parameterTwo = getValue(parameterTwoMode, code, parseInt(code[window+2]), relativeBase);
                var equalTo = parameterOne == parameterTwo ? 1 : 0;
                var index = getValue(parameterThreeMode, code, parseInt(code[window+3]), relativeBase, true);
                code[index] = equalTo;
                shift = 4;
                console.log("Parameter1: "+parameterOne+", parameterTwo: "+parameterTwo+", parameterThree: "+index);
                break;
            case 9:
                var parameterOne = getValue(parameterOneMode, code, parseInt(code[window+1]), relativeBase);
                relativeBase = relativeBase + parameterOne;
                shift = 2;
                console.log("Parameter1: "+parameterOne+", parameterTwo: "+parameterTwo+", parameterThree: "+index);
                console.log("New Relative Base: "+relativeBase)
                break;
            case 99:
                run = false;
                shift = 1;
                break;
        }
        window = window + shift;
    }
    return output;
}

function getValue(parameterMode, code, position, relativeBase, index){
    var value;
    switch(parameterMode){
        case 0:
            if(index == true)
                value = position;
            else
                value = parseInt(code[position]);
            break;
        case 1:
            value = position;
            break;
        case 2:
            if(index == true){
                value = relativeBase+position;
            }
            else
            {
                value = parseInt(code[relativeBase+position]);
            }
            break;
        default:
            value = parseInt(code[position]);
            break;

    }
    return value;
}

module.exports.run = runIntcode;