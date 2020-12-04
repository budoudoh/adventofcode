const readline = require('readline');
const fs = require('fs');

const rl = readline.createInterface({
    input: fs.createReadStream('Dec4.txt')
});

let passports = [];
let passport = {};

let fields = {
    cid: "cid:([#0-9a-z]+ ?)",
    byr: "byr:([#0-9a-z]+ ?)",
    iyr: "iyr:([#0-9a-z]+ ?)",
    eyr: "eyr:([#0-9a-z]+ ?)",
    hgt: "hgt:([#0-9a-z]+ ?)",
    hcl: "hcl:([#0-9a-z]+ ?)",
    ecl: "ecl:([#0-9a-z]+ ?)",
    pid: "pid:([#0-9a-z]+ ?)"
}

let validFields = {
    byr: "byr:([0-9]{4} ?)",
    iyr: "iyr:([0-9]{4} ?)",
    eyr: "eyr:([0-9]{4} ?)",
    hgt: "hgt:([0-9]+[c-n]{2} ?)",
    hcl: "hcl:(#[0-9a-f]{6} ?)",
    ecl: "ecl:([a-z]{3} ?)",
    pid: "pid:([0-9]{9} ?)"
}

let validColors = new Set(['amb', 'blu', 'brn', 'gry', 'grn', 'hzl', 'oth']);
rl.on('line', function (line) {
    line = line.trim();
    if(line.length > 0){
        for (let field in validFields){
            let fieldRegex  = RegExp(validFields[field], 'g');
            let matches = fieldRegex.exec(line.trim());
            if(matches != null){
                passport[field] = matches[1].trim();
            }
        }
    }
    else{
        let size = Object.keys(passport).length;
        if(size == 7)
            passports.push(passport);
        passport = {};
    }
});

rl.on('close', function(){
    if(Object.keys(passport).length == 7)
        passports.push(passport);
    console.log(countValidPassports(passports));
});

function countValidPassports(passports, required){
    let valid = 0;
    let invalid = []
    for(let i = 0; i < passports.length; i++){
        let passport = passports[i];

        let byr = parseInt(passport['byr']);
        if(byr < 1920 || byr > 2002){
            invalid.push(passport);
            continue;
        }

        let iyr = parseInt(passport['iyr']);
        if(iyr < 2010 || iyr > 2020){
            invalid.push(passport);
            continue;
        }

        let eyr = parseInt(passport['eyr']);
        if(eyr < 2020 || eyr > 2030){
            invalid.push(passport);
            continue;
        }

        let ecl = passport['ecl'];
        if(!validColors.has(ecl)){
            invalid.push(passport);
            continue;
        }

        let heightRegex = /([0-9]+ ?)([c-n]{2} ?)$/;
        let heightMatches = heightRegex.exec(passport['hgt']);

        if(heightMatches == null){
            continue;
        }

        let height = parseInt(heightMatches[1]);

        if(heightMatches[2] != "in" && heightMatches[2] != "cm"){
            invalid.push(passport);
            continue;
        }

        if(heightMatches[2] === "cm"){
            if(height < 150 || height > 193){
                invalid.push(passport);
                continue;
            }
        }

        if(heightMatches[2] === "in"){
            if(height < 59 || height > 76){
                invalid.push(passport);
                continue;
            }
        }

        valid++;
    }
    return valid;
}