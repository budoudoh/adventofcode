const readline = require('readline');
const fs = require('fs');
const _ = require('lodash');

const rl = readline.createInterface({
    input: fs.createReadStream('Dec14.txt')
});

let polymer_template = "";
let polymer_pairs = {};
let insertion_rules = {};
let on_rules = false;

function insertStr(str, index, stringToInsert){
    return str.substring(0, index) + stringToInsert + str.substring(index, str.length);
}

/* rl.on('line', function (line) {
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
}); */

rl.on('line', function (line) {
    if(line.length > 0){
        if(!on_rules){
            polymer_template = line.trim();
            for(let i = 0; i < polymer_template.length-1; i++){
                let temp = polymer_template.charAt(i) + polymer_template.charAt(i+1);
                if(!polymer_pairs.hasOwnProperty(temp)){
                    polymer_pairs[temp] = 0;
                }
                polymer_pairs[temp] = polymer_pairs[temp] + 1;
                
            }
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
    //console.log(part1(polymer_template, insertion_rules, 40));
    console.log(part2(polymer_pairs, insertion_rules, 40));
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
    
    let min  = NaN;
    let max = NaN;
    for(let key in counts){
        min = Number.isNaN(min) ? counts[key] : Math.min(min, counts[key]);
        max = Number.isNaN(max) ? counts[key] : Math.max(max, counts[key]);
    }

    return max - min;
}

function part2(pairs, rules, steps){
    pairs = growPairs(pairs, rules, steps);
    console.log(pairs)
    let max = NaN;
    let min = NaN;
    let letters = {};
    for(let pair in pairs){
        letters[pair.charAt(0)] = letters.hasOwnProperty(pair.charAt(0)) ? letters[pair.charAt(0)] + pairs[pair] : pairs[pair];
        letters[pair.charAt(1)] = letters.hasOwnProperty(pair.charAt(1)) ? letters[pair.charAt(1)] + pairs[pair] : pairs[pair];
    }
    console.log(letters)
    for(let key in letters){
        min = Number.isNaN(min) ? letters[key] : Math.min(min, letters[key]);
        max = Number.isNaN(max) ? letters[key] : Math.max(max, letters[key]);
    }

    return max - min;
}
function growPairs(pairs, rules, steps){
    if(steps <= 0){
        return pairs;
    }
    //console.log(pairs);
    let temp = {};
    for(let key in rules){
        for(let pair in pairs){
            if(pairs[pair] > 0 && pair === key){
                let new_pair_1 = pair.charAt(0)+rules[key];
                let new_pair_2 = rules[key]+pair.charAt(1);

                temp[new_pair_1] = temp.hasOwnProperty(new_pair_1) ? temp[new_pair_1] + pairs[pair] : pairs[pair];
                temp[new_pair_2] = temp.hasOwnProperty(new_pair_2) ? temp[new_pair_2] + pairs[pair] : pairs[pair];
            }
        }
    }
    
    return growPairs(temp, rules, (steps-1))
}

function growTemplate(template, rules, steps){
    if(steps <= 0){
        return template;
    }
    console.log(steps);
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

    return growTemplate(template, rules, (steps-1))
}
