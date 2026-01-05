import { useDispatch, useSelector } from "react-redux";
import { toggleCalledBlink } from "../../redux/bingoSlice";
import "./ToggleBlinking.css"

export default function ToggleBlinking() {
    const dispatch = useDispatch();
    const showCalledBlink = useSelector((state) => state.bingo.showCalledBlink);


    return (
        <div className="toggle-switch">
            <p className="show">Show Called Nums.</p>
            <label className="toggle">
                <span className="onoff">
                    {showCalledBlink ? "ON" : "OFF"}
                </span>
                <input 
                    type="checkbox" 
                    checked={showCalledBlink}
                    onChange={() => dispatch(toggleCalledBlink())}
                />
                <span className="slider round"></span>
            </label>
        </div>  
    )
}