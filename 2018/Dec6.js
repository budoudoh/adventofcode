const readline = require('readline');
const fs = require('fs');

const rl = readline.createInterface({
    input: fs.createReadStream('Dec6.txt')
});

var coordinates = [];

var recordRegex = /(.*?), (.*?)$/;
var max_x = 0;
var max_y = 0;
var coordCount = 0;
rl.on('line', function (line) {
    var matches = recordRegex.exec(line.trim());
    var coordinate = {
        id: "coord"+coordCount,
        x: parseInt(matches[1]),
        y: parseInt(matches[2])
    }
    if(coordinate.x > max_x){
        max_x = coordinate.x;
    }

    if(coordinate.y > max_y){
        max_y = coordinate.y;
    }
    coordCount++;
    coordinates.push(coordinate);
});

rl.on('close', function(){
    console.log(getBestRegion(coordinates, max_x, max_y));
});

function getLargestArea(coordinates, max_x, max_y){
    var records = {}
    for(var y=0; y <= max_y; y++){
        for(var x=0; x <= max_x; x++){
            var minDistance = max_x+max_y;
            var minLengthCount;
            var minId;
            for(var coord of coordinates){
                var temp = manhattanDistance(coord.x, x, coord.y, y);
                if(temp <= minDistance){
                    if(temp == minDistance){
                        minLengthCount++;
                    }
                    else{
                        minDistance = temp;
                        minLengthCount = 1;
                        minId=coord.id;
                    }
                }
            }

            if(minLengthCount == 1){
                if(!records.hasOwnProperty(minId)){
                    records[minId] = {
                        infinite: false,
                        count: 0
                    }
                }
                records[minId].count = records[minId].count + 1;
                if(x == 0 || x == max_x || y == 0 || y == max_y){
                    records[minId].infinite = true;
                }
            }

        }
    }
    return records;
}

function getBestRegion(coordinates, max_x, max_y){
    var regionSize = 0;
    for(var y=0; y <= max_y; y++){
        for(var x=0; x <= max_x; x++){
            var distances = 0;
            for(var coord of coordinates){
                var temp = manhattanDistance(coord.x, x, coord.y, y);
                distances = distances + temp;
            }
            if(distances < 10000){
                regionSize++;
            }
        }
    }
    return regionSize;
}

function manhattanDistance(x1, x2, y1, y2){
    return Math.abs(x1-x2) + Math.abs(y1-y2);
}