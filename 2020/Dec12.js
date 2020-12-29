const readline = require('readline');
const fs = require('fs');

const rl = readline.createInterface({
    input: fs.createReadStream('Dec12.txt')
});

let location = {
    x: 0,
    y: 0,
    bearing: 0
}

let waypoint = {
    x: 10,
    y: 1
}

rl.on('line', function (line) {
    processEntry(line.trim());
});

rl.on('close', function(){
    let distance = Math.abs(location.x) + Math.abs(location.y);
    console.log(distance);
});

function processEntry(text){
    let inputRegex = /([A-Z]{1} ?)([0-9]{1,3} ?)$/;
    let matches = inputRegex.exec(text);
    let action = matches[1];
    let value = parseInt(matches[2]);

    part2(action, value);
}

function part2(action, value){
    
    switch(action){
        case "N":
            waypoint.y = waypoint.y + value;
            break;
        case "S":
            waypoint.y = waypoint.y - value;
            break;
        case "E":
            waypoint.x = waypoint.x + value;
            break;
        case "W":
            waypoint.x = waypoint.x - value;
            break;
        case "L":
            rotateWaypoint(value);
            break;
        case "R":
            rotateWaypoint(value*-1);
            break;
        case "F":
            location.y = location.y + waypoint.y*value;
            location.x = location.x + waypoint.x*value;
            break;
    }
}

function rotateWaypoint(degrees){
    if(waypoint.x >= 0 && waypoint.y >= 0)
        location.bearing = 0;
    if(waypoint.x < 0 && waypoint.y > 0)
        location.bearing = 90;
    if(waypoint.x < 0 && waypoint.y < 0)
        location.bearing = 180;
    if(waypoint.x > 0 && waypoint.y < 0)
        location.bearing = 270;

    let last_bearing = location.bearing;

    location.bearing = location.bearing + degrees;

    if(location.bearing >= 360)
        location.bearing = location.bearing - 360;
    if(location.bearing < 0)
        location.bearing = location.bearing + 360;
    
    let x = Math.abs(waypoint.x);
    let y = Math.abs(waypoint.y);

    if(Math.abs(degrees) == 90 || Math.abs(degrees) == 270){
        let temp = x;
        x = y;
        y = temp;
    }

    switch(location.bearing){
        case 0:
            waypoint.y = y;
            waypoint.x = x;
            break;
        case 90:
            waypoint.y = y;
            waypoint.x = -1*x;
            break;
        case 180:
            waypoint.y = -1*y;
            waypoint.x = -1*x;
            break;
        case 270:
            waypoint.y = -1*y;
            waypoint.x = x;
            break;
    }



}

function part1(action, value){
    if(action === "F"){
        switch(location.bearing){
            case 0:
                action = "E";
                break;
            case 90:
                action = "N";
                break;
            case 180:
                action = "W";
                break;
            case 270:
                action = "S";
                break;
        }
    }

    switch(action){
        case "N":
            location.y = location.y + value;
            break;
        case "S":
            location.y = location.y - value;
            break;
        case "E":
            location.x = location.x + value;
            break;
        case "W":
            location.x = location.x - value;
            break;
        case "L":
            location.bearing = location.bearing + value;
            if(location.bearing >= 360)
                location.bearing = location.bearing - 360;
            break;
        case "R":
            location.bearing = location.bearing - value;
            if(location.bearing < 0)
                location.bearing = location.bearing + 360;
            break;
    }
}