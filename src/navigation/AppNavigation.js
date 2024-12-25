import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import { Screens } from './helper';
import MainScreen from '../screens/MainScreen/MainScreen';
import SlideImageScreen from '../screens/SlideImageScreen/SlideImageScreen';
import Image3DFlipScreen from '../screens/Image3DFlipScreen/Image3DFlipScreen';
import Card3DScreen from '../screens/Card3DScreen/Card3DScreen';
import AnalogClockScreen from '../screens/AnalogClockScreen/AnalogClockScreen';

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
            <Stack.Screen
                name={Screens.Image3DFlipScreen}
                component={Image3DFlipScreen}
            />
            <Stack.Screen
                name={Screens.Card3DScreen}
                component={Card3DScreen}
            />
            <Stack.Screen
                name={Screens.AnalogClockScreen}
                component={AnalogClockScreen}
            />
        </Stack.Navigator>
    )
}

export default AppNavigation