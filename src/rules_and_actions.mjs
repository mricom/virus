import * as gf from './generic_functions.mjs';

const main = document.querySelector('main');

const options = [
    
]



export function getPossibleActions(game){
    let options = [
        ['pass', 0], 
        ['discard', 1], 
    ]
    return options;
}

export function passTurn(game){
    game.nextTurn();
}

export function discardCards(game, player, cardValues){
    for(let card of cardValues){
        player.discardCard(card);
    }
    for(let i=player.handCards.length; i<3 ; i++){
        player.addHandCard(game.deck.deal());
    }
}