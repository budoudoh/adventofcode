const fs = require('fs');

function scoreGroupsFromFile(filename){
    fs.readFile(filename, 'utf8', function (err, stream){
        if(err){
            return console.log(err);
        }
        scoreGroups(stream);
    });
}

function scoreGroups(stream){
    var score = 0;
    var current_score = 0;
    var group_count = 0;
    var garbage = false;
    var garbage_count = 0;
    var skip = false;

    for(var i = 0; i < stream.length ; i++){
        var char = stream.charAt(i);

        if(garbage){
            if(!skip){
                switch(char){
                    case ">":
                        garbage = false;
                        break;
                    case "!":
                        skip = true;
                        break;
                    default:
                        garbage_count++;
                        break;
                }
            }
            else{
                skip = false;
            }
        }
        else{
            
            switch(char){
                case "{":
                    current_score++;
                    break;
                case "<":
                    garbage = true;
                    break;
                case "}":
                    score = score + current_score;
                    group_count++;
                    current_score--;
                    break;
            }
        }
    }

    console.log("Total Groups: "+group_count);
    console.log("Total Score: "+score);
    console.log("Total Garbage: "+garbage_count);
}

scoreGroupsFromFile("Dec9.txt");