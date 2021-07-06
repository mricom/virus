// const families = {
//     'Organ': 'O',
//     'Virus': 'V',
//     'Medecine': 'M',
//     'Treatment': 'T'};
// const suitsNames = {
//     'Wildcard': 'W',
//     'Heart': 'H',
//     'Stomach': 'S',
//     'Brain': 'C',  //Cerebrum = 'C'
//     'Bone': 'B'}
// const tratment_names = {
//     'Spread virus': 'SV',
//     'Steal organ': 'SO',
//     'Exchange organ': 'EO',
//     'Discard Hand Cards': 'DH',
//     'Exchange Board Hand': 'EB',
// }

const families = [
  'O', //Organ
  'V', //Virus
  'M', //Medecine
  'T', //Treatment
];
const suitsNames = [
  'W', //Wildcard
  'H', //Heart
  'S', //Stomach
  'C', //Cerebrum(Brain)
  'B', //Bone
];
const treatmentNames = [
  'SV', //Spread Virus
  'SO', //Steal Organ
  'EO', //Exchange Organ
  'DH', //Discard Hands
  'EB', //Exchange Board Cards
];

export class Card {
  constructor(family, suit) {
    this.suit = suit;
    this.family = family;
    this.isImmunized = false;
  }

  get name() {
    return this.family.concat(this.suit);
  }
}

export class Player {
  constructor(player_name) {
    this.name = player_name;
    this.handCards = [];
    this.boardCards = {
      W: [],
      H: [],
      S: [],
      C: [],
      B: [],
    };
  }
}

export class Deck {
  constructor() {
    this.availableCards = [];
    this.usedCards = [];
    this.createNew();
    this.shuffle();
  }

  createNew() {
    this.availableCards = [];
    for (let family of families) {
      switch (family) {
        case 'T':
          for (let treatment of treatmentNames) {
            switch (treatment) {
              case 'SV':
                for (let i = 0; i < 2; i++) {
                  this.availableCards.push(new Card(family, treatment));
                }
                break;
              case 'SO':
                for (let i = 0; i < 3; i++) {
                  this.availableCards.push(new Card(family, treatment));
                }
                break;
              case 'EO':
                for (let i = 0; i < 3; i++) {
                  this.availableCards.push(new Card(family, treatment));
                }
                break;
              case 'DH':
                this.availableCards.push(new Card(family, treatment));
                break;
              case 'EB':
                this.availableCards.push(new Card(family, treatment));
                break;
            }
          }

          break;
        case 'O':
          for (let organ of suitsNames) {
            if (organ == 'W') {
              this.availableCards.push(new Card(family, organ));
            } else {
              for (let i = 0; i < 5; i++) {
                this.availableCards.push(new Card(family, organ));
              }
            }
          }
          break;
        case 'M':
          for (let organ of suitsNames) {
            for (let i = 0; i < 4; i++) {
              this.availableCards.push(new Card(family, organ));
            }
          }
          break;
        case 'V':
          for (let organ of suitsNames) {
            if (organ == 'W') {
              this.availableCards.push(new Card(family, organ));
            } else {
              for (let i = 0; i < 4; i++) {
                this.availableCards.push(new Card(family, organ));
              }
            }
          }
      }
    }
  }

  shuffle() {
    let availableCardsLength = this.availableCards.length;
    for (let i = 0; i < availableCardsLength; i++) {
      let j = Math.floor(Math.random() * availableCardsLength);
      let aux = this.availableCards[i];
      this.availableCards[i] = this.availableCards[j];
      this.availableCards[j] = aux;
    }
  }

  shuffleCardsLeft() {
    this.availableCards = this.availableCards.concat(this.usedCards);
    this.shuffle();
  }

  checkAvailableCards() {
    if (this.availableCards.length === 0) {
      this.shuffleCardsLeft();
    }
  }

  dealOneCard() {
    this.checkAvailableCards();
    const card = this.availableCards.pop();
    return card;
  }
}

export class Game {
  constructor(players) {
    this.players = players;
    this.deck = new Deck();
    this.playerTurn = 0;
    this.finished = false;
    this.winner = null;
  }

  initialDeal() {
    this.players.forEach((player, index) => this.getMissingCards(index));
  }

  getMissingCards(player) {
    for (let i = this.players[player].handCards.length; i < 3; i++) {
      this.players[player].handCards.push(this.deck.dealOneCard());
    }
  }

  nextTurn() {
    this.playerTurn = (this.playerTurn + 1) % this.players.length;
    return this;
  }

  discardHandCard(playerIndex, card) {
    let index = this.players[playerIndex].handCards.indexOf(card);
    if (index === -1) {
      return false;
    }
    this.deck.usedCards.push(this.players[playerIndex].handCards[index]);
    this.players[playerIndex].handCards.splice(index, 1);
    return true;
  }

  discardSelectedHandCards(playerIndex, cards) {
    for (let card of cards) {
      this.discardHandCard(playerIndex, card);
    }
    this.getMissingCards(player);
    return this;
  }

  discardAllHandCards(playerIndex) {
    this.deck.usedCards = this.deck.usedCards.concat(
      this.players[playerIndex].handCards
    );
    this.players[playerIndex].handCards = [];
  }

  discardAllOthersHandCards() {
    let currentPlayer = this.players[this.playerTurn];
    if (
      currentPlayer.handCards.filter((card) => card.suit === 'DH').length === 0
    ) {
      throw new Error([404, `You don't have this card.`]);
    }
    this.players.forEach((player,index) => {
      if(index!==this.playerTurn){this.discardAllHandCards(index)}
      });
  }

  discardBoardSuit(playerIndex, suit) {
    let player = this.players[playerIndex];
    this.deck.usedCards = this.deck.usedCards.concat(player.boardCards[suit]);
    player.boardCards[suit] = [];
  }

  discardBoardCard(playerIndex, suit, card){
    let player = this.players[playerIndex];
    let index = player.boardCards[suit].indexOf(card);
    this.deck.usedCards.push(player.boardCards[suit][index]);
    player.boardCards[suit].splice(index, 1);
  }

  // Elimina una carta de una mano sin añadirla a la baraja de cartas usadas. Se usa cuando tiras un órgano, virus o medicina
  removeHandCard(playerIndex, card){
    let player = this.players[playerIndex];
    let index = player.handCards.indexOf(card);
    player.handCards.splice(index, 1);
    this.getMissingCards(playerIndex);
  }

  exchangeBoardCards(targetPlayerIndex) {
    let currentPlayer = this.players[this.playerTurn];
    let targetPlayer = this.players[targetPlayerIndex];
    if (
      currentPlayer.handCards.filter((card) => card.suit === 'EB').length === 0
    ) {
      throw new Error([404, `You don't have this card.`]);
    } else if (currentPlayer === targetPlayer) {
      throw new Error([101, `You can't exchange hands with yourself.`]);
    } else {
      let aux = targetPlayer.boardCards;
      targetPlayer.boardCards = currentPlayer.boardCards;
      currentPlayer.boardCards = aux;
      this.discardSelectedHandCards(this.playerTurn, [
        currentPlayer.handCards.filter((card) => card.suit == 'EB')[0],
      ]);
    }
    return this;
  }

  exchangeOrgan(targetPlayerIndex, targetCardSuit, cardSuit) {
    let currentPlayer = this.players[this.playerTurn];
    let targetPlayer = this.players[targetPlayerIndex];
    if (
      currentPlayer.handCards.filter((card) => card.suit === 'EO').length === 0
    ) {
      throw new Error([404, `You don't have this card,`]);
    } else if (targetPlayer.boardCards[targetCardSuit].length === 0) {
      throw new Error([
        81,
        `The player ${targetPlayer.name} doesn't have this organ on its board.`,
      ]);
    } else if (currentPlayer.boardCards[cardSuit].length === 0) {
      throw new Error([82, `You don't have this organ on your board.`]);
    } else if (
      currentPlayer.boardCards[cardSuit].filter(
        (card) => card.family === 'O',
      )[0].isImmunized
    ) {
      throw new Error([85, `You can't exchange an immunized organ.`]);
    } else if (
      targetPlayer.boardCards[targetCardSuit].filter(
        (card) => card.family === 'O',
      )[0].isImmunized
    ) {
      throw new Error([
        86,
        `You can't exchange an organ for a player's immunized organ.`,
      ]);
    } else if (targetCardSuit !== cardSuit) {
      if (currentPlayer.boardCards[targetCardSuit].length !== 0) {
        throw new Error([87, `You already have the organ you are asking for.`]);
      } else if (targetPlayer.boardCards[cardSuit].length !== 0) {
        throw new Error([
          87,
          `The player ${targetPlayer.name} already has the organ you want to change.`,
        ]);
      }
    } else {
      let aux = targetPlayer.boardCards[targetCardSuit];
      this.discardBoardSuit(targetPlayerIndex, targetCardSuit);
      targetPlayer.boardCards[cardSuit] = currentPlayer.boardCards[cardSuit];
      this.discardBoardSuit(this.playerTurn, cardSuit);
      currentPlayer.boardCards[targetCardSuit] = aux;
      this.discardSelectedHandCards(this.playerTurn, [
        currentPlayer.handCards.filter((card) => card.suit == 'EO')[0],
      ]);
    }
    return this;
  }

  stealOrgan(targetPlayerIndex, targetCardSuit) {
    let currentPlayer = this.players[this.playerTurn];
    let targetPlayer = this.players[targetPlayerIndex];
    if (
      currentPlayer.handCards.filter((card) => card.suit === 'SO').length === 0
    ) {
      throw new Error([404, `You don't have this card,`]);
    } else if (targetPlayer.boardCards[targetCardSuit].length === 0) {
      throw new Error([
        111,
        `The player ${targetPlayer.name} doesn't have this organ on its board.`,
      ]);
    } else if (
      targetPlayer.boardCards[targetCardSuit].filter(
        (card) => card.family === 'O',
      )[0].isImmunized
    ) {
      throw new Error([112, `You can't steal a player's immunized organ.`]);
    } else if (currentPlayer.boardCards[targetCardSuit].length !== 0) {
      throw new Error([113, `You already have the organ you want to steal.`]);
    }
    let organsCounter = 0;
    for (let suit in currentPlayer.boardCards) {
      if (currentPlayer.boardCards[suit].length !== 0) {
        organsCounter++;
      }
    }
    if (organsCounter === 4) {
      throw new Error([113, `You already have 4 organs in your board.`]);
    }
    currentPlayer.boardCards[targetCardSuit] =
      targetPlayer.boardCards[targetCardSuit];
    targetPlayer.boardCards[targetCardSuit] = [];
    this.discardSelectedHandCards(this.playerTurn, [
      currentPlayer.handCards.filter((card) => card.suit == 'SO')[0],
    ]);
  }

  // spreadVirus(targetPlayers, targetCardSuit) {
  //   let currentPlayer = this.players[this.playerTurn];
  //   if (
  //     currentPlayer.handCards.filter((card) => card.suit === 'SO').length === 0
  //   ) {
  //     throw new Error([404, "You don't have this card."]);
  //   }
  // }

  infectOrgan(targetPlayerIndex, targetCardSuit, cardSuit) {
    let currentPlayer = this.players[this.playerTurn];
    let cards = currentPlayer.handCards.filter((card) => card.family === 'V' && card.suit == cardSuit);
    let targetPlayer = this.players[targetPlayerIndex];
    if (cards.length === 0) {
      throw new Error([404, `You don't have this card,`]);
    } else if (targetPlayer.boardCards[targetCardSuit].length === 0) {
      throw new Error([
        31,
        `The player ${targetPlayer.name} doesn't have this organ on its board.`,
      ]);
    } else if (cardSuit !== 'W' && cardSuit !== targetCardSuit) {
      throw new Error([32, `Only matching virus can infect this organ.`]);
    } else if (
      targetPlayer.boardCards[targetCardSuit].filter(
        (card) => card.family === 'O',
      )[0].isImmunized
    ) {
      throw new Error([33, `You can't infect a player's immunized organ.`]);
    }
    switch (targetPlayer.boardCards[targetCardSuit].length) {
      case 1:
        targetPlayer.boardCards[targetCardSuit].push(cards[0]);
        this.removeHandCard(this.playerTurn, cards[0]);
        break;
      case 2:
        if(targetPlayer.boardCards[targetCardSuit].filter((card) => card.family == "V").length !== 0){
          this.discardBoardSuit(targetPlayerIndex, targetCardSuit);
          this.discardHandCard(this.playerTurn, cards[0]);
        } else {
          let medecine_cards = targetPlayer.boardCards[targetCardSuit].filter((card) => card.family === 'M');
          this.discardBoardCard(targetPlayerIndex, targetCardSuit, medecine_cards[0]);
          this.discardHandCard(this.playerTurn, cards[0]);
        }
        this.getMissingCards(this.playerTurn);
        break;
    }
  }

  cureOrgan(targetPlayerIndex, targetCardSuit, cardSuit) {
    let currentPlayer = this.players[this.playerTurn];
    let cards = currentPlayer.handCards.filter((card) => card.family === 'M' && card.suit == cardSuit);
    let targetPlayer = this.players[targetPlayerIndex];
    if (cards.length === 0) {
      throw new Error([404, `You don't have this card,`]);
    } else if (targetPlayer.boardCards[targetCardSuit].length === 0) {
      throw new Error([
        31,
        `The player ${targetPlayer.name} doesn't have this organ on its board.`,
      ]);
    } else if (cardSuit !== 'W' && cardSuit !== targetCardSuit) {
      throw new Error([32, `Only matching medecines can cure this organ.`]);
    } else if (
      targetPlayer.boardCards[targetCardSuit].filter(
        (card) => card.family === 'O',
      )[0].isImmunized
    ) {
      throw new Error([33, `You can't cure a player's immunized organ.`]);
    }
    switch (targetPlayer.boardCards[targetCardSuit].length) {
      case 1:
        targetPlayer.boardCards[targetCardSuit].push(cards[0]);
        this.removeHandCard(this.playerTurn, cards[0]);
        break;
      case 2:
        if(targetPlayer.boardCards[targetCardSuit].filter((card) => card.family == "M").length !== 0){
          this.immunizeOrgan(targetPlayerIndex, targetCardSuit);
          this.addCardToBoardSuit(targetPlayerIndex, targetCardSuit, cards[0]);
          this.removeHandCard(this.playerTurn, cards[0]);
        } else {
          let virus_cards = targetPlayer.boardCards[targetCardSuit].filter((card) => card.family === 'V');
          this.discardBoardCard(targetPlayerIndex, targetCardSuit, virus_cards[0]);
          this.discardHandCard(this.playerTurn, cards[0]);
          this.getMissingCards(this.playerTurn);

        }
        break;
    }
  }

  immunizeOrgan(playerIndex, suit){
    let card  = this.players[playerIndex].boardCards[suit].filter((card) => card.family === 'O');
    let index = this.players[playerIndex].boardCards[suit].indexOf(card[0]);
    this.players[playerIndex].boardCards[suit][index].isImmunized = true;
  }

  addCardToBoardSuit(playerIndex, suit, card){
    this.players[playerIndex].boardCards[suit].push(card);
  }
}
