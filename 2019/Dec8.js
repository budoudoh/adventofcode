const readline = require('readline');
const fs = require('fs');

const rl = readline.createInterface({
    input: fs.createReadStream('Dec8.txt')
});

let columns = 25;
let rows = 6;

String.prototype.replaceAt=function(index, replacement) {
    return this.substr(0, index) + replacement+ this.substr(index + replacement.length);
}

var imageLayers = [];
rl.on('line', function (line) {
    //line = "123456789012";
    var imageString = line.trim();
    var eos = false;
    var layerCount = 0;
    while(!eos){
        var layer = [];
        for(var i = 0; i < rows; i++){
            var begining = i*columns + rows*columns*layerCount;
            var end = i*columns + columns + rows*columns*layerCount;
            /*if(begining >= imageString.length){
                eos = true;
                break;
            }*/
            if(end >= imageString.length){
                eos = true;
            }
            var current = imageString.slice(begining, end);
            layer.push(current);
        }
        imageLayers.push(layer);
        layerCount++;

    }
});

rl.on('close', function(){
    console.log(decodeImage(imageLayers));
});

function decodeImage(image){
    var final = [];
    for(var i = 0; i < image.length; i++){
        for(var j = 0; j < image[i].length; j++){
            var str = image[i][j];
            if(final[j] === undefined){
                final.push(str);
                continue;
            }
            for(var k = 0; k < str.length; k++){
                if(final[j].charAt(k) === "2"){
                    final[j] = final[j].replaceAt(k, str.charAt(k));
                }
            }
        }
    }
    return final;
}
function countZeros(image){
    var minZeros = 10000000;
    var oneCount = 0;
    var twoCount = 0;
    for(var i = 0; i < image.length; i++){
        var zeros = 0;
        var ones = 0;
        var twos = 0;
        for(var j = 0; j < image[i].length; j++){
            var str = image[i][j];
            for(var k = 0; k < str.length; k++){
                switch(str.charAt(k)){
                    case "0":
                        zeros++;
                        break;
                    case "1":
                        ones++;
                        break;
                    case "2":
                        twos++;
                        break;
                }
            }
        }
        console.log("Layer "+(i+1)+" has "+zeros+" zeros");
        if(zeros < minZeros){
            minZeros = zeros;
            oneCount = ones;
            twoCount = twos;
        }
    }
    console.log("The layer with the fewest zeros had "+minZeros+" zeros, "+oneCount+" ones, and "+twoCount+" twos");
    console.log(image);
    return oneCount*twoCount;
}
