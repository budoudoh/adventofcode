const readline = require('readline');
const fs = require('fs');

const rl = readline.createInterface({
    input: fs.createReadStream('Dec10.txt')
});

var stars = [];
var bounds = {
    max_x: 0,
    max_y: 0,
    min_x: 0,
    min_y: 0
}
rl.on('line', function (line) {
    var regex = /position=<(.*?), (.*?)> velocity=<(.*?), (.*?)>$/;
    var matches = regex.exec(line.trim());
    var star = {
        x_position: parseInt(matches[1]),
        y_position: parseInt(matches[2]),
        x_velocity: parseInt(matches[3]),
        y_velocity: parseInt(matches[4])
    }

    bounds.max_x = Math.max(star.x_position, bounds.max_x);
    bounds.min_x = Math.min(star.x_position, bounds.min_x);
    bounds.max_y = Math.max(star.y_position, bounds.max_y);
    bounds.min_y = Math.min(star.y_position, bounds.min_y);
    stars.push(star);
});

rl.on('close', function(){
    console.log(bounds);
    console.log(stars.length);
});
