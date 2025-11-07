import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleCell } from "../../redux/bingoSlice";
import {
  singleLineWin,
  doubleLineWin,
  xShapedWin,
  tShapedWin,
  crossShapedWin,
} from "../../utils/winningCombinations";
import "./BingoCard.css";

export default function BingoCard({ card, cardIndex }) {
  const dispatch = useDispatch();
  const {
    selectedCells,
    winningCombination,
  } = useSelector((state) => state.bingo);

  const cardSelected = selectedCells[cardIndex] || {};

  // ✅ Check if this card has achieved the selected winning combination
  const isWinningCard = (() => {
    switch (winningCombination) {
      case "singleLine":
        return singleLineWin(card, cardSelected);
      case "doubleLine":
        return doubleLineWin(card, cardSelected);
      case "xShape":
        return xShapedWin(card, cardSelected);
      case "tShape":
        return tShapedWin(card, cardSelected);
      case "crossShape":
        return crossShapedWin(card, cardSelected);
      default:
        return false;
    }
  })();

  // Handle toggle
  const handleToggle = (col, row, num) => {
    // Only allow toggling if Free or number has been called
    dispatch(toggleCell({ cardIndex, col, row }));
  };

  return (
    <div className="bingo-wrapper">
      {/* Bingo button appears only after a winning combination is achieved */}
      {isWinningCard && (
        <button
          id="bingo-btn"
          className="bingo-btn"
          onClick={() => alert(`🎉 Card ${cardIndex + 1} wins! 🎉`)}
        >
          Bingo!
        </button>
      )}

      <div className="bingo-card">
        {["B", "I", "N", "G", "O"].map((letter) => (
          <div key={letter} className="bingo-column">
            <div className="bingo-header">{letter}</div>
            {card[letter].map((num, idx) => {
              const isFree = num === "Free";
              const cellId = `${letter}${idx}`;
              const isMarked = cardSelected[cellId] || false;

              return (
                <div
                  key={cellId}
                  className={`square bingo-cell ${isFree ? "free" : ""} ${
                    isMarked ? "marked" : ""
                  }`}
                  onClick={() => handleToggle(letter, idx, num)}
                >
                  {num}
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}
