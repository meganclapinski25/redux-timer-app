import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { formatTime } from "../utils/formatTime";
import { pauseTimer, resumeTimer, resetTimer, deleteTimer } from "../features/timers/TimerSlice";

const TimerCard = ({ timer }) => {
  const dispatch = useDispatch();
  const [displayTime, setDisplayTime] = useState(timer.elapsed);

  useEffect(() => {
    let interval = null;

    if (timer.isRunning) {
      interval = setInterval(() => {
        const now = Date.now();
        const newElapsed = now - timer.startTime + timer.elapsed;
        setDisplayTime(newElapsed);
      }, 1000);
    } else {
      setDisplayTime(timer.elapsed);
    }

    return () => clearInterval(interval);
  }, [timer.isRunning, timer.startTime, timer.elapsed]);

  const handlePause = () => dispatch(pauseTimer(timer.id));
  const handleResume = () => dispatch(resumeTimer(timer.id));
  const handleReset = () => dispatch(resetTimer(timer.id));
  const handleDelete = () => dispatch(deleteTimer(timer.id));

  const elapsedSeconds = Math.floor(displayTime / 1000);

  return (
    <div className="timer-card">
      <h3 className="timer-title">{timer.label}</h3>
  
      <p className="timer-time" title={`${displayTime}ms`}>
        {formatTime(displayTime)}
      </p>
  
      <p className="timer-status">
        Status:{" "}
        <span className={timer.isRunning ? "running" : "paused"}>
          {timer.isRunning ? "Running" : "Paused"}
        </span>
      </p>
  
      <div className="timer-actions">
        {timer.isRunning ? (
          <button onClick={handlePause}>Pause</button>
        ) : (
          <button onClick={handleResume}>Resume</button>
        )}
  
        <button onClick={handleReset}>Reset</button>
  
        <button className="delete-btn" onClick={handleDelete}>
          Delete
        </button>
      </div>
    </div>
  );
  
};

export default TimerCard;