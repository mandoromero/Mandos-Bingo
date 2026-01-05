import { useDispatch, useSelector } from "react-redux";
import { toggleSound } from "../../redux/bingoSlice";
import "./ToggleSound.css"

export default function ToggleSound() {
    const dispatch = useDispatch();
    const soundOn = useSelector((state) => state.bingo.soundOn)


    return (
        <div className="toggle-sound">
            <p className="sound">Sound</p>
            <label className="t-sound">
                <span class="onoff">
                    {soundOn ? "ON" : "OFF"}
                </span>
                <input 
                    type="checkbox" 
                    checked={soundOn}
                    onChange={() => dispatch(toggleSound())}
                />
                <span className="slider round"></span>
            </label>
        </div>  
    )
}