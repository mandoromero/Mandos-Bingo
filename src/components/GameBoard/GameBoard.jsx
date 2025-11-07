import React from "react";
import { useSelector } from "react-redux";
import BingoCard from "../BingoCard/BingoCard";
import "./GameBoard.css";

export default function GameBoard() {
  const { cards, gameStarted } = useSelector((state) => state.bingo);

  if (!gameStarted) {
    return <div className="gameboard-message">Pick number of cards and press Start</div>;
  }

  return (
    <div className="gameboard">
      {cards.map((card, index) => (
        <BingoCard key={index} card={card} cardIndex={index} />
      ))}
    </div>
  );
}
