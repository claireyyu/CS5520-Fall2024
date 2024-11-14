import { StyleSheet, Text, View, Button, Alert, Image, Dimensions } from 'react-native'
import React from 'react'
import * as Location from 'expo-location'
import Map from './Map'
import { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default function LocationManager() {

  const navigation = useNavigation();

  const [response, requestPermission] = Location.useForegroundPermissions();
  const [location, setLocation] = useState(null);

  function chooseLocationHandler() {
    navigation.navigate('Map');
  }

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
      const result = await Location.getCurrentPositionAsync();
      // console.log("result: ", result);
      setLocation({ latitude: result.coords.latitude, longitude: result.coords.longitude });
    }
    catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    if (location) {
      console.log("location: ", location);
    }
  }, [location]);

  return (
    <View>
      <Button title="Locate Me" onPress={locateUserHandler} />
      <Button title="Let me choose my location" onPress={chooseLocationHandler} />
      {location && <Image source={{ uri: `https://maps.googleapis.com/maps/api/staticmap?center=${location.latitude},${location.longitude}&zoom=14&size=400x200&maptype=roadmap&markers=color:red%7Clabel:L%7C${location.latitude},${location.longitude}&key=${process.env.EXPO_PUBLIC_GoogleMapsApi}` }} style={styles.map} />}
    </View>
  )
}

const styles = StyleSheet.create({
  map: {
    justifyContent: 'center',
    alignItems: 'center',
    width: windowWidth,
    height: 200,
  }
})