import * as cl from './classes.mjs';
// import * as gf from './generic_functions.mjs';

// const main = document.querySelector('main');

// const possibleActions = [
//     ['Pass turn', 1], 
//     ['Discard cards', 2], 
//     ['Infect organ', 3], 
//     ['Kill organ', 4],
//     ['Heal organ', 5], 
//     ['Immunize organ', 6], 
//     ['Spread virus', 7], 
//     ['Exchange organ', 8], 
//     ['Discard Hand Cards', 9], 
//     ['Exchange Board Cards', 10],
//     ['Steal Organ, 11],
// ]

// const possibleActionsDict = {
//     '0': {
//         'action_name': 'Pass',
//         'id': 0,
//     },   
//     '1': {
//         'action_name': "Discard cards", 
//         'id': 1,
//     },  
//     '2': {
//         'action_name': "Add card to Board", 
//         'targets': [],
//         'id': 2,
//     }
// }




// export function discardHandCards(game, currentPlayerDiscards){
//     let response = {
//         'error': false, 
//     }
//     let currentPlayer = game.players[game.playerTurn];
//     for(let i=0; i<game.players.length; i++){
//         let player = game.players[i];
//         if (player !== currentPlayer || (player === currentPlayer && currentPlayerDiscards)){
//             for (let i=j; i<player.handCards.length; i++){
//                 player.discardHandCard(game, card);
//             }
//         } 
//     }
//     return response;
// }

// export function exchangeOrgan(game, targetPlayer, card, suit, targetCard){
//     let currentPlayer = game.players[game.playerTurn];
//     if (!targetPlayer.boardCards[targetCard.suit].include(targetCard)){
//         response = {
//             'error': true, 
//             'errorCode': 81,
//             'errorMsg': `The player ${targetPlayer.name} doesn't have this card on its board.`
//         };
//         return response;
//     } else if (!currentPlayer.boardCards[card.suit].include(card)){
//         response = {
//             'error': true, 
//             'errorCode': 82,
//             'errorMsg': `You don't have this card on your board.`
//         };
//     } else if (card.family !== 'O'){
//         response = {
//             'error': true,
//             'errorCode': 83,
//             'errorMsg': `The card you want to exchange is not an organ.`,
//         }
//     } else if (targetCard.family !== 0){
//         response = {
//             'error': true, 
//             'errorCode': 84, 
//             'errorMsg': `The player's card you are trying to exchange is not an organ.`
//         }
//     } else if (card.isImmunized){
//         response = {
//             'error': true, 
//             'errorCode': 85, 
//             'errorMsg': `You can't exchange an immunized organ.`
//         }
//     } else if (targetCard.isImmunized){
//         response = {
//             'error': true, 
//             'errorCode': 86, 
//             'errorMsg': `You can't exchange an organ for a player's immunized organ.`
//         }
//     } else if (targetCard.suit !== card.suit){
//         if (card.suit !== 'W' && targetCard.boardCards[card.suit].length !== 0){
//             response = {
//                 'error': true, 
//                 'errorCode': 87, 
//                 'errorMsg': `The player already `
//             }
//         }
        
            
//     } 
        
//     } else {
//         aux = targetPlayer.boardCards[targetCard.suit]; 
//         targetPlayer.boardCards[targetCard.suit] = currentPlayer.boardCards[card.suit]
//     }
// }

// export function addCardToBoard(game, card, suit, player){
//     let response = {};
//     switch (card.family){
//     case 'O': 
//         response = addOrganToBoard(card, player);
//         break; 
//     case 'V': 
//         actions = addVirusToBoard(game, player, suit, card);
//         break; 
//     case 'M':
//         break; 
//     case 'T': 
//         break;
//     }
//     return response;
// }

// export function addOrganToBoard(card, player){
//     let organCards = []; 
//     let response = {
//         'error': false, 
//     };
//     for(let cardValue in player.boardCards){
//         organCards.push(currentPlayer.boardCards[cardValue].filter(card => card.family === 'O'));
//     };
//     if(organCards.include(card)){
//         response = {
//             'error': true, 
//             'error_msg': "This organ is already in this player's board."
//         }
//     } else if (organCards.length === 4){
//         response = {
//             'error': true, 
//             'error_msg': "There is already 4 organs in this player's board."
//         }
//     } else {
//         player.addCardToBoard(card);
//     }
//     return response; 
// }

// export function addVirusToBoard(game, player, suit, card){
//     let organCards = []; 
//     let response = {
//         'error': false, 
//     };
//     if(card.suit === 'W'){
        
//     } else {
//         let boardCardsSuit = player.boardCards[card.value]; 
//         switch (boardCardsSuit){
//         case 0: 
//             response = {
//                 'error': true, 
//                 'error_msg': `There must be an organ of this type to infect it.`,
//             }
//             break; 
//         case 1: 
//             player.addCardToBoard(card);
//             break;
//         case 2: 
//             if(boardCardsSuit.filter(card => card.value === 'V').length > 0){
//                 killOrgan(game, player, card);
//             } else {

//             }
//         }

//         if(boardCardsSuit.length === 0){
//             response = {
//                 'error': true, 
//                 'error_msg': `There must be an organ of this type to infect it.`;
//             }
//         } else if(boardCardsSuit.length === 1){
//             board
//         }
//     }
// }

// export function killOrgan(game, player, card){
//     for(let c of player.boardCards[card.suit]){
//         game.deck.usedCards.push(player.boardCards[card.suit][i].pop()); 
//     }
//     game.deck.usedCards.push(game.players[playerTurn].handCards.pop(card))
    
// }

// export function getPlayerPossibleActions(game){
//     let playerActions = [
//         possibleActionsDict['0'], 
//         possibleActionsDict['1'],
//     ]
//     let currentPlayer = game.players[game.playerTurn];
//     for(let i=0; i<3; i++){
//         playerActions[i+2] = getCardPossibleActions(game, currentPlayer, currentPlayer.handCards[i])
//     }
//     console.log('player', playerActions);
//     return playerActions;
// }


// export function getCardPossibleActions(game, currentPlayer, card){
//     let actions;
//     switch (card.family){
//     case 'O': 
//         actions = getOrganPossibleActions(currentPlayer, card);
//         break; 
//     case 'V': 
//         actions = getVirusPossibleActions(game, currentPlayer, card);
//         break; 
//     case 'M':
//         break; 
//     case 'T': 
//         break;
//     }
//     return actions;
// }

// export function getOrganPossibleActions(currentPlayer, card){
//     let action;
//     // Verificamos que no haya un organo igual en la mesa y que no haya más de 4 órganos, por si hay un comodín o la carta que tenemos es un comodín en sí. 

//     let organ_cards = []; 
//     for(let cardValue in playerBoardCards){
//         organ_cards.push(currentPlayer.boardCards[cardValue].filter(card => card.family === 'O'));
//     }    
//     if(!currentPlayer.boardCards.includes(card) && organ_cards.length<4){
//         action = possibleActionsDict['2'];
//         action['targets'].push(currentPlayer);
//     }
//     if (action){
//         console.log('adios');
//     }
//     return action;
// }

// export function getVirusPossibleActions(game, currentPlayer, card){
//     let action;
//     for(let i=0; i<game.players.length && game.players[i]!==currentPlayer; i++){
//         let playerBoardCards = game.players[i].boardCards;
//         for(let cardValue in playerBoardCards){
//             if(playerBoardCards[cardValue].filter(c => c.name === `O${card.suit}` && !c.isSafe).length !== 0){
//                 if(!action){
//                     action = possibleActionsDict['2'];
//                 }
//                 action['targets'].push(player);
//             }
//         }   
        
//     }
//     return action;
// }

export function passTurn(game){
    game.nextTurn();
}

export function discardCards(game, player, cardValues){
    for(let card of cardValues){
        player.discardCard(card);
    }
    for(let i=player.handCards.length; i<3 ; i++){
        player.addCardToHand(game.deck.dealOneCard());
    }
}

