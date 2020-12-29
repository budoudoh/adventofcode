const _ = require('lodash');

let door = 16616892;
let card = 14505727;
let subject_number = 7;
let remainder = 20201227;

function findEncryptionKey(){
    let card_loop = findLoopValue(card);
    let door_loop = findLoopValue(door);
    let encryption_key = 1;
    for(let i = 0; i < card_loop; i++){
        encryption_key = encryption_key*door;
        encryption_key = encryption_key%remainder;
    }
    return encryption_key;
}

function findLoopValue(public_key){
    let value = 1;
    let loop = 0;
    while(value != public_key){
        value = value*subject_number;
        value = value%remainder;
        loop++;
    }
    return loop;
}

console.log(findEncryptionKey());