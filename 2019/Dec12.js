const readline = require('readline');
const fs = require('fs');
const computer = require('./intcode');
const mathjs = require('mathjs');

const rl = readline.createInterface({
    input: fs.createReadStream('Dec12.txt')
});

var moons = [];
var moonRegex = /<x=(.*?), y=(.*?), z=(.*?)>$/;
rl.on('line', function (line) {
    var matches = moonRegex.exec(line.trim());
    var data = {
        position: {
            x: parseInt(matches[1]),
            y: parseInt(matches[2]),
            z: parseInt(matches[3])
        },
        velocity: {
            x: 0,
            y: 0,
            z: 0
        },
        energy: 0
    }
    moons.push(data);
});

rl.on('close', function(){
    console.log(findRepeatingStep(moons));
});

function calculateEnergy(moons, cycles){
    for(var count = 0; count < cycles; count++){
        var combinations = ["0,1","0,2","0,3","1,2","1,3","2,3"];
        for(var i = 0; i < combinations.length; i++){
            var current = combinations[i].split(",").map(a => parseInt(a));
            if(moons[current[0]].position.x > moons[current[1]].position.x){
                moons[current[0]].velocity.x--;
                moons[current[1]].velocity.x++;
            }
            else if(moons[current[0]].position.x < moons[current[1]].position.x){
                moons[current[0]].velocity.x++;
                moons[current[1]].velocity.x--;
            }

            if(moons[current[0]].position.y > moons[current[1]].position.y){
                moons[current[0]].velocity.y--;
                moons[current[1]].velocity.y++;
            }
            else if (moons[current[0]].position.y < moons[current[1]].position.y){
                moons[current[0]].velocity.y++;
                moons[current[1]].velocity.y--;
            }

            if(moons[current[0]].position.z > moons[current[1]].position.z){
                moons[current[0]].velocity.z--;
                moons[current[1]].velocity.z++;
            }
            else if(moons[current[0]].position.z < moons[current[1]].position.z){
                moons[current[0]].velocity.z++;
                moons[current[1]].velocity.z--;
            }
        }
        
        for(var i = 0; i < moons.length; i++){
            moons[i].position.x = moons[i].position.x + moons[i].velocity.x;
            moons[i].position.y = moons[i].position.y + moons[i].velocity.y;
            moons[i].position.z = moons[i].position.z + moons[i].velocity.z;
            var potential = Math.abs(moons[i].position.x) + Math.abs(moons[i].position.y) + Math.abs(moons[i].position.z);
            var kinetic = Math.abs(moons[i].velocity.x) + Math.abs(moons[i].velocity.y) + Math.abs(moons[i].velocity.z);
            moons[i].energy = potential*kinetic;
        }
    }

    var totalEnergy = 0;
    for(var i = 0; i < moons.length; i++){
        var potential = Math.abs(moons[i].position.x) + Math.abs(moons[i].position.y) + Math.abs(moons[i].position.z);
        var kinetic = Math.abs(moons[i].velocity.x) + Math.abs(moons[i].velocity.y) + Math.abs(moons[i].velocity.z);
        moons[i].energy = potential*kinetic;
        totalEnergy = totalEnergy + moons[i].energy;
    }
    return totalEnergy;
}

function findRepeatingStep(moons){

    var factors = repeatingSystems(moons);

    process.stdout.clearLine();
    process.stdout.cursorTo(0);
    return mathjs.lcm(factors.x, factors.y, factors.z);
}
function repeatingSystems(moons){
    var systems = {
        x: new Set(),
        y: new Set(),
        z: new Set()
    };
    var repeat = {
        x: false,
        y: false,
        z: false
    };
    var letters = ["x", "y", "z"];
    var factors = {
        x: 0,
        y: 0,
        z: 0
    };
    var step = 0;
    
    systems.x.add(convert(moons, "x"));
    systems.y.add(convert(moons, "y"));
    systems.z.add(convert(moons, "z"));

    while(!repeat.x || !repeat.y || !repeat.z){
        process.stdout.clearLine();  // clear current text
        process.stdout.cursorTo(0);
        process.stdout.write("Step "+step); 
        moons = systemStep(moons);
        step++;
        for(var i = 0; i < letters.length; i++){
            var current = convert(moons, letters[i]);
            if(systems[letters[i]].has(current)){
                repeat[letters[i]] = true;
                factors[letters[i]] = step;
            }
            else
                systems[letters[i]].add(current);
        }
    }
    return factors;
}

function systemStep(moons){
    var combinations = ["0,1","0,2","0,3","1,2","1,3","2,3"];
    for(var i = 0; i < combinations.length; i++){
        var current = combinations[i].split(",").map(a => parseInt(a));
        if(moons[current[0]].position.x > moons[current[1]].position.x){
            moons[current[0]].velocity.x--;
            moons[current[1]].velocity.x++;
        }
        else if(moons[current[0]].position.x < moons[current[1]].position.x){
            moons[current[0]].velocity.x++;
            moons[current[1]].velocity.x--;
        }

        if(moons[current[0]].position.y > moons[current[1]].position.y){
            moons[current[0]].velocity.y--;
            moons[current[1]].velocity.y++;
        }
        else if (moons[current[0]].position.y < moons[current[1]].position.y){
            moons[current[0]].velocity.y++;
            moons[current[1]].velocity.y--;
        }

        if(moons[current[0]].position.z > moons[current[1]].position.z){
            moons[current[0]].velocity.z--;
            moons[current[1]].velocity.z++;
        }
        else if(moons[current[0]].position.z < moons[current[1]].position.z){
            moons[current[0]].velocity.z++;
            moons[current[1]].velocity.z--;
        }
    }
    
    for(var i = 0; i < moons.length; i++){
        moons[i].position.x = moons[i].position.x + moons[i].velocity.x;
        moons[i].position.y = moons[i].position.y + moons[i].velocity.y;
        moons[i].position.z = moons[i].position.z + moons[i].velocity.z;
        var potential = Math.abs(moons[i].position.x) + Math.abs(moons[i].position.y) + Math.abs(moons[i].position.z);
        var kinetic = Math.abs(moons[i].velocity.x) + Math.abs(moons[i].velocity.y) + Math.abs(moons[i].velocity.z);
        moons[i].energy = potential*kinetic;
    }
    return moons;
}

function convert(moons, letter){
    var string = "";
    for(var i = 0; i < moons.length; i++){
        string = string + moons[i].position[letter]+":";
        string = string + moons[i].velocity[letter];
        if(i < moons.lenght -1)
            string = string + "|";
    }
    return string;
}