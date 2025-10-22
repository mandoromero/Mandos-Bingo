import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { callNextNumber } from "../redux/bingoSlice";

export default function BingoNumbers() {
  const dispatch = useDispatch();
  const { gameStarted, currentNumber, calledNumbers } = useSelector(
    (state) => state.bingo
  );

  const getLetter = (num) => {
    if (num >= 1 && num <= 15) return "B";
    if (num >= 16 && num <= 30) return "I";
    if (num >= 31 && num <= 45) return "N";
    if (num >= 46 && num <= 60) return "G";
    if (num >= 61 && num <= 75) return "O";
    return "";
  };

  useEffect(() => {
    if (!gameStarted) return;
    const interval = setInterval(() => {
      dispatch(callNextNumber());
    }, 5000);
    return () => clearInterval(interval);
  }, [dispatch, gameStarted]);

  return (
    <div className="bingo-num-wrapper">
      {/* Current number */}
      <div className="bingo-current-container">
        <div className="bingo-num-container sphere large">
          {currentNumber ? (
            <>
              <p className="letter">{getLetter(currentNumber)}</p>
              <p className="number">{currentNumber}</p>
            </>
          ) : (
            <>
              <p className="letter">-</p>
              <p className="number">-</p>
            </>
          )}
        </div>
      </div>

      {/* Called numbers */}
      <div className="bingo-called-container">
        {calledNumbers.map((num, index) => (
          <div key={index} className="called-ball sphere small">
            <p className="called-letter">{getLetter(num)}</p>
            <p className="called-number">{num}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
