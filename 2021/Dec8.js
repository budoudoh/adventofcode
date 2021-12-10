const readline = require('readline');
const fs = require('fs');
const { serialize } = require('v8');

const rl = readline.createInterface({
    input: fs.createReadStream('Dec8.txt')
});

let entries = [];

rl.on('line', function (line) {
    let temp = line.trim().split("|");
    let entry = {
        input: temp[0].trim().split(" ").map( x => x.split('').sort().join('')),
        output: temp[1].trim().split(" ").map( x => x.split('').sort().join(''))
    }
    entries.push(entry);
});

rl.on('close', function(){
    console.log(part1(entries.slice()));
    console.log(part2(entries.slice()));
});

function part1(entries){
    let viable_lengths = new Set([2,3,4,7]);
    let item_count = 0;
    entries.forEach(element => {
        element.output.forEach(item =>{
            if(viable_lengths.has(item.length)){
                item_count++;
            }
        })
    });
    return item_count;
}

function part2(entries){
    let output_sum = 0;
    entries.forEach(entry =>{
        let numbers = {};
        let segments = {};
        let displays = {};
        entry.input.forEach(item =>{
            switch(item.length){
                case 2:
                    numbers[item] = 1;
                    segments[2] = item;
                    displays[1] = item;
                    break;
                case 3:
                    numbers[item] = 7;
                    segments[3] = item;
                    displays[7] = item;
                    break;
                case 4:
                    numbers[item] = 4;
                    segments[4] = item;
                    displays[4] = item;
                    break;
                case 5:
                    if(!segments.hasOwnProperty(5)){
                        segments[5] = [];
                    }
                    segments[5].push(item);
                    numbers[item] = 0;
                    break;
                case 6:
                    if(!segments.hasOwnProperty(6)){
                        segments[6] = [];
                    }
                    segments[6].push(item);
                    numbers[item] = 0;
                    break;
                case 7:
                    numbers[item] = 8;
                    segments[7] = item;
                    displays[8] = item;
                    break;
            }
        });
        
        //Use 7 to find 3
        let bad_segments = [];
        for(let i = 0; i < segments[5].length; i++){
            if(stringDifferenceCount(displays[7], segments[5][i]) == 0){
                numbers[segments[5][i]] = 3;
                displays[3] = segments[5][i];
                continue;
            }
            bad_segments.push(segments[5][i])
        }
        segments[5] = bad_segments.slice();
        
        //Use 3 to find 9
        bad_segments = [];
        for(let i = 0; i < segments[6].length; i++){
            if(stringDifferenceCount(displays[3], segments[6][i]) == 0){
                numbers[segments[6][i]] = 9;
                displays[9] = segments[6][i];
                continue;
            }
            bad_segments.push(segments[6][i])
        }
        segments[6] = bad_segments.slice();

        //Use 9 to find 5 and 2
        for(let i = 0; i < segments[5].length; i++){
            if(stringDifferenceCount(segments[5][i], displays[9]) == 0){
                numbers[segments[5][i]] = 5;
                displays[5] = segments[5][i];
            }
            else{
                numbers[segments[5][i]] = 2;
                displays[2] = segments[5][i];
            }
        }

        //Use 5 to find 6 and 0
        for(let i = 0; i < segments[6].length; i++){
            if(stringDifferenceCount(displays[5], segments[6][i]) == 0){
                numbers[segments[6][i]] = 6;
                displays[6] = segments[5][i];
            }
            else{
                numbers[segments[6][i]] = 0;
                displays[0] = segments[6][i];
            }
        }
        
        //Sum the outputs
        let number = '';
        entry.output.forEach(item =>{
            number = number + numbers[item]; 
        });
        
        output_sum = output_sum + parseInt(number);
    })
    return output_sum;
}

function stringDifferenceCount(stringA, stringB) {
    let _difference = new Set(stringA.split(''))
    let setB = new Set(stringB.split(''))
    for (let elem of setB) {
        _difference.delete(elem)
    }
    return _difference.size;
}