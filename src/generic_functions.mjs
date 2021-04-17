import * as raf from './rules_and_actions.mjs';
import * as play from './play.mjs';

export const makeElem = function(type){
    const elem = document.createElement(type);
    return elem;
};

export const makeButton = function(text="", attributes=[]){
    const button = makeElem('button');
    if (attributes.length != 0){
        addAttributes(button, attributes);
    };
    button.append(document.createTextNode(text));
    return button;
};

export function addAttributes(parent, attributes){
    for(let attribute of attributes){
        parent.setAttribute(attribute[0], attribute[1]);
    };
};

export const makeElemWithText = function (type, text, attributes=[]) {
    const elem = makeElem(type);
    elem.append(document.createTextNode(text));
    addAttributes(elem, attributes);
    return elem;
};


export const makeInputLabelled = function(label_text='', help_text='', input_attributes=[]){
    const label = makeElemWithText('label', label_text);
    const input = makeElem('input');
    addAttributes(input, input_attributes);
    label.append(input);
    if (help_text != ''){
        label.append(makeElemWithText('small', help_text));
    }
    return label;
};

export const makeSelectLabelled = function(label_text='', help_text='', input_attributes=[]){
    const label = makeElemWithText('label', label_text);
    const select = makeElem('select');
    addAttributes(select, input_attributes);
    label.append(select);
    if (help_text != ''){
        label.append(makeElemWithText('small', help_text));
    }
    return label;
};

export const makeSelectOption = function(text, attributes){
    const option = makeElemWithText('option', text);
    addAttributes(option, attributes);
    return option;
}

export const emptyMain = () => {
    const main = document.querySelector('main');
    main.textContent = '';
    return main;
}

export const emptyElem = query => {
    const elem = document.querySelector(query);
    elem.textContent = "";
}

export function generateTable(game){
    const main = document.querySelector('main');
    printTable(main, game);
}

// function printCard(card){
//     const card_div = makeElemWithText('div', `${card.full_name}`);
//     addAttributes(makeElem, [['class', 'card']]);
//     return card;
// }

function printMainUserBoard(upperTableDiv){
    let playerBoard = makeElem('div', '');
    playerBoard.classList.add('main-user-board');
    return playerBoard;
}

function printOtherUserBoard(upperTableDiv){
    let playerBoard = makeElem('div', '');
    playerBoard.classList.add('other-user-board');
    return playerBoard;
}

function printTable(main, game){
    const tableDiv = makeElem('article', '');
    tableDiv.classList.add('game-table')
    main.append(tableDiv);
    const upperTableDiv = makeElem('section', '');
    upperTableDiv.classList.add('upper-table');
    const lowerTableDiv = makeElem('section', '');
    lowerTableDiv.classList.add('lower-table');
    tableDiv.append(upperTableDiv); 
    tableDiv.append(lowerTableDiv);
    for(let player of game.players){
        if (player.name === game.playerTurn.name){
            const userBoard = printMainUserBoard(main);
            lowerTableDiv.append(userBoard);
        } else {
            const userBoard = printOtherUserBoard(main);
            upperTableDiv.append(userBoard);
        }
    }
}

export function getSelectedOptions(select){
    const options = select.querySelectorAll('option');
    let selectedOptions = [];
    for(let option of options){ 
        if(option.selected){
            selectedOptions.push(option.textContent);
        }
    }
    return selectedOptions;
}

export function generateUserCardsMessages(game){
    const div = makeElem('div');
    div.append(generateHandCardsMessageDiv(game));
    div.append(generateBoardCardsMessageDiv(game));
    return div;
}

export function generateHandCardsMessageDiv(game){
    const div = makeElemWithText('p', generateHandCardsMessage(game));
    addAttributes(div, [['id', 'hand_cards_p']])
    return div;
}

export function generateHandCardsMessage(game){
    let handCardsMessage = 'The user has the following cards on the hand: \n'; 
    for(let card of game.players[game.playerTurn].handCards){
        handCardsMessage += `${card.name},`
    }
    return handCardsMessage;
}

export function generateBoardCardsMessageDiv(game){
    const div = makeElemWithText('p', generateBoardCardsMessage(game));
    addAttributes(div, [['id', 'hand_cards_p']])
    return div;
}

export function generateBoardCardsMessage(game){
    let cardsMessage = 'The user has the following cards on the board: \n'; 
    for(let card of game.players[game.playerTurn].boardCards){
        cardsMessage += `${card.name},`
    }
    return cardsMessage;
}

export function generatePossibleActionsButtons(game){
    const actions = raf.getPossibleActions();
    const buttonsDiv = makeElemWithText('div', '', [['id', 'action_buttons_div']]);
        for(let i=0; i<actions.length; i++){
        switch(actions[i][1]){
            case 0:
                buttonsDiv.append(generatePassButton());
                break;
            case 1:
                buttonsDiv.append(generateDiscardButton());
                break;
        }
    }
    return buttonsDiv;
}

export function generateNextTurnButton(buttonsDiv){
    buttonsDiv.textContent = '';
    buttonsDiv.append(generatePassButton());
}

function generatePassButton(){
    const button = makeButton('pass');
    button.addEventListener('click', function(e){
        play.passTurn(game);
    })
    return button;
}

function generateDiscardButton(){
    const button = makeButton('discard');
    button.addEventListener('click', function(e){
        play.discardCards();
    })
    return button;
}