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
  const {
    currentNumber,
    soundOn,
    paused,
    gameStarted,
  } = useSelector((state) => state.bingo);

  const audioRef = useRef(null);

  useEffect(() => {
    // 🚫 Do nothing if sound is off, game paused, or no number
    if (!soundOn || paused || !gameStarted || !currentNumber) return;

    const letter = getLetter(currentNumber);
    if (!letter) return;

    const fileName = `${letter}_${currentNumber}.wav`;

    const audioPath = new URL(
      `../assets/BINGO/${fileName}`,
      import.meta.url
    ).href;

    // Stop previous sound
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }

    const audio = new Audio(audioPath);
    audioRef.current = audio;

    audio.play().catch(() => {});
  }, [currentNumber, soundOn, paused, gameStarted]);

  // 🔕 Stop sound immediately when paused or muted
  useEffect(() => {
    if (!soundOn || paused) {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
    }
  }, [soundOn, paused]);

  return null; // no UI, sound only
}
