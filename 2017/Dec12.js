const readline = require('readline');
const fs = require('fs');

function passMessagesFromFile(filename){
    var links = [];
    var  rl = readline.createInterface({
        input: fs.createReadStream(filename)
    });

    rl.on('line', function (line) {
        var parts = line.trim().split("<->");
        if(parts.length == 2){
            var link = {
                "index": parts[0].trim(),
                "nodes": parts[1].trim().split(",")
            }

            links.push(link);
        }
    });
    
    rl.on('close', function(){
        countGroups(links);
    });
}

function passMessages(links){
    var linked_list = {};
    for(var i = 0; i < links.length; i++){
        var index = links[i].index;
        var list = [];
        if(index in linked_list){
            list = linked_list[index];
        }
        for(var j = 0; j < links[i].nodes.length; j++){
            var node = links[i].nodes[j].trim();
            if(list.indexOf(node) == -1){
                list.push(node);
            }
        }
        linked_list[index] = list;
    }
    var nodes = linked_list["0"];
    var count = 0;
    do{
        var node = nodes[count];
        var list = linked_list[node];
        for(var i = 0; i < list.length; i++){
            if(nodes.indexOf(list[i]) == -1){
                nodes.push(list[i]);
            }
        }
        count++;
    }while(count < nodes.length);
    console.log(nodes);
    console.log(nodes.length);
}

function createLinkedList(links){
    var linked_list = {};
    for(var i = 0; i < links.length; i++){
        var index = links[i].index;
        var list = [];
        if(index in linked_list){
            list = linked_list[index];
        }
        for(var j = 0; j < links[i].nodes.length; j++){
            var node = links[i].nodes[j].trim();
            if(list.indexOf(node) == -1){
                list.push(node);
            }
        }
        linked_list[index] = list;
    }
    return linked_list;
}

function createGroup(head_node, linked_list){
    var nodes = linked_list[head_node];
    var count = 0;
    do{
        var node = nodes[count];
        var list = linked_list[node];
        for(var i = 0; i < list.length; i++){
            if(nodes.indexOf(list[i]) == -1){
                nodes.push(list[i]);
            }
        }
        count++;
    }while(count < nodes.length);
    return nodes;
}

function countGroups(links){
    var linked_list = createLinkedList(links);    
    var groups = [];
    for(var key in linked_list){
        var found = false;
        for(var i=0; i < groups.length; i++){
            if(groups[i].indexOf(key) != -1){
                found = true;
                break;
            }
        }
        if(!found){
            var group = createGroup(key, linked_list);
            groups.push(group);
        }
    }    
    console.log(groups);
    console.log(groups.length);
}
passMessagesFromFile("Dec12.txt");