
import { Provider } from "react-redux";
import { store } from "./src/app/store";
import { View, Text, StyleSheet } from "react-native";
import TimerBoard from "./src/components/TimerBoard";

// Simple Header component (inline for now)
function Header() {
  return (
    <View style={styles.header}>
      <Text style={styles.headerTitle}>Redux / React Timer App</Text>
      <Text style={styles.headerSubtitle}>jan 25</Text>
    </View>
  );
}

// Simple Card component (inline for now)
function Card() {
  return (
    <View style={styles.card}>
      <TimerBoard />
    </View>
  );
}

export default function App() {
  return (
    <Provider store={store}>
      <View style={styles.container}>
        <Header />
        <Card />
        
      </View>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  header: {
    padding: 20,
    backgroundColor: '#0f172a',
  },
  headerTitle: {
    textAlign: 'center',
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  headerSubtitle: {
    textAlign: 'center',
    fontSize: 14,
    color: '#cbd5e1',
    marginTop: 4,
  },
  card: {
    backgroundColor: '#fff',
    margin: 16,
    padding: 16,
    borderRadius: 10,
    elevation: 3, // Android shadow
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
  // timer-board (max-width: 600; margin: auto)
  board: {
    width: "100%",
    maxWidth: 600,
    alignSelf: "center",
  },

  // button
  button: {
    backgroundColor: "#3498db",
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 4,
    margin: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: "white",
    fontWeight: "600",
  },
});

