import { View, Text, StyleSheet, Button, Pressable, Alert } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native';
import PressableButton from './PressableButton';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';


const GoalItem = ({ item, handleDelete }) => {
  const navigation = useNavigation();

  function handleNavigation() {
    navigation.navigate('Details', { currentItem: item })
  }

  function handleLongPress() {
    Alert.alert(
      "Delete Goal",
      "Are you sure you want to delete this goal?",
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        { text: "OK", onPress: () => handleDelete(item.id) }
      ]
    );
  }

  return (
    <View key={item.id} style={styles.textContainer}>
      <Pressable onPress={handleNavigation}
        style={({pressed}) => {
          return [styles.horizontalContainer, pressed && styles.pressedStyle]
        }}
        android_ripple={{ color: "gray", radius: 20 }}
        onLongPress={handleLongPress}
      >
        <Text style={styles.textStyle}>{item.text}</Text>
        <View style={styles.btnContainer}>
          <PressableButton
            pressedFunction={() => {
              handleDelete(item.id)
            }}
            componentStyle={styles.deleteButton}
            pressedStyle={styles.pressedButtonStyle}>
            <MaterialIcons name="delete" size={24} color="black" />
          </PressableButton>
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
    backgroundColor: "white",
    padding: 10,
    flexDirection: "row",
    justifyItems: "space-between", 
    alignItems: "start",
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
    backgroundColor: 'white',
    opacity: 0.5,
  },
});


export default GoalItem