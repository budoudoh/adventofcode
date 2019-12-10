const readline = require('readline');
const fs = require('fs');

const rl = readline.createInterface({
    input: fs.createReadStream('Dec6.txt')
});

var orbitMap = {};

rl.on('line', function (line) {
    var items = line.trim().split(")");
    if(items.length == 2){
        orbitMap[items[1]] = items[0];
    }
});

rl.on('close', function(){
    console.log(countTransfers(orbitMap, "YOU", "SAN"));
});

function countOrbits(map){
    var direct = 0;
    var indirect = 0;
    for (var object in map) {
        var current = object;
        var connectionCount = 0;
        while(current !== "COM"){
            current = map[current];
            if(connectionCount == 0)
                direct++;
            else
                indirect++;
            connectionCount++;
        }
    }
    return direct + indirect
}

function countTransfers(map, start, finish){
    var startOrbit = getOrbit(map, start);
    var finishOrbit = getOrbit(map, finish);
    console.log(startOrbit);
    console.log(finishOrbit);
    var total = 0;
    for(var i = 1; i < startOrbit.length; i++){
        var current = startOrbit[i];
        var found = false;
        for(var j = 1; j < finishOrbit.length; j++){
            if (current === finishOrbit[j]){
                total = i+j-2;
                found = true;
            }
        }
        if(found)
            break;
    }
    
    return total;
}

function getOrbit(map, start){
    var startArray = [];
    for (var object in map) {
        if(object === start){
            var current = object;
            startArray.push(object);
            while(current !== "COM"){
                current = map[current];
                startArray.push(current);
            }
        }
    }
    return startArray;
}