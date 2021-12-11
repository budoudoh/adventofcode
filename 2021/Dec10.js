const readline = require('readline');
const fs = require('fs');

const rl = readline.createInterface({
    input: fs.createReadStream('Dec10.txt')
});

let nav_subsystem = [];

let scores = {
    ")": 3,
    "]": 57,
    "}": 1197,
    ">": 25137
}

let autocomplete_scores = {
    ")": 1,
    "]": 2,
    "}": 3,
    ">": 4
}

let chunks = {
    "{": "}",
    "<": ">",
    "[": "]",
    "(": ")"
}

rl.on('line', function (line) {
    let row = line.trim();
    nav_subsystem.push(row);
});

rl.on('close', function(){
    console.log(part1(nav_subsystem.slice(), scores));
    console.log(part2(nav_subsystem.slice(), autocomplete_scores));
});

function part1(sys, scores){
    let syntax_score = 0;
    for(let i = 0; i < sys.length; i++){
        let line = sys[i];
        let terms = [];
        for(let j = 0; j < line.length; j++){
            let cur = line.charAt(j);
            if(chunks.hasOwnProperty(cur)){
                terms.unshift(chunks[cur]);
            }
            else{
                let close = terms.shift();
                if(close !== cur){
                    syntax_score = syntax_score + scores[cur];
                    break;
                }
            }

        }
    }
    return syntax_score;
}

function part2(sys, scores){
    let autocomplete_scores = [];
    for(let i = 0; i < sys.length; i++){
        let line = sys[i];
        let terms = [];
        let incomplete = true;
        for(let j = 0; j < line.length; j++){
            let cur = line.charAt(j);
            if(chunks.hasOwnProperty(cur)){
                terms.unshift(chunks[cur]);
            }
            else{
                let close = terms.shift();
                if(close !== cur){
                    incomplete = false;
                    break;
                }
            }
        }
        if(incomplete){
            let line_score = 0;
            for(let j = 0; j < terms.length; j++){
                line_score = line_score*5+scores[terms[j]];
            }
            autocomplete_scores.push(line_score);
        }
    }
    autocomplete_scores.sort((x,y) => x < y? -1: 1 );
    return autocomplete_scores[(autocomplete_scores.length/2 - .5)]
}