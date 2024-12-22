import { StatusBar, StyleSheet, } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import AppNavigation from './navigation/AppNavigation'

const App = () => {
  return (
    <>
      <StatusBar
        translucent
        hidden={true}
      />
      <NavigationContainer>
        <AppNavigation />
      </NavigationContainer>
    </>
  )
}

export default App

const styles = StyleSheet.create({})