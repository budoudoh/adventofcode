const _ = require('lodash');

input = "247819356";

function crabCups(cupsString, moves){
    let cups = cupsString.split("").map(x => parseInt(x));
    let count = 0;
    let start = 0;
    while(count < moves){
        let index = start;
        let current = cups[index];
        let pickup;
        if(index + 4 <= cups.length){
            pickup = cups.slice(index+1, index+4);
            cups.splice(index+1, 3);
        }
        else{
            let additional = 3 - (cups.length - 1 - index);
            pickup = cups.slice(index+1, cups.length).concat(cups.slice(0,additional));
            cups.splice(index+1, 3-additional);
            cups.splice(0, additional);
        }

        let next = -1;
        let destination = current - 1;
        while(next < 0){
            if(destination <= 0){
                destination = 9;
            }

            for(let i = 0; i < cups.length; i++){
                if(cups[i] == destination){
                    next = i;
                    break;
                }
            }
            destination = destination - 1;
        }

        cups.splice(next+1, 0, pickup[0], pickup[1], pickup[2]);
        for(let i = 0; i < cups.length; i++){
            if(cups[i] == current){
                if(i < cups.length -1){
                    start = i+1;
                }
                else{
                    start = 0;
                }
                break;
            }
        }
        count++;
    }

    let result;
    for(let i = 0; i < cups.length; i++){
        if(cups[i] == 1){
            result = cups.slice(i+1).join("") + cups.slice(0, i).join("");
            break;
        }
    }
    return result;
}

function translatedCrabCups(cupsString, totalCups, moves){
    let cups = cupsString.split("").map(x => parseInt(x));
    for(let i = 10; i <= totalCups; i++){
        cups.push(i);
    }
    let index = 0;
    let count = 0;
    while(count < moves){
        let current = cups[index];
        let pickup;
        if(index + 4 <= cups.length){
            pickup = cups.slice(index+1, index+4);
            cups.splice(index+1, 3);
        }
        else{
            let additional = 3 - (cups.length - 1 - index);
            pickup = cups.slice(index+1, cups.length).concat(cups.slice(0,additional));
            cups.splice(index+1, 3-additional);
            cups.splice(0, additional);
        }

        let next = -1;
        let destination = current - 1;
        while(next < 0){
            if(destination <= 0){
                destination = totalCups;
            }

            for(let i = 0; i < cups.length; i++){
                if(cups[i] == destination){
                    next = i;
                    break;
                }
            }
            destination = destination - 1;
        }

        cups.splice(next+1, 0, pickup[0], pickup[1], pickup[2]);
        for(let i = 0; i < cups.length; i++){
            if(cups[i] == current){
                if(i < cups.length -1){
                    index = i+1;
                }
                else{
                    index = 0;
                }
                break;
            }
        }
        count++;
    }

    let result;
    for(let i = 0; i < cups.length; i++){
        if(cups[i] == 1){
            result = cups[i+1]*cups[i+2];
            break;
        }
    }

    return result
}

//console.log(crabCups(input, 100));
console.log(translatedCrabCups(input, 1000000, 10000000))