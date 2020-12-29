const readline = require('readline');
const fs = require('fs');
const _ = require('lodash');

const rl = readline.createInterface({
    input: fs.createReadStream('Dec22.txt')
});

let players = [];
let deck = [];
rl.on('line', function (line) {
    processEntry(line.trim());
});

rl.on('close', function(){
    console.log(recursiveCombat(players[0], players[1]));
});

function processEntry(text){
    if(text.length == 0){
        players.push(deck);
        deck = [];
        return;
    }

    if(!text.includes(":")){
        deck.push(parseInt(text));
        return;
    }
}

function crabCombat(){
    let player1 = players[0];
    let player2 = players[1];

    while(player1.length > 0 && player2.length > 0){
        let play1 = player1.shift();
        let play2 = player2.shift();

        if(play1 > play2){
            player1.push(Math.max(play1, play2));
            player1.push(Math.min(play1, play2));
        }
        else{
            player2.push(Math.max(play1, play2));
            player2.push(Math.min(play1, play2));
        }
    }

    let winner = player1.length > 0 ? player1 : player2;
    let score = 0;
    for(let i = 0; i < winner.length; i++){
        score = score + winner[i]*(winner.length-i);
    }
    return score;
}

function recursiveCombat(player1, player2){
    let rounds = new Set();
    let winner = false;

    while(player1.length > 0 && player2.length > 0){
        let round = `${calculateScore(player1)},${calculateScore(player2)}`;
        if (rounds.has(round)){
            winner = true;
            break;
        }
        rounds.add(round);

        let play1 = player1.shift();
        let play2 = player2.shift();
        let round_winner = play1 > play2;

        if(player1.length >= play1 && player2.length >= play2){
            round_winner = recursiveCombat(player1.slice(0, play1), player2.slice(0, play2)).winner;
        }

        if(round_winner){
            player1.push(play1);
            player1.push(play2);
        }
        else{
            player2.push(play2);
            player2.push(play1);
        }
    }
    
    if(!winner){
        winner = player1.length > 0 ? true : false;
    }

    let winning_deck = winner ? player1 : player2;

    let score = calculateScore(winning_deck);


    return {
        winner: winner,
        score: score
    };
}

function calculateScore(winning_deck){
    let score = 0;
    for(let i = 0; i < winning_deck.length; i++){
        score = score + winning_deck[i]*(winning_deck.length-i);
    }
    return score;
}