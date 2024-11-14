import MapView from "react-native-maps";
import { Marker } from "react-native-maps";
import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useState } from 'react';

export default function Map() {
  const [selectedLocation, setSelectedLocation] = useState(null);

  return (
    <View>
      <MapView
        initialRegion={{
          latitude: 42.3601,
          longitude: -71.0589,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        style={styles.map}
        onPress={(e) => setSelectedLocation({longitude: e.nativeEvent.coordinate.longitude, latitude: e.nativeEvent.coordinate.latitude})}>
        {selectedLocation && <Marker coordinate={selectedLocation} />}
        </ MapView>

    </View>
  )
}

const styles = StyleSheet.create({
  map: {
    width: 400,
    height: 400,
  }
})