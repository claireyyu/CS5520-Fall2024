import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { View, Text } from 'react-native'


export default function GoalDetails({ navigation, route }) {
  return (
    <View>
      <Text>{route.params.pressedItem.text}</Text>
    </View>
  )
}