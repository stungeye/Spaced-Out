class FlashCardDeck {
  constructor(cards = [], jsonOnChangeCallback = (json) => {}) {
    // Default values for a new deck
    this.sessionNumber = 1;
    this.cards = [];
    this.jsonOnChangeCallback = jsonOnChangeCallback;

    if (typeof cards === "string") {
      // Loading deck from JSON
      const parsed = JSON.parse(cards);
      this.cards = parsed.cards;
      this.sessionNumber = parsed.sessionNumber ?? 0; // Use stored session number, default to 0 if undefined
    } else if (Array.isArray(cards)) {
      // Initializing a new deck with an array of card objects
      this.cards = cards.map((card) => ({
        question: card.question,
        answer: card.answer,
        boxNumber: card.boxNumber ?? 0, // Start in box #0 if not specified
        lastReviewedSession: card.lastReviewedSession ?? 0, // No last review session if not specified
      }));
    }
  }

  toJSON() {
    return JSON.stringify({
      cards: this.cards,
      sessionNumber: this.sessionNumber,
    });
  }

  getSessionCards() {
    let cards = this.getDueCards(); // Get due cards for the session
    if (cards.length === 0) {
      // If there are no due cards, start a new session
      this.sessionNumber++;
      cards = this.getDueCards();
    }
    return cards;
  }

  getDueCards() {
    return this.cards.filter((card) => {
      // Review interval is 2^boxNumber, starting from box #0
      const reviewInterval = Math.pow(2, card.boxNumber);
      // A card is due if the current session number modulo the review interval is 0
      // This means every 'reviewInterval' sessions, the card is due for review
      return (
        card.lastReviewedSession != this.sessionNumber &&
        this.sessionNumber % reviewInterval === 0
      );
    });
  }

  updateCard(question, userAnswer) {
    const card = this.cards.find((card) => card.question === question);
    if (card) {
      card.lastReviewedSession = this.sessionNumber;
      if (userAnswer === card.answer) {
        // Correct answer, move to the next box
        card.boxNumber++;
      } else {
        // Incorrect answer, reset to box #0
        card.boxNumber = 0;
      }
      this.jsonOnChangeCallback(this.toJSON());
    }
  }

  drawDebugInfo(x, y, width, height) {
    // Define the maximum number of boxes to display
    const maxBoxes = 10;
    // Calculate the width of each box area based on the available width and the number of boxes
    const boxWidth = width / maxBoxes;

    // Start drawing from the base x position
    let currentX = x;
    textSize(10); // Set a small text size
    text(`Session: ${this.sessionNumber}`, x + width / 2, y - 20); // Draw the current session number
    // Loop through each box number up to the maximum
    for (let boxNumber = 0; boxNumber < maxBoxes; boxNumber++) {
      // Filter cards that belong to the current box number
      const cardsInBox = this.cards.filter(
        (card) => card.boxNumber === boxNumber
      );

      // Calculate the height for each card based on the total height and the number of cards in the box
      const cardHeight = Math.min(height / cardsInBox.length, 20); // Ensure card height is not too small

      // Draw a label for the box
      text(`Box #${boxNumber}`, currentX + boxWidth / 2, y - 10);

      // Loop through each card in the current box
      cardsInBox.forEach((card, index) => {
        const cardY = y + index * cardHeight; // Calculate the Y position for the card
        const reviewInterval = Math.pow(2, card.boxNumber);
        const reviewing =
          card.lastReviewedSession != this.sessionNumber &&
          this.sessionNumber % reviewInterval === 0;

        // Draw the card as a rectangle with the question text
        fill(reviewing ? "green" : "white"); // Set fill color for the card to white
        rect(currentX, cardY, boxWidth, cardHeight);
        fill(0); // Set fill color for text to black
        text(card.question, currentX + boxWidth / 2, cardY + cardHeight / 2); // Draw the question text inside the card
      });

      // Move to the next box area
      currentX += boxWidth;
    }
  }
}
