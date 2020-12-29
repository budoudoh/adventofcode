const readline = require('readline');
const fs = require('fs');

const rl = readline.createInterface({
    input: fs.createReadStream('Dec13.txt')
});

let line_count = 1;
let earliest_timestamp = 0;
let active_buses = [];
let part_2_buses = [];
let max_id = 0;
let max_offset = 0;
rl.on('line', function (line) {
    processEntry(line.trim(), line_count);
    line_count++;
});

rl.on('close', function(){
    //console.log(findEarliestBus(active_buses,earliest_timestamp));
    console.log(findEarliestTimestamp(part_2_buses, 100000000000000));
});

function processEntry(text, line){
    if(line == 1){
        earliest_timestamp = parseInt(text);
    }

    if(line == 2){
        active_buses = text.split(",");
        for(i = 0; i < active_buses.length; i++){
            if(active_buses[i] !== "x"){
                let bus = {
                    id: parseInt(active_buses[i]),
                    offset: i
                }

                if(max_id < bus.id){
                    max_id = bus.id;
                    max_offset = bus.offset;
                }

                part_2_buses.push(bus);

                
            }
        }
    }
}


function findEarliestBus(buses, timestamp){
    let bus_id;
    let wait_time = NaN;

    for(let i = 0; i < buses.length; i++){
        let bus = buses[i];
        if(bus !== "x"){
            bus = parseInt(bus);
            if(timestamp%bus > 0){
                let factor = Math.floor(timestamp/bus) + 1;
                let actual_wait = factor*bus - timestamp;

                if(isNaN(wait_time) || wait_time > actual_wait){
                    wait_time = actual_wait;
                    bus_id = bus;
                }
                
            }
            else{
                bus_id = bus;
                wait_time = 0;
            }
        }
    }

    return bus_id*wait_time;
}

/* function findEarliestTimestamp(buses, start){
    let found = false;
    let count = start != null ? Math.floor((start - max_offset)/max_id) : 1;
    let timestamp = 0;
    while(!found){
        let multiple = (max_id * count) - max_offset;
        let mux = 0;
        for(let i = 0; i < buses.length; i++){
            let current = (multiple + buses[i].offset)%(buses[i].id);
            if(current == 0)
                mux++;
            else 
                break;
        }
        found = (mux == (buses.length));
        timestamp = found ? multiple : 0;
        count++;
    }
    return timestamp;
} */

