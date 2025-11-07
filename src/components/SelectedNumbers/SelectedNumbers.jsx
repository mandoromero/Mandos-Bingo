import React from "react";
import { useSelector } from "react-redux";
import "./SelectedNumbers.css";

export default function SelectedNumbers() {
  const { calledNumbers } = useSelector((state) => state.bingo);

  const getLetter = (num) => {
    if (num >= 1 && num <= 15) return "B";
    if (num >= 16 && num <= 30) return "I";
    if (num >= 31 && num <= 45) return "N";
    if (num >= 46 && num <= 60) return "G";
    if (num >= 61 && num <= 75) return "O";
    return "-";
  };



  // split calledNumbers into rows of 20
  const rows = [];
  for (let i = 0; i < calledNumbers.length; i += 20) {
    rows.unshift(calledNumbers.slice(i, i + 20));
  }

  return (
    <div className="selected-nums-wrapper">
      {rows.map((row, rowIndex) => (
        <div key={rowIndex} className="selected-nums-row">
          {row.map((num, idx) => (
            <div key={idx} className="selected-numbers sphere">
              <p className="selected-letter">{getLetter(num)}</p>
              <p className="selected-number">{num}</p>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
