const readline = require('readline');
const fs = require('fs');
const _ = require('lodash');

const rl = readline.createInterface({
    input: fs.createReadStream('Dec16.txt')
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
    let operation = processTransmission(decoded);
    console.log(performOperations(operation));
});
let versions = [];

function processTransmission(decoded){
    let pending_operations = [];
    let completed_operations = [];
    let index = 0;
    do{
        let version = parseInt(decoded.substring(index, index+3), 2);
        versions.push(version);
        let type = parseInt(decoded.substring(index+3, index+6), 2);
        let operation = null;
        index = index + 6;
        if(type == 4){ //literal
            let read = true;
            let value = ""
            while(read){
                read = decoded.substring(index, index+1) === "1" ? true : false;
                value = value + decoded.substring(index+1, index+5);
                index = index + 5;
            }
            let int_value = parseInt(value, 2);
            if(pending_operations.length > 0){
                pending_operations[0].values.push(int_value);
            }
        }
        else{ //operator
            let length_type = parseInt(decoded.substring(index, index+1))
            operation = {
                type: type,
                length_type: length_type,
                values: []
            };
            if(length_type == 1){
                operation["subpacket_count"] = parseInt(decoded.substring(index+1, index+12), 2);
                operation["current_count"] = 0;
                index = index + 12;
            }
            else{
                operation["subpacket_size"] = parseInt(decoded.substring(index+1, index+16), 2);
                index = index + 16;
                operation["ending_index"] = index + operation["subpacket_size"];
            }

        }
        let done = false;
        while(pending_operations.length > 0 && !done && operation == null)
        {
            let current_operation = null;
            if(pending_operations[0].length_type == 1){
                pending_operations[0].current_count = pending_operations[0].current_count + 1;
                if(pending_operations[0].current_count >= pending_operations[0].subpacket_count){
                    current_operation  = pending_operations.shift();
                }
                else{
                    done = true;
                }
            }
            else{
                if(pending_operations[0].ending_index <= index){
                    current_operation  = pending_operations.shift();
                }
                else{
                    done = true;
                }
            }

            if(current_operation != null){
                if(pending_operations.length > 0){
                    pending_operations[0].values.push(current_operation)
                }
                else{
                    completed_operations.push(current_operation);
                }
            }
            
        }
        if(operation != null){
            pending_operations.unshift(operation);
        }
    }while(pending_operations.length > 0)

    return completed_operations[0];
}

function decode(transmission){
    let decoded = "";
    for(let i = 0; i < transmission.length; i++){
        decoded = decoded + translation[transmission.charAt(i)];
    }
    return decoded;
}

function performOperations(operation){
    let type = operation.type;
    return operation.values.map(x => {
        if(typeof x === 'object'){
            return performOperations(x);
        }
        return x;
    }).reduce((x,y) => {
        switch(type){
            case 0:
                return x + y;
            case 1:
                return x*y;
            case 2:
                return Math.min(x,y);
            case 3:
                return Math.max(x,y);
            case 5:
                return x > y ? 1 : 0;
            case 6:
                return x < y ? 1 : 0;
            case 7:
                return x == y ? 1 : 0;
        }
    })
}