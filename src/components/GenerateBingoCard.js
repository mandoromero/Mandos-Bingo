// utils/generateBingoCard.js

// Helper: generate unique random numbers within a range
function getRandomNumbers(min, max, count) {
  const numbers = new Set();
  while (numbers.size < count) {
    numbers.add(Math.floor(Math.random() * (max - min + 1)) + min);
  }
  return Array.from(numbers);
}

// Generate one Bingo card
export function generateSingleCard() {
  const card = {
    B: getRandomNumbers(1, 15, 5),
    I: getRandomNumbers(16, 30, 5),
    N: getRandomNumbers(31, 45, 5),
    G: getRandomNumbers(46, 60, 5),
    O: getRandomNumbers(61, 75, 5),
  };

  // Add "Free" space in the middle of the N column (3rd position)
  card.N[2] = "Free";

  return card;
}

// Generate multiple unique Bingo cards
export function generateMultipleCards(count = 10) {
  const cards = [];
  for (let i = 0; i < count; i++) {
    cards.push(generateSingleCard());
  }
  return cards;
}
