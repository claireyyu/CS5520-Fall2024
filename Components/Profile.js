import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import { auth } from '../Firebase/firebaseSetup'
import LocationManager from './LocationManager'
import { useState } from 'react'

const Profile = ({ route }) => {
  const user = auth.currentUser;

  return (
    <View>
      <Text>{user.email}</Text>
      <Text>{user.uid}</Text>
      <LocationManager />
    </View>
  )
}

export default Profile

const styles = StyleSheet.create({})