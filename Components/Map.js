import { StyleSheet, Text, View, Button } from "react-native";
import React, { useEffect, useState } from "react";
import MapView, { Marker } from "react-native-maps";


export default function Map({navigation, route}) {
  const [selectedLocation, setSelectedLocation] = useState(null);

  useEffect(() => {
    if (route.params) {
      setSelectedLocation(route.params.location);
    } else {
      setSelectedLocation({latitude: 37.78825, longitude: -122.4324});
    }
  }, [route.params]);

  function confirmCoordinateHandler() {
    console.log(selectedLocation);
    navigation.navigate('Profile', {selectedLocation});
  }
  return (
    <>
    <MapView
      initialRegion={{
        latitude: 37.78825,
        longitude: -122.4324,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      }}
      style={styles.map}
      onPress={(e) => {
        setSelectedLocation({
          latitude: e.nativeEvent.coordinate.latitude,
          longitude: e.nativeEvent.coordinate.longitude,
        });
      }}
    >
      {selectedLocation && <Marker coordinate={selectedLocation} />}
      </MapView>
      <Button disabled={!selectedLocation} title="Confirm Selected Coordinate" onPress={confirmCoordinateHandler} />
      </>
  );
}

const styles = StyleSheet.create({ map: { flex: 1 } });