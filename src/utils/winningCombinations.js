const letters = ["B", "I", "N", "G", "O"];
const size = 5;

const isMarked = (selectedCells, card, col, row) =>
  selectedCells[`${col}${row}`] === true || card[col][row] === "Free";

export function singleLineWin(card, selectedCells) {
  // horizontal
  for (let row = 0; row < size; row++) {
    if (letters.every(col => isMarked(selectedCells, card, col, row))) return true;
  }

  // vertical
  for (let col of letters) {
    if (
      Array.from({ length: size }, (_, row) =>
        isMarked(selectedCells, card, col, row)
      ).every(Boolean)
    )
      return true;
  }

  // diagonals
  if (letters.every((col, idx) => isMarked(selectedCells, card, col, idx))) return true;
  if (letters.every((col, idx) => isMarked(selectedCells, card, col, size - 1 - idx)))
    return true;

  return false;
}

export function doubleLineWin(card, selectedCells) {
  let completeLines = 0;

  // horizontal
  for (let row = 0; row < size; row++) {
    if (letters.every(col => isMarked(selectedCells, card, col, row))) completeLines++;
  }

  // vertical
  for (let col of letters) {
    if (
      Array.from({ length: size }, (_, row) =>
        isMarked(selectedCells, card, col, row)
      ).every(Boolean)
    )
      completeLines++;
  }

  // diagonals
  if (letters.every((col, idx) => isMarked(selectedCells, card, col, idx)))
    completeLines++;
  if (letters.every((col, idx) => isMarked(selectedCells, card, col, size - 1 - idx)))
    completeLines++;

  return completeLines >= 2;
}

export function xShapedWin(card, selectedCells) {
  const diag1 = letters.every((col, idx) => isMarked(selectedCells, card, col, idx));
  const diag2 = letters.every((col, idx) =>
    isMarked(selectedCells, card, col, size - 1 - idx)
  );
  return diag1 && diag2;
}

export function tShapedWin(card, selectedCells) {
  const topRow = letters.every(col => isMarked(selectedCells, card, col, 0));
  const centerCol = Array.from({ length: size }, (_, row) =>
    isMarked(selectedCells, card, "N", row)
  ).every(Boolean);
  return topRow && centerCol;
}

export function crossShapedWin(card, selectedCells) {
  const centerRow = 2;
  const centerCol = "N";

  const rowComplete = letters.every(col =>
    isMarked(selectedCells, card, col, centerRow)
  );

  const colComplete = Array.from({ length: size }, (_, row) =>
    isMarked(selectedCells, card, centerCol, row)
  ).every(Boolean);

  return rowComplete && colComplete;
}
