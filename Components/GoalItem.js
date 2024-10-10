import { View, Text, StyleSheet, Button, Pressable } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native';
import PressableButton from './PressableButton';
import Feather from '@expo/vector-icons/Feather';


const GoalItem = ({ item, handleDelete }) => {
  const navigation = useNavigation();

  return (
    <View key={item.id} style={styles.textContainer}>
      <Pressable onPress={() => navigation.navigate('Details', { currentItem: item })}
        style={({pressed}) => {
          return [styles.horizontalContainer, pressed && styles.pressedStyle]
        }}
        android_ripple={{color: "gray", radius: 20}}
      >
        <Text style={styles.textStyle}>{item.text}</Text>
        <View style={styles.btnContainer}>
          <PressableButton
            pressedFunction={() => {
              handleDelete(item.id)
            }}
            componentStyle={styles.deleteButton}
            pressedStyle={styles.pressedButtonStyle}>
            {/* <Text style={styles.deleteButton}>X</Text> */}
            <Feather name="trash" size={24} color="black" />
          </PressableButton>
          {/* <Button title="x" onPress={() => {
            handleDelete(item.id)
            }}></Button> */}
          {/* <Button title="i" onPress={() => navigation.navigate('Details', {currentItem: item})} color="grey" /> */}
        </View>
      </Pressable>
    </View>
    )
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
  },
  horizontalContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  pressedStyle: {
    backgroundColor: 'grey',
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
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
    marginTop: 5,
  },
  deleteButton: {
    backgroundColor: 'white',
  },
  pressedButtonStyle: {
    backgroundColor: 'grey',
  },
});


export default GoalItem