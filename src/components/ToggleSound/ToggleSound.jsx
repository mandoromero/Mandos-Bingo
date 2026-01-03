import "./ToggleSound.css"

export default function ToggleSound() {

    return (
        <div class="toggle-sound">
            <p class="sound">Sound</p>
            <label class="t-sound">
                <span class="onoff">
                    Off
                </span>
                <input 
                    type="checkbox" 
                />
                <span class="slider round"></span>
            </label>
        </div>  
    )
}