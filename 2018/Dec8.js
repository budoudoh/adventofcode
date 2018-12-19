const fs = require('fs');

fs.readFile("Dec8.txt", function (err, data) {
    if (err) throw err;
    console.log(getMetadataSum(data.toString()));
});

function getMetadataSum(data){
    var tree = data.split(" ");
    
}