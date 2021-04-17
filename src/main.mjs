// import * as classes from './classes.mjs';
// // import * as readline from 'readline';
// import { Hand } from './classes.mjs';

import { configureGame } from "./configure_game.mjs";



// // const rl = readline.createInterface({
// //     input: process.stdin,
// //     output: process.stdout
// // });

// // function question(question_content) {
// //     return new Promise(resolve => rl.question(question_content, answer => resolve(answer)))
// // }

// async function getPlayers(){
//     var players_number = await question("How many players in this game? Insert a number between 2 and 6: \n");
//     while (isNaN(players_number) || players_number<1 || players_number>5){
//         var players_number = await question("The input must be a number between 1 and 4: \n");
//     }
//     for(var i=0; i<players_number; i++){
//         const player_name = await question(`Player ${i} name: `);
//         const player = new classes.Player(player_name);
//         players[i] = player;
//     }
//     rl.close();
// }

// function setGame(){
//     var players = getPlayers();
//     const deck = new classes.Deck();
//     game = new Game(players, deck);
//     return game
// }

// const game = setGame();
