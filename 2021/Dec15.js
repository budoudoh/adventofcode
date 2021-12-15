const readline = require('readline');
const fs = require('fs');
const _ = require('lodash');

const rl = readline.createInterface({
    input: fs.createReadStream('Dec15.txt')
});

let risk_levels = [];
let node_distance = {};
rl.on('line', function (line) {
    let row = line.trim().split("").map( x => parseInt(x));
    let y = risk_levels.length;
    for(let x = 0; x < row.length; x++){
        let node = {
            shortest_distance: NaN,
            previous_node: "",
            visited: false,
            weight: row[x]
        }
        node_distance[`${y},${x}`] = node;
    }
    risk_levels.push(row);
});

rl.on('close', function(){
    console.log(part1(risk_levels.slice(), node_distance));
});

let transform = [[1,0],[-1,0],[0,1],[0,-1]];
function part1(risk_levels, node_distance){
    let start = "0,0";
    let finish = `${risk_levels.length-1},${risk_levels[0].length-1}`;
    node_distance[start].shortest_distance = 0;
    node_distance[start].visited = true;
    let unvisited = [start];
    while(unvisited.length > 0){
        let current = unvisited.shift();
        let current_coords = current.split(",").map( x => parseInt(x));
        for(let i = 0; i < transform.length; i++){
            let neighbor = [current_coords[0] + transform[i][0], current_coords[1] + transform[i][1]];
            let neighbor_key = neighbor.join(",");
            if(node_distance.hasOwnProperty(neighbor_key)){
                let current_distance = node_distance[current].shortest_distance + node_distance[neighbor_key].weight;
                if(Number.isNaN(node_distance[neighbor_key].shortest_distance) || node_distance[neighbor_key].shortest_distance > current_distance){
                    node_distance[neighbor_key].shortest_distance = current_distance;
                    node_distance[neighbor_key].previous_node = current;
                }
                if(!node_distance[neighbor_key].visited){
                    unvisited.push(neighbor_key);
                    node_distance[neighbor_key].visited = true;
                }
            }
        }
    } 
    return node_distance[finish].shortest_distance;
}

function part2(risk_levels, node_distance){
    let ig = increaseGraph(risk_levels);
    return part1(ig.rl, ig.nd);
}

function increaseGraph(risk_levels){
    let nrl = [];
    let new_node_distance = {};
    for(let y = 0; y < risk_levels.length; y++){
        let count = 0;
        let row = [];
        while(count < 5){
            for(let x = 0; x < risk_levels[y].length; x++){
                let current = risk_levels[y][x] + count;
                if(current > 9){
                    current = current - 9;
                }
                row.push(current);
            }
            count++;
        }
        nrl.push(row);
    }
    let nnrl = [];
    count = 0;
    while(count < 5){
        for(let y = 0; y < nrl.length; y++){
            let row = [];
            for(let x = 0; x < nrl[y].length; x++){
                let current = nrl[y][x] + count;
                if(current > 9){
                    current = current - 9;
                }
                row.push(current);
                let node = {
                    shortest_distance: NaN,
                    previous_node: "",
                    visited: false,
                    weight: current
                }
                new_node_distance[`${nnrl.length},${x}`] = node;
            }
            nnrl.push(row);
        }
        count++;
    }
    return {
        nd: new_node_distance,
        rl: nnrl
    };
}