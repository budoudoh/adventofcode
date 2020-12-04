const readline = require('readline');
const fs = require('fs');

const rl = readline.createInterface({
    input: fs.createReadStream('Dec2.txt')
});

let passwords = [];
let passwordRegex = /([0-9]+ ?)-([0-9]+ ?) ([a-z]{1} ?): ([a-z]+ ?)$/;

rl.on('line', function (line) {
    let matches = passwordRegex.exec(line.trim());
    let password = {
        min: parseInt(matches[1]),
        max: parseInt(matches[2]),
        letter: matches[3],
        password: matches[4]
    }
    passwords.push(password);
});

rl.on('close', function(){
    console.log(validatePasswords(passwords));
    console.log(validatePasswordsPt2(passwords));
});

function validatePasswords(passwordsList){
    let passwordPass = 0;
    for(let i = 0; i < passwordsList.length; i++){
        let password = passwordsList[i];
        let regExp = new RegExp(password.letter, "gi");
        let count = (password.password.match(regExp) || []).length;
        if(count >= password.min && count <= password.max){
            passwordPass++;
        }
    }

    return passwordPass;
}

function validatePasswordsPt2(passwordsList){
    let passwordPass = 0;
    for(let i = 0; i < passwordsList.length; i++){
        let password = passwordsList[i];
        if((password.password.charAt(password.min -1) === password.letter ? 1: 0)  
        ^ (password.password.charAt(password.max -1) === password.letter ? 1: 0)){
            passwordPass++;
        }
    }

    return passwordPass;
}

