const readline = require('readline');
const fs = require('fs');

const rl = readline.createInterface({
    input: fs.createReadStream('Dec3.txt')
});

var wires = {
    wireOne: [],
    wireTwo: []
}

rl.on('line', function (line) {
    var path = line.trim().split(",");
    if(wires.wireOne.length == 0)
        wires.wireOne = path;
    else
        wires.wireTwo = path;
});

rl.on('close', function(){
    console.log(shortestDistance(wires.wireOne, wires.wireTwo));
});

function shortestDistance(pathOne, pathTwo){
    var matrix = {}
    var currentX = 0;
    var currentY = 0;
    var currentStep = 0;
    var distances = {};
    var intersections = {};
    var minDistance = 10000000000000;
    var minSteps = 10000000000000;

    var oppRegex = /([A-Z]{1}?)([0-9]{1,}?)$/;
    var testRegex = /X:[1-9]{1,}$/;


    for(var pathIndex = 0; pathIndex < pathOne.length; pathIndex++){
        var matches = oppRegex.exec(pathOne[pathIndex].trim());
        
        var opp = {
            direction: matches[1],
            distance: parseInt(matches[2])
        }
        
        switch(opp.direction){
            case "D":
                for(var y = 0; y < opp.distance; y++){
                    currentY = currentY - 1;
                    currentStep++;
                    if(!matrix.hasOwnProperty(currentX+","+currentY))
                        matrix[currentX+","+currentY] = "X:"+currentStep;
                }
                break;
            case "L":
                    for(var x = 0; x < opp.distance; x++){
                        currentX = currentX - 1;
                        currentStep++;
                        if(!matrix.hasOwnProperty(currentX+","+currentY))
                            matrix[currentX+","+currentY] = "X:"+currentStep;
                    }
                break;
            case "U":
                    for(var y = 0; y < opp.distance; y++){
                        currentY = currentY + 1;
                        currentStep++;
                        if(!matrix.hasOwnProperty(currentX+","+currentY))
                            matrix[currentX+","+currentY] = "X:"+currentStep;
                    }
                break;
            case "R":
                    for(var x = 0; x < opp.distance; x++){
                        currentX = currentX + 1;
                        currentStep++;
                        if(!matrix.hasOwnProperty(currentX+","+currentY))
                            matrix[currentX+","+currentY] = "X:"+currentStep;
                    }
                break;
        }
    }

    currentX = 0;
    currentY = 0;
    currentStep = 0;
    for(var pathIndex = 0; pathIndex < pathTwo.length; pathIndex++){
        var matches = oppRegex.exec(pathTwo[pathIndex].trim());
        
        var opp = {
            direction: matches[1],
            distance: parseInt(matches[2])
        }
        
        switch(opp.direction){
            case "D":
                for(var y = 0; y < opp.distance; y++){
                    currentY = currentY - 1;
                    currentStep++;
                    if(testRegex.test(matrix[currentX+","+currentY])){
                        var previousSteps = parseInt(matrix[currentX+","+currentY].substr(2));
                        var stepSum = currentStep + previousSteps;
                        if(stepSum < minSteps)
                            minSteps = stepSum;
                        matrix[currentX+","+currentY] = matrix[currentX+","+currentY] + ",Y:"+currentStep;
                        var distance = Math.abs(currentX) + Math.abs(currentY);
                        distances[currentX+","+currentY] = distance;
                        intersections[currentX+","+currentY] = matrix[currentX+","+currentY];
                        if(distance < minDistance){
                            minDistance = distance;
                        }
                    }
                    else
                        matrix[currentX+","+currentY] = "Y:"+currentStep;
                }
                break;
            case "L":
                    for(var x = 0; x < opp.distance; x++){
                        currentX = currentX - 1;
                        currentStep++;
                    if(testRegex.test(matrix[currentX+","+currentY])){
                        var previousSteps = parseInt(matrix[currentX+","+currentY].substr(2));
                        var stepSum = currentStep + previousSteps;
                        if(stepSum < minSteps)
                            minSteps = stepSum;
                        matrix[currentX+","+currentY] = matrix[currentX+","+currentY] + ",Y:"+currentStep;
                        var distance = Math.abs(currentX) + Math.abs(currentY);
                        distances[currentX+","+currentY] = distance;
                        intersections[currentX+","+currentY] = matrix[currentX+","+currentY];
                        if(distance < minDistance){
                            minDistance = distance;
                        }
                    }
                    else
                        matrix[currentX+","+currentY] = "Y:"+currentStep;
                    }
                break;
            case "U":
                    for(var y = 0; y < opp.distance; y++){
                        currentY = currentY + 1;
                        currentStep++;
                    if(testRegex.test(matrix[currentX+","+currentY])){
                        var previousSteps = parseInt(matrix[currentX+","+currentY].substr(2));
                        var stepSum = currentStep + previousSteps;
                        if(stepSum < minSteps)
                            minSteps = stepSum;
                        matrix[currentX+","+currentY] = matrix[currentX+","+currentY] + ",Y:"+currentStep;
                        var distance = Math.abs(currentX) + Math.abs(currentY);
                        distances[currentX+","+currentY] = distance;
                        intersections[currentX+","+currentY] = matrix[currentX+","+currentY];
                        if(distance < minDistance){
                            minDistance = distance;
                        }
                    }
                    else
                        matrix[currentX+","+currentY] = "Y:"+currentStep;
                    }
                break;
            case "R":
                    for(var x = 0; x < opp.distance; x++){
                        currentX = currentX + 1;
                        currentStep++;
                    if(testRegex.test(matrix[currentX+","+currentY])){
                        var previousSteps = parseInt(matrix[currentX+","+currentY].substr(2));
                        var stepSum = currentStep + previousSteps;
                        if(stepSum < minSteps)
                            minSteps = stepSum;
                        matrix[currentX+","+currentY] = matrix[currentX+","+currentY] + ",Y:"+currentStep;
                        var distance = Math.abs(currentX) + Math.abs(currentY);
                        distances[currentX+","+currentY] = distance;
                        intersections[currentX+","+currentY] = matrix[currentX+","+currentY];
                        if(distance < minDistance){
                            minDistance = distance;
                        }
                    }
                    else
                        matrix[currentX+","+currentY] = "Y:"+currentStep;
                    }
                break;
        }
    }
    console.log(intersections);
    console.log(minSteps);
    return minDistance;

}