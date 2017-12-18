const fs = require('fs');

function condensePathFromFile(filename){
    fs.readFile(filename, 'utf8', function (err, stream){
        if(err){
            return console.log(err);
        }
        furthestAway(stream);
    });
}

function condensePath(pathString){
    var directions = [];
    var path = pathString.split(",");
    
    var max_length = 0;
    for(var i = 0; i < path.length; i++){
        var direction = path[i];
        var transformed = false;
        for(var j = 0; j < directions.length; j++){
            var check = direction+directions[j];
            switch(check){
                case "nesw":
                case "swne":
                case "sn":
                case "ns":
                case "nwse":
                case "senw":
                    transformed = true;
                    directions.splice(j,1);
                    break;
            }

            if(transformed){
                break;
            }
        }

        if(!transformed){
            directions.push(direction);
        }

        max_length = Math.max(directions.length, max_length);
    }
    var counts = {
        "s":0,
        "n":0,
        "sw": 0,
        "nw": 0,
        "se": 0,
        "ne":0
    };

    for(var z = 0; z < directions.length; z++){
        counts[directions[z]] = counts[directions[z]] +1;
    }
    console.log(directions.length);
    console.log(counts);
    for(var i = 0; i < directions.length; i++){
        var direction = directions[i];
        var transformed = false;
        for(var j = 0; j < directions.length; j++){
            var check = direction+directions[j];
            switch(check){
                case "sesw":
                case "swse":
                    transformed = true;
                    directions[j] = "s";
                    directions.splice(i, 1);
                    break;
                case "nenw":
                case "nwne":
                    transformed = true;
                    directions[j] = "n";
                    directions.splice(i, 1);
                case "nes":
                case "sne":
                    transformed = true;
                    directions[j] = "se";
                    directions.splice(i, 1);
                    break;
                case "nws":
                case "snw":
                    transformed = true;
                    directions[j] = "sw";
                    directions.splice(i, 1);
                    break;
                case "sen":
                case "nse":
                    transformed = true;
                    directions[j] = "ne";
                    directions.splice(i, 1);
                    break;
                case "swn":
                case "nsw":
                    transformed = true;
                    directions[j] = "nw";
                    directions.splice(i, 1);
                    break;
            }

            if(transformed){
                break;
            }
        }
    }
    var counts = {
        "s":0,
        "n":0,
        "sw":0,
        "nw":0,
        "se":0,
        "ne":0
    };
    for(var z = 0; z < directions.length; z++){
        counts[directions[z]] = counts[directions[z]] +1;
    }
    console.log(directions.length);
    console.log(counts);
    console.log(max_length);
    
}

function furthestAway(pathString){
    var directions = [];
    var path = pathString.split(",");
    
    var max_length = 0;
    var x = 0
    var y = 0
    var z = 0
    
    for(var i = 0; i < path.length; i++){
        var direction = path[i];
        switch(direction){
            case "n":
                y++;
                z--;
                break;
            case "s":
                y--;
                z++;
                break;
            case "ne":
                x++;
                z--;
                break;
            case "sw":
                x--;
                z++;
                break;
            case "nw":
                x--;
                y++;
                break;
            case "se":
                x++;
                y--;
                break;
        }
        max_length = Math.max(((Math.abs(x) + Math.abs(y) + Math.abs(z)) / 2), max_length);
    }
    
    
    console.log((Math.abs(x) + Math.abs(y) + Math.abs(z)) / 2);
    console.log(max_length);
    
}

condensePathFromFile("Dec11.txt");
