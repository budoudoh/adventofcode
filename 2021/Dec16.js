const readline = require('readline');
const fs = require('fs');
const _ = require('lodash');

const rl = readline.createInterface({
    input: fs.createReadStream('Dec16test.txt')
});

let translation = {
    "0": "0000",
    "1": "0001",
    "2": "0010",
    "3": "0011",
    "4": "0100",
    "5": "0101",
    "6": "0110",
    "7": "0111",
    "8": "1000",
    "9": "1001",
    "A": "1010",
    "B": "1011",
    "C": "1100",
    "D": "1101",
    "E": "1110",
    "F": "1111"
}
let transmission = "";
rl.on('line', function (line) {
    transmission = line.trim();
});

rl.on('close', function(){
    let decoded = decode(transmission);
    console.log(processTransmission(decoded, 0));
});
let versions = [];

function processTransmission(decoded, index){
    let start = index;
    let version = parseInt(decoded.substring(index, index+3), 2);
    versions.push(version);
    let type = parseInt(decoded.substring(index+3, index+6), 2);
    index = index + 6;
    if(type == 4){ //literal
        let read = true;
        let value = ""
        while(read){
            read = decoded.substring(index, index+1) === "1" ? true : false;
            value = value + decoded.substring(index+1, index+5);
            index = index + 5;
        }
        return index;
    }
    else{ //operator
        let length = decoded.substring(index, index+1) === "1" ? 11 : 15;
        let subpacket_size = decoded.substring(index+1, index+length);
    }
    

}

function decode(transmission){
    let decoded = "";
    for(let i = 0; i < transmission.length; i++){
        decoded = decoded + translation[transmission.charAt(i)];
    }
    return decoded;
}