import { Text, View, ImageBackground } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import ToDoList from "./ToDoList";
import fondEcran from "@/assets/images/tropical-beach.jpg"

export default function Index() {
  return (
    <ImageBackground
      style={styles.fondEcran}
      source={fondEcran}
      resizeMode="cover"
    >
      <SafeAreaView style={styles.safeAreaContenu}>
        <Text style={styles.titre}>To-Do List</Text>
        <ToDoList />
      </SafeAreaView>
    </ImageBackground>
  );
}

const styles = {
  safeAreaContenu: {
    flex: 1,
    width: "100%",
    alignItems: "center",
    justifyContent: "flex-start",
    paddingHorizontal: 16,
  },

  titre: {
    color: "white",
    fontSize: 40,
    fontWeight: "100",
    marginTop: 20,
    marginBottom: 20,
  },

  fondEcran: {
    flex: 1,
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "flex-start", 
  },
}
