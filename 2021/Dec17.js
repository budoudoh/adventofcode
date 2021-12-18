const readline = require('readline');
const fs = require('fs');
const _ = require('lodash');

const rl = readline.createInterface({
    input: fs.createReadStream('Dec17.txt')
});

let inputRegex = /target area: x=([-]*[0-9]+ ?)..([-]*[0-9]+ ?), y=([-]*[0-9]+ ?)..([-]*[0-9]+ ?)$/;
let ranges;
rl.on('line', function (line) {
    let matches = inputRegex.exec(line.trim());
    ranges = {
        x_start: parseInt(matches[1]),
        x_end: parseInt(matches[2]),
        y_start: parseInt(matches[3]),
        y_end: parseInt(matches[4])
    }
});

rl.on('close', function(){
    console.log(part1(ranges));
});


function part1(ranges){
    let y_stop = 10*Math.abs(ranges.y_start - ranges.y_end);
    let x_stop = 10*Math.abs(ranges.x_start - ranges.x_end);
    let max = 0;
    let velocities = new Set();
    for(let y_velocity = y_stop; y_velocity > -1*y_stop; y_velocity--){
        for(let x_velocity = x_stop; x_velocity > 0; x_velocity--){
            let step = 0;
            let position = [0,0];
            while(position[0] <= ranges.x_end && position[1] >= ranges.y_start){
                position[0] = step < x_velocity ? position[0] + x_velocity - step : position[0];
                position[1] = position[1] + y_velocity - step;
                if(inRange(position[0], ranges.x_start, ranges.x_end) && inRange(position[1], ranges.y_end, ranges.y_start)){
                    max = Math.max(max, maxHeight(y_velocity));
                    velocities.add(`${x_velocity},${y_velocity}`);
                }
                step++;
            }
        }
    }
    return max;
}

function maxHeight(y){
    return y*(y+1)/2;
}

function inRange(number, start, finish){
    if(start > finish){
        let temp = start;
        start = finish;
        finish = temp;
    }

    return number >= start && number <= finish;
}