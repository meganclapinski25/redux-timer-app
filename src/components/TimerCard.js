
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { formatTime } from "../utils/formatTime";
import { pauseTimer, resumeTimer, resetTimer, deleteTimer, updateTimerLabel } from "../features/timers/TimerSlice";
import "./TimerCard.css";

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

  const handleRename = () => {
    const label = prompt("Enter new name:", timer.label);
    if (label != null) {
      dispatch(updateTimerLabel({ id: timer.id, label: label.trim() || timer.label }));
    }
  };

  return (
    <div className="timer-card">
      <h3 className="timer-title" onClick={handleRename} title="Click to rename">
        {timer.label}
      </h3>
      <p className="timer-hint">Click title to update name</p>
      <p className="timer-time" title={`${displayTime}ms`}>
        Elapsed Time: {formatTime(displayTime)}
      </p>
      <p className={`timer-status ${timer.isRunning ? "running" : "paused"}`}>
        Status: {timer.isRunning ? "Running" : "Paused"}
      </p>
      <div className="timer-actions">
        {timer.isRunning ? (
          <button type="button" onClick={handlePause}>Pause</button>
        ) : (
          <button type="button" onClick={handleResume}>Resume</button>
        )}
        <button type="button" onClick={handleReset}>Reset</button>
        <button type="button" className="delete-btn" onClick={handleDelete}>
          Delete
        </button>
      </div>
    </div>
  );
};

export default TimerCard;
