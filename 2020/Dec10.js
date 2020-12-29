const readline = require('readline');
const fs = require('fs');

const rl = readline.createInterface({
    input: fs.createReadStream('Dec10.txt')
});

let builtInJoltage = 0;
let adapters = [];

rl.on('line', function (line) {
    processEntry(parseInt(line.trim()));
});

rl.on('close', function(){
    builtInJoltage = builtInJoltage +3;
    let adapterValues = JSON.parse(JSON.stringify(adapters));
    //console.log(adapterSpread(0, builtInJoltage, adapterValues));
    console.log(combinations(0, builtInJoltage, adapterValues));
});


function processEntry(entry){
    builtInJoltage = Math.max(builtInJoltage, entry);
    adapters.push(entry);
}

function adapterSpread(startJoltage, endJoltage, adapters){
    adapters.sort((a,b) => a-b);
    let spreads = {
        1: 0,
        2: 0,
        3: 0
    }
    let current = startJoltage;
    for(let i = 0; i < adapters.length; i++){
        let joltage = adapters[i];
        if(joltage > current && joltage < current + 4){
            let spread = joltage - current;
            spreads[spread] = spreads[spread] + 1;
            current = joltage;
        }
    }

    let spread = endJoltage - current;
    spreads[spread] = spreads[spread] + 1;
    let spread_difference = spreads[1]*spreads[3];
    return spread_difference;
}

function combinations(startJoltage, endJoltage, adapters){
    adapters.sort((a,b) => a-b);
    let index = 0;
    let joltage = startJoltage;
    let combinations = 0;
    let run_combinations = 1;
    let counts = {};
    let spreads = {
        1: 0,
        2: 0,
        3: 0
    }
    while(index < adapters.length){
        let current = index;
        let count = 0;
        while(count < 3){
            let temp_joltage = current < adapters.length ? adapters[current] : endJoltage;
            if(temp_joltage > joltage + 3){
                break;
            }
            if(current >= adapters.length){
                break;
            }
            current++;
            count++;
        }

        spreads[count] = spreads[count] + 1;
        counts[index] = count;
        joltage = adapters[index];
        index++;
    }

    let total = Math.pow(3, spreads[3]) + Math.pow(2, spreads[2]) + 1;
    return total;
}

function combinationsDeux(startJoltage, endJoltage, adapters){
    adapters.sort((a,b) => a-b);
    let consecutives = [];
    let current = 1;
    for(let i = 0; i < adapters.length; i++){

    }
}

8099130339328