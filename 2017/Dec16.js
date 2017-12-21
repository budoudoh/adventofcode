const fs = require('fs');

function getDanceStepsFromFile(filename, dancers){
    fs.readFile(filename, 'utf8', function (err, stream){
        if(err){
            return console.log(err);
        }
        var steps = stream.split(",");
        lineDance(dancers, steps);
    });
}

var dancers = "abcdefghijklmnop";
