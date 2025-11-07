import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setWinningCombination } from "../../redux/bingoSlice";

export default function SelectCombination() {
    const dispatch = useDispatch();
    const { winningCombination, gameStarted } = useSelector((state) => state.bingo);

    const handleChange = (e) => {
        dispatch(setWinningCombination(e.target.value));
    }

    return (
        <div id="select-combo-container">
            <label htmlFor="select-combo">
                <select 
                    id="select-combo"
                    value={winningCombination}
                    onChange={handleChange}
                    disabled={gameStarted}
                >
                    <option className="winning-combo">Select Winning Combo</option>
                    <option className="winning-combo">Single Line</option>
                    <option className="winning-combo">Double Line</option>
                    <option className="winning-combo">X Shape</option>
                    <option className="winning-combo">T Shape</option>
                    <option className="winning-combo">Cross Shape</option>

                </select>
            </label>
        </div>
    )
}