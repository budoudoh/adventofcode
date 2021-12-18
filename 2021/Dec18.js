const readline = require('readline');
const fs = require('fs');
const _ = require('lodash');

const rl = readline.createInterface({
    input: fs.createReadStream('Dec18test.txt')
});

let homework = [];
let placeholder = ["A","A"];
rl.on('line', function (line) {
    let problem = JSON.parse(line.trim());
    homework.push(problem);
});

rl.on('close', function(){
    console.log(snailfishMath(homework.slice()));
});

function snailfishMath(homework){
    let temp = homework.shift();
    while(homework.length > 0){
        temp = [temp, homework.shift()];
        temp = snailfishReduce(temp);
    }
    return snailfishMagnitude(temp);
}

function snailfishReduce(problem){
    let level = 1;
    let temp = problem;
    let start = 0;
    let index_queue = [];
    do{
        let broken = false;
        for(let i = start; i < temp.length; i++){
            if(Array.isArray(temp[i])){
                if(level > 3 && meetsExplodeCriteria(temp[i])){ //explode
                    let value1 = temp[i][0];
                    let value2 = temp[i][1];
                    temp[i] = placeholder;
                    problem = addRemainingValue(problem,value1,value2);
                    start = 0;
                    level = 1;
                    index_queue = [];
                    temp = problem;
                }
                else{
                    temp = temp[i];
                    level++;
                    index_queue.push(i);
                    start = 0;
                }
                    broken = true;
                break;
            }
            else if(temp[i] > 9){ //split
                temp[i] = [Math.floor(temp[i]/2), Math.round(temp[i]/2)];
                temp = temp[i];
                index_queue.push(0);
                start = 0;
                level++;
                broken = true;
                break;
            }
        }

        if(!broken){
            start = index_queue.pop() + 1;
            level--;
            temp = problem;
            for(let j=0; j < index_queue.length; j++){
                temp = temp[index_queue[j]];
            }
        }
    }while(level > 0);
    return problem;
}

function snailfishMagnitude(pair){
    let magnitude = pair.reduce((previousValue, currentValue) => {
        if(Array.isArray(currentValue) && Array.isArray(previousValue)){
            return 3*snailfishMagnitude(previousValue) + 2*snailfishMagnitude(currentValue);
        }
        else if(Array.isArray(currentValue)){
            return 3*previousValue + 2*snailfishMagnitude(currentValue);
        }
        else if(Array.isArray(previousValue)){
            return 3*snailfishMagnitude(previousValue) + 2*currentValue;
        }
        else{
            return 3*previousValue + 2*currentValue;
        }
    })
    return magnitude;
}


function meetsExplodeCriteria(pair){
    if(pair.length != 2){
        return false;
    }

    if(!Number.isInteger(pair[0]) || !Number.isInteger(pair[1])){
        return false;
    }

    return true;
}

function addRemainingValue(problem, value1, value2){
    let problem_string = JSON.stringify(problem);
    let query = JSON.stringify(placeholder);
    let index = problem_string.indexOf(query);
    for(let i = index-1; i > 0; i--){
        if(!isNaN(problem_string.charAt(i))){
            let current = value1 + parseInt(problem_string.charAt(i));
            if(current > 9){
                let split = [Math.floor(current/2), Math.round(current/2)];
                problem_string = problem_string.replaceAt(i, JSON.stringify(split));
            }
            else{
                problem_string = problem_string.replaceAt(i, current.toString());
            }
            replace_value1 = true;
            break;
        }
    }
    index = problem_string.indexOf(query);
    for(let i = index+query.length; i < problem_string.length; i++){
        if(!isNaN(problem_string.charAt(i))){
            let current = value2 + parseInt(problem_string.charAt(i));
            if(current > 9){
                let split = [Math.floor(current/2), Math.round(current/2)];
                problem_string = problem_string.replaceAt(i, JSON.stringify(split));
            }
            else{
                problem_string = problem_string.replaceAt(i, current.toString());
            }
            replace_value2 = true;
            break;
        }
    }
    index = problem_string.indexOf(query);
    problem_string = problem_string.substr(0, index) + "0" + problem_string.substr(index+query.length);
    problem = JSON.parse(problem_string);
    return problem;
}

String.prototype.replaceAt = function(index, replacement) {
    return this.substr(0, index) + replacement + this.substr(index+1);
}