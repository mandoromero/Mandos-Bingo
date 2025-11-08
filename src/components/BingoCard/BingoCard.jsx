import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleCell } from "../../redux/bingoSlice";
import {
  singleLineWin,
  doubleLineWin,
  xShapedWin,
  tShapedWin,
  crossShapedWin,
} from "../../utils/winningCombinations";
import WinningOverlay from "../WinningOverlay/WinningOverlay";
import "./BingoCard.css";

export default function BingoCard({ card, cardIndex }) {
  const dispatch = useDispatch();
  const { selectedCells, winningCombination } = useSelector(
    (state) => state.bingo
  );

  const [showEffect, setShowEffect] = useState(false);
  const cardSelected = selectedCells[cardIndex] || {};

  // ✅ Check if this card has achieved the selected winning combination
  const isWinningCard = (() => {
    switch (winningCombination) {
      case "Single Line":
        return singleLineWin(card, cardSelected);
      case "Double Line":
        return doubleLineWin(card, cardSelected);
      case "X Shape":
        return xShapedWin(card, cardSelected);
      case "T Shape":
        return tShapedWin(card, cardSelected);
      case "Cross Shape":
        return crossShapedWin(card, cardSelected);
      default:
        return false;
    }
  })();

  const handleToggle = (col, row) => {
    dispatch(toggleCell({ cardIndex, col, row }));
  };

  const handleBingo = () => {
    setShowEffect(true);
    setTimeout(() => setShowEffect(false), 5000);
  };

  return (
    <div className="bingo-wrapper" style={{ position: "relative" }}>
      {/* 🎉 Confetti effect over this specific card */}
      {showEffect && <WinningOverlay targetId={`bingo-card-${cardIndex}`} />}

      {/* ✅ Bingo button appears once winning combo is achieved */}
      {isWinningCard && (
        <button className="bingo-btn"
          id={`bingo-btn-${cardIndex}`}
          className="bingo-btn"
          onClick={handleBingo}
        >
          🎉 Bingo! 🎉
        </button>
      )}

      <div id={`bingo-card-${cardIndex}`} className="bingo-card">
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
                  onClick={() => handleToggle(letter, idx)}
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
