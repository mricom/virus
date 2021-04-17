// const families = {
//     'Organ': 'O', 
//     'Virus': 'V', 
//     'Medecine': 'M',
//     'Treatment': 'T'};
// const organNames = {
//     'Wildcard': 'W', 
//     'Heart': 'H', 
//     'Stomach': 'S', 
//     'Brain': 'C',  //Cerebrum = 'C'
//     'Bone': 'B'}
// const tratment_names = {
//     'Spread virus': 'SV', 
//     'Steal organ': 'SO', 
//     'Exchange organ': 'EO',
//     'Discard hand': 'DH',
//     'Exchange hand': 'EH',
// }

const families = [
    'O',    //Organ
    'V',    //Virus
    'M',    //Medecine
    'T'
];   //Treatment
const organNames = [
    'W',    //Wildcard 
    'H',    //Heart 
    'S',    //Stomach 
    'C',    //Cerebrum(Brain)
    'B'
];   //Bone
const trreatmentNames = [
    'SV',   //Spread Virus 
    'SO',   //Steal Organ 
    'EO',   //Exchange Organ
    'DH',   //Discard Hand
    'EH',   //Exchange Hand
];


export class Card {
    constructor(family, value) {
        this.value=value; 
        this.family=family;
        this.is_visible = false;
    }

    flip(){ this.is_visible == 'True'}
    get name(){ return this.family.concat(this.value);}
}


export class Player {
    constructor(player_name){
        this.name = player_name;
        this.handCards = [];
        this.boardCards = [];
    }

    discardCard(card){
        for(let i=0; i<this.handCards.length; i++){
            if(this.handCards[i].name === card){
                this.handCards.splice(i, 1);
            }
        }
    }

    addHandCard(card){
        this.handCards.push(card);
    }
}

export class Deck{
    constructor(){ 
        this.availableCards = [];
        this.usedCards = [];
        this.createNew();
        this.shuffle();
    }

    createNew(){
        this.availableCards = [];
        for (var family of families){
            switch(family){
            case 'T':
                for(var treatment of trreatmentNames){
                    switch (treatment){
                    case 'SV':
                        for(var i=0; i<2; i++){
                            this.availableCards.push(new Card(family, treatment));
                        }
                        break; 
                    case 'SO': 
                        for(var i=0; i<3; i++){
                            this.availableCards.push(new Card(family, treatment));
                        }
                        break;
                    case 'EO':
                        for(var i=0; i<3; i++){
                            this.availableCards.push(new Card(family, treatment));
                        } 
                        break;
                    case 'DH':
                        this.availableCards.push(new Card(family, treatment));
                        break; 
                    case 'EH': 
                        this.availableCards.push(new Card(family, treatment));
                        break; 
                    }
                }
                
                break;
            case 'O':
                for(var organ of organNames){
                    if(organ == 'W'){
                        this.availableCards.push(new Card(family, organ));
                    } else {
                        for(var i = 0; i<5; i++){
                            this.availableCards.push(new Card(family, organ));
                        }
                    }
                }
                break; 
            case 'M': 
                for(var organ of organNames){
                    for(var i = 0; i<4; i++){
                        this.availableCards.push(new Card(family, organ));
                    }
                }
                break; 
            case 'V': 
                for(var organ of organNames){
                    if(organ == 'W'){
                        this.availableCards.push(new Card(family, organ));
                    } else {
                        for(var i = 0; i<4; i++){
                            this.availableCards.push(new Card(family, organ));
                        }
                    }
                }
            }
        }
    }

    shuffle(){
        var availableCardsLength = this.availableCards.length;
        for (var i=0; i<availableCardsLength; i++){
            var j = Math.floor(Math.random() * availableCardsLength);
            var aux = this.availableCards[i];
            this.availableCards[i] = this.availableCards[j];
            this.availableCards[j] = aux;
        }
    }

    shuffleCardsLeft(){
        this.availableCards = this.availableCards.concat(this.usedCards);
        this.shuffle();
    }

    initialDeal(players){
        for(var j=0; j<3; j++){
            for(var i=0; i<players.length; i++){
                players[i].handCards[j] = this.deal();
            }
        }
    }

    deal(){
        return this.availableCards.pop();
    }
}

export class Game {
    constructor (init_player){
        this.players = [];
        this.deck = new Deck();
        this.playerTurn = 0;
        this.finished = false;
    }
    
    nextTurn(){this.playerTurn = (this.playerTurn+1)%this.players.length; return this.playerTurn;}
}