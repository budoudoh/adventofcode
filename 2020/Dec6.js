const readline = require('readline');
const fs = require('fs');

const rl = readline.createInterface({
    input: fs.createReadStream('Dec6.txt')
});

let groups = [];
let currentGroup = {
    count: 0,
    entries: {}
};
let groupSum = 0;
rl.on('line', function (line) {
    line = line.trim();
    processEntry(line);
});

rl.on('close', function(){
    groupSum = groupSum + Object.keys(currentGroup.entries).length;
    groups.push(currentGroup);
    currentGroup = {};
    console.log(sumGroups(groups));
});

function processEntry(entry){
    if(entry.length == 0){
        groupSum = groupSum + Object.keys(currentGroup.entries).length;
        groups.push(currentGroup);
        currentGroup = {
            count: 0,
            entries: {}
        };
        return;
    }
    currentGroup.count = currentGroup.count + 1;
    for(let i = 0; i < entry.length; i++){
        let current = entry.charAt(i);
        if(!currentGroup.entries.hasOwnProperty(current))
            currentGroup.entries[current] = 0;
        currentGroup.entries[current] = currentGroup.entries[current] + 1;
    }
    return;
    
}

function sumGroups(groups){
    let groupSum = 0;
    for(let i = 0; i < groups.length; i++){
        let group = groups[i];
        let currentSum = 0;
        for(let entry in group.entries){
            if(group.entries[entry] == group.count)
                currentSum = currentSum + 1;
        }
        groupSum = groupSum + currentSum;
    }

    return groupSum;
}