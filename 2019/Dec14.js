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
            reaction.components.push(chemical);
        }
        reactions[parts.chemical] = reaction;
    }
});

rl.on('close', function(){
    console.log(chemicalCost(reactions, 1, "FUEL", "ORE"));
});

function chemicalCost(reactions, units, endChemical, startChemical){
    var chemicals = {}
    var chain = [];
    var chemical = {
        compound: endChemical,
        units: units
    };
    chain.push(chemical);

    while(chain.length > 0){
        chemical = chain.pop();
        if(reactions.hasOwnProperty(chemical.compound)){
            if(chemicals.hasOwnProperty(chemical.compound) && chemicals[chemical.compound].extra > 0){
                if(chemicals[chemical.compound].extra >= chemical.units){
                    chemicals[chemical.compound].units = chemicals[chemical.compound].units + chemical.units;
                    chemicals[chemical.compound].extra = chemicals[chemical.compound].extra - chemical.units;
                    chemical.units = 0;
                }
                /*else{
                    chemical.units = chemical.units - chemicals[chemical.compound].extra;
                    chemicals[chemical.compound].units = chemicals[chemical.compound].units + chemicals[chemical.compound].extra;
                    chemicals[chemical.compound].extra = 0;
                }*/
            }

            if(chemical.units > 0)
            {
                var components = reactions[chemical.compound].components;
                var formula_units = reactions[chemical.compound].units;
                var factor = 1;
                var extra = 0;
                if(chemical.units > formula_units){
                    factor = Math.ceil(chemical.units/formula_units);
                    extra = factor*formula_units - chemical.units;
                }

                if(chemicals.hasOwnProperty(chemical.compound)){
                    var potential = (factor - 1)*formula_units + chemicals[chemical.compound].extra;
                    if(potential >= chemical.units){
                        var difference = chemical.units % formula_units;
                        factor = factor - 1;
                        chemicals[chemical.compound].extra = chemicals[chemical.compound].extra - difference;
                    }
                    else{
                        chemicals[chemical.compound].extra = chemicals[chemical.compound].extra + extra;
                    }
                    chemicals[chemical.compound].units = chemicals[chemical.compound].units + chemical.units;
                }
                else{
                    chemicals[chemical.compound] = {
                        units: chemical.units,
                        extra: extra
                    }
                }
                
                for(var i = 0; i < components.length; i++){
                    var current  = {
                        compound: components[i].chemical,
                        units: components[i].units*factor
                    }
                    chain.push(current);
                }
            }
        }
        else if(chemicals.hasOwnProperty(chemical.compound)){
            chemicals[chemical.compound].units = chemicals[chemical.compound].units + chemical.units;
            
        }
        else{
            chemicals[chemical.compound] = {
                units: chemical.units,
                extra: 0
            }
        }

    }
    return chemicals;
}

function parseChemical(chemical){
    var parse = chemical.trim().split(" ");
    return {
        chemical: parse[1].trim(),
        units: parseInt(parse[0].trim())
    }
}

function findFactor(input, base){
    var x = 1;
    while(base*x < input){
        x++;
    }
    return x;
}