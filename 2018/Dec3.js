const readline = require('readline');
const fs = require('fs');

const rl = readline.createInterface({
    input: fs.createReadStream('Dec3.txt')
});

var claims = [];

rl.on('line', function (line) {
    var regex = /#(.*?) @ (.*?),(.*?): (.*?)\x(.*?)$/;
    var matches = regex.exec(line.trim());
    var claim = {
        id: parseInt(matches[1]),
        leftOffset: parseInt(matches[2]),
        topOffset: parseInt(matches[3]),
        width: parseInt(matches[4]),
        height: parseInt(matches[5])
    }
    
    claims.push(claim);
});

rl.on('close', function(){
    console.log(checkSheetforIds(claims));
});

function checkSheet(myClaims){
    var sheet = [];
    for(var i = 0; i < 1100; i++){
        var line = [];
        for(var j = 0; j < 1100; j++){
            line.push(0);
        }
        sheet.push(line);
    }
    //console.log(myClaims);
    var count = 0;
    myClaims.forEach(claim => {
        console.log(claim)
        for(var i = claim.topOffset; i < claim.topOffset + claim.height; i++){
            for(var j = claim.leftOffset; j < claim.leftOffset+ claim.width; j++){
                sheet[i][j] = sheet[i][j] + 1;
                if(sheet[i][j] == 2){
                    count++;
                }
            }
        }
    });
    return count;
}

function checkSheetforIds(myClaims){
    var sheet = [];
    for(var i = 0; i < 1100; i++){
        var line = [];
        for(var j = 0; j < 1100; j++){
            line.push([]);
        }
        sheet.push(line);
    }
    //console.log(myClaims);
    var idSet = new Set();
    myClaims.forEach(claim => {
        idSet.add(claim.id);
        for(var i = claim.topOffset; i < claim.topOffset + claim.height; i++){
            for(var j = claim.leftOffset; j < claim.leftOffset+ claim.width; j++){
                if(sheet[i][j].length == 1){
                    idSet.delete(claim.id);
                    idSet.delete(sheet[i][j][0]);
                }
                sheet[i][j].push(claim.id);
            }
        }
    });
    return idSet.values();
}