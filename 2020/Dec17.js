const readline = require('readline');
const fs = require('fs');
const _ = require('lodash');

const rl = readline.createInterface({
    input: fs.createReadStream('Dec17.txt')
});

let active = [];
let count = 0;
rl.on('line', function (line) {
    processEntry(line.trim());
});

rl.on('close', function(){
    let temp = JSON.parse(JSON.stringify(active));
    console.log(cycleFourDimension(temp, 6));
});

function processEntry(text){
    for(let i = 0; i < text.length; i++){
        let current = text.charAt(i) === "#" ? true : false;
        if(current){
            let cube = {
                x: i,
                y: count,
                z: 0,
                w: 0,
                state: current
            };
            active.push(cube);
        }       
    }
    count++;
}

function cycleDimension(active, cycles){

    for(let count = 0; count < cycles; count++){
        let changes = {};
        for(let i = 0; i < active.length; i++){
            let current = active[i];
            let current_coords = `${current.x},${current.y},${current.z}`;
            if(!changes.hasOwnProperty(current_coords)){
                changes[current_coords] = {
                    active_neighbors: 0
                };
            }
            changes[current_coords].active = true;
            for(let z = -1; z < 2; z++){
                for(let y = -1; y < 2; y++){
                    for(let x = -1; x < 2; x++){
                        let coords = `${current.x + x},${current.y + y},${current.z + z}`;
                        if(coords !== current_coords){
                            if(!changes.hasOwnProperty(coords)){
                                changes[coords] = {
                                    active_neighbors: 0,
                                    active: false
                                }
                            }
                            changes[coords].active_neighbors = changes[coords].active_neighbors + 1;
                        }
                    }
                }
            }
        }

        let new_active = [];

        for(let coords in changes){
            let current = changes[coords];
            let active = current.active ? (current.active_neighbors == 2 || current.active_neighbors == 3) : current.active_neighbors == 3;
            if(active){
                let params = coords.split(",");
                let cube = {
                    x: parseInt(params[0]),
                    y: parseInt(params[1]),
                    z: parseInt(params[2]),
                    state: true
                };

                new_active.push(cube)
            }
        }

        active = new_active;
    }

    
    return active.length;
}

function cycleFourDimension(active, cycles){

    for(let count = 0; count < cycles; count++){
        let changes = {};
        for(let i = 0; i < active.length; i++){
            let current = active[i];
            let current_coords = `${current.x},${current.y},${current.z},${current.w}`;
            if(!changes.hasOwnProperty(current_coords)){
                changes[current_coords] = {
                    active_neighbors: 0
                };
            }
            changes[current_coords].active = true;
            for(let w = -1; w < 2; w++){
                for(let z = -1; z < 2; z++){
                    for(let y = -1; y < 2; y++){
                        for(let x = -1; x < 2; x++){
                            let coords = `${current.x + x},${current.y + y},${current.z + z},${current.w + w}`;
                            if(coords !== current_coords){
                                if(!changes.hasOwnProperty(coords)){
                                    changes[coords] = {
                                        active_neighbors: 0,
                                        active: false
                                    }
                                }
                                changes[coords].active_neighbors = changes[coords].active_neighbors + 1;
                            }
                        }
                    }
                }
            }
        }

        let new_active = [];

        for(let coords in changes){
            let current = changes[coords];
            let active = current.active ? (current.active_neighbors == 2 || current.active_neighbors == 3) : current.active_neighbors == 3;
            if(active){
                let params = coords.split(",");
                let cube = {
                    x: parseInt(params[0]),
                    y: parseInt(params[1]),
                    z: parseInt(params[2]),
                    w: parseInt(params[3]),
                    state: true
                };

                new_active.push(cube)
            }
        }

        active = new_active;
    }

    
    return active.length;
}