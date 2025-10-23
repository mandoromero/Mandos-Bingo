import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleCell } from "../../redux/bingoSlice";
import "./BingoCard.css";

export default function BingoCard({ card, cardIndex }) {
  const dispatch = useDispatch();
  const { calledNumbers, currentNumber, selectedCells } = useSelector(
    (state) => state.bingo
  );

  const activeNumbers = new Set([...calledNumbers, currentNumber]);

  return (
    <div className="cards-wrapper">
      <div className="card-container">
        <div className="bingo-card">
          {["B", "I", "N", "G", "O"].map((letter) => (
            <div key={letter} className="bingo-column">
              <div className="bingo-header">{letter}</div>
              {card[letter].map((num, idx) => {
                const isFree = num === "Free";
                const isCalled = activeNumbers.has(num);
                const cellId = `${letter}${idx}`;
                const isMarked =
                  selectedCells[cardIndex]?.[cellId] || false;

                return (
                  <div
                    key={cellId}
                    className={`square bingo-cell
                      ${isFree ? "free" : ""}
                      ${isCalled ? "called" : ""}
                      ${isMarked ? "marked" : ""}`}
                    onClick={() => {
                      if (isCalled || isFree) {
                        dispatch(toggleCell({ cardIndex, col: letter, row: idx }));
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
