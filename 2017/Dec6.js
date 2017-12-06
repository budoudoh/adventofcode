var test_input = [0,2,7,0];
var input = [5,1,10,0,1,7,13,14,3,12,8,10,7,12,0,6];

function shiftMemory(memory){
    var states = [];
    var infinite = true;
    var state_count = 0;
    while(infinite){
        //find max in array
        var max = {
            "value": -1,
            "index": 0
        };
        
        for(var i=0; i < memory.length; i++){
            if(max.value < memory[i]){
                max.value = memory[i];
                max.index = i
            }
        }

        //reallocate max value

        var counter = max.value;
        var index = max.index;
        
        memory[index] = 0;

        while(counter > 0){
            if(index >= memory.length-1){
                index = 0;
            }
            else{
                index  = index + 1;
            }

            memory[index] = memory[index] + 1;
            counter--;
        }

        var state = memory.join("-");
        console.log(state)
        //find the similar state
        var similar = states.find(function(current_state){
            return state.localeCompare(current_state) == 0;
        })

        if(similar !== undefined){
            infinite = false;
            console.log(similar);
        }
        else
        {
            states.push(state);
        }

        state_count++;
    }

    return state_count;
    
}

function shiftMemoryPart2(memory){
    var states = [];
    var infinite = true;
    var infinite_state = "";
    var twice = true;
    var state_count = 0;
    var twice_count = 0;

    while(infinite || twice){
        //find max in array
        var max = {
            "value": -1,
            "index": 0
        };
        
        for(var i=0; i < memory.length; i++){
            if(max.value < memory[i]){
                max.value = memory[i];
                max.index = i
            }
        }

        //reallocate max value

        var counter = max.value;
        var index = max.index;
        
        memory[index] = 0;

        while(counter > 0){
            if(index >= memory.length-1){
                index = 0;
            }
            else{
                index  = index + 1;
            }

            memory[index] = memory[index] + 1;
            counter--;
        }
        
        var state = memory.join("-");
        if(infinite){
            
            //find the similar state
            var similar = states.find(function(current_state){
                return state.localeCompare(current_state) == 0;
            })
    
            if(similar !== undefined){
                infinite = false;
                infinite_state = state;
                console.log(similar);
            }
            else
            {
                states.push(state);
            }
    
            state_count++;
        }
        else{
            if(state.localeCompare(infinite_state) == 0){
                twice = false;
            }
            twice_count++;
        }
    }

    return state_count+" - "+twice_count;
    
}

console.log(shiftMemoryPart2(input));