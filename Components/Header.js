import { StyleSheet, Text, View } from 'react-native'
import { StatusBar } from 'expo-status-bar';
import React from 'react'

export default function Header({name, children}) {
    return (
        <View>
            <Text>Welcome to {name}</Text>
            {children}
            <StatusBar style="auto" />
        </View>
    );
}

const styles = StyleSheet.create({})
