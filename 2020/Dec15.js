let start_numbers = [11,0,1,10,5,19];

function numberSpoken(start, size){
    let numbers = {};
    let last = 0;
    for(let i = 0; i < start.length; i++){
        numbers[start[i]] = [i];
        last = start[i];
    }

    let count = start.length;
    while(count < size){
        let next = 0;
        if(numbers[last].length > 1){
            index = numbers[last].length -1
            next = numbers[last][index] - numbers[last][index-1];
        }

        if(!numbers.hasOwnProperty(next)){
            numbers[next] = []
        }

        numbers[next].push(count);
        last = next;
        count++;
    }
    return last;
}

console.log(numberSpoken(start_numbers, 30000000));