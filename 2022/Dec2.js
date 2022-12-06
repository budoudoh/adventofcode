const readline = require('readline');
const fs = require('fs');

const rl = readline.createInterface({
    input: fs.createReadStream('Dec2.txt')
});

let lineRegex = /([A-Z]+ ?) ([A-Z]+ ?)$/;
let total_score = 0;
let total_score2 = 0;

rl.on('line', function (line) {
    let matches = lineRegex.exec(line.trim());
    let entry = {
        opponent: matches[1],
        yours: matches[2]
    }
    entry.score1 = score_entry1(entry);
    total_score = total_score + entry.score1;
    entry.score2 = score_entry2(entry);
    total_score2 = total_score2 + entry.score2;
    
});

rl.on('close', function(){
    console.log(part1());
    console.log(part2());
});

function score_entry1(entry){
    let yours;

    switch(entry.yours){
        case "X":
            yours = "A";
            break;
        case "Y":
            yours = "B";
            break;
        case "Z":
            yours = "C";
            break;
    }

    let score = rock_paper_scissors(yours, entry.opponent);
    if(score > -1){
        switch(entry.yours){
            case "X":
                score = score + 1;
                break;
            case "Y":
                score = score + 2;
                break;
            case "Z":
                score = score + 3;
                break;
        }
    }
    return score;
}

function score_entry2(entry){
    let yours;

    switch(entry.yours){
        case "X":
            yours = entry.opponent == "A" ? "C" : entry.opponent == "B" ? "A" : "B";
            break;
        case "Y":
            yours = entry.opponent;
            break;
        case "Z":
            yours = entry.opponent == "A" ? "B" : entry.opponent == "B" ? "C" : "A";
            break;
    }

    let score = rock_paper_scissors(yours, entry.opponent);
    if(score > -1){
        switch(yours){
            case "A":
                score = score + 1;
                break;
            case "B":
                score = score + 2;
                break;
            case "C":
                score = score + 3;
                break;
        }
    }
    return score;
}

function rock_paper_scissors(player, opponent){
    let score = -1;
    switch(player+opponent){
        case "BA":
            score =  6;
            break;
        case "BB":
            score= 3;
            break;
        case "BC":
            score = 0;
            break;
        case "AA":
            score = 3;
            break;
        case "AB":
            score = 0;
            break;
        case "AC":
            score = 6;
            break;
        case "CA":
            score = 0;
            break;
        case "CB":
            score = 6;
            break;
        case "CC":
            score = 3;
            break;
    }

    return score;
}

function part1(){
    return total_score;
}

function part2(){
    return total_score2;
}