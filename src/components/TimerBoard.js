
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { addTimer } from "../features/timers/TimerSlice";
import TimerCard from "./TimerCard";

export default function TimerBoard() {
  const timers = useSelector((state) => state.timers);
  const dispatch = useDispatch();

  const handleAddTimer = () => {
    const label = prompt("Enter a timer label:") || "New Timer";
    dispatch(addTimer(label));
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>All Timers</Text>

        <TouchableOpacity style={styles.addButton} onPress={handleAddTimer}>
          <Text style={styles.addButtonText}>+ Add Timer</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        {timers.length === 0 ? (
          <View style={styles.emptyState}>
            <Text style={styles.emptyText}>
              No timers yet. Add one to get started!
            </Text>
          </View>
        ) : (
          timers.map((timer) => <TimerCard key={timer.id} timer={timer} />)
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#f8fafc",
  },
  header: {
    paddingVertical: 24,
    paddingHorizontal: 20,
    backgroundColor: "#0f172a",
    // RN shadow (iOS) + elevation (Android)
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  headerTitle: {
    textAlign: "center",
    fontSize: 28,
    fontWeight: "700",
    color: "#fff",
    marginBottom: 16,
  },
  addButton: {
    alignSelf: "center",
    backgroundColor: "#3b82f6",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    // RN shadow
    shadowColor: "#3b82f6",
    shadowOpacity: 0.3,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  addButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});
