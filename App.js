import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, TextInput, View, Button } from "react-native";
import Header from "./Components/Header";
import { useState } from "react";
import Input from "./Components/Input";

export default function App() {
  const appName = "My app!";
  const [input, setInput] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);

  function handleInputData(inputData) {
    console.log("app.js: " + inputData);
    setInput(inputData);
    setIsModalVisible(false);
  }

  function handleModalVisibility() {
    console.log("Modal visibility: " + isModalVisible);
    setIsModalVisible(true);
  }

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Header name={appName}></Header>
      <Input textInputFocus={true} inputHandler={handleInputData} modalVisible={isModalVisible} />
      <Text>{input}</Text>
      <Button title="Add a goal" onPress={handleModalVisibility}></Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});