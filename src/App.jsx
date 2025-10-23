import React from "react";
import { useSelector } from "react-redux";
import Navbar from "./components/Navbar/Navbar";
import BingoNumber from "./components/BingoNumber/BingoNumber";
import SelectedNumbers from "./components/SelectedNumbers/SelectedNumbers.jsx";
import BingoReferenceGrid from "./components/BingoReferenceGrid/BingoReferenceGrid";
import BingoCard from "./components/BingoCard/BingoCard";
import "./App.css";

function App() {
  const { numCards, gameStarted, cards } = useSelector((state) => state.bingo);

  return (
    <div className="game-wrapper">
      <Navbar />
      <div className="generated-numbers">
        <BingoNumber />
        <SelectedNumbers />
        <BingoReferenceGrid />
      </div>

      {gameStarted && (
        <div className="cards-wrapper">
          {cards.length > 0 &&
            cards.slice(0, numCards).map((card, i) => (
              <BingoCard key={i} cardIndex={i} card={card} />
            ))}
        </div>
      )}
    </div>
  );
}

export default App;
