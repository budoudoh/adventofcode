function ManhattanDistance(location){
    var square = Math.ceil(Math.sqrt(location));
    if(square%2 == 0){
        square = square+1;
    }
    var terminator = Math.pow(square,2);
    var corner1 = 0;
    var corner2 = 0;

    for(var i = 0; i < 4; i++){
        var tempcorner1 = terminator - (square-1)*i;
        var tempcorner2 = terminator - (square-1)*(i+1);
        if(location >= tempcorner2 && location <= tempcorner1){
            corner1 = tempcorner1;
            corner2 = tempcorner2;
            break;
        }
    }
    var center = corner1 - (square-1)/2;
    var column_distance = Math.abs(center - location);

    var row_distance = (square-1)/2;

    return column_distance + row_distance;

}

function spiralGenerator(location){
    var values = [0,1];

    for(var k = 2; k < 100; k++){
        var square = Math.ceil(Math.sqrt(k));
        if(square%2 == 0){
            square = square+1;
        }
        var terminator = Math.pow(square,2);
        var corner1 = 0;
        var corner2 = 0;
        var row = 0;
    
        for(var i = 0; i < 4; i++){
            var tempcorner1 = terminator - (square-1)*i;
            var tempcorner2 = terminator - (square-1)*(i+1);
            if(k >= tempcorner2 && k <= tempcorner1){
                corner1 = tempcorner1;
                corner2 = tempcorner2;
                row = i;
                break;
            }
        }
        
        //console.log(square);
        var sum = 0;
        var square_location = (square-1)/2;
        if(row == 0){
            if(k != corner2){
                //read above
                var up = k - (7*square_location + (square_location-1));
                if(up < values.length)
                    sum = sum + values[up];

                //read left
                var left = k-1;
                if(left < values.length)
                    sum = sum + values[left];
        
                //read above left
                var aboveleft = up-1;
                if(k == corner2+1)
                    aboveleft = k -2;

                if(aboveleft < values.length)
                    sum = sum + values[aboveleft];
                
                if(k != corner1){
                    //read above right
                    var aboveright = up + 1;
                    if(aboveright < values.length)
                        sum = sum + values[aboveright];
                }
            }
            else{
                //read above
                var above = k-1;
                if(above < values.length)
                    sum = sum + values[above];

                //read aboveright
                var aboveright = (k+1) - (7*square_location + (square_location-1));
                if(aboveright < values.length)
                    sum = sum + values[aboveright];

            }    
        }
        else if(row == 1){
            if(k != corner2){
                //read above
                var up = k-1;
                if(up < values.length)
                    sum = sum + values[up];
                
                if(k != corner1)
                {
                    //read right
                    var right = k - (7*square_location + (square_location-3));
                    if(right < values.length)
                        sum = sum + values[right];

                    if(k != (corner1-1)){
                        //read belowright
                    var belowright = right +1;
                    if(belowright < values.length)
                        sum = sum + values[belowright];
                    }
                    
                }
                
                if(k != (corner2+1)){
                    //read aboveright
                    var aboveright = k - (7*square_location + (square_location-3)) -1;
                    if(aboveright < values.length)
                        sum = sum + values[aboveright];
                }
                else
                {
                    var aboveright = k-2;
                    if(aboveright < values.length)
                        sum = sum + values[aboveright];
                }

            }
            else{
                //read right
                var right = k-1;
                if(right < values.length)
                    sum = sum + values[right];

                //read belowright
                var belowright = (k+1) - (7*square_location + (square_location-3));
                if(belowright < values.length)
                    sum = sum + values[belowright];

            }   
        }
        else if(row == 2){
            if(k != corner2){
                //read right
                var right = k-1;
                if(right < values.length)
                    sum = sum + values[right];
                
                if(k != corner1)
                {
                    //read below
                    var below = k - (7*square_location + (square_location-5));
                    if(below < values.length)
                        sum = sum + values[below];
                    if(k != corner1 -1){
                         //read belowleft
                        var belowleft = below +1;
                        if(belowleft < values.length)
                            sum = sum + values[belowleft];
                    }
                }
                var belowright =  k - (7*square_location + (square_location-5)) -1;
                if(k == corner2+1)
                belowright = k -2;
                if(belowright < values.length)
                    sum = sum + values[belowright];

                

            }
            else{
                //read below
                var below = k-1;
                if(below < values.length)
                    sum = sum + values[below];

                //read belowleft
                var belowleft = (k+1) - (7*square_location + (square_location-5));
                if(belowleft < values.length)
                    sum = sum + values[belowleft];

            }   
        }
        else if(row == 3){
            if(k != corner2 && k != corner2 +1){
                //read below
                var below = k-1;
                if(below < values.length)
                    sum = sum + values[below];
                
                if(k != corner1)
                {
                    //read left
                    var left = k - (7*square_location + (square_location-7));
                    if(left < values.length)
                        sum = sum + values[left];

                    if(k != corner1-1){
                        var aboveleft = left +1;
                        if(aboveleft < values.length)
                            sum = sum + values[aboveleft];
                    }
                }
                    //read belowleft
                var belowleft = k - (7*square_location + (square_location-7)) - 1;
                if(k == corner2 + 2)
                    belowleft = Math.pow(square-2,2);
                if(belowleft < values.length)
                    sum = sum + values[belowleft];
                
            }
            else if(k == corner2 +1){
                //read left
                var left = k - 1;
                if(left < values.length)
                    sum = sum + values[left];
                
                var aboveleft = (k+1) - (7*square_location + (square_location-7));
                if(aboveleft < values.length)
                    sum = sum + values[aboveleft];
                
            }
            
        }
        console.log(k+" is on row "+ row +" of square "+ square_location+" with corner values of "+corner2+" and "+corner1+" and has a sum of "+sum);
        values.push(sum);
    }
    //return values;
    

}
console.log(spiralGenerator(265149));