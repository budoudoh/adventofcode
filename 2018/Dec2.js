const readline = require('readline');
const fs = require('fs');
const levenshtein = require('js-levenshtein');

const rl = readline.createInterface({
    input: fs.createReadStream('Dec2.txt')
});

var ids = [];

rl.on('line', function (line) {
    var id = line.trim();
    ids.push(id);
});

rl.on('close', function(){
    console.log(findSimilarIds(ids));
})

function checkSum(boxIds){
    var twos = 0;
    var threes = 0;

    boxIds.forEach(id => {
        var hash = {};
        for(var i = 0; i < id.length; i++){
            var temp = id.charAt(i);
            if(hash.hasOwnProperty(temp)){
                hash[temp] = hash[temp] + 1;
            }
            else{
                hash[temp] = 1;
            }
        }
        var countTwo = false;
        var countThree = false;

        for (var key in hash) {
            if(hash[key] == 2 && !countTwo){
                twos++;
                countTwo = true;
            }
            else if(hash[key] == 3 && !countThree){
                threes++;
                countThree = true;
            }
        }
        
    });
    return twos*threes;
}

function findSimilarIds(boxIds){
    var string1;
    var string2;

    for(var i = 0; i < boxIds.length; i++){
        var subject = boxIds[i];
        var found = false;
        for(var j = 0; j < boxIds.length; j++){
            if(levenshtein(subject, boxIds[j]) == 1){
                string1 = subject;
                string2 = boxIds[j];
                found = true;
                break;
            }
        }
        if(found){
            break;
        }
    }
    console.log(string1+":"+string2);
}