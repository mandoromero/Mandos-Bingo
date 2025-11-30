import React, { useEffect, useState } from "react";
import Confetti from "react-confetti";
import { useDispatch } from "react-redux";
import { stopGame } from "../../redux/bingoSlice";

export default function WinningOverlay({ targetId, duration = 5000 }) {
  const [showConfetti, setShowConfetti] = useState(true);
  const [bounds, setBounds] = useState(null);
  const dispatch = useDispatch();

  // 🎯 Get target element's position & size for confetti overlay
  useEffect(() => {
    const el = document.getElementById(targetId);
    if (el) {
      const rect = el.getBoundingClientRect();
      setBounds(rect);
    }

    const timer = setTimeout(() => setShowConfetti(false), duration);
    return () => clearTimeout(timer);
  }, [targetId, duration]);

  if (!showConfetti || !bounds) return null;

  const handleClick = () => {
    // 🛑 Just stop the game, don't reset state
    dispatch(stopGame());
  };

  return (
    <div
      onClick={handleClick}
      style={{
        position: "absolute",
        top: bounds.top + window.scrollY,
        left: bounds.left + window.scrollX,
        width: bounds.width,
        height: bounds.height,
        overflow: "hidden",
        pointerEvents: "auto", // allow clicks
        cursor: "pointer",
      }}
    >
      <Confetti
        width={bounds.width}
        height={bounds.height}
        numberOfPieces={200}
        recycle={false}
        gravity={0.3}
      />
    </div>
  );
}
