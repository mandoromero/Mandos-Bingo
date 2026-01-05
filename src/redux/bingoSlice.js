import { createSlice } from "@reduxjs/toolkit";
import {
  singleLineWin,
  doubleLineWin,
  tShapedWin,
  xShapedWin,
  crossShapedWin,
} from "../utils/winningCombinations";

// All possible Bingo numbers (1–75)
const allNumbers = Array.from({ length: 75 }, (_, i) => i + 1);

// Shuffle helper
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

const initialState = {
  gameStarted: false,
  paused: false,
  numCards: 0,
  cards: [],
  selectedCells: [],
  calledNumbers: [],
  currentNumber: null,
  remainingNumbers: [...allNumbers],
  winningCombination: "",
  winner: null,
  showCalledBlink: false,
  soundOn: true,};

const checkForWin = (combination, card, selectedCells) => {
  switch (combination) {
    case "singleLine":
      return singleLineWin(card, selectedCells);
    case "doubleLine":
      return doubleLineWin(card, selectedCells);
    case "xShape":
      return xShapedWin(card, selectedCells);
    case "tShape":
      return tShapedWin(card, selectedCells);
    case "crossShape":
      return crossShapedWin(card, selectedCells);
    default:
      return false;
  }
};

const bingoSlice = createSlice({
  name: "bingo",
  initialState,
  reducers: {
    startGame: (state) => {
      if (!state.winningCombination) {
        alert("Please select a winning combination before starting!");
        return;
      }
      state.gameStarted = true;
      state.paused = false;
      state.remainingNumbers = shuffle([...allNumbers]);
      state.calledNumbers = [];
      state.currentNumber = null;
      state.winner = null;
    },

    resetGame: (state) => {
      state.gameStarted = false;
      state.paused = false;
      state.numCards = 0;
      state.cards = [];
      state.selectedCells = [];
      state.calledNumbers = [];
      state.currentNumber = null;
      state.remainingNumbers = [...allNumbers];
      state.winningCombination = "";
      state.winner = null;
    },

    // ✅ stop the game without resetting cards / selections
    stopGame: (state) => {
      state.gameStarted = false;
      state.paused = false; // optional, but keeps things consistent
    },

    togglePause: (state) => {
      if (!state.gameStarted) return;
      state.paused = !state.paused;
    },

    setNumCards: (state, action) => {
      state.numCards = action.payload;
    },

    setCards: (state, action) => {
      state.cards = action.payload;
      // initialize selected cells for each card
      state.selectedCells = action.payload.map(() => ({}));
    },

    setWinningCombination: (state, action) => {
      state.winningCombination = action.payload;
    },

    callNextNumber: (state) => {
      if (!state.gameStarted || state.remainingNumbers.length === 0) return;

      const nextNum = state.remainingNumbers.shift();

      if (state.currentNumber !== null) {
        state.calledNumbers.push(state.currentNumber); // keep all previous numbers
      }

      state.currentNumber = nextNum;
    },

    toggleCell: (state, action) => {
      const { cardIndex, col, row } = action.payload;
      const cellValue = state.cards[cardIndex][col][row];

      if (
        cellValue === "Free" ||
        state.calledNumbers.includes(cellValue) ||
        state.currentNumber === cellValue
      ) {
        const current = state.selectedCells[cardIndex] || {};
        const cellId = `${col}${row}`;
        current[cellId] = !current[cellId];
        state.selectedCells[cardIndex] = current;

        //  🔍 Check for a win
        const card = state.cards[cardIndex];
        const selected = state.selectedCells[cardIndex];
        if (checkForWin(state.winningCombination, card, selected)) {
          state.winner = cardIndex;
          state.gameStarted = false;
        }
      }
    },

    toggleSound: (state) => {
      state.soundOn = !state.soundOn;
    },

    toggleCalledBlink: (state) => {
      state.showCalledBlink = !state.showCalledBlink;
    },
  }
});

export const {
  startGame,
  resetGame,
  stopGame,          // ⬅️ export it
  setNumCards,
  setCards,
  callNextNumber,
  toggleCell,
  setWinningCombination,
  togglePause,
  toggleSound,
  toggleCalledBlink,
} = bingoSlice.actions;

export default bingoSlice.reducer;
