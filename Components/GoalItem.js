import { View, Text, StyleSheet, Button } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native';

const GoalItem = ({ item, handleDelete }) => {
  const navigation = useNavigation();

  return (
    <View key={item.id} style={styles.textContainer}>
      <Text style={styles.textStyle}>{item.text}</Text>
      <View style={styles.btnContainer}>
      <Button title="x" onPress={() => {
        handleDelete(item.id)
        }}></Button>
      <Button title="i" onPress={() => navigation.navigate('Details', {currentItem: item})} color="grey" />
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
  btnContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginLeft: 10,
  }
});


export default GoalItem