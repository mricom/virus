import * as gf from './generic_functions.mjs';
import * as raf from './rules_and_actions.mjs'

const main = document.querySelector('main');

export function configureGame(){
    let game = window.game;
    const main = gf.emptyMain();
    game.deck.initialDeal(game.players);
    turn(game);
}


export function turn(game){
    gf.emptyMain();
    main.append(gf.makeElemWithText('p', `It's ${game.players[game.playerTurn].name}'s turn!`, [['id', 'turn_message']]));
    main.append(gf.generateUserCardsMessages(game));
    main.append(gf.generatePossibleActionsButtons(game));
}

export function passTurn(game){
    raf.passTurn(game);
    turn(game);
}

export function discardCards(){
    const player = game.players[game.playerTurn];
    const form = gf.makeElem('form');
    const label = gf.makeSelectLabelled('Select the cards to discard:', '', [['name', 'discard-cards-select'], ['multiple', 'multiple']]);
    const select = label.querySelector('select');
    form.append(label);
    for(let i=0; i<player.handCards.length; i++){
        const option = gf.makeSelectOption(player.handCards[i].name, [['value', i]]);
        select.append(option);
    }
    form.append(gf.makeButton('Discard selected', [['type', 'submit']]))
    main.append(form);
    form.addEventListener('submit', function(e){
        e.preventDefault();
        const selectedOptions = gf.getSelectedOptions(select);
        raf.discardCards(game, player, selectedOptions);
        let handCardsP = main.querySelector('#hand_cards_p');
        handCardsP.textContent = gf.generateHandCardsMessage(game);
        main.querySelector('form').remove();
        main.querySelector('#turn_message').textContent = `Your turn has finished, ${game.players[game.playerTurn].name}! Please, click the button below to pass the turn to the next player.`;
        gf.generateNextTurnButton(main.querySelector('#action_buttons_div'));
        
    })
}