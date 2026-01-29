
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { View, Text, TouchableOpacity, Modal, TextInput, StyleSheet, KeyboardAvoidingView, Platform } from "react-native";
import { formatTime } from "../utils/formatTime";
import { pauseTimer, resumeTimer, resetTimer, deleteTimer, updateTimerLabel } from "../features/timers/TimerSlice";

const TimerCard = ({ timer }) => {
  const dispatch = useDispatch();
  const [displayTime, setDisplayTime] = useState(timer.elapsed);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [editLabel, setEditLabel] = useState(timer.label);

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

  useEffect(() => {
    setEditLabel(timer.label);
  }, [timer.label]);

  const handlePause = () => dispatch(pauseTimer(timer.id));
  const handleResume = () => dispatch(resumeTimer(timer.id));
  const handleReset = () => dispatch(resetTimer(timer.id));
  const handleDelete = () => dispatch(deleteTimer(timer.id));

  const openEditModal = () => {
    setEditLabel(timer.label);
    setEditModalVisible(true);
  };

  const handleSaveLabel = () => {
    const label = editLabel.trim() || "Untitled Timer";
    dispatch(updateTimerLabel({ id: timer.id, label }));
    setEditModalVisible(false);
  };

  return (
    <View style={styles.card}>
      <TouchableOpacity onPress={openEditModal} style={styles.labelTouchable}>
        <Text style={styles.label}>{timer.label}</Text>
        <Text style={styles.editHint}>Tap to rename</Text>
      </TouchableOpacity>
      <Text style={styles.elapsed}>Elapsed Time: {formatTime(displayTime)}</Text>
      <Text style={styles.status}>Status: {timer.isRunning ? "Running" : "Paused"}</Text>
      <View style={styles.buttons}>
        {timer.isRunning ? (
          <TouchableOpacity style={styles.button} onPress={handlePause}>
            <Text style={styles.buttonText}>Pause</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity style={styles.button} onPress={handleResume}>
            <Text style={styles.buttonText}>Resume</Text>
          </TouchableOpacity>
        )}
        <TouchableOpacity style={styles.button} onPress={handleReset}>
          <Text style={styles.buttonText}>Reset</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, styles.deleteButton]} onPress={handleDelete}>
          <Text style={styles.buttonText}>Delete</Text>
        </TouchableOpacity>
      </View>

      <Modal
        visible={editModalVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setEditModalVisible(false)}
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => setEditModalVisible(false)}
        >
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={styles.modalContentWrap}
          >
            <TouchableOpacity activeOpacity={1} onPress={(e) => e.stopPropagation()}>
              <View style={styles.modalBox}>
                <Text style={styles.modalTitle}>Rename timer</Text>
                <TextInput
                  style={styles.modalInput}
                  value={editLabel}
                  onChangeText={setEditLabel}
                  placeholder="Timer name"
                  placeholderTextColor="#94a3b8"
                  autoFocus
                  maxLength={60}
                />
                <View style={styles.modalButtons}>
                  <TouchableOpacity style={styles.modalCancelButton} onPress={() => setEditModalVisible(false)}>
                    <Text style={styles.modalCancelText}>Cancel</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.modalSaveButton} onPress={handleSaveLabel}>
                    <Text style={styles.modalSaveButtonText}>Save</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </TouchableOpacity>
          </KeyboardAvoidingView>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    borderWidth: 1,
    borderColor: "#e2e8f0",
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
    backgroundColor: "#fff",
  },
  labelTouchable: {
    marginBottom: 8,
  },
  label: {
    fontSize: 18,
    fontWeight: "600",
    color: "#0f172a",
  },
  editHint: {
    fontSize: 12,
    color: "#94a3b8",
    marginTop: 2,
  },
  elapsed: {
    fontSize: 14,
    color: "#475569",
    marginBottom: 4,
  },
  status: {
    fontSize: 14,
    color: "#475569",
    marginBottom: 12,
  },
  buttons: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  button: {
    backgroundColor: "#3b82f6",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 6,
  },
  buttonText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "600",
  },
  deleteButton: {
    backgroundColor: "#ef4444",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
  },
  modalContentWrap: {
    width: "100%",
    maxWidth: 360,
  },
  modalBox: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 24,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#0f172a",
    marginBottom: 12,
  },
  modalInput: {
    borderWidth: 1,
    borderColor: "#e2e8f0",
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 16,
    fontSize: 16,
    color: "#0f172a",
    marginBottom: 20,
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "flex-end",
    gap: 12,
  },
  modalCancelButton: {
    paddingVertical: 10,
    paddingHorizontal: 16,
  },
  modalCancelText: {
    fontSize: 16,
    color: "#64748b",
  },
  modalSaveButton: {
    backgroundColor: "#3b82f6",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  modalSaveButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});

export default TimerCard;
