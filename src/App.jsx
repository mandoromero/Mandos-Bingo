import React from "react";
import { useSelector } from "react-redux";
import Navbar from "./components/Navbar";
import BingoNumbers from "./components/BingoNumbers";
import BingoReferenceGrid from "./components/BingoReferenceGrid";
import BingoCard from "./components/BingoCard";

function App() {
  const { numCards, gameStarted, cards } = useSelector((state) => state.bingo);

  return (
    <div className="game-wrapper">
      <Navbar />
      <div className="generated-numbers">
        <BingoNumbers />
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
