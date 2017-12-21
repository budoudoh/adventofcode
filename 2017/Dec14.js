String.prototype.replaceAt=function(index, replacement) {
    return this.substr(0, index) + replacement+ this.substr(index + replacement.length);
}

function fullKnotHash(phrase){
    var list = [];
    var suffix = [17, 31, 73, 47, 23];
    for(var i=0; i < 256; i++){
        list.push(i);
    }
    var lengths = convertToAscii(phrase);
    lengths = lengths.concat(suffix);
    
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
        var hash = eval(xor).toString(16);
        if(hash.length < 2){
            hash = "0"+hash;
        }
        dense_hash.push(hash);
        position = position + 16;
    }while(dense_hash.length < 16)
    
    return dense_hash.join("");
}

function convertToAscii(base){
    var codes = [];
    var chars = base.trim().split("");
    for(var i = 0; i < chars.length; i++){
        codes.push(chars[i].charCodeAt(0));
    }
    return codes;
}

function defragmentDisk(key){
    var disk = [];
    var used = 0;
    for(var i = 0; i < 128; i++){
        var current = key+"-"+i;
        var hash = fullKnotHash(current);
        var hash_parts = hash.trim().split("");
        var full_bin = "";
        for(var j =0; j < hash_parts.length; j++){
            var bin = parseInt(hash_parts[j], 16).toString(2);
            var bin_length = bin.length;
            while(bin_length < 4){
                bin = "0"+bin;
                bin_length++;
            }
            full_bin = full_bin + bin;
            for(var k = 0; k < bin.length; k++){
                if(parseInt(bin.charAt(k)) == 1){
                    used++;
                }
            }
        }
        disk.push(full_bin);
    }
    return disk;
}

function countRegions(key){
    var disk = defragmentDisk(key);
    var regions = 0;
    var current_ranges = [];
    var previous_ranges = [];
    for(var i = 0; i < disk.length; i++){
        
    }

}
countRegions("flqrgnkx");