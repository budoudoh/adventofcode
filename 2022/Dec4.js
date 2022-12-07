const readline = require('readline');
const fs = require('fs');

const rl = readline.createInterface({
    input: fs.createReadStream('Dec4.txt')
});

let lineRegex = /([0-9]+ ?)-([0-9]+ ?),([0-9]+ ?)-([0-9]+ ?)$/;

let idRangePairs = [];
rl.on('line', function (line) {
    let matches = lineRegex.exec(line.trim());
    let entry = {
        range1Start: parseInt(matches[1]),
        range1End: parseInt(matches[2]),
        range2Start: parseInt(matches[3]),
        range2End: parseInt(matches[4])
    }
    idRangePairs.push(entry);
});

rl.on('close', function(){
    console.log(part1(idRangePairs));
});

function part1(idRangePairs){
    for(let i in idRangePairs){
        
    }
}
