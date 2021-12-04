const readline = require('readline');
const fs = require('fs');
const _ = require('lodash');

const rl = readline.createInterface({
    input: fs.createReadStream('Dec20test.txt')
});

let puzzle = [];
let current_id = 0;
let current_piece = [];
let id_regex = /^Tile ([0-9]+?):$/;
let monster_base_regex = /#[.#]{2}#[.#]{2}#[.#]{2}#[.#]{2}#[.#]{2}#/;
let monster_middle_regex = /#[.#]{4}##[.#]{4}##[.#]{4}###/;
let corners = {};
let pieces = {};
let hash_count = 0;

rl.on('line', function (line) {
    processEntry(line.trim());
});

rl.on('close', function(){
    console.log(findEdges());
    console.log(findSeaMonsters())
});


function processEntry(text){
    if(text.length == 0){
        createPuzzlePiece();
        return;
    }

    let matches = id_regex.exec(text);

    if(matches){
        current_id = parseInt(matches[1]);
        return;
    }

    current_piece.push(text);
    return;
}

function createPuzzlePiece(){

    let piece = {
        id: current_id,
        side1: null,
        side2: null,
        side3: null,
        side4: null,
        edges: new Set(),
        piece: [],
        neighbors: {}
    };

    let left = "";
    let right = "";

    for(let i = 0; i < current_piece.length; i++){
        let current = current_piece[i];
        if(i == 0){
            piece.side1 = current;
            piece.edges.add(current);
        }
        else if(i == current_piece.length -1){
            piece.side2 = current;
            piece.edges.add(current);
        }
        else{
            let line = current.substring(1, current.length-1);
            let hashes = line.match(/#/g) != null ? line.match(/#/g).length : 0;
            hash_count = hash_count + hashes;
            piece.piece.push(line);
        }
        left = left + current[0];
        right = right + current[current.length-1];
        
    }
    piece.side3 = left;
    piece.side4 = right;
    piece.edges.add(left);
    piece.edges.add(right);

    puzzle.push(piece);

    current_id = 0;
    current_piece = [];
}

function findEdges(){
    for (let i = 0; i < puzzle.length; i++){
        for(let j = 0; j < puzzle.length; j++){
            if(i != j){
                let matches = new Set([...puzzle[i].edges].filter(x => puzzle[j].edges.has(x))); 
                let reverse = [...puzzle[i].edges].map(x => _.reverse(x.split('')).join(''));
                matches = new Set([...matches, ...new Set(reverse.filter(x => puzzle[j].edges.has(x)))]);
                if(matches.size > 0){
                    let edge = [...matches][0];
                    let reverse_edge = _.reverse(edge.split("")).join("");
                    let side;
                    let match;
                    let side_flipped = false;
                    let match_flipped = false;
                    for(let key in puzzle[i]){
                        if(key.includes("side") && (puzzle[i][key] === edge || puzzle[i][key] === reverse_edge)){
                            side = key;
                            side_flipped = (puzzle[i][key] === reverse_edge);
                        }
                        if(key.includes("side") && (puzzle[j][key] === edge || puzzle[j][key] === reverse_edge)){
                            match = key;
                            match_flipped = (puzzle[j][key] === reverse_edge);
                        }
                    }
                    let neighbor = {
                        id: puzzle[j].id,
                        side: side,
                        match: match,
                        side_flipped: side_flipped,
                        match_flipped: match_flipped
                    }
                    puzzle[i].neighbors[neighbor.id] = neighbor;
                    if(side_flipped){
                        puzzle[i].orientation.flipped = {
                            side: side
                        };
                    }
                }
            }
        }
    }
    let ids = 1;

    for (let i = 0; i < puzzle.length; i++){
        if(Object.keys(puzzle[i].neighbors).length == 2){
            ids = ids*puzzle[i].id;
            corners[puzzle[i].id] = puzzle[i];
        }
        pieces[puzzle[i].id] = puzzle[i];
    }
    return ids;
}

function findSeaMonsters(){
    let corner = Object.keys(corners)[0];
    let matrix = [];
    let eop = false;
    let current = corner;
    while(!eop){
        let eor = false;
        let row_holder = [];
        while(!eor){
            let ro
            for()
        }
    }
}

function rotateMatrix(matrix, degrees){
    let rotation_count = degrees/90;
    let current_rotations = 0;
    let result = matrix.slice(0);

    while(current_rotations < rotation_count){
        let holder = [];
        for(let x = 0; x < result[0].length; x++){
            let row = "";
            for(let y = 0; y < result.length; y++){
                row = row+result[y].charAt(x);
            }
            holder.push(row);
        }
        result = holder;
        current_rotations++;
    }
    return result;
}

function flipMatrix(matrix, horizontal){
    let result = [];
    if(horizontal){
        for(let i = 0; i < matrix.length; i++){
            let current = matrix[i];
            current = _.reverse(current.split('')).join('');
            result.push(current);
        }
    }
    else{
        for(let i = matrix.length-1; i < 0; i++){
            let current = matrix[i];
            result.push(current);
        }
    }
    return current;
}

function countActiveNeighbors(piece, piece_set){
    let count = 0;
    for(let neighbor in piece.neighbors){
        if(!piece_set.has(neighbor))
            count++
    }
    return count;
}