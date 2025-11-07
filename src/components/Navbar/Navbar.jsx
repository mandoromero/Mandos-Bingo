import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { startGame, resetGame, setNumCards, setCards } from "../../redux/bingoSlice";
import { generateMultipleCards } from "../../utils/generateBingoCard";
import SelectCombination from "../SelectCombination/SelectCombination";
import "./Navbar.css";

export default function Navbar() {
  const dispatch = useDispatch();
  const { numCards, gameStarted } = useSelector((state) => state.bingo);

  const handleStartReset = () => {
    if (!gameStarted) {
      if (numCards === 0) {
        alert("Pick the number of cards you want to play.");
        return;
      }
      const newCards = generateMultipleCards(numCards);
      dispatch(setCards(newCards));
      dispatch(startGame());
    } else {
      const confirmReset = window.confirm("Are you sure you want to restart the game?");
      if (confirmReset) dispatch(resetGame());
    }
  };

  return (
    <div className="navbar">
      <h1>Mando's Bingo!</h1>
      <div className="btn-wrapper">
        <SelectCombination />
        <select
          value={numCards}
          onChange={(e) => dispatch(setNumCards(Number(e.target.value)))}
          disabled={gameStarted}
        >
          <option value="0">Select Cards</option>
          {[1, 2, 3, 4, 5].map((n) => (
            <option key={n} value={n}>{n} Card{n > 1 && "s"}</option>
          ))}
        </select>

        <button className="start-btn" onClick={handleStartReset}>
          {gameStarted ? "Reset" : "Start"}
        </button>
      </div>
    </div>
  );
}
