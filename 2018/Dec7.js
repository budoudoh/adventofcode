const readline = require('readline');
const fs = require('fs');

const rl = readline.createInterface({
    input: fs.createReadStream('Dec7.txt')
});

var steps = [];

var recordRegex = /Step (.*?) must be finished before step (.*?) can begin.$/;

rl.on('line', function (line) {
    var matches = recordRegex.exec(line.trim());
    var step = {
        prereq: matches[1],
        next: matches[2]
    }
    
    steps.push(step);
});

rl.on('close', function(){
    console.log(runInstructions(steps));
});


function buildInstructions(steps){
    var instructions = "";
    var potentialLetters = findFirstInstructions(steps);
    potentialLetters.sort();
    while(potentialLetters.length > 0){
        console.log(potentialLetters);
        var currentLetter = potentialLetters.shift();
        var prereqsMet = true;
        var newLetters = [];
        for(var step of steps){
            if(step.next.localeCompare(currentLetter) == 0){
                if(!instructions.includes(step.prereq)){
                    prereqsMet = false;
                    break;
                }
            }
            if(step.prereq.localeCompare(currentLetter) == 0){
                if(!newLetters.includes(step.next)){
                    newLetters.push(step.next);
                }
            }
        }

        if(prereqsMet && !instructions.includes(currentLetter)){
            instructions = instructions + currentLetter;
            potentialLetters = potentialLetters.concat(newLetters);
            potentialLetters.sort();
            potentialLetters = potentialLetters.filter(onlyUnique);
            
        }
    }
    
    return instructions;
}

function onlyUnique(value, index, self) { 
    return self.indexOf(value) === index;
}

function findFirstInstructions(steps){
    var prereqs = new Set();
    var next = new Set();
    for(var step of steps){
        prereqs.add(step.prereq);
        next.add(step.next);
    }
    let difference = Array.from(prereqs).filter(x => !Array.from(next).includes(x));
    return difference;

}

function runInstructions(steps){
    var instructions = "";
    var potentialLetters = findFirstInstructions(steps);
    var workers = {}
    potentialLetters.sort();
    var currentSecond = 0;
    while(potentialLetters.length > 0){
        while(potentialLetters.length > 0){
            console.log(potentialLetters);
            var currentLetter = potentialLetters.shift();
            var prereqsMet = true;
            var newLetters = [];
            for(var step of steps){
                if(step.next.localeCompare(currentLetter) == 0){
                    if(!instructions.includes(step.prereq)){
                        prereqsMet = false;
                        break;
                    }
                }
            }

            if(prereqsMet && !instructions.includes(currentLetter)){
                if(Object.keys(workers).length < 5 && !workers.hasOwnProperty(currentLetter)){
                    workers[currentLetter] = {
                        start: currentSecond,
                        end: currentSecond + currentLetter.charCodeAt(0) - 5
                    }
                }
            }
        }

        var letterDone = false;
        while(!letterDone){
            for(var letter in workers){
                if(workers[letter].end < currentSecond){
                    instructions = instructions + letter;
                    letterDone = true;
                    delete workers[letter];
                    var newLetters = [];
                    for(var step of steps){
                        if(step.prereq.localeCompare(letter) == 0){
                            if(!newLetters.includes(step.next)){
                                newLetters.push(step.next);
                            }
                        }
                    }
                    potentialLetters = potentialLetters.concat(newLetters);
                    potentialLetters.sort();
                    potentialLetters = potentialLetters.filter(onlyUnique);
                }
            }
            if(!letterDone){
                currentSecond++;
            }
            
        }
    }
    
    return currentSecond;
}