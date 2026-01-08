import { View, Pressable, Text, TextInput, FlatList, TouchableOpacity } from "react-native";
import { BlurView } from "expo-blur";
import { data } from "@/data/todos.js";
import { useState } from "react";
import { useWindowDimensions } from "react-native";
import "./index.css"; 

export default function ToDoList() {

    const { width, height } = useWindowDimensions(); // On récupère width et height
    const containerWidth = width * 0.85;
    const containerHeight = height * 0.8; // 90% de la hauteur du device
    const tasks_DATA = data;

    const [inputValue, setInputValue] = useState("");
    const [tasks, setTasks] = useState(tasks_DATA);

    function handleCompletedState(itemId) {
        setTasks(prevTasks =>
            prevTasks.map(task =>
                task.id === itemId
                    ? { ...task, completed: !task.completed }
                    : task
            )
        );
    }

    function deleteTask(index) {
        const updatedTasks = tasks.filter((_, i) => i !== index);
        setTasks(updatedTasks);
    }

    function addTask() {
        if (inputValue.trim("") !== "") {
            const newTask = {
                id: tasks.length + 1,
                title: inputValue,
                completed: false
            };

            setTasks(t => [newTask, ...t]);
            setInputValue("");
        }
    }

    return (
        <View style={[styles.mainConteneur, { width: containerWidth, height: containerHeight }]}>
            {/* AJOUT TÂCHE */}
            <BlurView
                intensity={30}
                tint="light"
                style={[styles.blurWrapper, { width: containerWidth, maxWidth: 1000}]}
            >
                <View style={styles.conteneurAjout}>
                    <TextInput
                        value={inputValue}
                        style={styles.inputAjout}
                        onChangeText={setInputValue}
                    />

                    <Pressable onPress={addTask} style={styles.boutonAjouter}>
                        <Text style={{ fontSize: 15 }}>Ajouter</Text>
                    </Pressable>
                </View>
            </BlurView>

            {/* LISTE */}
            <BlurView
                intensity={30}
                tint="light"
                style={[styles.blurWrapper, { width: containerWidth, flex: 1, maxWidth: 1000 }]} // flex:1 pour scroll
            >
                <FlatList
                    data={tasks}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item, index }) => (
                        <TouchableOpacity onPress={() => handleCompletedState(item.id)}>
                            <View style={styles.tacheConteneur}>
                                <Text
                                    style={[
                                        styles.tacheTitre,
                                        item.completed ? styles.tacheCompletee : null
                                    ]}
                                >
                                    {item.title}
                                </Text>

                                <Pressable
                                    onPress={() => deleteTask(index)}
                                    style={styles.boutonSupp}
                                >
                                    <Text style={styles.boutonImg}>🗑️</Text>
                                </Pressable>
                            </View>
                        </TouchableOpacity>
                    )}
                    contentContainerStyle={styles.conteneurListe}
                    ListEmptyComponent={<Text>Aucune tâche.</Text>}
                    extraData={tasks}
                    id="scrollableList"
                />
            </BlurView>
        </View>
    );
}

const styles = {
    mainConteneur: {
        gap: 20,
        paddingHorizontal: 16,
    },

    blurWrapper: {
        borderRadius: 20,
        overflow: "hidden",
        alignSelf: "center",
    },

    boutonAjouter: {
        backgroundColor: "#6f9af7e0",
        height: 40,
        minWidth: 80,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 10,

        shadowColor: "#2c88d4",
        shadowOffset: { width: -2, height: 0 },
        shadowOpacity: 0.6,
        shadowRadius: 10,
        elevation: 4,
    },

    boutonSupp: {
        backgroundColor: "#b82121",
        width: 35,
        height: 35,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 17.5,

        shadowColor: "#ff6f6f",
        shadowOffset: { width: -2, height: 0 },
        shadowOpacity: 0.7,
        shadowRadius: 6,
        elevation: 4,
    },

    boutonImg: {
        fontSize: 15,
    },

    tacheConteneur: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#683788a8",
        borderRadius: 10,
        padding: 10,

        shadowColor: "#660756",
        shadowOffset: { width: -2, height: 0 },
        shadowOpacity: 0.6,
        shadowRadius: 6,
        elevation: 3,
    },

    tacheTitre: {
        flex: 1,
        color: "white",
        fontSize: 16,
        fontWeight: "300",
    },

    conteneurListe: {
        gap: 10,
        padding: 16,
        backgroundColor: "rgba(255,255,255,0.1)",
    },

    conteneurAjout: {
        flexDirection: "row",
        gap: 10,
        padding: 16,
        backgroundColor: "rgba(255,255,255,0.1)",
    },

    inputAjout: {
        backgroundColor: "#ffffffa8",
        borderRadius: 10,
        paddingHorizontal: 12,
        paddingVertical: 8,
        flex: 1,
        fontSize: 16,
        fontWeight: "300",

        shadowColor: "#ffffff",
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.8,
        shadowRadius: 6,
        elevation: 2,
    },

    tacheCompletee: {
        textDecorationLine: "line-through",
        color: "grey",
    },
};
