import { createSlice } from "@reduxjs/toolkit";

const allNumbers = Array.from({ length: 75 }, (_, i) => i + 1);

const initialState = {
  gameStarted: false,
  numCards: 0,
  cards: [],
  currentNumber: null,
  calledNumbers: [],
  remainingNumbers: [...allNumbers],
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
    setCards: (state, action) => {
      // Initialize "marked" property for every number
      state.cards = action.payload.map((card) => {
        const marked = {};
        for (const letter of ["B", "I", "N", "G", "O"]) {
          marked[letter] = Array(5).fill(false);
        }
        return { ...card, marked };
      });
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
    toggleMarked: (state, action) => {
      const { cardIndex, letter, idx } = action.payload;
      const markedCell = state.cards[cardIndex].marked[letter][idx];
      state.cards[cardIndex].marked[letter][idx] = !markedCell;
    },
  },
});

export const {
  startGame,
  resetGame,
  setNumCards,
  setCards,
  callNextNumber,
  toggleMarked,
} = bingoSlice.actions;

export default bingoSlice.reducer;
