import { Button, StyleSheet, Text, TextInput, View } from "react-native";
import React, { useState } from "react";

export default function Input({ textInputFocus, inputHandler }) {
  const [text, setText] = useState("");
  const [blur, setBlur] = useState(false);

  function handleConfirm() {
    console.log("input.js: " + text);
    inputHandler(text);
  }

  function handleChangeText (changedText) {
    setText(changedText);
  }

  return (
    <>
      <TextInput
        autoFocus={textInputFocus}
        placeholder="Type something"
        keyboardType="default"
        value={text}
        style={{ borderBottomColor: "purple", borderBottomWidth: 2 }}
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

      <Button title="Confirm" onPress={handleConfirm} color="red"></Button>
    </>
  );
}

const styles = StyleSheet.create({});