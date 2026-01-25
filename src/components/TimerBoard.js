import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { addTimer } from "../features/timers/TimerSlice";

function TimerBoard() {
  const timers = useSelector((state) => state.timers);
  const dispatch = useDispatch();

  const handleAddTimer = () => {
    const label = prompt("Enter a timer label:") || "New Timer";
    dispatch(addTimer(label));
  };

  return (
    <div>
      <h2>All Timers</h2>
      <button onClick={handleAddTimer}>Add Timer</button>
      <ul>
        {timers.map((timer) => (
          <li key={timer.id}>
            <strong>{timer.label}</strong> — Elapsed: {Math.floor(timer.elapsed / 1000)}s
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TimerBoard;