const readline = require('readline');
const fs = require('fs');

function runInstructionsFromFile(filename){
    var instructions = [];
    var  rl = readline.createInterface({
        input: fs.createReadStream(filename)
    });

    rl.on('line', function (line) {
        var parts = line.trim().split(" ");
        if(parts.length == 7){
            var instruction = {
                "register": parts[0],
                "command": parts[1],
                "value": parseInt(parts[2]),
                "comp_register": parts[4],
                "comp_expression": parts[5],
                "comp_value": parseInt(parts[6])
            }

            instructions.push(instruction);
        }
    });
    
    rl.on('close', function(){
        runInstructions(instructions);
    })
}

function runInstructions(instructions){
    var registers = {};
    var max = 0;
    for(var i = 0; i < instructions.length; i++){
        var instruction = instructions[i];
        var value = 0;
        if(instruction.register in registers){
            value = registers[instruction.register];
        }

        var comp_value = 0;
        if(instruction.comp_register in registers){
            comp_value = registers[instruction.comp_register]
        }

        var expression = "comp_value "+instruction.comp_expression+" "+instruction.comp_value;
        if(eval(expression)){
            if(instruction.command.localeCompare("inc") == 0){
                value  = value + instruction.value;
            }
            else{
                value  = value - instruction.value;
            }
            
        }
        if(value > max){
            max = value;
        }

        registers[instruction.register] = value;
    }

    console.log(registers);
    console.log(max);
}

runInstructionsFromFile("Dec8.txt");