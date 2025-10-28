function createNewCard() {

  let cardElement = document.createElement("div");

  cardElement.classList.add("card");

  cardElement.innerHTML = "<div class='card-down'></div><div class='card-up'></div>";

  return cardElement;

}
createNewCardTest();


function appendNewCard(parentElement) {


  let cardElement = createNewCard();



  parentElement.appendChild(cardElement);



  return cardElement;

}
appendNewCardTest();


function shuffleCardImageClasses() {


  let cardClasses = ["image-1", "image-1", "image-2", "image-2", "image-3", "image-3", "image-4", "image-4", "image-5", "image-5", "image-6", "image-6"];

  let shuffledCards = _.shuffle(cardClasses);

  return shuffledCards;

}
shuffleCardImageClassesTest()


function createCards(parentElement, shuffledImageClasses) {

  let cards = [];


  for (i = 0; i < 12; i++) {

    let cardElement = appendNewCard(parentElement);


    cardElement.classList.add(shuffledImageClasses[i]);

    cards.push({
      index: i,
      element: cardElement,
      imageClass: shuffledImageClasses[i]
    })
  }

  return cards;
}
createCardsTest();


function doCardsMatch(cardObject1, cardObject2) {

  let card1 = cardObject1.imageClass;
  let card2 = cardObject2.imageClass;

  if (card1 === card2) {
    return true;
  }
  else {
    return false;
  }

}
doCardsMatchTest();

let counters = {};


function incrementCounter(counterName, parentElement) {

  if (!(counterName in counters)) {
    counters[counterName] = 0;
  }

  counters[counterName]++;

  parentElement.innerHTML = counters[counterName];

}
incrementCounterTest();

let lastCardFlipped = null;


function onCardFlipped(newlyFlippedCard) {

  incrementCounter("flipCount", document.getElementById("flip-count"));

  if (lastCardFlipped === null) {
    lastCardFlipped = newlyFlippedCard
    return;
  }

  if (!doCardsMatch(lastCardFlipped, newlyFlippedCard)) {
    lastCardFlipped.element.classList.remove("flipped");
    newlyFlippedCard.element.classList.remove("flipped");
    lastCardFlipped = null;
    return;
  }

  incrementCounter("match-count", document.getElementById("match-count"));
  lastCardFlipped.element.classList.add("glow");
  newlyFlippedCard.element.classList.add("glow");


  if (counters["match-count"] === 6) {
    winAudio.play();
  }
  else {
    matchAudio.play();
  }

  lastCardFlipped = null;

}


function resetGame() {


  let cardContainer = document.getElementById("card-container");

  while (cardContainer.firstChild) {
    cardContainer.removeChild(cardContainer.firstChild);
  }

  document.getElementById("flip-count").innerText = 0;
  document.getElementById("match-count").innerText = 0;

  counters = {};

  lastCardFlipped = null;

  setUpGame();

}

setUpGame();