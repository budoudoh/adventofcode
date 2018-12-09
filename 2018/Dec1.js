const readline = require('readline');
const fs = require('fs');

function calibrate(start, steps){
    var frequency = start;
    for(var i = 0; i < steps.length; i++){
        frequency = eval(frequency+steps[i]);
    }
    return frequency;
}

function findRepeat(start, steps){
    const frequencySet = new Set();
    var repeat = false;
    var frequency = start;
    var repeatValue = 0;

    while(!repeat){
        for(var i = 0; i < steps.length; i++){
            frequency = eval(frequency+steps[i]);
            if(frequencySet.has(frequency)){
                repeat = true;
                repeatValue = frequency;
                break;
            }
            else{
                frequencySet.add(frequency);
            }
        }
    }
    
    return repeatValue;
}
var frequencies = [];

const rl = readline.createInterface({
    input: fs.createReadStream('Dec1.txt')
});

rl.on('line', function (line) {
    var frequency = line.trim();
    frequencies.push(frequency);
});

rl.on('close', function(){
    console.log(findRepeat(0, frequencies));
})
