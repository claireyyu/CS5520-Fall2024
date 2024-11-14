import { StyleSheet, Text, View, Button, Alert } from 'react-native'
import React from 'react'
import * as Location from 'expo-location'
import { verifyPermission } from './ImageManager';

export default function LocationManager() {
  const [response, requestPermission] = Location.useForegroundPermissions();

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
  
  async function locateUserHandler() {
    try {
      const hadPermission = await verifyPermission();
      if (!hadPermission) {
        Alert.alert("You need to give location permissions to use this feature.");
        return;
      }
      const location = await Location.getCurrentPositionAsync();
      console.log(location)
    }
    catch (error) {
      console.log(error)
    }
  }

  return (
    <View>
      <Button title="Locate Me" onPress={locateUserHandler} />
    </View>
  )
}

const styles = StyleSheet.create({})