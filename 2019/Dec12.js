const readline = require('readline');
const fs = require('fs');
const computer = require('./intcode');

const rl = readline.createInterface({
    input: fs.createReadStream('Dec12.txt')
});

rl.on('line', function (line) {
    //line = "104,1125899906842624,99";
    intcode = line.trim().split(",");
});

rl.on('close', function(){
    console.log(paintShip(intcode));
});