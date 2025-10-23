import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleCell } from "../redux/bingoSlice";

export default function BingoCard({ cardIndex }) {
  const dispatch = useDispatch();
  const { cards, calledNumbers, selectedCells } = useSelector(
    (state) => state.bingo
  );

  const card = cards[cardIndex];
  const activeNumbers = new Set(calledNumbers);

  return (
    <div className="cards-wrapper">
      <div className="card-container">
        <div className="bingo-card">
          {["B", "I", "N", "G", "O"].map((letter) => (
            <div key={letter} className="bingo-column">
              <div className="bingo-header">{letter}</div>
              {card[letter].map((num, row) => {
                const isFree = num === "Free";
                const isCalled =
                  num === "Free" || calledNumbers.includes(num);
                const cellId = `${letter}${row}`;
                const isSelected =
                  selectedCells[cardIndex]?.[cellId] || false;

                return (
                  <div
                    key={cellId}
                    className={`square bingo-cell
                      ${isFree ? "free" : ""}
                      ${isCalled ? "called" : ""}
                      ${isSelected ? "selected" : ""}`}
                    onClick={() => {
                      // ✅ This is where the dispatch call goes:
                      if (isCalled || isFree) {
                        dispatch(toggleCell({ cardIndex, col: letter, row }));
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
