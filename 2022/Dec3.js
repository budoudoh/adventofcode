const readline = require('readline');
const fs = require('fs');

const rl = readline.createInterface({
    input: fs.createReadStream('Dec3.txt')
});

let rucksacks = [];

rl.on('line', function (line) {
    let rucksack = {};
    let items = line.trim();
    let middle = Math.floor(items.length/2);
    rucksack.items = items;
    rucksack.p1 = items.substring(0, middle);
    rucksack.p2 = items.substring(middle, items.length);
    rucksacks.push(rucksack);    
});

rl.on('close', function(){
    console.log(part1(rucksacks));
    console.log(part2(rucksacks));
});

function part1(rucksacks){
    let priority_sum = 0;
    for(let r in rucksacks){
        let rucksack = rucksacks[r];
        for(let i = 0; i < rucksack.p1.length; i++){
            let current = rucksack.p1.charAt(i);
            if(rucksack.p2.includes(current))
            {
                let upper_case = current == current.toUpperCase();
                let priority = current.toUpperCase().charCodeAt() - "A".charCodeAt() + 1;
                priority = priority + (upper_case ? 26 : 0);
                priority_sum = priority_sum + priority;
                break;
            }
        }
    }
    return priority_sum;
}

function part2(rucksacks){
    let priority_sum = 0;
    let start = 0;
    while (start < rucksacks.length){
        let rucksack = rucksacks[start];
        let common = [];
        let final;
        for(let i = 0; i < rucksack.items.length; i++){
            let current = rucksack.items.charAt(i);
            if(rucksacks[start+1].items.includes(current))
            {
                common.push(current)
            }
        }
        for(let i = 0; i < common.length; i++){
            let current = common[i];
            if(rucksacks[start+2].items.includes(current))
            {
                final = current;
                break;
            }
        }

        let upper_case = final == final.toUpperCase();
        let priority = final.toUpperCase().charCodeAt() - "A".charCodeAt() + 1;
        priority = priority + (upper_case ? 26 : 0);
        priority_sum = priority_sum + priority;
        start = start + 3;
    }
    return priority_sum;
}