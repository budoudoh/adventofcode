const readline = require('readline');
const fs = require('fs');

const rl = readline.createInterface({
    input: fs.createReadStream('Dec4.txt')
});

let lineRegex = /([0-9]+ ?)-([0-9]+ ?),([0-9]+ ?)-([0-9]+ ?)$/;

rl.on('line', function (line) {
    let matches = lineRegex.exec(line.trim());
    let entry = {
        x1: parseInt(matches[1]),
        y1: parseInt(matches[2]),
        x2: parseInt(matches[3]),
        y2: parseInt(matches[4])
    }

    if(entry.x1 == entry.x2){
        vertical_lines.push(entry);
    }

    if(entry.y1 == entry.y2){
        horizontal_lines.push(entry);
    }
    lines.push(entry);
});

rl.on('close', function(){
    console.log(part2(lines));
});
