import { StyleSheet, Text, View, TextInput } from 'react-native'
import { useState } from 'react';
import React from 'react'

export default function Input(props) {
  const [text, setText] = useState("");
    
  return (
    <View>
        < TextInput
        autoFocus={props.autoFocus}
        placeholder="Enter your name"
        keyboardType='default'
        style={{ borderBottomColor: "purple", borderWidth: 2 }}
        value={text}  /* it's used to bind the input field to a state variable (text); for clearing the input field */
        onChangeText={(text) => setText(text)}  /* onChangeText receives a function, the function receives the changed text */
        /* Passing callback function: Don't call the function! Just pass the function definition to it */
          />
        {text.length > 0 && (<Text>Character Count: {text.length}</Text>)}

    </View>
  )
}

const styles = StyleSheet.create({})