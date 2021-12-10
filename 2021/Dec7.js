const readline = require('readline');
const fs = require('fs');

const rl = readline.createInterface({
    input: fs.createReadStream('Dec7.txt')
});

let crabs;
rl.on('line', function (line) {
    crabs = line.trim().split(",").map( x => parseInt(x)).sort((x,y) => x > y ? 1 : -1);
});

rl.on('close', function(){
    console.log(horizontalCrabs(crabs.slice(), true));
});

function horizontalCrabs(crabs, maxFuel){
    let fuel_cost = NaN;
    for(let i = 0; i < crabs[crabs.length-1]; i++){
        let temp = 0;
        for(let j = 0; j < crabs.length; j++){
            let range = Math.abs(crabs[j] - i);
            temp = temp + (maxFuel ? (Math.pow(range, 2) + range)/2 : range);
        }
        if(Number.isNaN(fuel_cost)){
            fuel_cost = temp;
        }
        else{
            fuel_cost = Math.min(fuel_cost, temp);
        }
    }
    return fuel_cost;
}
