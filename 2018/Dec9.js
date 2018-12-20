var playerCount = 10;
var lastMarbleValue = 1618;

var scores = [];
for(var i= 0; i < playerCount; i++){
    scores.push(0);
}

var circle = [];
var currentIndex = 0;
var currentPlayer = 0;
for(var i =0; i <= lastMarbleValue; i++){
    
    if(i%23 == 0){
        var pullIndex;
        if(currentIndex < 7){
            pullIndex = circle.length - 1 - 7 - currentIndex;
        }
        else{
            pullIndex = currentIndex - 7;
        }
        var pullValue = circle.splice(pullIndex, 1);
        scores[currentPlayer] = scores[currentPlayer] + pullValue + i;
    }
    currentPlayer++
    if(currentPlayer == playerCount){
        currentPlayer = 0;
    }
}