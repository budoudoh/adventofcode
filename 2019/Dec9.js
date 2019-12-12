const readline = require('readline');
const fs = require('fs');
const computer = require('./intcode');

const rl = readline.createInterface({
    input: fs.createReadStream('Dec9.txt')
});

var intcode = [];
rl.on('line', function (line) {
    //line = "104,1125899906842624,99";
    intcode = line.trim().split(",");
});

rl.on('close', function(){
    var filler = [];
    filler.length = intcode.length*10;
    filler.fill(0);
    var code = intcode.concat(filler);
    //console.log(code);
    console.log(computer.run(code, 2));
});