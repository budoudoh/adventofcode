const readline = require('readline');
const fs = require('fs');
const _ = require('lodash');
const { time } = require('console');

const rl = readline.createInterface({
    input: fs.createReadStream('Dec24.txt')
});

let tiles = {};
rl.on('line', function (line) {
    processEntry(line.trim());
});

rl.on('close', function(){
    let black_tiles = countTiles();
    console.log(livingArt(black_tiles, 100))
});

function processEntry(text){
    let steps = text.split("");
    let x = 0;
    let y = 0;

    while(steps.length > 0){
        let step = steps.shift();
        if(step === "n" || step === "s"){
            step = step + steps.shift();
        }
        switch(step){
            case "e":
                x = x + 1;
                break;
            case "w":
                x = x - 1;
                break;
            case "ne":
                x = x+.5;
                y = y+1;
                break;
            case "nw":
                x = x-.5;
                y = y+1;
                break;
            case "se":
                x = x+.5;
                y = y-1;
                break;
            case "sw":
                x = x-.5;
                y = y-1;
                break;
        }
    }

    let label = x+","+y;
    if(!tiles.hasOwnProperty(label)){
        tiles[label] = 0;
    }

    tiles[label] = tiles[label] + 1;
}

function countTiles(){
    let black_tiles = [];
    for(let tile in tiles){
        if(tiles[tile]%2 > 0){
            black_tiles.push(tile);
        }
    }
    return black_tiles;
}

function livingArt(start, days){
    for(let count = 0; count < days; count++){
        let black_neighbors = {}
        for(let i = 0; i < start.length; i++){
            let current = start[i].split(",");
            let x = parseFloat(current[0]);
            let y = parseFloat(current[1]);
            let neighborCount = 0;
            for(let vert = -1; vert < 2; vert++){
                let init = vert != 0 ? -.5 : -1;
                let max = vert != 0 ? 1 : 2;
                for(let horz = init; horz < max; horz = horz + 1){
                    let neighbor = `${x+horz},${y+vert}`;
                    if(neighbor !== start[i]){
                        if(!black_neighbors.hasOwnProperty(neighbor)){
                            black_neighbors[neighbor] = 0;
                        }
                    
                        black_neighbors[neighbor] = black_neighbors[neighbor] + 1;
                        neighborCount++;
                    }
                    
                }
                
            }
        }
        let black_tiles = [];
        for(let i = 0; i < start.length; i++){
            if(black_neighbors.hasOwnProperty(start[i])){
                if(black_neighbors[start[i]] <= 2)
                    black_tiles.push(start[i]);
                delete black_neighbors[start[i]]
            }
        }

        for(let tile in black_neighbors){
            if(black_neighbors[tile] == 2){
                black_tiles.push(tile);
            }
        }

        start = black_tiles;
    }
    return start.length;
}