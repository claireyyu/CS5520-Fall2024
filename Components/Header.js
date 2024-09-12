import { StyleSheet, Text, View } from 'react-native'
import { StatusBar } from 'expo-status-bar';
import React from 'react'

export default function Header({name}) {
    return (
        <View>
            <Text>Welcome to {name}</Text>
            <StatusBar style="auto" />
        </View>
    );
}

const styles = StyleSheet.create({})
