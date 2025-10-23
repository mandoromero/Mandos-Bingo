import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { startGame, resetGame, setNumCards, setCards } from "../../redux/bingoSlice";
import { generateMultipleCards } from "../GenerateBingoCard";
import "./Navbar.css";

export default function Navbar() {
  const dispatch = useDispatch();
  const { numCards, gameStarted } = useSelector((state) => state.bingo);

  const handleStartReset = () => {
    if (!gameStarted) {
      // Start Game
      if (numCards === 0) {
        alert("Pick the number of cards you want to play.");
        return;
      }
      const newCards = generateMultipleCards(numCards);
      dispatch(setCards(newCards));
      dispatch(startGame());
    } else {
      // Reset Game
      const confirmReset = window.confirm("Are you sure you want to restart the game?");
      if (confirmReset) {
        dispatch(resetGame());
      }
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

        {/* Single Start/Reset button */}
        <button className="start-btn" onClick={handleStartReset}>
          {gameStarted ? "Reset" : "Start"}
        </button>
      </div>
    </div>
  );
}
