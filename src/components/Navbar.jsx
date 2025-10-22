import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { startGame, resetGame, setNumCards, setCards } from "../redux/bingoSlice";
import { generateMultipleCards } from "./GenerateBingoCard";

export default function Navbar() {
  const dispatch = useDispatch();
  const { numCards, gameStarted } = useSelector((state) => state.bingo);

  const handleStart = () => {
    if (numCards === 0) {
      alert("Pick the number of cards you want to play.");
      return;
    }

    // ✅ Generate the cards before starting the game
    const newCards = generateMultipleCards(numCards);
    dispatch(setCards(newCards));
    dispatch(startGame());
  };

  const handleReset = () => {
    const confirmReset = window.confirm("Are you sure you want to restart the game?");
    if (confirmReset) {
      dispatch(resetGame());
    }
  };

  return (
    <div className="navbar">
      <h1>BINGO!</h1>
      <div className="btn-wrapper">
        {/* Select number of cards */}
        <select
          value={numCards}
          onChange={(e) => dispatch(setNumCards(Number(e.target.value)))}
          disabled={gameStarted}
        >
          <option value="0">Select Cards</option>
          <option value="1">1 Card</option>
          <option value="2">2 Cards</option>
          <option value="3">3 Cards</option>
          <option value="4">4 Cards</option>
          <option value="5">5 Cards</option>
        </select>

        {/* Start game */}
        <button className="start-btn" onClick={handleStart} disabled={gameStarted}>
          Start
        </button>

        {/* Restart game */}
        <button className="start-btn" onClick={handleReset}>
          Restart
        </button>
      </div>
    </div>
  );
}
