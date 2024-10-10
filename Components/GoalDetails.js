import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { View, Text, Button } from 'react-native'
import React, { useState, useEffect } from 'react'

export default function GoalDetails({ navigation, route }) {
  const [isWarning, setIsWarning] = useState(false);
  const textStyle = isWarning ? 'red' : '';

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Button title="Warning" onPress={() => setIsWarning(true)} color="red" />
      )
    })

    if (isWarning) {
      navigation.setOptions({
        title: 'Warning!',
      })
    }
  }, [isWarning])

  return (
    <View>
      {route.params
        ? (<Text style={{color: textStyle}}>Detail of {route.params.currentItem.text} with {route.params.currentItem.id}</Text>)
        : (<Text style={{color: textStyle}}>More Details</Text>)
      }
      <Button title="More Details" onPress={() => {navigation.push('Details')}}/>
    </View>
  )
}