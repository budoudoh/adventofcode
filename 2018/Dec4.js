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
    console.log(getGuardandTime(records));
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
    var sleepRecords = {};
    var id;
    var index = 0;
    for(var record of records){
        if(guardRegex.exec(record.text) != null){
            id = guardRegex.exec(record.text)[1];
            if(!sleepRecords.hasOwnProperty(id)){
                sleepRecords[id] = {
                    sleepHours: {},
                    count: 0
                }
            }
            index = 0;
        }
        else if(sleepRegex.exec(record.text) != null){
            index = record.minute;
        }
        else if(wakeRegex.exec(record.text) != null){
            for(var i = index; i < record.minute; i++){
                if(!sleepRecords[id].sleepHours.hasOwnProperty(i)){
                    sleepRecords[id].sleepHours[i] = [];
                }
                sleepRecords[id].sleepHours[i].push(record.month+"/"+record.day);
                sleepRecords[id].count = sleepRecords[id].count + 1;
            }
            
        }
    }
return getMaxMinuteGuard(sleepRecords);

}

function getMaxGuardMinute(sleepRecords){
    var maxCount = 0;
    var maxId;
    for(var record in sleepRecords){
        if(sleepRecords[record].count > maxCount){
            maxCount = sleepRecords[record].count;
            maxId = record;
        }
    }

    var maxHourCount = 0;
    var maxHour;
    for(var hour in sleepRecords[maxId].sleepHours){
        if(sleepRecords[maxId].sleepHours[hour].length > maxHourCount){
            maxHourCount = sleepRecords[maxId].sleepHours[hour].length;
            maxHour = hour;
        }
    }
    return maxId +":"+ maxHour;
}

function getMaxMinuteGuard(sleepRecords){
    var maxId;
    var maxHourCount = 0;
    var maxHour;
    for(var record in sleepRecords){
        for(var hour in sleepRecords[record].sleepHours){
            if(sleepRecords[record].sleepHours[hour].length > maxHourCount){
                maxHourCount = sleepRecords[record].sleepHours[hour].length;
                maxId = record;
                maxHour = hour;
            }
        }
        
    }
    return maxId +":"+ maxHour;
}