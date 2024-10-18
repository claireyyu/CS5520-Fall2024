import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { View, Text, Button, StyleSheet } from 'react-native'
import React, { useState, useEffect } from 'react'
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import PressableButton from './PressableButton';
import { updateWarning } from '../Firebase/firestoreHelper';

export default function GoalDetails({ navigation, route }) {
  const [isWarning, setIsWarning] = useState(false);
  const textStyle = isWarning ? 'red' : '';
  const collectionName = 'goals';

  function handleWarningPressed() {
    updateWarning(route.params.currentItem.id, collectionName);
    setIsWarning(true)
  }

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <PressableButton
          pressedFunction={handleWarningPressed}
          componentStyle={styles.iconStyle}
          pressedStyle={styles.iconPressedStyle}
        >
          <MaterialIcons name="warning" size={24} color="yellow" />
        </PressableButton>
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
  iconStyle: {
    backgroundColor: 'purple',
  },
  iconPressedStyle: {
    backgroundColor: 'purple',
    opacity: 0.5,
  }
})