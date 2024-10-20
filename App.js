import { StyleSheet, Text, View } from "react-native";
import AppNavigator from "./AppNavigator";
import { PeopleProvider } from "./PeopleContext";

export default function App() {
  return (
    <View style={styles.container}>
      <PeopleProvider>
        <AppNavigator />
      </PeopleProvider>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
