
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { View, Text, TouchableOpacity, ScrollView, Modal, TextInput, StyleSheet, KeyboardAvoidingView, Platform } from "react-native";
import { addTimer } from "../features/timers/TimerSlice";
import TimerCard from "./TimerCard";

export default function TimerBoard() {
  const timers = useSelector((state) => state.timers);
  const dispatch = useDispatch();
  const [addModalVisible, setAddModalVisible] = useState(false);
  const [newTimerLabel, setNewTimerLabel] = useState("");

  const handleOpenAddModal = () => {
    setNewTimerLabel("");
    setAddModalVisible(true);
  };

  const handleAddTimer = () => {
    const label = newTimerLabel.trim() || "New Timer";
    dispatch(addTimer(label));
    setAddModalVisible(false);
    setNewTimerLabel("");
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>All Timers</Text>

        <TouchableOpacity style={styles.addButton} onPress={handleOpenAddModal}>
          <Text style={styles.addButtonText}>+ Add Timer</Text>
        </TouchableOpacity>
      </View>

      <Modal
        visible={addModalVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setAddModalVisible(false)}
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => setAddModalVisible(false)}
        >
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={styles.modalContentWrap}
          >
            <TouchableOpacity activeOpacity={1} onPress={(e) => e.stopPropagation()}>
              <View style={styles.modalBox}>
                <Text style={styles.modalTitle}>Name your timer</Text>
                <TextInput
                  style={styles.modalInput}
                  value={newTimerLabel}
                  onChangeText={setNewTimerLabel}
                  autoFocus
                  maxLength={60}
                />
                <View style={styles.modalButtons}>
                  <TouchableOpacity style={styles.modalCancelButton} onPress={() => setAddModalVisible(false)}>
                    <Text style={styles.modalCancelText}>Cancel</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.modalAddButton} onPress={handleAddTimer}>
                    <Text style={styles.modalAddButtonText}>Add Timer</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </TouchableOpacity>
          </KeyboardAvoidingView>
        </TouchableOpacity>
      </Modal>

      <View style={styles.content}>
        {timers.length === 0 ? (
          <View style={styles.emptyState}>
            
          </View>
        ) : (
          <ScrollView
            style={styles.scrollView}
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={true}
          >
            {timers.map((timer) => (
              <TimerCard key={timer.id} timer={timer} />
            ))}
          </ScrollView>
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
  content: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 24,
  },
  emptyState: {
    padding: 24,
    alignItems: "center",
  },
  emptyText: {
    fontSize: 16,
    color: "#64748b",
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
  modalAddButton: {
    backgroundColor: "#3b82f6",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  modalAddButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});
