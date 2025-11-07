import React from "react";
import { useSelector } from "react-redux";
import "./BingoReferenceGrid.css";

export default function BingoReferenceGrid() {
  const { calledNumbers, currentNumber } = useSelector((state) => state.bingo);

  const columns = {
    B: Array.from({ length: 15 }, (_, i) => i + 1),
    I: Array.from({ length: 15 }, (_, i) => i + 16),
    N: Array.from({ length: 15 }, (_, i) => i + 31),
    G: Array.from({ length: 15 }, (_, i) => i + 46),
    O: Array.from({ length: 15 }, (_, i) => i + 61),
  };

  return (
    <div className="reference-wrapper">
      <div className="reference-grid">
        {Object.entries(columns).map(([letter, numbers]) => (
          <div key={letter} className="reference-column">
            <div className="reference-header-cell">{letter}</div>
            {numbers.map((num) => {
              // Stay gold if called previously OR is current
              const isCalled = calledNumbers.includes(num) || currentNumber === num;
              return (
                <div
                  key={num}
                  className={`reference-cell ${isCalled ? "called-number" : ""}`}
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
