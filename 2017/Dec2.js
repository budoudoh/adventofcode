const readline = require('readline');
const fs = require('fs');

const rl = readline.createInterface({
    input: fs.createReadStream('Dec2.txt')
});

function checkSum(){
    var checksum = 0;
    
    rl.on('line', function (line) {
        var digits = line.trim().split('\t');
        var min = 0;
        var max = 0;
    
        for(var i=0; i < digits.length; i++){
            var current = parseInt(digits[i]);
            if(current < min || min == 0)
                min = current;
            if(current > max || max == 0)
                max = current;
        }
    
        checksum = checksum + (max - min);
    });
    
    rl.on('close', function(){
        console.log(checksum);
    })
}

function divisorChecksum(){
    var checksum = 0;
    
    rl.on('line', function (line) {
        var digits = line.trim().split("\t");
        var found = false
        for(var i=0; i < digits.length; i++){
            var divisor = parseInt(digits[i]);
            for(var j = 0; j < digits.length; j++)
            {
                if(j != i){
                    var dividend = parseInt(digits[j]);
                    if(Number.isInteger(dividend/divisor)){
                        console.log(dividend + "/"+divisor + " = " + dividend/divisor);
                        checksum = checksum + dividend/divisor;
                        found = true;
                        break;
                    }
                }        
            }
            if(found == true){
                break;
            }
        }
    });
    
    rl.on('close', function(){
        console.log(checksum);
    })
}

divisorChecksum();