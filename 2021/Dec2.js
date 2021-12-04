const readline = require('readline');
const fs = require('fs');

const rl = readline.createInterface({
    input: fs.createReadStream('Dec2.txt')
});

let instructions = [];

rl.on('line', function (line) {
    instructions.push(line.trim());
});

rl.on('close', function(){
    console.log(part1(instructions));
    console.log(part2(instructions));
});

function part1(instructions){
    let horizontal = 0;
    let depth = 0;
    
    for(let i = 0; i < instructions.length; i++){
        let instruction = instructions[i].split(" ");

        if(instruction.length == 2){
            switch(instruction[0].trim()){
                case "forward":
                    horizontal = horizontal + parseInt(instruction[1].trim());
                    break;
                case "up":
                    depth = depth - parseInt(instruction[1].trim());
                    break;
                case "down":
                    depth = depth + parseInt(instruction[1].trim());
                    break;
            }
        }
    }
    console.log(`${horizontal}, ${depth}`);
    return horizontal*depth;
}

function part2(instructions){
    let horizontal = 0;
    let depth = 0;
    let aim = 0;
    
    for(let i = 0; i < instructions.length; i++){
        let instruction = instructions[i].split(" ");

        if(instruction.length == 2){
            let x = parseInt(instruction[1].trim());
            switch(instruction[0].trim()){
                case "forward":
                    horizontal = horizontal + x;
                    depth = depth + aim*x;
                    break;
                case "up":
                    aim = aim - x;
                    break;
                case "down":
                    aim = aim + x;
                    break;
            }
        }
    }
    console.log(`${horizontal}, ${depth}`);
    return horizontal*depth;
}