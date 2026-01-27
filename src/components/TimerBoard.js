import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { addTimer } from "../features/timers/TimerSlice";
import TimerCard from "./TimerCard";

function TimerBoard() {
  const timers = useSelector((state) => state.timers);
  const dispatch = useDispatch();

  const handleAddTimer = () => {
    const label = prompt("Enter a timer label:") || "New Timer";
    dispatch(addTimer(label));
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h2 style={styles.headerTitle}>All Timers</h2>
        <button style={styles.addButton} onClick={handleAddTimer}>
          + Add Timer
        </button>
      </div>
      <div style={styles.content}>
        {timers.length === 0 ? (
          <div style={styles.emptyState}>
            <p style={styles.emptyText}>No timers yet. Add one to get started!</p>
          </div>
        ) : (
          timers.map((timer) => (
            <TimerCard key={timer.id} timer={timer} />
          ))
        )}
      </div>
    </div>
  );
}

const styles = {
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
    minHeight: '100vh',
  },
  header: {
    padding: '24px 20px',
    backgroundColor: '#0f172a',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  },
  headerTitle: {
    textAlign: 'center',
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    margin: '0 0 16px 0',
  },
  addButton: {
    display: 'block',
    margin: '0 auto',
    backgroundColor: '#3b82f6',
    color: '#fff',
    border: 'none',
    padding: '12px 24px',
    borderRadius: 8,
    fontSize: 16,
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'background-color 0.2s',
    boxShadow: '0 2px 4px rgba(59, 130, 246, 0.3)',
  },
  content: {
    padding: '20px 0',
    maxWidth: 800,
    margin: '0 auto',
  },
  emptyState: {
    textAlign: 'center',
    padding: '60px 20px',
  },
  emptyText: {
    fontSize: 16,
    color: '#64748b',
    margin: 0,
  },
};

export default TimerBoard;