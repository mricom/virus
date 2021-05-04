import * as cl from './classes.mjs';
import { Card } from './classes.mjs';

const player1 = new cl.Player('Maria');
const player2 = new cl.Player('Alex');
const player3 = new cl.Player('Josep Lluis');
let game = new cl.Game([player1, player2, player3]);

console.log(
  `Se han creado los usuarios ${game.players[0].name}, ${game.players[1].name} y ${game.players[2].name}.`,
);

game.initialDeal();
console.log('Se han repartido las cartas.');

function printTurn() {
  let message = `Es el turno de ${game.players[game.playerTurn].name}.`;
  for (let player of game.players) {
    message += `\nCartas en la mano de ${player.name}: `;
    for (let i = 0; i < player.handCards.length; i++) {
      message += `${player.handCards[i].name}`;
      if (i < player.handCards.length - 1) {
        message += `,`;
      }
    }
    message += `\nCartas en la mesa de ${player.name}:`;
    for (let suit in player.boardCards) {
      switch (suit) {
        case 'H':
          message += '\nCorazón: ';
          break;
        case 'W':
          message += '\nComodín: ';
          break;
        case 'B':
          message += '\nHueso: ';
          break;
        case 'C':
          message += '\nCerebro: ';
          break;
        case 'S':
          message += '\nEstómago: ';
          break;
      }
      let cards = player.boardCards[suit];
      for (let i = 0; i < cards.length; i++) {
        message += `${cards[i].name}`;
        if (i < cards.length - 1) {
          message += `,`;
        }
      }
    }
  }
  console.log('\n' + message);
}

let card = new Card('T', 'DH');
let card2 = new Card('O', 'H');
let card3 = new Card('V', 'H');
let card4 = new Card('V', 'S');

let card5 = new Card('O', 'C');

// card2.isImmunized = true;
let card6 = new Card('O', 'S');

game.players[game.playerTurn].handCards[0] = card;
// game.players[(game.playerTurn+1)%2].boardCards['H'].push(card2);

// printTurn();
// game.players[game.playerTurn].boardCards['H'].push(card3);
// game.players[game.playerTurn].boardCards['H'].push(card4);
// game.players[game.playerTurn].boardCards['C'].push(card5);
// game.players[game.playerTurn].boardCards['S'].push(card6);

printTurn();

// try{
//     game.infectOrgan((game.playerTurn+1)%2, 'H', 'H');
// } catch (e){
//     console.log(e);
// }

// printTurn();
// game.nextTurn();


