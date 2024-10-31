import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './Components/Home'
import GoalDetails from './Components/GoalDetails'
import { Button } from 'react-native';
import React, { useState, useEffect } from 'react';
import SignUpForm from './Components/SignUpForm';
import LoginForm from './Components/LoginForm';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './Firebase/firebaseSetup';
import Profile from './Components/Profile';
import PressableButton from './Components/PressableButton';
import AntDesign from '@expo/vector-icons/AntDesign';


const Stack = createNativeStackNavigator();

const AuthStack = (
  <>
    <Stack.Screen name="Login" component={LoginForm}
      options={({route, navigation}) => ({
        title: 'Login',
      })}
    />
    <Stack.Screen name="SignUp" component={SignUpForm}
    options={({route, navigation}) => ({
      title: 'Sign Up',
    })} />
  </>
)

const AppStack = (
  <>

    <Stack.Screen name="Home" component={Home}
      options={({route, navigation}) => ({
        title: 'All My Goals',
        headerRight: () => (
          <PressableButton
            componentStyle={{backgroundColor: 'purple'}}
            pressedFunction={() => navigation.navigate('Profile')}
          >
            <AntDesign name="user" size={24} color="white" />
          </PressableButton>
        ),
      })} />
    <Stack.Screen name="Profile" component={Profile}
      options={{
      title: "Profile",
    }}/>
    <Stack.Screen name="Details" component={GoalDetails} options={({route, navigation}) => ({
      title: route.params ? `${route.params.currentItem.text}` : 'More Details',
    })} />
  </>
)

export default function App() {
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      console.log("Checking user status", user);
      if (user) {
        setIsUserLoggedIn(true);
      } else {
        setIsUserLoggedIn(false);
      }
    })
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{
        headerStyle: { backgroundColor: 'purple' },
        headerTintColor: 'white'
      }}>
        {isUserLoggedIn ? AppStack : AuthStack}
      </Stack.Navigator>
    </NavigationContainer>
  )
}
