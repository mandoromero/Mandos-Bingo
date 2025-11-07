import React from "react";
import { useSelector } from "react-redux";
import {
    singleLineWin, 
    doubleLineWin, 
    xShapeWin, 
    tShapeWin, 
    crossShapeWin,
} from "../utils/winningCombinations";

export default function WinningCombinations({ cardIndex }) {
    const { cards, selectedCells } = useSelector(state => state.bingo);
    const card = cards[cardIndex];
    const cardSelected = selectedCells[cardIndex] || {};

    const wins = {
        singleLine: singleLineWin(card, cardSelected),
        doubleLine: doubleLineWin(card, cardSelected),
        xShape: xShapeWin(card, cardSelected),
        tShape: tShapeWin(card, cardSelected),
        crossShape: crossShapeWin(card, cardSelected),
    };

    return (
        <div>
            {Object.entries(wins).map(([typeof, won]) => (
                <p key={type}>
                    {won ? `🎉 ${type} win! 🎉` : `$[type] not completed`}
                </p>
            ))}
        </div>
    )
}
