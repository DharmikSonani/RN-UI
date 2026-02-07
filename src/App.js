import { StatusBar, StyleSheet, LogBox } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import AppNavigation from './navigation/AppNavigation'

// Suppress InteractionManager deprecation warning from React Navigation
LogBox.ignoreLogs(['InteractionManager has been deprecated'])

const App = () => {
  return (
    <>
      <StatusBar
        translucent
        backgroundColor={`#00000000`}
        hidden
      />
      <NavigationContainer>
        <AppNavigation />
      </NavigationContainer>
    </>
  )
}

export default App

const styles = StyleSheet.create({})