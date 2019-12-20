const readline = require('readline');
const fs = require('fs');

const rl = readline.createInterface({
    input: fs.createReadStream('Dec14.txt')
});

var reactions = {};
rl.on('line', function (line) {
    var layout = line.trim().split("=>");
    if(layout.length == 2){
        var reaction = {};
        var parts = parseChemical(layout[1]);
        reaction.units = parts.units;
        reaction.components = [];
        var components = layout[0].trim().split(",");
        for(var i = 0; i < components.length; i++){
            var chemical = parseChemical(components[i]);
            reaction.components.push({
                checmical: chemical.chemical,
                units: chemical.units
            });
        }
        reactions[parts.chemical] = reaction;
    }
});

rl.on('close', function(){
    console.log(reactions);
});

function chemicalCost(reactions, units, endChemical, startChemical){
    var checmicals = {}
    var chain = [];
    var checmical = {
        compound: endChemical,
        units: units
    };
    chain.push(checmical);

    while(chain.length > 0){
        checmical = chain.pop();
        var components = reactions[checmical.compound].components;
        var units = reactions[checmical.compound].units;
    }
    return checmicals[startChemical];
}
function parseChemical(chemical){
    var parse = chemical.trim().split(" ");
    return {
        chemical: parse[1].trim(),
        units: parseInt(parse[0].trim())
    }
}