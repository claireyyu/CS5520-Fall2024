import { View, Text, Pressable, StyleSheet } from 'react-native'
import React from 'react'

export default function PressableButton( {children, pressedFunction, componentStyle, pressedStyle} ) {
  return (
    <Pressable
      onPress={pressedFunction}
      style={
        ({ pressed }) => {
          return [styles.defaultStyle, componentStyle, pressed && styles.defaultPressedStyle, pressed && pressedStyle]
        }}
    >
      <View>{children}</View>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  defaultStyle: {
    backgroundColor: 'beige',
    borderRadius: 10,
  },
  defaultPressedStyle: {
    backgroundColor: 'white',
  }
})