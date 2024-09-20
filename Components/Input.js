import { Button, StyleSheet, Text, TextInput, View, Modal } from "react-native";
import React, { useState } from "react";

export default function Input({ textInputFocus, inputHandler, modalVisible, alertHandler }) {
  const [text, setText] = useState("");
  const [blur, setBlur] = useState(false);

  function handleConfirm() {
    console.log("input.js: " + text);
    inputHandler(text);
    setText("");
  }

  function handleChangeText(changedText) {
    setText(changedText);
  }

  function handleCancel() {
    alertHandler();
    setText("");
  }

  return (
    <Modal animationType="slide" visible={modalVisible}>
      <View style={styles.container}>
        <TextInput
          autoFocus={textInputFocus}
          placeholder="Type something"
          keyboardType="default"
          value={text}
          style={styles.textInputStyle}
          onChangeText={handleChangeText}
          onBlur={() => {
            setBlur(true);
          }}
          onFocus={() => {
            setBlur(false);
          }}
        />

        {blur ? (
          text.length >= 3 ? (
            <Text>Thank you</Text>
          ) : (
            <Text>Please type more than 3 characters</Text>
          )
        ) : (
          text && <Text>{text.length}</Text>
        )}

        <View style={styles.buttonContainer}>
          <View style={styles.buttonStyle}>
            <Button title="CANCEL" onPress={handleCancel} color="white"></Button>
          </View>   
          <View style={styles.buttonStyle}>
            <Button title="CONFIRM" onPress={handleConfirm} color="white"></Button>
          </View>     
        </ View>  

        </View>
      </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "pink",
    alignItems: "center",
    justifyContent: "center",
  },
  textInputStyle: {
    borderColor: "purple",
    borderWidth: 2,
    padding: 5,
    color: "black",
  },
  buttonStyle: {
    width: "30%",
    marginVertical: 15,
    marginHorizontal: 15,
    padding: 2,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#2196F3",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  
});