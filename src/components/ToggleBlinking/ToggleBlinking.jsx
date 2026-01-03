import { useDispatch, useSelector } from "react-redux";
import { toggleCalledBlink } from "../../redux/bingoSlice";
import "./ToggleBlinking.css"

export default function ToggleBlinking() {
    const dispatch = useDispatch();
    const showCalledBlink = useSelector((state) => state.bingo.showCalledBlink);


    return (
        <div class="toggle-switch">
            <p class="show">Show Called Nums.</p>
            <label class="toggle">
                <span class="onoff">
                    {showCalledBlink ? "ON" : "OFF"}
                </span>
                <input 
                    type="checkbox" 
                    checked={showCalledBlink}
                    onChange={() => dispatch(toggleCalledBlink())}
                />
                <span class="slider round"></span>
            </label>
        </div>  
    )
}