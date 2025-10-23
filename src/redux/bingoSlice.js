import { createSlice } from "@reduxjs/toolkit";

const allNumbers = Array.from({ length: 75 }, (_, i) => i + 1);

const initialState = {
  gameStarted: false,
  numCards: 0,
  cards: [],
  selectedCells: [], // NEW
  calledNumbers: [],
  currentNumber: null,
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
      state.currentNumber = null;
      state.calledNumbers = [];
      state.remainingNumbers = [...allNumbers];
    },
    setNumCards: (state, action) => {
      state.numCards = action.payload;
    },
    setCards(state, action) {
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
    toggleCell(state, action) {
      const { cardIndex, col, row } = action.payload;
      const cellValue = state.cards[cardIndex][col][row];
  
      // Only allow clicking cells that correspond to called numbers (or "Free")
      if (cellValue === "Free" || state.calledNumbers.includes(cellValue)) {
        const current = state.selectedCells[cardIndex] || {};
        const cellId = `${col}${row}`;
        current[cellId] = !current[cellId]; // toggle highlight
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
