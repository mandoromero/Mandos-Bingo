import React from "react";
import { useSelector } from "react-redux";
import {
  singleLineWin,
  doubleLineWin,
  xShapedWin,
  tShapedWin,
  crossShapedWin,
} from "../utils/winningCombinations";

export default function WinningCombinations({ cardIndex }) {
  const { cards, selectedCells } = useSelector((state) => state.bingo);
  const card = cards[cardIndex];
  const cardSelected = selectedCells[cardIndex] || {};

  // ✅ Match function names correctly
  const wins = {
    singleLine: singleLineWin(card, cardSelected),
    doubleLine: doubleLineWin(card, cardSelected),
    xShape: xShapedWin(card, cardSelected),
    tShape: tShapedWin(card, cardSelected),
    crossShape: crossShapedWin(card, cardSelected),
  };

  return (
    <div>
      {Object.entries(wins).map(([type, won]) => (
        <p key={type}>
          {won ? `🎉 ${type} win! 🎉` : `${type} not completed`}
        </p>
      ))}
    </div>
  );
}
