import { Button, StyleSheet, Text, TextInput, View, Modal } from "react-native";
import React, { useState } from "react";

export default function Input({ textInputFocus, inputHandler, modalVisible }) {
  const [text, setText] = useState("");
  const [blur, setBlur] = useState(false);

  function handleConfirm() {
    console.log("input.js: " + text);
    inputHandler(text);
  }

  function handleChangeText(changedText) {
    setText(changedText);
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

        <View style={styles.buttonStyle}>
          <Button title="Confirm" onPress={handleConfirm}></Button>
        </View>      
        
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
    color: "blue",
  },
  buttonStyle: {
    width: "30%",
    marginVertical: 15,
  }
  
});