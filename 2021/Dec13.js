const readline = require('readline');
const fs = require('fs');
const _ = require('lodash');

const rl = readline.createInterface({
    input: fs.createReadStream('Dec13.txt')
});

let paper = new Set();
let folding_instructions = [];
let on_folding = false;

String.prototype.replaceAt = function(index, replacement) {
    return this.substr(0, index) + replacement + this.substr(index + replacement.length);
}

rl.on('line', function (line) {
    if(line.length > 0){
        if(!on_folding){
            let temp = line.trim();
            paper.add(temp);
        }
        else{
            let temp = line.trim().replace("fold along", "").trim().split("=");
            let instruction = {
                direction: temp[0],
                line: parseInt(temp[1])
            }
            folding_instructions.push(instruction);
        }
    }
    else{
        on_folding = true;
    } 
});

rl.on('close', function(){
    console.log(origami(paper, folding_instructions.slice(), folding_instructions.length));
});

function origami(paper, instructions, folds){
    let count = 0;
    while(count < folds){
        let fold = instructions.shift();
        let temp = new Set();
        let index = fold.direction === "x" ? 0 : 1;
        for (let coord of paper){
            let values = coord.trim().split(",").map( x => parseInt(x));
            if(values[index] > fold.line){
                let new_value = fold.line - Math.abs(values[index] - fold.line);
                values[index] = new_value;
                let new_coord = `${values[0]},${values[1]}`;
                temp.add(new_coord);
            }
            else{
                temp.add(coord);
            }
        }
        paper = temp;
        count++;
    }
    let plane = []
    for(let y = 0; y < 40; y++){
        let row = [];
        for(let x = 0; x < 40; x++){
            row.push(".");
        }
        plane.push(row);
    }

    for(let coord of paper){
        let values = coord.trim().split(",").map( x => parseInt(x));
        plane[values[1]][values[0]] = "#";
    }
    for(let i = 0; i < plane.length; i++){
        plane[i] = plane[i].join("");
    }
    return plane;
}