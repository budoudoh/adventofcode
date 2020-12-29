const readline = require('readline');
const fs = require('fs');
const _ = require('lodash');
const { number } = require('yargs');

const rl = readline.createInterface({
    input: fs.createReadStream('Dec18.txt')
});

let sum = 0;
let parenRegex = /\([0-9\s\+\*]+\)/g;
let numbersRegex = RegExp('[0-9]+', 'g');
let operationRegex = /[\*\+]{1}/g;
let additionRegex = /[0-9]+\+[0-9]+/g;

rl.on('line', function (line) {
    let answer = processEntry(line.trim());
    sum = sum + answer;
});

rl.on('close', function(){
    console.log(sum);
});

function processEntry(entry){
    let text = entry;
    let matches = text.match(parenRegex);
    while(matches){
        for(let i = 0; i < matches.length; i++){
            let match = matches[i];
            match = match.replace(/\s+/g, '').replace("(", "").replace(")", "");
            let solution = doMathPart2(match);
            text = text.replace(matches[i], solution);
        }
        matches = text.match(parenRegex);
    }
    temp = text.replace(/\s+/g, '');
    let answer = doMathPart2(temp);
    return answer;
    
}

/*function processEntryPart2(entry){
    let text = entry;
    text = prioritizeAddition(text);
    let matches = text.match(parenRegex);
    while(matches){
        for(let i = 0; i < matches.length; i++){
            let match = matches[i];
            match = match.replace(/\s+/g, '').replace("(", "").replace(")", "");
            let solution = doMath(match);
            text = text.replace(matches[i], solution);
        }
        text = prioritizeAddition(text);
        matches = text.match(parenRegex);
    }
    temp = text.replace(/\s+/g, '');
    let answer = doMath(temp);
    return answer;
    
}

 function prioritizeAddition(text){
    let matches = text.match(additionRegex);
    if(matches != null){
        for(let i = 0; i < matches.length; i++){
            text = text.replace(matches[i], `(${matches[i]})`);
        }
    }
    return text;
} */

function doMath(text){
    let numbers = text.match(numbersRegex);
    let operations = text.match(operationRegex);
    let sum = parseInt(numbers.shift());
    while(numbers.length > 0){
        let number = numbers.shift();
        let operation = operations.shift();
        sum = eval(`${sum} ${operation} ${number}`);
    }
    return sum;
}

function doMathPart2(text){
    let matches = text.match(additionRegex);
    while(matches){
        for(let i = 0; i < matches.length; i++){
            let match = matches[i];
            let solution = eval(match);
            text = text.replace(matches[i], solution);
        }
        matches = text.match(additionRegex);
    }
    return eval(text);
}
