import { StyleSheet, Text, View, TextInput } from 'react-native'
import { useState } from 'react';
import React from 'react'

export default function Input(prop) {
  const [text, setText] = useState("");
    
  return (
    <View>
        < TextInput
        placeholder="Enter your name"
        keyboardType='default'
        style={{ borderBottomColor: "purple", borderWidth: 2 }}
        value={text}  /* it's used to bind the input field to a state variable (text); for clearing the input field */
        onChangeText={(text) => setText(text)}  /* onChangeText receives a function, the function receives the changed text */
        /* Passing callback function: Don't call the function! Just pass the function definition to it */
      />
    </View>
  )
}

const styles = StyleSheet.create({})