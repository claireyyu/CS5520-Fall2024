import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { View, Text, Button, StyleSheet } from 'react-native'
import React, { useState, useEffect } from 'react'
import Entypo from '@expo/vector-icons/Entypo';

export default function GoalDetails({ navigation, route }) {
  const [isWarning, setIsWarning] = useState(false);
  const textStyle = isWarning ? 'red' : '';

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Entypo name="warning" size={24} color="yellow" />
        // <Button title="Warning" onPress={() => setIsWarning(true)} color="red" />
      )
    })

    if (isWarning) {
      navigation.setOptions({
        title: 'Warning!',
      })
    }
  }, [isWarning])

  return (
    <View style={styles.container}>
      {route.params
        ? (<Text style={{color: textStyle}}>Detail of {route.params.currentItem.text} with {route.params.currentItem.id}</Text>)
        : (<Text style={{color: textStyle}}>More Details</Text>)
      }
      <View style={styles.buttonContainer}>
        <Button title="More Details" onPress={() => { navigation.push('Details') }} />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  buttonContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
})