const readline = require('readline');
const fs = require('fs');

function traverseFirewallFromFile(filename){
    var layers = [];
    var  rl = readline.createInterface({
        input: fs.createReadStream(filename)
    });
    var previous_index = -1;
    rl.on('line', function (layer) {
        var parts = layer.trim().split(":");
        if(parts.length == 2){
            var current_index = parseInt(parts[0].trim());
            var count = previous_index+1;
            while(count < current_index){
                layers.push(0);
                count++;
            }
            layers.push(parseInt(parts[1].trim()));
            previous_index = current_index;
        }
    });
    
    rl.on('close', function(){
        traverseFirewallWithoutGettingCaught(layers);
    });
}

function traverseFirewall(firewall){
    var severity = 0; 
    for(var i = 0; i < firewall.length; i++){
        var depth = firewall[i];
        if(depth > 0){
            //determine if we are getting penalized at this layer
            var scanner_depth = i % ((depth-1)*2);
            if(scanner_depth == 0){
                severity = severity + i*depth;
            }
            
        }
    }
    console.log(severity);
}

function traverseFirewallWithoutGettingCaught(firewall){
    var delay = 1;
    var made_it = false;
    do{
        var caught = false;
        for(var i = 0; i < firewall.length; i++){
            var depth = firewall[i];
            if(depth > 0){
                //determine if we are getting penalized at this layer
                var scanner_depth = (i+delay) % ((depth-1)*2);
                if(scanner_depth == 0){
                    caught = true;
                    break;
                }
                
            }
            
        }

        if(caught){
            delay++;
        }
        else{
            made_it = true;
        }
    } while(!made_it)
    
    console.log(delay);
}

traverseFirewallFromFile("Dec13.txt");
//var sample = [3,2,0,0,4,0,4];
//traverseFirewallWithoutGettingCaught(sample);