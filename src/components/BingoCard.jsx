import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { toggleMarked } from "../redux/bingoSlice";

export default function BingoCard({ cardIndex, card }) {
  const calledNumbers = useSelector((state) => state.bingo.calledNumbers);
  const currentNumber = useSelector((state) => state.bingo.currentNumber);
  const dispatch = useDispatch();

  // ⛔ Prevent crash if card hasn't been set yet
  if (!card || !card.B || !card.I || !card.N || !card.G || !card.O) {
    return null;
  }

  // Combine all active numbers
  const activeNumbers = new Set([...calledNumbers, currentNumber]);

  return (
    <div classNamr="cards-wrapper">
      <div className="card-container">
        <div className="bingo-card">
          {["B", "I", "N", "G", "O"].map((letter) => (
            <div key={letter} className="bingo-column">
              <div className="bingo-header">{letter}</div>
              {card[letter].map((num, idx) => {
                const isFree = num === "Free";
                const isCalled = activeNumbers.has(num);
                const cellKey = `${cardIndex}-${letter}-${idx}`;

                return (
                  <div
                    key={cellKey}
                    className={`square bingo-cell
                      ${isFree ? "free" : ""} 
                      ${isCalled ? "called" : ""}`}
                    onClick={() => {
                      if (isCalled && !isFree) {
                        dispatch(toggleMarked({ cardIndex, letter, idx }));
                      }
                    }}
                  >
                    {num}
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>  
    </div>
  );
}
