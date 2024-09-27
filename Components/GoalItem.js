import { View, Text, StyleSheet, Button } from 'react-native'
import React from 'react'

const GoalItem = ({item, handleDelete}) => {
  return (
    <View key={item.id} style={styles.textContainer}>
      <Text style={styles.textStyle}>{item.text}</Text>
      <View style={styles.btn}>
      <Button title="x" onPress={() => {
        handleDelete(item.id)
        }}></Button>
      </View>
    </View>
    )
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
  },
  textContainer: {
    marginTop: 5,
    borderRadius: 5,
    backgroundColor: "white",
    padding: 10,
    flexDirection: "row",
    justifyItems: "space-between", 
    alignItems: "center",
  },
  textStyle: {
    color: "black",
    fontSize: 20,
  },
  btn: {
    marginLeft: 10,
  }
});


export default GoalItem