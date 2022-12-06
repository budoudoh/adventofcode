const readline = require('readline');
const fs = require('fs');

const rl = readline.createInterface({
    input: fs.createReadStream('Dec1.txt')
});

let elves = [];
let calories = [];
let counts = [];
let count = 0;
let max = 0;

rl.on('line', function (line) {
    let calorie = line.trim();
    if(calorie.length > 0){
        calorie = parseInt(calorie);
        count = count + calorie;
        calories.push(calorie);
    }
    else{
        elves.push(calories);
        calories =[];
        counts.push(count);
        max = Math.max(max, count);
        count = 0;
    }
});

rl.on('close', function(){
    console.log(part1());
    console.log(part2());
});

function part1(){
    return max;
}

function part2(){
    counts.sort((a,b) => b - a);
    return counts[0]+counts[1] + counts[2];
}