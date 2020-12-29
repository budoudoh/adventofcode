const readline = require('readline');
const fs = require('fs');
const _ = require('lodash');
const { repeat } = require('lodash');
const { match } = require('assert');

const rl = readline.createInterface({
    input: fs.createReadStream('Dec19pt2.txt')
});

let numbersRegex = RegExp('[0-9]+', 'g');
let messages = [];
let parseMessages = false;
let rules = {}

rl.on('line', function (line) {
    processEntry(line.trim());
});

rl.on('close', function(){
    console.log(validateMessages(0));
});

function processEntry(text){
    if(text.length == 0){
        parseMessages = true;
        return;
    }

    if(parseMessages){
        messages.push(text);
        return;
    }

    let parts = text.split(":");

    rules[parts[0].trim()] = parts[1].trim().replace(/\"/g, "");

}

function validateMessages(start){
    let pattern = rules[start];
    let match;
    let eightCount = 0;
    let elevenCount = 0;
    let eightMax = 10;
    let elevenMax = 12;
    while ((match = numbersRegex.exec(pattern)) != null) {
        if(match[0] == '8'){
            eightCount++
        }
        if(match[0] == '11'){
            elevenCount++
        }

        let replacement = rules[match[0]].length > 1 ? `(${rules[match[0]]})` : rules[match[0]];
        let next = match.index + match[0].length;
        pattern = pattern.substring(0, match.index) + replacement + pattern.substring(next);
        numbersRegex.lastIndex = 0;

        if(eightCount >= eightMax){
            rules['8'] = rules['8'].replace('8', "")
        }

        if(elevenCount >= elevenMax){
            rules['11'] = rules['11'].replace('11', "")
        }
    }
    
    pattern = pattern.replace(/\s/g, "");

    let patternRegex = new RegExp(`^${pattern}$`);
    let count = 0;

    for(let i = 0; i < messages.length; i++){
        let matches = patternRegex.exec(messages[i]);
        if(matches != null)
            count++;
    }
    return count;
}
/*0: 8 11
8: 42 | 42 8
11: 42 31 | 42 11 31

42: 20 51 | 39 120
31: 39 43 | 20 118
39: "a"
20: "b"
51: 39 91 | 20 117
120: 41 39 | 58 20
43: 21 39 | 103 20*/

function processEntryDeprecated(text){
    if(text.length == 0){
        parseMessages = true;
        return;
    }

    if(parseMessages){
        messages.push(text);
        return;
    }

    let matches = text.match(numbersRegex);

    if(matches.length == 5){
        let rule = {
            sub_rule1: [parseInt(matches[1]), parseInt(matches[2])],
            sub_rule2: [parseInt(matches[3]), parseInt(matches[4])],
        }

        rules[parseInt(matches[0])] = rule;
        return;
    }

    if(matches.length == 4){
        let rule = {
            sub_rule1: [parseInt(matches[1]), parseInt(matches[2]), parseInt(matches[3])]
        }

        rules[parseInt(matches[0])] = rule;
        return;
    }

    if(matches.length == 3){
        let rule;

        if(text.includes("|")){
            rule = {
                sub_rule1: [parseInt(matches[1])],
                sub_rule2: [parseInt(matches[2])],
            }    
        }
        else{
            rule = {
                sub_rule1: [parseInt(matches[1]), parseInt(matches[2])]
            }
        }

        rules[parseInt(matches[0])] = rule;
        return;
    }


    if(matches.length == 2){
        let rule = {
            sub_rule1: [parseInt(matches[1])]
        }

        rules[parseInt(matches[0])] = rule;
        return;
    }

    if(matches.length == 1){
        let rule = {
            sub_rule1: text.includes("a") ? ["a"] : ["b"]
        }

        rules[parseInt(matches[0])] = rule;
        return;
    }

    
}