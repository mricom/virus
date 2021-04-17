import * as gf from './generic_functions.mjs';
import * as classes from './classes.mjs';
import {configureGame} from './play.mjs';

export function startGame(){
    const button = gf.makeButton(['Start Game!']);
    const main = gf.emptyMain();
    main.append(button);
    button.addEventListener('click', function(){
        //Funcion que pide al usuario que introduzca los jugadores y los crea
        getPlayers();
    });
}

function getPlayers(){
    let form = gf.makeElem('form', '');
    form.append(gf.makeInputLabelled('How many players in this game?', 'Insert a number between 2 and 6.', [['id', 'players_number_field'], ['type', 'text'], ['autofocus', 'autofocus']]));
    form.append(gf.makeButton('Submit', [['type', 'submit']]))
    const main = gf.emptyMain();
    main.append(form);
    form.addEventListener('submit', function(e){
        e.preventDefault();
        let playersNumber = this.querySelector('#players_number_field').value;
        if (isNaN(playersNumber) || playersNumber<2 || playersNumber>6){
            alert('The input must be a number between 1 and 4.');
        } else {
            getPlayerNames(playersNumber);
        }
    })
}

function getPlayerNames(playersNumber){;
    const main = gf.emptyMain();
    let form = generatePlayersNamesForm(playersNumber);
    main.append(form);
    form.addEventListener('submit', function(e){
        e.preventDefault();
        let names = new Set();
        let empty_error = false;
        let repeated_name_error = false;
        for(let i=0; i<playersNumber; i++){
            let name = this.querySelector(`#player_name_${i+1}`).value.trim();
            if(name === ''){
                empty_error = true; 
                break;
            } else if (names.has(name)){
                repeated_name_error = true;
                break; 
            } else {
                names.add(name);
            }
        }

        if (empty_error){
            alert('All players must have a name.')
        } else if (repeated_name_error){
            alert('All players names must be different names.')
        } else {
            for(let i=0; i<playersNumber; i++){
                window.game.players[i] = new classes.Player(Array.from(names)[i]);
            }
            configureGame();
        }
    });
}

function generatePlayersNamesForm(playersNumber){
    let form = gf.makeElem('form', '');
    for(let i=1; i<=playersNumber; i++){
        let input_attributes = [
            ['id', `player_name_${i}`], 
            ['type', 'text']
        ]
        form.append(gf.makeInputLabelled(`Player ${i} Name`, '', input_attributes));   
    }
    form.append(gf.makeButton('Submit', [['type', 'submit']]))
    return form;
}
