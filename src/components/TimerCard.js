import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { pauseTimer, resumeTimer, resetTimer } from "../features/timers/TimerSlice";

const TimerCard = ({ timer }) => {
  const dispatch = useDispatch();
  const [currentTime, setCurrentTime] = useState(Date.now());

  // Update every second to show live elapsed time
  useEffect(() => {
    if (timer.isRunning) {
      // Reset currentTime when timer starts running
      setCurrentTime(Date.now());
      const interval = setInterval(() => {
        setCurrentTime(Date.now());
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [timer.isRunning, timer.startTime]);

  const handlePause = () => dispatch(pauseTimer(timer.id));
  const handleResume = () => dispatch(resumeTimer(timer.id));
  const handleReset = () => dispatch(resetTimer(timer.id));

  // Calculate current elapsed time including running time
  const currentElapsed = timer.isRunning
    ? timer.elapsed + (Date.now() - timer.startTime)
    : timer.elapsed;
  
  const elapsedSeconds = Math.floor(currentElapsed / 1000);

  return (
    <div style={styles.card}>
      <h3 style={styles.cardTitle}>{timer.label}</h3>
      <p style={styles.cardText}>Elapsed Time: {elapsedSeconds}s</p>
      <p style={styles.cardText}>Status: {timer.isRunning ? "Running" : "Paused"}</p>
      {timer.isRunning ? (
        <button onClick={handlePause}>Pause</button>
      ) : (
        <button onClick={handleResume}>Resume</button>
      )}
      <button onClick={handleReset}>Reset</button>
    </div>
  );
};

const styles = {
  card: {
    backgroundColor: '#fff',
    margin: 16,
    padding: 16,
    borderRadius: 10,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
  },
  cardText: {
    fontSize: 14,
    color: '#475569',
  },
};

export default TimerCard;