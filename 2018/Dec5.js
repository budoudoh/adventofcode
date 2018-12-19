const fs = require('fs');
//const napa = require('napajs');
const NUMBER_OF_WORKERS = 4;

//const zone = napa.zone.create('zone', { workers: NUMBER_OF_WORKERS} );

fs.readFile("Dec5.txt", function (err, data) {
    if (err) throw err;
    console.log(getShortestPolymer(data.toString()));
});
 
function determineReactants(polymer){
    var reductionCount = 0;
    var index = 0;
    var temp = "";
    while(index < polymer.length){
        if(index+1 < polymer.length){
            if(polymer.charAt(index).localeCompare(polymer.charAt(index+1), 'en', {sensitivity: 'base'}) == 0){
                if(polymer.charAt(index).localeCompare(polymer.charAt(index+1)) != 0){
                    index = index+2;
                    reductionCount++;
                }
                else{
                    temp = temp + polymer.charAt(index);
                    index++;
                }
                
            }
            else{
                temp = temp + polymer.charAt(index);
                index++;
            }
        }
        else{
            temp = temp + polymer.charAt(index);
            index++;
        }
        
    }

    if(reductionCount > 0){
        return determineReactants(temp);
    }
    else{
        console.log(temp.length);
        return temp.length;
    }
    
}

function getShortestPolymer(polymer){
    var shortest = polymer.length;
    var shortestLetter;
    var promises = [];

    
    for (i = 0; i < 26; i++) {
        var letter = (i+10).toString(36);
        var temp = polymer.replace(letter, "");
        temp = temp.replace(letter.toUpperCase(), "");
        var length = determineReactants(temp);
        if(length < shortest){
            shortest = length;
            shortestLetter = letter;
        }
    }

    return shortest +":"+shortestLetter;
}