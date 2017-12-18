function knotHash(list, lengths){
    var skip_size = 0;
    var current_position = 0;
    for(var i = 0; i < lengths.length; i++){
        var current_length = lengths[i];
        var temp_array = [];
        var temp_position = current_position;

        for(var j = 0; j < current_length; j++){
            temp_array.push(list[temp_position])
            temp_position++;

            if(temp_position >= list.length){
                temp_position = 0;
            }
        }

        //console.log(temp_array);
        temp_array.reverse();
        temp_position = current_position;

        for(var j = 0; j < temp_array.length; j++){
            list[temp_position] = temp_array[j]
            temp_position++;

            if(temp_position >= list.length){
                temp_position = 0;
            }
        }

        var counter = 0;
        while(counter < (current_length+skip_size)){
            current_position++;
            if(current_position >= list.length){
                current_position = 0;
            }
            counter++;
        }

        skip_size++;
        //console.log(list);

    }

    return list[0]*list[1];
}

var input_lengths = [225,171,131,2,35,5,0,13,1,246,54,97,255,98,254,110];
var input_list = [];
for(var i=0; i < 256; i++){
    input_list.push(i);
}

var test_list = [0, 1, 2, 3, 4]
var test_lengths = [3, 4, 1, 5];

//console.log(knotHash(input_list, input_lengths));

function fullKnotHash(list, lengths){
    var skip_size = 0;
    var current_position = 0;
    for(var k = 0; k < 64; k++){
        for(var i = 0; i < lengths.length; i++){
            var current_length = lengths[i];
            var temp_array = [];
            var temp_position = current_position;
    
            for(var j = 0; j < current_length; j++){
                temp_array.push(list[temp_position])
                temp_position++;
    
                if(temp_position >= list.length){
                    temp_position = 0;
                }
            }
    
            //console.log(temp_array);
            temp_array.reverse();
            temp_position = current_position;
    
            for(var j = 0; j < temp_array.length; j++){
                list[temp_position] = temp_array[j]
                temp_position++;
    
                if(temp_position >= list.length){
                    temp_position = 0;
                }
            }
    
            var counter = 0;
            while(counter < (current_length+skip_size)){
                current_position++;
                if(current_position >= list.length){
                    current_position = 0;
                }
                counter++;
            }
    
            skip_size++;
        }
        
    }
    //console.log(list);
    var dense_hash = [];
    var position = 0;
    do{
        var xor = "";
        for(var i = position; i < position+16; i++){
            if(xor.length == 0){
                xor = xor + list[i]
            }
            else{
                xor = xor+" ^ "+list[i];
            }
            
        }
        
        dense_hash.push(eval(xor).toString(16));
        position = position + 16;
    }while(dense_hash.length < 16)
    
    console.log(dense_hash);
}

var full_lengths = [50,50,53,44,49,55,49,44,49,51,49,44,50,44,51,53,44,53,44,48,44,49,51,44,49,44,50,52,54,44,53,52,44,57,55,44,50,53,53,44,57,56,44,50,53,52,44,49,49,48,17,31,73,47,23]; 

fullKnotHash(input_list, full_lengths);