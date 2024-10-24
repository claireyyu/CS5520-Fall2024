import { StyleSheet, Text, View, Dimensions, useWindowDimensions } from 'react-native'
import React from 'react'

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default function Header(props) {
    const { width, height } = useWindowDimensions();
    
    return (
        <View>
            <Text style={[styles.textStyle, {paddingVertical: height < 415 ? 0 : 10}]}>Welcome to {props.name}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    textStyle: {
        fontSize: 24,
        fontSize: windowWidth < 380 ? 20: 26,
        borderColor: 'purple',
        borderWidth: 2,
        padding: 5,
        marginBottom: 10,
    }
})
