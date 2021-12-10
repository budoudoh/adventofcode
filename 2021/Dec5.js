const readline = require('readline');
const fs = require('fs');

const rl = readline.createInterface({
    input: fs.createReadStream('Dec5.txt')
});

let lines = [];
let horizontal_lines = [];
let vertical_lines = [];
let lineRegex = /([0-9]+ ?),([0-9]+ ?) -> ([0-9]+ ?),([0-9]+ ?)$/;

rl.on('line', function (line) {
    let matches = lineRegex.exec(line.trim());
    let entry = {
        x1: parseInt(matches[1]),
        y1: parseInt(matches[2]),
        x2: parseInt(matches[3]),
        y2: parseInt(matches[4])
    }

    if(entry.x1 == entry.x2){
        vertical_lines.push(entry);
    }

    if(entry.y1 == entry.y2){
        horizontal_lines.push(entry);
    }
    lines.push(entry);
});

rl.on('close', function(){
    console.log(part2(lines));
});

function part1(){
    
    let points = {};
    let extra_points = new Set();
    for(let i=0; i < lines.length; i++){
        let current = lines[i];
        let orientation = 0;
        let start = 0;
        let finish = 0;
        if(current.y1 == current.y2){
            orientation = 1;
            start = Math.min(current.x1, current.x2);
            finish = Math.max(current.x1, current.x2);
        }

        if(current.x1 == current.x2){
            orientation = 2;
            start = Math.min(current.y1, current.y2);
            finish = Math.max(current.y1, current.y2);
        }

        if(orientation > 0){
            for(let j = start; j <= finish; j++){
                let point;
                if(orientation == 1){
                    point = `${j},${current.y1}`;
                }
                else{
                    point = `${current.x1},${j}`;
                }

                if(!points.hasOwnProperty(point)){
                    points[point] = 1;
                }
                else{
                    points[point] = points[point] + 1;
                    extra_points.add(point);
                }
            }
        }
        
    }
    return extra_points.size;
}

function part2(){
    
    let points = {};
    let extra_points = new Set();
    for(let i=0; i < lines.length; i++){
        let current = lines[i];
        let orientation = 0;
        let start = 0;
        let finish = 0;
        if(current.y1 == current.y2){
            orientation = 1;
            start = Math.min(current.x1, current.x2);
            finish = Math.max(current.x1, current.x2);
        }

        if(current.x1 == current.x2){
            orientation = 2;
            start = Math.min(current.y1, current.y2);
            finish = Math.max(current.y1, current.y2);
        }

        if(orientation > 0){
            for(let j = start; j <= finish; j++){
                let point;
                if(orientation == 1){
                    point = `${j},${current.y1}`;
                }
                else{
                    point = `${current.x1},${j}`;
                }

                if(!points.hasOwnProperty(point)){
                    points[point] = 1;
                }
                else{
                    points[point] = points[point] + 1;
                    extra_points.add(point);
                }
            }
        }
        else{
            
            for(let j = 0; j <= Math.abs(current.x1-current.x2); j++){
                let point = `${current.x1+ (current.x1 < current.x2 ? 1 : -1)*j},${current.y1+ (current.y1 < current.y2 ? 1 : -1)*j}`;

                if(!points.hasOwnProperty(point)){
                    points[point] = 1;
                }
                else{
                    points[point] = points[point] + 1;
                    extra_points.add(point);
                }
            }

        }
        
    }
    return extra_points.size;
}