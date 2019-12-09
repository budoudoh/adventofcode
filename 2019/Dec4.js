function passwordTester(rangeStart, rangeEnd){
    var count = 0;
    
    for(var i = rangeStart; i <= rangeEnd; i++){
        var seed = i;
        var previous = 10;
        var consecutiveMatches = 1;
        var consecutive = false;
        var decreasing = true;
        var tuple = false;
        while(seed > 0){
            var current = seed%10;
            if(previous < 10){
                if(previous == current){
                    consecutive = true;
                    consecutiveMatches++;
                }
                else if (consecutiveMatches == 2){
                    tuple = true;
                    consecutiveMatches = 1;
                }
                else{
                    consecutiveMatches = 1;
                }
                
                if(previous < current){
                    decreasing = false;
                    break;
                }
            }
            seed = Math.floor(seed/10);
            previous = current;
        }
        
        if (consecutiveMatches == 2){
            tuple = true;
        }
        if(consecutive && decreasing && tuple){
            count++;
        }
    }

    return count;
}

console.log(passwordTester(278384, 824795))
//console.log(passwordTester(11222333,11222333))