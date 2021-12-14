const readline = require('readline');
const fs = require('fs');
const _ = require('lodash');

const rl = readline.createInterface({
    input: fs.createReadStream('Dec11.txt')
});

let octopuses = [];

rl.on('line', function (line) {
    let row = line.trim().split("").map( x => parseInt(x));
    octopuses.push(row);
});

rl.on('close', function(){
    console.log(part1(octopuses.slice(), 100));
    console.log(part2(octopuses.slice()));
});

function part1(octopuses, steps){
    let count = 0;
    let flashing_count = 0; 
    while(count < steps){
        let flashing = [];
        let flashed = new Set();
        for(let i = 0; i < octopuses.length; i++){
            let row = octopuses[i];
            for(let j = 0; j < row.length; j++){
                row[j] = row[j] + 1;
                if(row[j] > 9){
                    let point = {
                        x: i,
                        y: j
                    }
                    flashing.push(point);
                    flashed.add(`${point.x},${point.y}`)
                }
            }
        }

        while(flashing.length > 0){
            let point = flashing.shift();
            octopuses[point.x][point.y] = 0;
            for(let x_diff = -1; x_diff <= 1; x_diff++){
                for(let y_diff = -1; y_diff <= 1; y_diff++){
                    let x = point.x + x_diff;
                    let y = point.y + y_diff;
                    if(_.inRange(x, octopuses.length) && _.inRange(y, octopuses.length) && !flashed.has(`${x},${y}`)){
                        octopuses[x][y] = octopuses[x][y] + 1;
                        if(octopuses[x][y] > 9){
                            let point = {
                                x: x,
                                y: y
                            }
                            flashing.push(point);
                            flashed.add(`${point.x},${point.y}`)
                        }
                    }
                }
            }
            flashing_count++;
        }
        count++;
    }
    return flashing_count;
}

function part2(octopuses){
    let count = 0;
    let all_flash = false 
    while(!all_flash){
        let flashing = [];
        let flashed = new Set();
        for(let i = 0; i < octopuses.length; i++){
            let row = octopuses[i];
            for(let j = 0; j < row.length; j++){
                row[j] = row[j] + 1;
                if(row[j] > 9){
                    let point = {
                        x: i,
                        y: j
                    }
                    flashing.push(point);
                    flashed.add(`${point.x},${point.y}`)
                }
            }
        }

        while(flashing.length > 0){
            let point = flashing.shift();
            octopuses[point.x][point.y] = 0;
            for(let x_diff = -1; x_diff <= 1; x_diff++){
                for(let y_diff = -1; y_diff <= 1; y_diff++){
                    let x = point.x + x_diff;
                    let y = point.y + y_diff;
                    if(_.inRange(x, octopuses.length) && _.inRange(y, octopuses.length) && !flashed.has(`${x},${y}`)){
                        octopuses[x][y] = octopuses[x][y] + 1;
                        if(octopuses[x][y] > 9){
                            let point = {
                                x: x,
                                y: y
                            }
                            flashing.push(point);
                            flashed.add(`${point.x},${point.y}`)
                        }
                    }
                }
            }
        }
        count++;
        if(flashed.size == 100){
            all_flash = true;
        }
    }
    return count;
}