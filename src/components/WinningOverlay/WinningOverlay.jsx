import React, { useEffect, useState } from "react";
import Confetti from "react-confetti";

export default function WinningOverlay({ targetId, duration = 5000 }) {
  const [showConfetti, setShowConfetti] = useState(true);
  const [bounds, setBounds] = useState(null);

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

  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        pointerEvents: "none",
        width: bounds.width,
        height: bounds.height,
        overflow: "hidden",
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
