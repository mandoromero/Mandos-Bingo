import React from "react";

export default function BingoReferenceGrid() {
  const bingoColumns = {
    B: Array.from({ length: 15 }, (_, i) => i + 1),
    I: Array.from({ length: 15 }, (_, i) => i + 16),
    N: Array.from({ length: 15 }, (_, i) => i + 31),
    G: Array.from({ length: 15 }, (_, i) => i + 46),
    O: Array.from({ length: 15 }, (_, i) => i + 61),
  };

  const letters = Object.keys(bingoColumns);

  return (
    <div className="reference-wrapper">
      <div className="reference-grid">
        {/* One unified grid: letters + all their numbers */}
        {letters.map((letter) => (
          <div key={letter} className="reference-column">
            <div className="reference-header-cell">{letter}</div>
            {bingoColumns[letter].map((num) => (
              <div key={num} className="reference-cell">
                {num}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
