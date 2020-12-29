const readline = require('readline');
const fs = require('fs');

const rl = readline.createInterface({
    input: fs.createReadStream('Dec14.txt')
});

let mask;
let mask_regex = /mask = ([X10]{36}?)$/;

let memory = {}
let memory_regex = /mem\[([0-9]+ ?)\] = ([0-9]+ ?)$/
let precision = 36;

rl.on('line', function (line) {
    processEntryPt2(line.trim());
});

rl.on('close', function(){
    console.log(printValues());
});

function processEntry(text){
    let mask_matches = mask_regex.exec(text);
    if(mask_matches){
        console.log(`mask = ${mask_matches[1]}`);
        mask = mask_matches[1];
        return;
    }

    let memory_matches = memory_regex.exec(text);
    if(memory_matches){
        let address = parseInt(memory_matches[1]);
        let value = Number(parseInt(memory_matches[2])).toString(2);
        while(value.length < precision){
            value = "0"+value;
        }

        for(let i = 0; i < mask.length; i++){
            switch(mask.charAt(i)){
                case "1":
                    value = setCharAt(value, i, "1");
                    break;
                case "0":
                    value = setCharAt(value, i, "0");
                    break;
            }
        }
        
        memory[address] = parseInt(value, 2);
        return;
    }
}

function processEntryPt2(text){
    let mask_matches = mask_regex.exec(text);
    if(mask_matches){
        mask = mask_matches[1];
        return;
    }

    let memory_matches = memory_regex.exec(text);
    if(memory_matches){
        let address = Number(parseInt(memory_matches[1])).toString(2);
        let value = parseInt(memory_matches[2]);

        while(address.length < precision){
            address = "0"+address;
        }

        let indicies = [];
        let count = 0;
        for(let i = 0; i < mask.length; i++){
            switch(mask.charAt(i)){
                case "1":
                    address = setCharAt(address, i, "1");
                    break;
                case "X":
                    indicies.push(i);
                    count++;
                    break;
            }
        }
        
        let combinations = Math.pow(2, count);

        for(let i = 0; i < combinations; i++){
            let current = Number(parseInt(i)).toString(2);
            while(current.length < count){
                current = "0"+current;
            }
            let temp = address;
            for(let j = 0; j < indicies.length; j++){
                temp = setCharAt(temp, indicies[j], current.charAt(j));
            }
            memory[parseInt(temp, 2)] = value;
        }
        
        return;
    }
}

function printValues(){
    let sum = 0;
    for(let address in memory){
        sum = sum + memory[address];
    }
    return sum;
}

function setCharAt(str,index,chr) {
    if(index > str.length-1) return str;
    return str.substring(0,index) + chr + str.substring(index+1);
}