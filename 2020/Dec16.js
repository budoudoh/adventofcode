const readline = require('readline');
const fs = require('fs');
const _ = require('lodash');

const rl = readline.createInterface({
    input: fs.createReadStream('Dec16.txt')
});

let validations = {}
let your_ticket = [];
let nearby_tickets = [];
let ranges = [];

let stage = 1;

rl.on('line', function (line) {
    processEntry(line.trim());
});

rl.on('close', function(){
    //console.log(validateTickets());
    let valid_tickets = removeInvalidTickets();
    findFieldOrder(valid_tickets);
});

function processEntry(text){
    if(text.length == 0){
        stage++;
        return;
    }

    if(stage == 1){
        let stageRegex = /([\w\s]+ ?): ([0-9]{1,3} ?)-([0-9]{1,3} ?) or ([0-9]{1,3} ?)-([0-9]{1,3} ?)$/;

        let stage_matches = stageRegex.exec(text);
        if(stage_matches){
            let range1 = {
                start: parseInt(stage_matches[2]),
                end: parseInt(stage_matches[3]),
            };
            let range2 = {
                start: parseInt(stage_matches[4]),
                end: parseInt(stage_matches[5]),
            };
            ranges.push(range1);
            ranges.push(range2);
            validations[stage_matches[1]] = {
                range1: range1,
                range2: range2
            }

        }

        return;
    }

    if(stage == 2){
        let codes = text.split(",");
        if(codes.length > 1){
            for(let i = 0; i < codes.length; i++){
                your_ticket.push(parseInt(codes[i]));
            }
        }
        return;
    }

    if(stage == 3){
        let codes = text.split(",");
        if(codes.length > 1){
            let ticket = []
            for(let i = 0; i < codes.length; i++){
                ticket.push(parseInt(codes[i]));
            }

            nearby_tickets.push(ticket);
        }
    }
}

function validateTickets(){
    let error_rate = 0;

    for(let i = 0; i < nearby_tickets.length; i++){
        let ticket = nearby_tickets[i];
        for(let j = 0; j < ticket.length; j++){
            let field = ticket[j];
            let valid = 0;
            for(let k = 0; k < ranges.length; k++){
                let range = ranges[k];
                if(_.inRange(field, range.start, range.end+1))
                    valid++;
            }

            if(valid == 0){
                error_rate = error_rate + field;
            }
        }
    }
    return error_rate;
}

function removeInvalidTickets(){
    let valid_tickets = [];

    for(let i = 0; i < nearby_tickets.length; i++){
        let ticket = nearby_tickets[i];
        let valid_ticket = true;
        for(let j = 0; j < ticket.length; j++){
            let field = ticket[j];
            let valid = 0;
            for(let k = 0; k < ranges.length; k++){
                let range = ranges[k];
                if(_.inRange(field, range.start, range.end+1))
                    valid++;
            }

            if(valid == 0){
                valid_ticket = false;
                break;
            }
        }

        if(valid_ticket)
            valid_tickets.push(ticket);
    }
    return valid_tickets;
}

function findFieldOrder(tickets){

    let single = [];

    for(let field in validations){
        let range1 = validations[field].range1;
        let range2 = validations[field].range2;
        let fields = _.times(tickets[0].length, _.constant(0));
        for(let i = 0; i < tickets.length; i++){
            let ticket = tickets[i];
            for(let j = 0; j < ticket.length; j++){
                let field = ticket[j];
                let valid = 0;
                if(_.inRange(field, range1.start, range1.end+1))
                    valid++;
                
                if(_.inRange(field, range2.start, range2.end+1))
                    valid++;
    
                if(valid > 0){
                    fields[j] = fields[j] + 1;
                }
            }
        }

        let valid_indices = [];
        for(let i = 0; i < fields.length; i++){
            if(fields[i] == tickets.length)
                valid_indices.push(i);
        }

        validations[field].valid = valid_indices;
        if(valid_indices.length == 1)
            single.push(field);
    }

    let departure = 1;
    while(single.length > 0){
        let current = single.shift();
        let index = validations[current].valid.shift();
        validations[current].index = index;
        if(current.includes("departure"))
            departure = departure*your_ticket[index];

        for(let field in validations){
            _.pull(validations[field].valid, index);
            if(validations[field].valid.length == 1)
                single.push(field);
        }
    }

    
    return departure;
}