const readline = require('readline');
const fs = require('fs');
const _ = require('lodash');

const rl = readline.createInterface({
    input: fs.createReadStream('Dec21.txt')
});

let foods = {};
let allergens = {};
let count = 0;
let ingredients = [];
rl.on('line', function (line) {
    processEntry(line.trim());
});

rl.on('close', function(){
    console.log(countIngredients());
    console.log(cannonicalAllergenList());
});


function processEntry(text){
    let food = {
        id: count
    };
    let parts = text.split("(");
    if(parts.length == 2){
        let temp_ingredients = parts[0].trim().split(" ");
        food.ingredients = new Set(temp_ingredients);
        ingredients = ingredients.concat(temp_ingredients);
        let temp_allergens = parts[1].trim().split(" ").map(x => x.replace(/[\),]/g, ""));
        temp_allergens.shift();
        food.allergens = new Set(temp_allergens);
        for(let i = 0; i < temp_allergens.length; i++){
            let allergen = temp_allergens[i];
            if(!allergens.hasOwnProperty(allergen)){
                allergens[allergen] = {
                    foods: []
                };
            }
            allergens[allergen].foods.push(count);
        }
    }

    foods[count] = food;
    count++;
}

function countIngredients(){
    for(let allergen in allergens){
        let current_foods = allergens[allergen].foods;
        let common_ingredients = new Set();
        for(let i = 0; i < current_foods.length; i++){
            if(i == 0){
                common_ingredients = foods[current_foods[i]].ingredients;
            }
            else{
                common_ingredients = new Set([...common_ingredients].filter(x => foods[current_foods[i]].ingredients.has(x)));
            }
        }
        allergens[allergen].common_ingredients = common_ingredients;
    }
    const reducer = (accumulator, currentValue) => accumulator + currentValue.common_ingredients.size;
    let common_count = Object.values(allergens).reduce(reducer, 0);
    let found_allergens = new Set();

    while(common_count > found_allergens.size){
        for(let allergen in allergens){
            if(allergens[allergen].common_ingredients.size == 1){
                let ingredient = allergens[allergen].common_ingredients.values().next().value;
                if(!found_allergens.has(ingredient)){
                    for(let other_allergen in allergens){
                        if(other_allergen != allergen){
                            allergens[other_allergen].common_ingredients.delete(ingredient);
                        }
                    }
                    found_allergens.add(ingredient);
                }
            }
        }
        common_count = Object.values(allergens).reduce(reducer, 0);
    }
    let temp = ingredients;
    found_allergens.forEach(x =>{
        temp = temp.filter(y => y !== x);
    })

    return temp.length;    
}

function cannonicalAllergenList(){
    let allergen_list = Object.keys(allergens).sort();
    let cannonical_list = "";
    for(let i = 0; i < allergen_list.length; i++){
        if(i < allergen_list.length-1){
            cannonical_list = cannonical_list + allergens[allergen_list[i]].common_ingredients.values().next().value +",";
        }
        else{
            cannonical_list = cannonical_list + allergens[allergen_list[i]].common_ingredients.values().next().value;
        }
    }
    return cannonical_list;
}

