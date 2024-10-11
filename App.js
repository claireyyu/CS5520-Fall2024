import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './Components/Home'
import GoalDetails from './Components/GoalDetails'
import { Button } from 'react-native'

export default function App() {
  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{
        headerStyle: { backgroundColor: 'purple' },
        headerTintColor: 'white'
      }}>
        <Stack.Screen name="Home" component={Home}
          options={{
            title: "All My Goals"
          }}/>
        <Stack.Screen name="Details" component={GoalDetails} options={({route, navigation}) => ({
          title: route.params ? `${route.params.currentItem.text}` : 'More Details',
        })} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}
