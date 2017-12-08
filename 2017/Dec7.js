const readline = require('readline');
const fs = require('fs');

function findBottomFromFile(filename){
    var nodes = [];
    var  rl = readline.createInterface({
        input: fs.createReadStream(filename)
    });

    rl.on('line', function (line) {
        var node = {};

        var parts = line.trim().split("->");
        if(parts.length > 1){
            var subnodes = parts[1].trim().split(",").map(x => x.trim());
            node.subnodes = subnodes;
        }

        var name_parts = parts[0].trim().split("(");
        node.name = name_parts[0].trim();
        node.weight = parseInt(name_parts[1].replace(")", "").trim());
        nodes.push(node);
    });
    
    rl.on('close', function(){
        findWrongWeight(nodes, "hlqnsbe");
    })
}

function findBottom(nodes){
    //find a top node
    var top = null;
    for(var i = 0; i < nodes.length; i++){
        if(!('subnodes' in nodes[i])){
            top = nodes[i];
            break;
        }
    }
    var in_tree = true;
    //keep finding new top
    while(in_tree)
    {
        console.log(top);
        var set_new_top = false;
        for(var i = 0; i < nodes.length; i++){
            var current_node = nodes[i];
            var found_new_top = false;
            if('subnodes' in current_node){
                for(var j = 0; j < current_node.subnodes.length; j++){
                    if(top.name.localeCompare(current_node.subnodes[j]) == 0){
                        found_new_top = true;
                        break;
                    }
                }
            }

            if(found_new_top){
                top = current_node;
                set_new_top = true;
                break;
            }
        }

        if(!set_new_top){
            in_tree = false;
        }
        
    }
    
    return top;
}

function findWrongWeight(nodes, bottom_name){

    var not_bottom = true;
    var bottom = null;
    var temp = 0;
    while(not_bottom){

        for(var i = 0; i < nodes.length; i++){
            if(bottom_name.localeCompare(nodes[i].name) == 0){
                bottom = nodes[i];
                break;
            }
        }
    
        var children = [];
    
        for(var i = 0; i < bottom.subnodes.length; i++){
            var child = {
                name: bottom.subnodes[i]
            };
            child.weight = sumWeight(bottom.subnodes[i], nodes);
            children.push(child);
            
        }
        console.log(children);
        var unique_child = null;
        //find the unique child
        for(var k = 0; k < children.length; k++){
            var current = children[k];
            var count = 0;
            for(var j = 0; j < children.length; j++){
                if(current.weight == children[j].weight){
                    count++
                    if(count > 1){
                        break;
                    }
                }
            }
    
            if(count <= 1){
                unique_child = current;
                break;
            }
        
        }
    
        if(unique_child == null){
            not_bottom = false;
            
        }
        else{
            bottom_name = unique_child.name;
        }
    }

    console.log(bottom);
    return bottom;
}

function sumWeight(name, nodes){

    var weight = 0;
    var next = [name];
    do{
        var current = next.pop();
        var node = null;
        for(var i = 0; i < nodes.length; i++){
            if(current.localeCompare(nodes[i].name) == 0){
                node = nodes[i];
                break;
            }
        }
        weight = weight + node.weight;

        if('subnodes' in node){
            next = next.concat(node.subnodes);
        }

    }while(next.length > 0);

    return weight;
}

findBottomFromFile("Dec7.txt");