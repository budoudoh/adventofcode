const readline = require('readline');
const fs = require('fs');
const { on } = require('events');

const rl = readline.createInterface({
    input: fs.createReadStream('Dec3.txt')
});

let diagnostics = [];

rl.on('line', function (line) {
    diagnostics.push(line.trim());
});

rl.on('close', function(){
    console.log(part1(diagnostics));
    console.log(part2(diagnostics));
});

function part1(diagnostics){
    let length = diagnostics[0].length;
    let epsilon = "";
    let gamma = "";
    for(let i = 0; i < length; i++){
        let ones = 0;
        let zeros = 0;
        for(let j = 0; j < diagnostics.length; j++){
            let char = diagnostics[j].charAt(i);
            if(char === "1"){
                ones++;
            }
            else{
                zeros++;
            }
        }

        if(ones > zeros){
            gamma = gamma +"1";
            epsilon = epsilon +"0";
        }
        else{
            gamma = gamma +"0";
            epsilon = epsilon +"1";
        }
    }
    return parseInt(epsilon, 2)*parseInt(gamma, 2);
}

function part2(diagnostics){
    let oxygen = findRating(diagnostics, 1);
    let co2 = findRating(diagnostics, 0);
    return oxygen*co2;
}

function findRating(diagnostics, direction){
    let indexes = [...Array(diagnostics.length).keys()];
    let length = diagnostics[0].length;
    for(let i = 0; i < length; i++){
        let ones = [];
        let zeros = [];
        for(let j = 0; j < indexes.length; j++){
            let char = diagnostics[indexes[j]].charAt(i);
            if(char === "1"){
                ones.push(indexes[j]);
            }
            else{
                zeros.push(indexes[j]);
            }
        }
        //console.log(ones.length, zeros.length);
        if(direction){
            if(ones.length < zeros.length){
                indexes = zeros
            }
            else{
                indexes = ones;
            }
        }
        else{
            if(ones.length >= zeros.length){
                indexes = zeros
            }
            else{
                indexes = ones;
            }
        }

        if(indexes.length == 1){
            break;
        }
    }
    //console.log(indexes);
    return parseInt(diagnostics[indexes[0]], 2);
}