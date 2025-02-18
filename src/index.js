const cards = [
  { name: 'aquaman', img: 'aquaman.jpg' },
  { name: 'batman', img: 'batman.jpg' },
  { name: 'captain america', img: 'captain-america.jpg' },
  { name: 'fantastic four', img: 'fantastic-four.jpg' },
  { name: 'flash', img: 'flash.jpg' },
  { name: 'green arrow', img: 'green-arrow.jpg' },
  { name: 'green lantern', img: 'green-lantern.jpg' },
  { name: 'ironman', img: 'ironman.jpg' },
  { name: 'spiderman', img: 'spiderman.jpg' },
  { name: 'superman', img: 'superman.jpg' },
  { name: 'the avengers', img: 'the-avengers.jpg' },
  { name: 'thor', img: 'thor.jpg' },
  { name: 'aquaman', img: 'aquaman.jpg' },
  { name: 'batman', img: 'batman.jpg' },
  { name: 'captain america', img: 'captain-america.jpg' },
  { name: 'fantastic four', img: 'fantastic-four.jpg' },
  { name: 'flash', img: 'flash.jpg' },
  { name: 'green arrow', img: 'green-arrow.jpg' },
  { name: 'green lantern', img: 'green-lantern.jpg' },
  { name: 'ironman', img: 'ironman.jpg' },
  { name: 'spiderman', img: 'spiderman.jpg' },
  { name: 'superman', img: 'superman.jpg' },
  { name: 'the avengers', img: 'the-avengers.jpg' },
  { name: 'thor', img: 'thor.jpg' },
];

const memoryGame = new MemoryGame(cards);

window.addEventListener('load', event => {
  // when the page loads
  event.preventDefault();

  // shuffle the cards
  memoryGame.shuffleCards();
  console.log(memoryGame.cards);

  // generate HTML code for each card element
  let html = '';
  memoryGame.cards.forEach(pic => {
    html += `
      <div class="card" data-card-name="${pic.name}">
        <div class="back" name="${pic.img}"></div>
        <div class="front" style="background: url(img/${pic.img}) no-repeat"></div>
      </div>
    `;
  });
  // the html variable contains the HTML code for all the cards in the memoryGame.cards array

  // Add all the divs to the HTML
  document.querySelector('#memory-board').innerHTML = html;

  // Bind the click event of each element (div) to a function
  document.querySelectorAll('.card').forEach(card => {
    card.addEventListener('click', () => {
      console.log(`Card clicked: ${card}`);
      // add turned to card class only if we have less than 2 cards picked
      if (memoryGame.pickedCards.length < 2) {
        card.classList.add('turned');

        // add clicked cards to picked cards array
        const cardName = card.getAttribute('data-card-name');
        memoryGame.pickedCards.push(cardName);
        console.log(memoryGame.pickedCards);
      }

      // get an array of all the turned cards
      const turnedCards = document.querySelectorAll('.turned');
      console.log(turnedCards);

      // get a variable of paircheck function
      const checkFunction = memoryGame.checkIfPair(
        memoryGame.pickedCards[0],
        memoryGame.pickedCards[1]
      );

      // call checkIfPair if we pick 2 cards
      if (checkFunction && memoryGame.pickedCards.length === 2) {
        // if the cards are the same, they stay
        turnedCards.forEach(card => {
          card.classList.add('blocked');
          card.classList.remove('turned');
        });

        // reset pickedCards array
        memoryGame.pickedCards = [];

        // update the score board
        memoryGame.updateScore();

        // check if the game finishes
        memoryGame.endGame();

        // if cards are not the same, they flip again
      } else if (!checkFunction && memoryGame.pickedCards.length === 2) {
        setTimeout(() => {
          turnedCards.forEach(card => {
            card.classList.remove('turned');
          });
        }, 1000);

        // reset pickedCards array
        memoryGame.pickedCards = [];

        // update the score board
        memoryGame.updateScore();
      }
    });
  });
});
