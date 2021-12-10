const readline = require('readline');
const fs = require('fs');

const rl = readline.createInterface({
    input: fs.createReadStream('Dec6.txt')
});

let lanternfish = [];

rl.on('line', function (line) {
    lanternfish = line.trim().split(",").map( x => parseInt(x));
});

rl.on('close', function(){
    console.log(explosionofLifeHeapSafe(lanternfish.slice(), 256));
});

function explosionoflife(lanternfish, cycles){
    let count = 0;
    while(count < cycles){
        let append = 0;
        for(let i = 0; i < lanternfish.length; i++){
            if(lanternfish[i] == 0){
                lanternfish[i] = 6;
                append++;
            }
            else{
                lanternfish[i] = lanternfish[i] - 1;
            }
        }
        for(let i =0 ; i < append; i++){
            lanternfish.push(8);
        }
        count++;
    }
    return lanternfish.length
}

function explosionofLifeHeapSafe(school, cycles){
    let state = Array(9).fill(0);
    
    for(let i = 0; i < school.length; i++){
        state[school[i]] = state[school[i]]+ 1;
    }

    let count = 0;
    while(count < cycles){
        let temp_state = Array(9).fill(0);
        for(let i = 0; i < 9; i++){
            let current = state[i];
            if(i == 0){
                temp_state[8] = temp_state[8]+ current;
                temp_state[6] = temp_state[6]+ current;
            }
            else{
                temp_state[i-1] = temp_state[i-1] + current;
            }
        }
        state = temp_state;
        count++;
    }
    return state.reduce((x,y) => x+y);
}