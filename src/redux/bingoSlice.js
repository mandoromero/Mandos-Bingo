import { createSlice } from "@reduxjs/toolkit";

// All possible Bingo numbers (1–75)
const allNumbers = Array.from({ length: 75 }, (_, i) => i + 1);

const initialState = {
  gameStarted: false,
  numCards: 0,
  cards: [],            // Array of Bingo cards
  selectedCells: [],    // Tracks marked cells for each card
  calledNumbers: [],    // Last 8 called numbers
  currentNumber: null,  // Current drawn number
  remainingNumbers: [...allNumbers], // Numbers left to draw
};

const bingoSlice = createSlice({
  name: "bingo",
  initialState,
  reducers: {
    startGame: (state) => {
      state.gameStarted = true;
      state.remainingNumbers = [...allNumbers];
      state.calledNumbers = [];
      state.currentNumber = null;
    },

    resetGame: (state) => {
      state.gameStarted = false;
      state.cards = [];
      state.numCards = 0;
      state.selectedCells = [];
      state.calledNumbers = [];
      state.currentNumber = null;
      state.remainingNumbers = [...allNumbers];
    },

    setNumCards: (state, action) => {
      state.numCards = action.payload;
    },

    setCards: (state, action) => {
      state.cards = action.payload;
      state.selectedCells = action.payload.map(() => ({})); // reset selections
    },

    callNextNumber: (state) => {
      if (state.remainingNumbers.length === 0) return;

      const randomIndex = Math.floor(Math.random() * state.remainingNumbers.length);
      const nextNum = state.remainingNumbers[randomIndex];
      state.remainingNumbers.splice(randomIndex, 1);

      if (state.currentNumber !== null) {
        state.calledNumbers.push(state.currentNumber);
        if (state.calledNumbers.length > 8) state.calledNumbers.shift();
      }

      state.currentNumber = nextNum;
    },

    toggleCell: (state, action) => {
      const { cardIndex, col, row } = action.payload;
      const cellValue = state.cards[cardIndex][col][row];

      // Only toggle cells that match called numbers or "Free"
      if (
        cellValue === "Free" ||
        state.calledNumbers.includes(cellValue) ||
        state.currentNumber === cellValue
      ) {
        const current = state.selectedCells[cardIndex] || {};
        const cellId = `${col}${row}`;
        current[cellId] = !current[cellId];
        state.selectedCells[cardIndex] = current;
      }
    },
  },
});

export const {
  startGame,
  resetGame,
  setNumCards,
  setCards,
  callNextNumber,
  toggleCell,
} = bingoSlice.actions;

export default bingoSlice.reducer;
