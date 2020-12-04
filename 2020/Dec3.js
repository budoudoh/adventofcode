const readline = require('readline');
const fs = require('fs');

const rl = readline.createInterface({
    input: fs.createReadStream('Dec3.txt')
});

let map = [];

rl.on('line', function (line) {
    map.push(line.trim());
});

rl.on('close', function(){
    let count = countTrees(map, 1, 1)*countTrees(map, 3, 1)*countTrees(map, 5, 1)*countTrees(map, 7, 1)*countTrees(map, 1, 2);
    console.log(count);
});

function countTrees(map, right, down){
    let x = 0;
    let y = 0;
    let trees = 0;
    let done = false;

    do{
        let line = map[y];
        let index = x%line.length;
        let current = line.charAt(index);

        if(current === "#")
            trees++;

        x = x + right;
        y = y + down;
        if(y >= map.length)
            done = true;
    }while(!done)

    return trees;

}