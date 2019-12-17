const readline = require('readline');
const fs = require('fs');

const rl = readline.createInterface({
    input: fs.createReadStream('Dec10test.txt')
});

var asteroidMap = [];
rl.on('line', function (line) {
    asteroidMap.push(line.trim().split(""));
});

rl.on('close', function(){
    console.log(bestAsteroid(asteroidMap));
});

function bestAsteroid(map){
    var maxAsteroids = 0;
    var topAsteroids = {};
    var bottomAsteroids = {};
    var asteroidsByCount = {};
    var asteroids = mapAsteroids(map);
    for(var i = 0; i < asteroids.length; i++){
        var asteroid = asteroids[i];
        var holder1 = countAsteroids(asteroids, asteroid, 0, i);
        var holder2 = countAsteroids(asteroids, asteroid, i+1, asteroids.length);
        var count = Object.keys(holder1).length + Object.keys(holder2).length;
        if(Math.max(count, maxAsteroids) == count){
            topAsteroids = holder1;
            bottomAsteroids = holder2;
            maxAsteroids = count;
        }
        asteroidsByCount[count] = asteroid;
    }
    var top = Object.values(topAsteroids);
    var bottom = Object.values(bottomAsteroids);
    var destroyed = top.concat(bottom);
    destroyed.sort((a, b) => (a.quadrant > b.quadrant) ? 1 : (a.quadrant == b.quadrant) ? ((a.slope > b.slope) ? 1 : -1) : -1 );
    var quadrant4 = destroyed.filter(a => a.quadrant == 4);
    quadrant4.sort((a, b) => (a.angle > b.angle) ? 1 : -1);
    var start = destroyed.length - quadrant4.length;
    for(var i = 0; i < quadrant4.length; i++){
        console.log("The "+ (start + i + 1)+" asteroid to be vaporized is at "+quadrant4[i].asteroid.x+","+quadrant4[i].asteroid.y+" with an angle of "+quadrant4[i].angle);
    }
    console.log(destroyed.length);
    console.log(quadrant4.length);

    return asteroidsByCount[maxAsteroids];
}

function countAsteroids(asteroids, asteroid, start, finish){
    var slopes = {};
    for(var x = start; x < finish; x++){
        var current = asteroids[x];
        var slope = (current.x - asteroid.x)/(current.y - asteroid.y);
        var obj = {
            "asteroid": current,
            "distance": manhattanDistance(asteroid, current),
            "quadrant": findQuadrant(asteroid, current),
            "slope": slope,
            "angle": calcAngleDegrees(current, asteroid)
            
        }
        if(slopes.hasOwnProperty(slope)){
            if(Math.min(slopes[slope].distance, obj.distance) == obj.distance){
                slopes[slope] = obj;
            }
        }
        else
            slopes[slope] = obj
    }
    return slopes;
}

function mapAsteroids(map){
    var asteroids = [];
    for(var y = 0; y < map.length; y++){
        for(var x = 0; x < map[y].length; x++){
            if(map[y][x] === "#"){
                var coords = {
                    "x": x,
                    "y": y
                }
                asteroids.push(coords);
            }
        }
    }
    return asteroids;
}

function manhattanDistance(asteroid1, asteroid2){
    return Math.abs(asteroid1.x - asteroid2.x) + Math.abs(asteroid1.y - asteroid2.y);
}

function findQuadrant(origin, subject){
    if(subject.x >= origin.x){
        if(subject.y <= origin.y)
            return 1;
        else
            return 2;
    }
    else{
        if(subject.y >= origin.y)
            return 3;
        else
            return 4;
    }
}

function calcAngleDegrees(asteroid, origin) {
    return Math.atan2((asteroid.y - origin.y), (asteroid.x - origin.x)) * 180 / Math.PI;
  }