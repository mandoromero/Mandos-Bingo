

function getRandomNumbers(min, max, count) {
  const numbers = new Set();
  while (numbers.size < count) {
    numbers.add(Math.floor(Math.random() * (max - min + 1)) + min);
  }
  return Array.from(numbers);
}

export function generateSingleCard() {
  const card = {
    B: getRandomNumbers(1, 15, 5),
    I: getRandomNumbers(16, 30, 5),
    N: getRandomNumbers(31, 45, 5),
    G: getRandomNumbers(46, 60, 5),
    O: getRandomNumbers(61, 75, 5),
  };
  card.N[2] = "Free"; // middle of N column
  return card;
}

export function generateMultipleCards(count = 1) {
  const cards = [];
  for (let i = 0; i < count; i++) {
    cards.push(generateSingleCard());
  }
  return cards;
}
