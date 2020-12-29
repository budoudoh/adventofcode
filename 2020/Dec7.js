const readline = require('readline');
const fs = require('fs');

const rl = readline.createInterface({
    input: fs.createReadStream('Dec7.txt')
});

let rules = {};

rl.on('line', function (line) {
    line = line.trim();
    processRule(line);
});

rl.on('close', function(){
    console.log(countContainingBags("shiny gold"))
});

function processRule(text){
    let rule = {};
    let components  = text.split("bags contain");
    let title = components[0].trim();
    let subcomponents = components[1].trim().split(",");
    for(let i = 0; i < subcomponents.length; i++){
        let rulecomponents = subcomponents[i].trim().split(" ");
        if(!(rulecomponents[0].trim() === "no")){
            let count = parseInt(rulecomponents[0]);
            let subtitle = `${rulecomponents[1]} ${rulecomponents[2]}`;
            rule[subtitle] = count;
        }
    }
    rules[title] = rule;
}

function countPossibilities(title){
    let sum = 0;
    for(let current_title in rules){
        if(current_title === title)
            continue;
        let titles = [];
        do{
            if(current_title === title){
                sum++;
                break;
            }
            titles = titles.concat(Object.keys(rules[current_title]));
            current_title = titles.length > 0 ? titles.shift() : null;
        }while(current_title != null)
    }
    return sum;
}

function countContainingBags(title){
    let sum = 1;
    let current_rules = Object.keys(rules[title])
    if(current_rules.length == 0)
        return sum;
    
    for(let i = 0; i < current_rules.length; i++){
        let current_title = current_rules[i];
        sum = sum + rules[title][current_title]*countContainingBags(current_title);
    }
    
    return sum;
}
//Guess 327 is too high