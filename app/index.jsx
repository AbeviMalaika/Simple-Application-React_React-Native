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
      {/* SafeAreaView uniquement pour le contenu */}
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
    paddingHorizontal: 16, // garde tes marges
  },

  titre: {
    color: "white",
    fontSize: 40,       // réduit pour mobile, tu peux adapter
    fontWeight: "100",
    marginTop: 20,
    marginBottom: 20,
  },

  fondEcran: {
    flex: 1,            // prend tout l'espace dispo
    width: "100%",      // largeur totale
    height: "100%",     // hauteur totale
    alignItems: "center",
    justifyContent: "flex-start", // pour que le contenu commence en haut
  },
}
