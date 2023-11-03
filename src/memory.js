class MemoryGame {
  constructor(cards) {
    this.cards = cards;

    this.pickedCards = [];
    this.pairsClicked = 0;
    this.pairsGuessed = 0;

    this.endGameScreen = document.getElementById('game-over');
  }

  // every time you create a new game, the order of the cards should change
  shuffleCards() {
    // return undefined if argument is not passed
    if (this.cards !== undefined) {
      // fisher-yates shuffle function
      let i = this.cards.length;
      while (--i > 0) {
        let temp = Math.floor(Math.random() * (i + 1));
        [this.cards[temp], this.cards[i]] = [this.cards[i], this.cards[temp]];
      }
    } else {
      return undefined;
    }
  }

  checkIfPair(card1, card2) {
    // if the cards are the same also add 1 to pairsGuessed
    // return true or false depending on the result of comparing both cards
    if (card1 === card2) {
      this.pairsClicked += 1;
      this.pairsGuessed += 1;
      return true;
    } else if (card1 !== card2 && card2 !== undefined) {
      this.pairsClicked += 1;
      return false;
    }
  }

  checkIfFinished() {
    // game finishes when all pairs are guessed
    // 24 cards / 2 = 12 pairs
    if (this.pairsGuessed >= this.cards.length / 2) {
      return true;
    } else {
      return false;
    }
  }

  updateScore() {
    // link HTML to JS
    const clicked = document.getElementById('pairs-clicked');
    const guessed = document.getElementById('pairs-guessed');

    // update the data in HTML
    clicked.innerText = this.pairsClicked;
    guessed.innerText = this.pairsGuessed;
  }

  endGame() {
    console.log('Test');
    if (this.checkIfFinished()) {
      console.log('the end');
      this.endGameScreen.style.display = 'block';
    }
  }
}
