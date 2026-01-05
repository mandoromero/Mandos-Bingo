import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { callNextNumber } from "../../src/redux/bingoSlice";

export default function NumberCaller() {
  const dispatch = useDispatch();

  const { gameStarted, remainingNumbers, paused } = useSelector(
    (state) => state.bingo
  );

  const intervalRef = useRef(null);
  const timeoutRef = useRef(null);

  useEffect(() => {
    // Stop everything if game isn't started or paused
    if (!gameStarted || paused) {
      clearTimeout(timeoutRef.current);
      clearInterval(intervalRef.current);
      timeoutRef.current = null;
      intervalRef.current = null;
      return;
    }

    // Prevent duplicate timers
    if (intervalRef.current || timeoutRef.current) return;

    // First call after 3 seconds
    timeoutRef.current = setTimeout(() => {
      dispatch(callNextNumber());

      // Then every 6 seconds
      intervalRef.current = setInterval(() => {
        dispatch(callNextNumber());
      }, 6000);
    }, 3000);

    return () => {
      clearTimeout(timeoutRef.current);
      clearInterval(intervalRef.current);
      timeoutRef.current = null;
      intervalRef.current = null;
    };
  }, [gameStarted, paused, dispatch]);

  // Stop when numbers are exhausted
  useEffect(() => {
    if (remainingNumbers.length === 0) {
      clearInterval(intervalRef.current);
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
      intervalRef.current = null;
    }
  }, [remainingNumbers]);

  return null;
}
