const readline = require('readline');
const fs = require('fs');

const rl = readline.createInterface({
    input: fs.createReadStream('Dec9.txt')
});

let preambleSize = 25;
let preamble = [];
let rangeStart = 0;
let rangeEnd = 0;
let invalid = NaN;

rl.on('line', function (line) {
    processEntry(parseInt(line.trim()));
});

rl.on('close', function(){
    console.log(invalid);
    console.log(findWeakness());
});

function processEntry(entry){
    if(preamble.length < preambleSize){
        preamble.push(entry);
        rangeEnd++;
        return;
    }
    
    if(isNaN(invalid)){
        let found = false;
        for(let i = rangeStart; i < rangeEnd; i++){
            for(let j = rangeStart; j < rangeEnd; j++){
                if(i != j){
                    let current = preamble[i] + preamble[j];
                    if(current == entry){
                        found = true;
                        break;
                    }
                }
            }
            if(found)
                break;
        }

        rangeStart++;
        rangeEnd++;
        if(!found && isNaN(invalid)){
            invalid = entry;
        }
    }
    preamble.push(entry);
    return;
}

function findWeakness(){
    let index = 0;
    let current = index + 1;
    let found = false;
    while (!found){
        let sum = preamble[index];
        while(sum < invalid && current < preamble.length){
            sum = sum + preamble[current];
            if(sum == invalid){
                found = true;
                break;
            }
            current++;

        }
        if(!found){
            index++;
            current = index + 1;
        }
    }
    
    let min = preamble[index];
    let max = preamble[current];

    for(let i = index; i <= current; i++){
        min = Math.min(preamble[i], min);
        max = Math.max(preamble[i], max);
    }

    return min + max;
}