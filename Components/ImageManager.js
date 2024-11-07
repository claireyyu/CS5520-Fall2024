import { StyleSheet, Text, View, Button, Alert, Image } from 'react-native';
import React, { useState } from 'react';
import * as ImagePicker from 'expo-image-picker';

function ImageManager({imageHandler}) {
  const [response, requestPermission] = ImagePicker.useCameraPermissions();
  const [image, setImage] = useState("");

  async function verifyPermission() {
    try {
      if (!response.granted) {
        const granted = await requestPermission();
        return granted.granted;
      }
      return true;
    } catch {
      console.log("Permission denied");
      return false;
    }
  }

  async function takeImageHandler() {
    try {
      const hasVerifiedPermission = await verifyPermission();
      if (hasVerifiedPermission) {
        const result = await ImagePicker.launchCameraAsync({ allowsEditing: true });
        if (!result.canceled) {
          setImage(result.assets[0].uri);
          imageHandler(result.assets[0].uri);
        }
        console.log(result);
      } else {
        Alert.alert("You need to give camera permissions to use this feature.");
        return;
      }
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <View style={styles.container}>
      <Button title="Open the camera" onPress={takeImageHandler} />
      {image && <Image source={{ uri: image }} style={styles.image} />}
    </View>
  );
}

export default ImageManager;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 100,
    height: 100,
    marginBottom: 15,
  }
});