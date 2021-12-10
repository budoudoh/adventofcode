const readline = require('readline');
const fs = require('fs');

const rl = readline.createInterface({
    input: fs.createReadStream('Dec9.txt')
});

let heightmap = [];

rl.on('line', function (line) {
    let row = line.trim().split("").map( x => parseInt(x));
    heightmap.push(row);
});

rl.on('close', function(){
    console.log(part1(heightmap.slice()));
    console.log(part2(heightmap.slice()));
});

function part1(heightmap){
    let risk_level_sum = 0;
    for(let y = 0; y < heightmap.length; y++){
        for(let x = 0; x < heightmap[y].length; x++){
            let risk_level = heightmap[y][x];
            //Compare Up
            if(y > 0 && risk_level >= heightmap[y-1][x]){
                continue;
            }

            //Compare down
            if(y < (heightmap.length - 1) && risk_level >= heightmap[y+1][x]){
                continue;
            }

            //Compare left
            if(x > 0 && risk_level >= heightmap[y][x-1]){
                continue;
            }

            //Compare right
            if(x < (heightmap[y].length - 1) && risk_level >= heightmap[y][x+1]){
                continue;
            }

            risk_level_sum = risk_level_sum + risk_level + 1;
        }
    }
    return risk_level_sum;
}

function part2(heightmap){
    let basin_sizes = [];
    let basin_points = new Set();
    for(let y = 0; y < heightmap.length; y++){
        for(let x = 0; x < heightmap[y].length; x++){
            if(heightmap[y][x] < 9 && !basin_points.has(`${x},${y}`)){
                let basin_size = 0;
                let points = [{
                    x: x,
                    y: y
                }];
                basin_points.add(`${x},${y}`);
                while(points.length > 0){
                    let point = points.shift();
                    //Compare Up
                    if(point.y > 0 &&  9 > heightmap[point.y-1][point.x] && !basin_points.has(`${point.x},${point.y-1}`)){
                        points.push({
                            x: point.x,
                            y: point.y-1
                        });
                        basin_points.add(`${point.x},${point.y-1}`);
                    }

                    //Compare down
                    if(point.y < (heightmap.length - 1) && 9 > heightmap[point.y+1][point.x] && !basin_points.has(`${point.x},${point.y+1}`)){
                        points.push({
                            x: point.x,
                            y: point.y+1
                        });
                        basin_points.add(`${point.x},${point.y+1}`);
                    }

                    //Compare left
                    if(point.x > 0 && 9 > heightmap[point.y][point.x-1] && !basin_points.has(`${point.x-1},${point.y}`)){
                        points.push({
                            x: point.x-1,
                            y: point.y
                        });
                        basin_points.add(`${point.x-1},${point.y}`);
                    }

                    //Compare right
                    if(point.x < (heightmap[point.y].length - 1) && 9 > heightmap[point.y][point.x+1] && !basin_points.has(`${point.x+1},${point.y}`)){
                        points.push({
                            x: point.x+1,
                            y: point.y
                        });
                        basin_points.add(`${point.x+1},${point.y}`);
                    }

                    basin_size++;
                    
                }
                basin_sizes.push(basin_size);
            }
            
        }
    }

    basin_sizes.sort( (x,y) => x < y ? 1 : -1);
    return basin_sizes[0]*basin_sizes[1]*basin_sizes[2];
}