const readline = require('readline');
const fs = require('fs');

const rl = readline.createInterface({
    input: fs.createReadStream('Dec1.txt')
});

let measurements = [];

rl.on('line', function (line) {
    measurements.push(parseInt(line.trim()));
});

rl.on('close', function(){
    console.log(part1(measurements));
    console.log(part2(measurements));
});

function part1(measurements){
    let last = 0;
    let count = 0;
    for(let i = 0; i < measurements.length; i++){
        let current = measurements[i];
        if(last > 0 && last < current){
            count++;
        }
        last = current;
        
    }
    return count;
}
// Part 2

function part2(measurements){
    let start = 0;
    let count = 0;
    let last = 0;
    let current = 0;
    while(start <= measurements.length - 3){
        for(let i = start; i < start+3; i++){
            current = current + measurements[i];
        }

        if(last > 0 && last < current){
            count++;
        }
        last = current;
        current = 0;
        start++;
    }
    return count;
}

