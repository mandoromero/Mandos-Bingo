import React, { useEffect, useRef } from "react";
import { useSelector } from "react-redux";

// Helper to map number -> letter
const getLetter = (num) => {
  if (num >= 1 && num <= 15) return "B";
  if (num >= 16 && num <= 30) return "I";
  if (num >= 31 && num <= 45) return "N";
  if (num >= 46 && num <= 60) return "G";
  if (num >= 61 && num <= 75) return "O";
  return null;
};

export default function Call() {
  const { currentNumber } = useSelector((state) => state.bingo);
  const audioRef = useRef(null);

  useEffect(() => {
    if (!currentNumber) return;

    const letter = getLetter(currentNumber);
    if (!letter) return;

    // Example: "B_1.wav", "N_32.wav"
    const fileName = `${letter}_${currentNumber}.wav`;

    // Path into your assets folder
    const audioPath = new URL(
      `../assets/BINGO/${fileName}`,
      import.meta.url
    ).href;

    // Stop any previous sound
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }

    const audio = new Audio(audioPath);
    audioRef.current = audio;

    // Play and ignore errors like autoplay restrictions
    audio
      .play()
      .catch((err) => {
        console.warn("Audio playback failed:", err);
      });
  }, [currentNumber]);

  return null; // no UI, only sound
}
