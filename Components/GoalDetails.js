import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { View, Text, Button } from 'react-native'


export default function GoalDetails({ navigation, route }) {
  return (
    <View>
      {route.params
        ? (<Text>Detail of {route.params.currentItem.text} with {route.params.currentItem.id}</Text>)
        : (<Text>More Details</Text>)
      }
      <Button title="More Details" onPress={() => {navigation.push('Details')}} />
    </View>
  )
}