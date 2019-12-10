var playerCount = 424;
var lastMarbleValue = 7114400;

var scores = [];
for(var i= 0; i < playerCount; i++){
    scores.push(0);
}

var circle = [];
var currentIndex = 0;
var currentPlayer = 0;
for(var i = 0; i <= lastMarbleValue; i++){
    process.stdout.clearLine();
    process.stdout.cursorTo(0);
    process.stdout.write(i+"");
    if(i%23 == 0 && i > 0){
        var pullIndex;
        if(currentIndex < 7){
            var difference = 7 - currentIndex;
            pullIndex = circle.length - difference;
        }
        else{
            pullIndex = currentIndex - 7;
            //console.log(currentIndex);
        }
        var pullValue = circle.splice(pullIndex, 1);
        scores[currentPlayer] = scores[currentPlayer] + pullValue[0] + i;
        currentIndex = pullIndex;
    }
    else{
        if(circle.length > 0){
            //console.log("circle.length:"+(circle.length-1)+" currentIndex:"+currentIndex);
            var firstIndex = currentIndex == (circle.length-1) ? 0 : (currentIndex + 1);
            var temp = currentIndex == (circle.length-1) ? 0 : (currentIndex + 1);
            var secondIndex = temp == (circle.length-1) ? 0 : (temp + 1);
            //console.log("firstIndex: "+firstIndex+" secondIndex: "+secondIndex)
            if(firstIndex == circle.length-1 && secondIndex == 0){
                circle.push(i)
                currentIndex = circle.length-1;
            }
            else{
                circle.splice(secondIndex, 0, i);
                currentIndex = secondIndex;
            }
        }
        else{
            circle.push(i);
        }
        
        
    }
    if(i > 0){
        currentPlayer++
        if(currentPlayer == playerCount){
            currentPlayer = 0;
        }
    }
}

console.log(scores.reduce(function(a, b){
    return Math.max(a,b)
}));