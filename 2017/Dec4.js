const readline = require('readline');
const fs = require('fs');
const levenshtein = require('js-levenshtein');

const rl = readline.createInterface({
    input: fs.createReadStream('Dec4.txt')
});

function countDuplicateLines(){
    var count = 0;
    rl.on('line', function (passphrase) {
        
        var words = passphrase.trim().split(" ");
        var duplicate = false
        for(var i=0; i < words.length; i++){
            var word = words[i];
            for(var j = 0; j < words.length; j++){
                if(word.localeCompare(words[j]) == 0 && i != j){
                    duplicate = true;
                    break;
                }
            }

            if(duplicate)
                break;
        }
        
        if(!duplicate){
            count++;
        }

        console.log(passphrase +": "+ (duplicate? "not valid" : "valid"));
        
    });
    
    rl.on('close', function(){
        console.log(count);
    })
}

function countAnagramLines(){
    var count = 0;
    rl.on('line', function (passphrase) {
        
        var words = passphrase.trim().split(" ");
        var duplicate = false
        for(var i=0; i < words.length; i++){
            var word = words[i];
            for(var j = 0; j < words.length; j++){
                if(i != j){
                    if(isAnagram(word, words[j])){
                        duplicate = true;
                        break;
                    }
                }
                
            }

            if(duplicate)
                break;
        }
        
        if(!duplicate){
            count++;
        }

        console.log(passphrase +": "+ (duplicate? "not valid" : "valid"));
        
    });
    
    rl.on('close', function(){
        console.log(count);
    })
}

function isAnagram(string1, string2){
    var temp_string1 = string1.split("").sort().join("");
    var temp_string2 = string2.split("").sort().join("");

    return temp_string1.localeCompare(temp_string2) == 0;
}   
countAnagramLines();