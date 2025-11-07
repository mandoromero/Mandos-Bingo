import React from "react";
import { useSelector } from "react-redux";
import Navbar from "./components/Navbar/Navbar";
import BingoNumber from "./components/BingoNumber/BingoNumber";
import SelectedNumbers from "./components/SelectedNumbers/SelectedNumbers";
import BingoReferenceGrid from "./components/BingoReferenceGrid/BingoReferenceGrid";
import GameBoard from "./components/GameBoard/GameBoard";
import NumberCaller from "./components/NumberCaller";
import "./App.css";

export default function App() {
  const { gameStarted } = useSelector((state) => state.bingo);

  return (
    <div className="game-wrapper">
      <Navbar />
      <div className="generated-numbers">
        <BingoNumber />
        <SelectedNumbers />
        <BingoReferenceGrid />
      </div>

      <NumberCaller />

      {gameStarted && <GameBoard />}
    </div>
  );
}
