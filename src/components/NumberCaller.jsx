import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { callNextNumber } from "../../src/redux/bingoSlice";

export default function NumberCaller() {
  const dispatch = useDispatch();
  const { gameStarted, remainingNumbers } = useSelector((state) => state.bingo);
  const intervalRef = useRef(null);
  const timeoutRef = useRef(null);

  useEffect(() => {
    // Stop everything if game isn't started
    if (!gameStarted) return;

    // Prevent multiple intervals if component re-renders
    if (intervalRef.current || timeoutRef.current) return;

    // Wait 3 seconds before first number
    timeoutRef.current = setTimeout(() => {
      dispatch(callNextNumber());

      // Then call a new number every 3 seconds
      intervalRef.current = setInterval(() => {
        dispatch(callNextNumber());
      }, 3000);
    }, 3000);

    // Cleanup when game stops or unmounts
    return () => {
      clearTimeout(timeoutRef.current);
      clearInterval(intervalRef.current);
      timeoutRef.current = null;
      intervalRef.current = null;
    };
  }, [gameStarted, dispatch]);

  // Stop automatically when all numbers are called
  useEffect(() => {
    if (remainingNumbers.length === 0) {
      clearInterval(intervalRef.current);
      clearTimeout(timeoutRef.current);
    }
  }, [remainingNumbers]);

  return null;
}
