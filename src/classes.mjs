// This are the definitions of the different families, suits and treatments
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
// const treatment_names = {
//     'Spread virus': 'SV',
//     'Steal organ': 'SO',
//     'Exchange organ': 'EO',
//     'Discard Hand Cards': 'DH',
//     'Exchange Board Hand': 'EB',
// }

const families = [
  "O", //Organ
  "V", //Virus
  "M", //Medecine
  "T", //Treatment
];

const suitsNames = [
  "W", //Wildcard
  "H", //Heart
  "S", //Stomach
  "C", //Cerebrum(Brain)
  "B", //Bone
];
const treatmentNames = [
  "SV", //Spread Virus
  "SO", //Steal Organ
  "EO", //Exchange Organ
  "DH", //Discard Hands
  "EB", //Exchange Board Cards
];

export class Card {
  constructor(family, suit) {
    /*
      Each card must have a suit and a family. 
      This.isImmunized is initially set to false and toggles when a player has 2 medecines of a suit on its board. 
    */
    this.suit = suit;
    this.family = family;
    this.isImmunized = false;
  }

  get name() {
    /* 
      Returns the full name of the card including the family and the suit.
    */
    return this.family.concat(this.suit);
  }
}

export class Player {
  constructor(player_name) {
    /* 
      In a Game, there can be between 2 and 4 players. 
      Each player has a set of cards on its hand and another set on the board. 
      The cards in this.boardCards are storen in an object that separates them into suits. 
    */
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
    /*
      Each deck has:
        - 1 set of available cards (this.availableCards) --> This set contains the cards to be dealed. 
        - 1 set of used cards (this.usedCards) --> This set contains the cards that have been already used.
      
      On the deck creation, cards are created too, pushed into this.availableCards and shuffled. 

      When this.availableCards is empty, the cards in this.usedCards are shuffled, removed from this.usedCards and pushed back into this.availableCards. 
    */
    this.availableCards = [];
    this.usedCards = [];
    this.createNew();
    this.shuffle();
  }

  //
  createNew() {
    /*
      This function creates the cards and pushes them into this.availableCards.
      There are 68 cards on each deck: 
        - TREATMENTS: 
          · 2 Spread Virus cards
          · 3 Steal Organ cards
          · 3 Exchange Organ cards
          · 1 Discard Hands card
          · 1 Exchange Board Cards card
        - ORGANS: 
          · 1 Wildcard
          · 5 Heart cards
          · 5 Lungs cards
          · 5 Liver cards
          · 5 Bone cards
        - MEDECINES: 
          · 4 Wildcard cards
          · 4 Heart cards
          · 4 Lungs cards
          · 4 Liver cards
          · 4 Bone cards
        - VIRUS
          · 1 Wildcard card
          · 4 Heart cards
          · 4 Lungs cards
          · 4 Liver cards
          · 4 Bone cards
    */
    this.availableCards = [];
    for (let family of families) {
      switch (family) {
        case "T":
          for (let treatment of treatmentNames) {
            switch (treatment) {
              case "SV": //Spread Virus
                for (let i = 0; i < 2; i++) {
                  this.availableCards.push(new Card(family, treatment));
                }
                break;
              case "SO": //Steal Organ
                for (let i = 0; i < 3; i++) {
                  this.availableCards.push(new Card(family, treatment));
                }
                break;
              case "EO": //Exchange Organ
                for (let i = 0; i < 3; i++) {
                  this.availableCards.push(new Card(family, treatment));
                }
                break;
              case "DH": //Discard Hands
                this.availableCards.push(new Card(family, treatment));
                break;
              case "EB": //Exchange Board Cards
                this.availableCards.push(new Card(family, treatment));
                break;
            }
          }

          break;
        case "O":
          for (let organ of suitsNames) {
            if (organ == "W") {
              this.availableCards.push(new Card(family, organ));
            } else {
              for (let i = 0; i < 5; i++) {
                this.availableCards.push(new Card(family, organ));
              }
            }
          }
          break;
        case "M":
          for (let organ of suitsNames) {
            for (let i = 0; i < 4; i++) {
              this.availableCards.push(new Card(family, organ));
            }
          }
          break;
        case "V":
          for (let organ of suitsNames) {
            if (organ == "W") {
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
    /*
      Shuffles the cards stored in this.availableCards.
    */
    let availableCardsLength = this.availableCards.length;
    for (let i = 0; i < availableCardsLength; i++) {
      let j = Math.floor(Math.random() * availableCardsLength);
      let aux = this.availableCards[i];
      this.availableCards[i] = this.availableCards[j];
      this.availableCards[j] = aux;
    }
  }

  checkAvailableCards() {
    /*
      Checks if there are cards left in this.availableCards.
      If not, reuses this.usedCards.
    */
    if (this.availableCards.length === 0) {
      () => {
        this.availableCards = this.availableCards.concat(this.usedCards);
        this.usedCards = [];
        this.shuffle();
      };
    }
  }

  dealOneCard() {
    /*
     */
    this.checkAvailableCards();
    const card = this.availableCards.pop();
    return card;
  }
}

export class Game {
  constructor(players) {
    /*
      A game has an array of players (this.players), a deck (this.deck), the index of the current player in this.players (this.playerTurn) and the index of the winner in this.players (this.winner)
    */
    this.players = players;
    this.deck = new Deck();
    this.playerTurn = 0;
    this.winner = null;
  }

  initialDeal() {
    /*
      Gives each player 3 cards when the game starts
    */
    this.players.forEach((player, index) => this.getMissingCards(index));
  }

  getMissingCards(player) {
    /*
      Gets the index of a player in this.players and gives him cards until he has 3
    */
    for (let i = this.players[player].handCards.length; i < 3; i++) {
      this.players[player].handCards.push(this.deck.dealOneCard());
    }
  }

  nextTurn() {
    /*
      Changes this.playerTurn to the current player index in this.players
    */
    this.playerTurn = (this.playerTurn + 1) % this.players.length;
  }

  discardHandCard(playerIndex, card) {
    /*
      Gets the index of a player in this.players and a card.
      If the card is in the player.handCards:  
        - Removes the card from player.handCards
        - Pushes it into this.deck.usedCards
        - returns true
      If not, returns false.
    */
    let index = this.players[playerIndex].handCards.indexOf(card);
    if (index === -1) {
      return false;
    }
    this.deck.usedCards.push(this.players[playerIndex].handCards[index]);
    this.players[playerIndex].handCards.splice(index, 1);
    return true;
  }

  discardSelectedHandCards(playerIndex, cards) {
    /*
      Gets an array of cards and the index of the player in this.players. 
      Calls the function discardHandCard for each card. 
    */
    cards.forEach(() => {
      this.discardHandCard(playerIndex, card);
    });
    this.getMissingCards(player);
    return this;
  }

  discardAllHandCards(playerIndex) {
    /*
      Gets the index of the player in this.players.
      Discards all cards in player.handCards.
    */
    this.deck.usedCards = this.deck.usedCards.concat(
      this.players[playerIndex].handCards
    );
    this.players[playerIndex].handCards = [];
  }

  discardAllOthersHandCards() {
    /*
      "Discard Hand Cards" card --> Discards all other players hand cards. 
      First of all, checks if the current player has this card. If not, throws an exception. 
      If not, removes all cards from each player.handCards (except the ones of the current player) and pushes them into this.deck.usedCards.
    */
    let currentPlayer = this.players[this.playerTurn];
    if (
      currentPlayer.handCards.filter((card) => card.suit === "DH").length === 0
    ) {
      throw new Error([404, `You don't have this card.`]);
    }
    this.players.forEach((player, index) => {
      if (index !== this.playerTurn) {
        this.discardAllHandCards(index);
      }
    });
  }

  discardBoardSuit(playerIndex, suit) {
    /*

    */
    let player = this.players[playerIndex];
    this.deck.usedCards = this.deck.usedCards.concat(player.boardCards[suit]);
    player.boardCards[suit] = [];
  }

  discardBoardCard(playerIndex, suit, card) {
    /*
      Gets the index of a player in this.players, a suit (string) and a card.
    */
    let player = this.players[playerIndex];
    let index = player.boardCards[suit].indexOf(card);
    if (index === -1) {
      throw new Error([]);
    }
    this.deck.usedCards.push(player.boardCards[suit][index]);
    player.boardCards[suit].splice(index, 1);
    return true;
  }

  removeHandCard(playerIndex, card) {
    /*
      Function that throws a cart from a hand without adding it to deck.usedCards.
      Used when you play specific cards: organs, medecines and virus. 
    */
    let player = this.players[playerIndex];
    let index = player.handCards.indexOf(card);
    player.handCards.splice(index, 1);
    this.getMissingCards(playerIndex);
  }

  exchangeBoardCards(targetPlayerIndex) {
    /*
      Function to exchange board cards between two different players (using "Exchange Board Cards")
      Restrictions:
        - The player must have the Exchange Board Cards card on his hand. 
        - A player can't exchange his board cards with himself
    */
    let currentPlayer = this.players[this.playerTurn];
    let targetPlayer = this.players[targetPlayerIndex];
    if (
      currentPlayer.handCards.filter((card) => card.suit === "EB").length === 0
    ) {
      throw new Error([404, `You don't have this card.`]);
    } else if (currentPlayer === targetPlayer) {
      throw new Error([101, `You can't exchange hands with yourself.`]);
    } else {
      let aux = targetPlayer.boardCards;
      targetPlayer.boardCards = currentPlayer.boardCards;
      currentPlayer.boardCards = aux;
      this.discardSelectedHandCards(this.playerTurn, [
        currentPlayer.handCards.filter((card) => card.suit == "EB")[0],
      ]);
    }
  }

  immunizeOrgan(playerIndex, suit) {
    /*
    Function that immunizes an organ. 
    Immunizing an organ makes it impossible to kill or steal unless the current player has an "Exchange Board Cards" card.
  */
    let card = this.players[playerIndex].boardCards[suit].filter(
      (card) => card.family === "O"
    );
    let index = this.players[playerIndex].boardCards[suit].indexOf(card[0]);
    this.players[playerIndex].boardCards[suit][index].isImmunized = true;
  }

  addCardToBoardSuit(playerIndex, suit, card) {
    /*
      Function that adds a card to a board suit. 
    */
    this.players[playerIndex].boardCards[suit].push(card);
  }

  exchangeOrgan(targetPlayerIndex, targetCardSuit, cardSuit) {
    /*
      Function to exchange an organ between two different players (using "Exchange Organ")
      Restrictions:
        - The player must have the Exchange Organs card on his hand. 
        - A player can't have 2 repeated organs, so you can't exchange an organ if this makes you (or the target player) have 2 of the same .
        - An unexisting organ can't be echanged. 
        - Immunized organs can't be exchanged.
    */
    let currentPlayer = this.players[this.playerTurn];
    let targetPlayer = this.players[targetPlayerIndex];
    if (
      currentPlayer.handCards.filter((card) => card.suit === "EO").length === 0
    ) {
      throw new Error([404, `You don't have this card,`]);
    } else if (targetPlayer.boardCards[targetCardSuit].length === 0) {
    /*
      Checks if the target player has the target organ on its boardCards. If not, an error is thrown. 
      The organ is the first card that a board suit can have. If the card is not empty, means that it has an organ of this suit.
    */
      throw new Error([
        81,
        `The player ${targetPlayer.name} doesn't have this organ on its board.`,
      ]);
    }
    else if (currentPlayer.boardCards[cardSuit].length === 0) {
      throw new Error([82, `You don't have this organ on your board.`]);
    }
    else if (
      currentPlayer.boardCards[cardSuit].filter(
        (card) => card.family === "O"
      )[0].isImmunized
    ) {
      throw new Error([85, `You can't exchange an immunized organ.`]);
    } else if (
      targetPlayer.boardCards[targetCardSuit].filter(
        (card) => card.family === "O"
      )[0].isImmunized
    ) {
      throw new Error([
        86,
        `You can't exchange an organ for a player's immunized organ.`,
      ]);
    } else if (targetCardSuit !== cardSuit) {
    /*
      Checks if the target organ's suit is different from the current player's one. 
      If it is, it checks if the organ being asked is already in the current player's board or if the organ being echanged is already in the other player board
      By doing so, it checks if any of them already have the other player's organ. 
    */
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
        currentPlayer.handCards.filter((card) => card.suit == "EO")[0],
      ]);
    }
  }

  stealOrgan(targetPlayerIndex, targetCardSuit) {
    /*
      Function to steal an organ from a player.
      Restrictions: 
        - The current player must have the Steal Organ card on his hand.
        - An immunized organ can't be stealed. 
        - The current player can steal an organ that he already possesses on his board. 
        - You can't steal an organ if you already have 4 different organs on your board (including wildcard organ).
    */
    let currentPlayer = this.players[this.playerTurn];
    let targetPlayer = this.players[targetPlayerIndex];
    if (
      currentPlayer.handCards.filter((card) => card.suit === "SO").length === 0
    ) {
      throw new Error([404, `You don't have this card,`]);
    } else if (targetPlayer.boardCards[targetCardSuit].length === 0) {
      throw new Error([
        111,
        `The player ${targetPlayer.name} doesn't have this organ on its board.`,
      ]);
    } else if (
      targetPlayer.boardCards[targetCardSuit].filter(
        (card) => card.family === "O"
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
      currentPlayer.handCards.filter((card) => card.suit == "SO")[0],
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
    /*
      Function that infects an organ when a virus card is used agains it. 
      Restrictions: 
        - The current player must have the virus of the organ suit he is trying to infect or a wildcard virus. 
        - The target player must have the organ that the current player is trying to infect. 
        - Immunized organs can't be infected. 
      If everything is ok, it removes the virus card from the current player hand and pushes it into the target suit on its board.
      If the target player has another virus infecting it, it dies.
    */
    let currentPlayer = this.players[this.playerTurn];
    let cards = currentPlayer.handCards.filter(
      (card) => card.family === "V" && card.suit == cardSuit
    );
    let targetPlayer = this.players[targetPlayerIndex];
    if (cards.length === 0) {
      throw new Error([404, `You don't have this card,`]);
    } else if (targetPlayer.boardCards[targetCardSuit].length === 0) {
      throw new Error([
        31,
        `The player ${targetPlayer.name} doesn't have this organ on its board.`,
      ]);
    } else if (cardSuit !== "W" && cardSuit !== targetCardSuit) {
      throw new Error([32, `Only matching virus can infect this organ.`]);
    } else if (
      targetPlayer.boardCards[targetCardSuit].filter(
        (card) => card.family === "O"
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
        if (
          targetPlayer.boardCards[targetCardSuit].filter(
            (card) => card.family == "V"
          ).length !== 0
        ) {
          this.discardBoardSuit(targetPlayerIndex, targetCardSuit);
          this.discardHandCard(this.playerTurn, cards[0]);
        } else {
          let medecine_cards = targetPlayer.boardCards[targetCardSuit].filter(
            (card) => card.family === "M"
          );
          this.discardBoardCard(
            targetPlayerIndex,
            targetCardSuit,
            medecine_cards[0]
          );
          this.discardHandCard(this.playerTurn, cards[0]);
        }
        this.getMissingCards(this.playerTurn);
        break;
    }
  }

  cureOrgan(targetPlayerIndex, targetCardSuit, cardSuit) {
    /*
      Function that cures an organ (adds a medecine that is used to kill a virus or stored aiming to immunize the organ).
      Restrictions:
        - The current player must have the medecine of the organ suit he is trying to cure or a wildcard medecine. 
        - The target player must have the organ that the current player is trying to cure (normally the target player is the current player, but who knows, maybe the players can be playing in pairs or groups).
        - An immunized organ can't be cured. 
        If everithing is fine, removes the medecine card from the current user hands.
        Then:
          - If there is a virus infecting the organ of the tardetCardSuit, it dies and the medecine is used. 
          - If there is no virus/medecine on this board suit, the medecine card is stored. 
          - If there is another medecine on the board siut, the organ gets immunized and the medecine stored. 
    */
    let currentPlayer = this.players[this.playerTurn];
    let cards = currentPlayer.handCards.filter(
      (card) => card.family === "M" && card.suit == cardSuit
    );
    let targetPlayer = this.players[targetPlayerIndex];
    if (cards.length === 0) {
      throw new Error([404, `You don't have this card,`]);
    } else if (targetPlayer.boardCards[targetCardSuit].length === 0) {
      throw new Error([
        31,
        `The player ${targetPlayer.name} doesn't have this organ on its board.`,
      ]);
    } else if (cardSuit !== "W" && cardSuit !== targetCardSuit) {
      throw new Error([32, `Only matching medecines can cure this organ.`]);
    } else if (
      targetPlayer.boardCards[targetCardSuit].filter(
        (card) => card.family === "O"
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
        if (
          targetPlayer.boardCards[targetCardSuit].filter(
            (card) => card.family == "M"
          ).length !== 0
        ) {
          this.immunizeOrgan(targetPlayerIndex, targetCardSuit);
          this.players[targetPlayerIndex].boardCards[targetCardSuit].push(
            cards[0]
          );
          this.removeHandCard(this.playerTurn, cards[0]);
        } else {
          let virus_cards = targetPlayer.boardCards[targetCardSuit].filter(
            (card) => card.family === "V"
          );
          this.discardBoardCard(
            targetPlayerIndex,
            targetCardSuit,
            virus_cards[0]
          );
          this.discardHandCard(this.playerTurn, cards[0]);
          this.getMissingCards(this.playerTurn);
        }
        break;
    }
  }
}
