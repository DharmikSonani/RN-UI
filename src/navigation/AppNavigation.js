import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import { Screens } from './helper';
import MainScreen from '../screens/MainScreen/MainScreen';
import SlideImageScreen from '../screens/SlideImageScreen/SlideImageScreen';

const Stack = createStackNavigator();

const AppNavigation = () => {
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false,
            }}
        >
            <Stack.Screen
                name={Screens.MainScreen}
                component={MainScreen}
            />
            <Stack.Screen
                name={Screens.SlideImageScreen}
                component={SlideImageScreen}
            />
        </Stack.Navigator>
    )
}

export default AppNavigation