const fs = require('fs');
var treeData;
var metadataTotal = 0;;
fs.readFile("Dec8.txt", function (err, data) {
    if (err) throw err;
    var tree = getMetadataSum(data.toString());
    //var tree = getMetadataSum("2 3 0 3 10 11 12 1 1 0 1 99 2 1 1 2");
    console.log(tree);
    console.log(getRootValue(tree));
});

function getMetadataSum(data){
    treeData = data.split(" ");
    return getTreeNodes()
}

function getTreeNodes(){
    var tree = {};
    tree.childCount = parseInt(treeData.shift());
    tree.metadataCount = parseInt(treeData.shift());
    tree.children = [];
    tree.metadata = [];
    for(var i = 0; i < tree.childCount; i++){
        tree.children.push(getTreeNodes());
        //console.log(treeData.length);
    }

    for(var i=0; i < tree.metadataCount; i++){
        var metadataValue = parseInt(treeData.shift());
        metadataTotal = metadataTotal + metadataValue;
        tree.metadata.push(metadataValue);
    }
    return tree;
}

function getRootValue(tree){
    var total = 0;
    if(tree.children.length == 0){
        total = total + tree.metadata.reduce(getSum);
    }
    else{
        for(var i = 0; i < tree.metadata.length; i++){
            var index = tree.metadata[i];
            if(tree.children[index-1] !== void 0 ){
                total = total + getRootValue(tree.children[index-1]);
            }
        }
    }
    return total;
}

function getSum(total, num) {
    return total + num;
  }