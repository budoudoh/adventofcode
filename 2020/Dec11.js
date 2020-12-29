const readline = require('readline');
const fs = require('fs');

const rl = readline.createInterface({
    input: fs.createReadStream('Dec11.txt')
});

let seating_chart = [];

rl.on('line', function (line) {
    processEntry(line.trim());
});

rl.on('close', function(){
    console.log(rotateSeats(seating_chart, 4));
});

function processEntry(text){
    let row = [];
    for(let i = 0; i < text.length; i++){
        let place = {
            seat: false,
            rounds : [false] 
        }

        place.seat = text.charAt(i) === "L";
        row.push(place);
    }
    seating_chart.push(row);
}

function rotateSeats(chart, occupied_max){
    let round = 1;
    let changed = true;
    let occupied_seats;
    while(changed){
        occupied_seats = 0;
        let changed_records = 0;
        for(let y = 0; y < chart.length; y++){
            let row = chart[y];
            for(let x = 0; x < row.length; x++){
                let place = row[x];
                if(!place.seat)
                    continue;
                
                let occupied_count = 0;

                for(let i = 0; i < transform.length; i++){
                    let seat = false;
                    let trans_x = x;
                    let trans_y = y;
                    let bounded = true;
                    while(!seat && bounded){
                         trans_x = trans_x + transform[i].x;
                         trans_y = trans_y + transform[i].y;

                        let bound_x = trans_x >= 0 && trans_x < row.length;
                        let bound_y = trans_y >= 0 && trans_y < chart.length;
                        bounded = bound_x && bound_y;

                        if(bounded && chart[trans_y][trans_x].seat){
                            seat = chart[trans_y][trans_x].seat;
                            let occupied = chart[trans_y][trans_x].rounds[round-1] ? 1 : 0;
                            occupied_count = occupied_count + occupied;
                        }
                    }
                    
                }

                if(place.rounds[round-1]){
                    if(occupied_count > occupied_max){
                        chart[y][x].rounds.push(false);
                        changed_records++;
                    }
                    else{
                        chart[y][x].rounds.push(true);
                        occupied_seats++;
                    }
                }
                else{
                    if(occupied_count == 0){
                        chart[y][x].rounds.push(true);
                        changed_records++;
                        occupied_seats++;
                    }
                    else{
                        chart[y][x].rounds.push(false);
                    }
                }
                
            }
        }
        changed = changed_records > 0;
        round++;
    }

    return occupied_seats;
}

let transform = [
    {
        x: 0,
        y: 1
    },
    {
        x: 1,
        y: 1
    },
    {
        x: -1,
        y: 1
    },
    {
        x: 1,
        y: 0
    },
    {
        x: 1,
        y: -1
    },
    {
        x: 0,
        y: -1
    },
    {
        x: -1,
        y: -1
    },
    {
        x: -1,
        y: 0
    }
]