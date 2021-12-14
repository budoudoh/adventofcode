const readline = require('readline');
const fs = require('fs');
const _ = require('lodash');

const rl = readline.createInterface({
    input: fs.createReadStream('Dec12.txt')
});

let cave_system = {};

rl.on('line', function (line) {
    let nodes = line.trim().split("-");
    if(nodes.length == 2){
        
        for(let i = 0; i < nodes.length; i++){
            if(!cave_system.hasOwnProperty(nodes[i])){
                cave_system[nodes[i]] = [];
            }
        }
        cave_system[nodes[0]].push(nodes[1]);
        cave_system[nodes[1]].push(nodes[0]);
    }
});

rl.on('close', function(){
    console.log(traversal(JSON.parse(JSON.stringify(cave_system)), true));
});

function isLowerCase(str) {
    return str === str.toLowerCase();
}

function isInGraph(node, graph, part2){
    let in_graph = false;
    if(part2){
        let nodes = {};
        let twice = false;
        graph.forEach(element => {
            if(isLowerCase(element.label)){
                if(!nodes.hasOwnProperty(element.label)){
                    nodes[element.label] = 0;
                }
                nodes[element.label] = nodes[element.label] + 1;
                if(nodes[element.label] > 1){
                    twice = true;
                }
            }
        });

        in_graph = nodes.hasOwnProperty(node) && twice; 
    }
    else{
        graph.forEach(element => {
            in_graph = in_graph || (element.label === node)
        });
    }
    return in_graph;
}

function traversal(system, part2){
    let paths = 0;
    let node = {
        label: "start",
        index: 0
    }
    let graph = [node];
    while(graph.length > 0){
        let current = graph[graph.length - 1];

        if(system[current.label].length <= current.index){
            graph.pop();
            if(graph.length > 0){
                graph[graph.length - 1].index = graph[graph.length - 1].index + 1;
            }
            continue;
        }

        let next = system[current.label][current.index];
        let increment = false;
        if(next === "start"){
            increment = true;
        }
        if(next === "end"){
            paths++;
            increment = true;
        }
        
        if(isLowerCase(next)&&isInGraph(next, graph, part2)){
            increment = true;
        }

        if(increment){
            current.index = current.index + 1;
        }
        else{
            let next_node = {
                label: next,
                index: 0
            }
            graph.push(next_node)
        }
    }
    return paths;
}
