const readline = require('readline');
const fs = require('fs');

const rl = readline.createInterface({
    input: fs.createReadStream('Dec8.txt')
});

let opps = [];
let oppRegex = /([a-z]{3} ?) ([+-]{1}[0-9]{1,3} ?)$/;
let nops = [];
let jmps = [];

rl.on('line', function (line) {
    line = line.trim();
    processOpp(line);
});

rl.on('close', function(){
    findLoopPoint(opps, true);
    testNops();
    testJmps()
});

function processOpp(text){
    let matches = oppRegex.exec(text.trim());
    let opp = {
        instruction: matches[1],
        value: parseInt(matches[2])
    }
    opps.push(opp);
}

function findLoopPoint(opps, iterative){
    let accumulator = 0;
    let instructions = new Set();
    let loop = false;
    let current = 0;
    let infinite = true;
    let maxCurrent = current;

    do{
        if(instructions.has(current)){
            loop = false;
            break;
        }

        if(current >= opps.length){
            infinite = false;
            loop = false;
            break;
        }

        instructions.add(current);

        let opp = opps[current];
        maxCurrent = Math.max(maxCurrent, current);
        switch(opp.instruction){
            case "nop":
                if(iterative)
                    nops.push(current);
                current++;
                break;
            case "acc":
                accumulator = accumulator + opp.value;
                current++;
                break;
            case "jmp":
                if(iterative)
                    jmps.push(current);
                current = current + opp.value;
                break;
        }
    }while(!loop)

    return {
        accumulator: accumulator,
        infinite: infinite
    };
}

function testNops(){
    for(let i = 0; i < nops.length; i++){
        let current = nops[i];
        let new_opps = JSON.parse(JSON.stringify(opps));
        new_opps[current].instruction = "jmp";
        console.log(findLoopPoint(new_opps, false));
    }
}
function testJmps(){
    for(let i = 0; i < jmps.length; i++){
        let current = jmps[i];
        let new_opps = JSON.parse(JSON.stringify(opps));
        new_opps[current].instruction = "nop";
        console.log(findLoopPoint(new_opps, false));
    }
}