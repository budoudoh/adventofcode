const readline = require('readline');
const fs = require('fs');

const rl = readline.createInterface({
    input: fs.createReadStream('Dec1.txt')
});

let expenses = [];

rl.on('line', function (line) {
    var expense = parseInt(line.trim());
    expenses.push(expense);
});

rl.on('close', function(){
    console.log(sumExpense(expenses));
    console.log(sumThreeExpense(expenses));
});

function sumExpense(expenses){
    let multiple = 0;
    for(let i = 0; i < expenses.length; i++){
        let expense = expenses[i];
        for(let j = 0; j < expenses.length; j++){
            if(i == j)
                continue;
            if((expenses[i] + expenses[j]) == 2020){
                multiple = expenses[i] * expenses[j];
                console.log(`The indexes are ${i} and ${j}`);
                console.log(`The values are ${expenses[i]} and ${expenses[j]}`);
                break;
            }
        }

        if(multiple != 0)
            break;
    }
    return multiple;
}

function sumThreeExpense(expenses){
    let multiple = 0;
    for(let i = 0; i < expenses.length; i++){
        for(let j = 0; j < expenses.length; j++){
            for(let k = 0; k < expenses.length; k++){
                if(i == j || j == k || i == k)
                    continue;
                if((expenses[i] + expenses[j] + expenses[k]) == 2020){
                    multiple = expenses[i] * expenses[j] * expenses[k];
                    console.log(`The indexes are ${i}, ${j}, and ${k}`);
                    console.log(`The values are ${expenses[i]}, ${expenses[j]}, and ${expenses[k]}`);
                    break;
                }
            }
            if(multiple != 0)
            break;
        }
        if(multiple != 0)
            break;
    }
    return multiple;
}