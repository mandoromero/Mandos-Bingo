import React from "react";
import { useSelector } from "react-redux";
import "./BingoNumber.css";

export default function BingoNumber() {
    const { currentNumber } = useSelector((state) => state.bingo);

    const getLetter = (num) => {
        if (num >= 1 && num <= 15) return "B";
        if (num >= 16 && num <= 30) return "I";
        if (num >= 31 && num <= 45) return "N";
        if (num >= 46 && num <= 60) return "G";
        if (num >= 61 && num <= 75) return"O";
        return "-";
    };

    return (
        <div className="bingo-num-container">
            <div className="current-bingo-num sphere">
                {currentNumber ? (
                    <>
                        <p className="current-letter">{getLetter(currentNumber)}</p>
                        <p className="current-number">{currentNumber}</p>
                    </>
                ) : (
                    <>
                        <p className="current-letter">-</p>
                        <p className="current-number">-</p>
                    </>
                )}    
            </div>
        </div>
    )
}