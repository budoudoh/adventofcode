const readline = require('readline');
const fs = require('fs');

const rl = readline.createInterface({
    input: fs.createReadStream('Dec1.txt')
});

var masses = [];
var fuelSum = 0;

function sumFuelNeeded(mass){
    var sum = Math.floor(mass/3) - 2;
    if(sum > 0)
        fuelSum = fuelSum + sum;
    return sum;
}

rl.on('line', function (line) {
    var mass = parseInt(line.trim());
    masses.push(mass);
    var sum = sumFuelNeeded(mass);
    while(sum > 0){
        sum = sumFuelNeeded(sum);
    }
});

rl.on('close', function(){
    console.log(fuelSum);
    /*fuelSum = 3481005;
    var sumPositive  = true;
    var actualFuelSum = fuelSum;
    var sum = fuelSum;
    while(sumPositive){
        sum = sumFuelNeeded(sum);
        if(sum > 0){
            actualFuelSum = actualFuelSum + sum;
            console.log("+"+sum);
        }
        else{
            sumPositive = false;
        }
    }
    console.log(actualFuelSum);*/
})