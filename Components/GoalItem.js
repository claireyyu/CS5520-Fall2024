import { View, Text, StyleSheet } from 'react-native'
import React from 'react'

const GoalItem = ({item}) => {
  return (
    <View key={item.id} style={styles.textContainer}>
      <Text style={styles.textStyle}>{item.text}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  textContainer: {
    marginTop: 5,
    borderRadius: 5,
    backgroundColor: "white",
    padding: 50,
  },
  textStyle: {
    color: "black",
    fontSize: 50,
    textAlign: "center",
  },
});


export default GoalItem