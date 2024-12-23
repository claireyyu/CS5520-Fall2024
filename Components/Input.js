import { Button, StyleSheet, Text, TextInput, View, Modal, Image } from "react-native";
import React, { useState } from "react";
import ImageManager from "./ImageManager";

export default function Input({ textInputFocus, inputHandler, modalVisible, alertHandler }) {
  const [text, setText] = useState("");
  const [blur, setBlur] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const [imageUri, setImageUri] = useState("");

  function handleConfirm() {
    console.log("input.js: " + text);
    console.log("Image URI: " + imageUri);
    inputHandler({ text, imageUri });
    setText("");
  }

  function handleChangeText(changedText) {
    setText(changedText);
    if (changedText.length >= 3) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }

  function handleCancel() {
    alertHandler();
    setText("");
  }

  function handleImageUri(uri) {
    setImageUri(uri);
  }

  return (
    <Modal animationType="slide" visible={modalVisible} transparent={true}>
      <View style={styles.container}>
        <View style={styles.modalContainer}>
        <Image
          style={styles.imageStyle}
          source={{ uri: "https://cdn-icons-png.flaticon.com/512/2617/2617812.png" }}
          accessibilityLabel="Network image"
        />

        <Image
          style={styles.imageStyle}
          source={require('../assets/image.png')} 
          accessibilityLabel="Local image"
        />
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
            <Button title="CANCEL" onPress={handleCancel}></Button>
          </View>   
            <ImageManager imageHandler={handleImageUri} />
          <View style={styles.buttonStyle}>
            <Button title="CONFIRM" onPress={handleConfirm} disabled={disabled}></Button>
          </View>     
        </ View>  
        </View>
        </View>
      </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: "lavender",
    alignItems: "center",
    justifyContent: "center",
  },
  modalContainer: {
    backgroundColor: "lightgray",
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 50,
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
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  imageStyle: {
    width: 100,
    height: 100,
    marginBottom: 15,
  },
});