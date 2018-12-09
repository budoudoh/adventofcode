const readline = require('readline');
const fs = require('fs');

const rl = readline.createInterface({
    input: fs.createReadStream('Dec4.txt')
});

var records = [];

var recordRegex = /\[(.*?)-(.*?)-(.*?) (.*?):(.*?)\] (.*?)$/;

rl.on('line', function (line) {
    var matches = recordRegex.exec(line.trim());
    var record = {
        year: parseInt(matches[1]),
        month: parseInt(matches[2]),
        day: parseInt(matches[3]),
        hour: parseInt(matches[4]),
        minute: parseInt(matches[5]),
        text: matches[6]
    }
    
    records.push(record);
});

rl.on('close', function(){
    records.sort(function(a,b){
        sort_a = createSortValue(a);
        sort_b = createSortValue(b);
        return sort_a - sort_b;
    });
    getGuardandTime(records);
});


function createSortValue(record){
    var sort_value = "";
    sort_value = sort_value + (record.month < 10 ? "0"+record.month : record.month);
    sort_value = sort_value + (record.day < 10 ? "0"+record.day : record.day);
    sort_value = sort_value + (record.hour < 10 ? "0"+record.hour : record.hour);
    sort_value = sort_value + (record.minute < 10 ? "0"+record.minute : record.minute);
    return parseInt(sort_value);
}

function getGuardandTime(records){
    var guardRegex = /Guard #(.*?) begins shift$/;
    var sleepRegex = /falls asleep$/;
    var wakeRegex = /wakes up$/;
    var sleepRecords = [];
    for(record in records){

    }
}