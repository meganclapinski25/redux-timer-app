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
    <div style={{ border: "1px solid #ccc", padding: 10, marginBottom: 10 }}>
      <h3>{timer.label}</h3>
      <p title={`${displayTime}ms`}>Elapsed Time: {formatTime(displayTime)}</p>

      <p>Status: {timer.isRunning ? "Running" : "Paused"}</p>
      {timer.isRunning ? (
        <button onClick={handlePause}>Pause</button>
      ) : (
        <button onClick={handleResume}>Resume</button>
      )}
      <button onClick={handleReset}>Reset</button>
      <button
        onClick={handleDelete}
        style={{ marginLeft: 8, backgroundColor: "#ef4444", color: "white" }}
      >
        Delete
      </button>
    </div>
  );
};

export default TimerCard;