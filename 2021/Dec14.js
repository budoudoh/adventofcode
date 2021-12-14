const readline = require('readline');
const fs = require('fs');
const _ = require('lodash');

const rl = readline.createInterface({
    input: fs.createReadStream('Dec14.txt')
});

let polymer_template = "";
let insertion_rules = {};
let on_rules = false;

function insertStr(str, index, stringToInsert){
    return str.substring(0, index) + stringToInsert + str.substring(index, str.length);
}

rl.on('line', function (line) {
    if(line.length > 0){
        if(!on_rules){
            polymer_template = line.trim();
        }
        else{
            let temp = line.trim().split("->");
            insertion_rules[temp[0].trim()] = temp[1].trim()
        }
    }
    else{
        on_rules = true;
    } 
});

rl.on('close', function(){
    console.log(part1(polymer_template, insertion_rules, 40));
});

function part1(template, rules, steps){
    let count = 0;
    while(count < steps){
        let insertions = [];
        for(let key in rules){
            let index = template.indexOf(key);
            
            while(index !== -1){
                let insertion = {
                    letter: rules[key],
                    index: index
                };
                insertions.push(insertion);
                index = template.indexOf(key, index + 1)
            }
        }
        insertions.sort((x,y) => x.index > y.index ? 1 : -1);
        
        for(let i = 0; i < insertions.length; i++){
            let temp = insertions[i];
            template = insertStr(template,(temp.index + 1 + i), temp.letter);
        }

        count++;
        console.log(count);
    }

    let counts = {};
    for(let i = 0; i < template.length; i++){
        let char = template.charAt(i);
        if(!counts.hasOwnProperty(char)){
            counts[char] = 0;
        }
        counts[char] = counts[char] + 1;
    }
    
    return counts;
}