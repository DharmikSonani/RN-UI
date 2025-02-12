import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import { Screens } from './helper';
import MainScreen from '../screens/MainScreen/MainScreen';
import SlideImageScreen from '../screens/SlideImageScreen/SlideImageScreen';
import Image3DFlipScreen from '../screens/Image3DFlipScreen/Image3DFlipScreen';
import Card3DScreen from '../screens/Card3DScreen/Card3DScreen';
import AnalogClockScreen from '../screens/AnalogClockScreen/AnalogClockScreen';
import AddToCartScreen from '../screens/AddToCartScreen/AddToCartScreen';
import ImageSliderScreen from '../screens/ImageSliderScreen/ImageSliderScreen';
import DraggableScreen from '../screens/DraggableScreen/DraggableScreen';
import ImageSlider1Screen from '../screens/ImageSliderScreen/screens/ImageSlider1Screen';
import ImageSlider2Screen from '../screens/ImageSliderScreen/screens/ImageSlider2Screen';
import ShapeImageScreen from '../screens/ShapeImageScreen/ShapeImageScreen';
import ImageSlider3Screen from '../screens/ImageSliderScreen/screens/ImageSlider3Screen';

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
            <Stack.Screen
                name={Screens.AddToCartScreen}
                component={AddToCartScreen}
            />
            <Stack.Screen
                name={Screens.ImageSliderScreen}
                component={ImageSliderScreen}
            />
            <Stack.Screen
                name={Screens.ImageSlider1Screen}
                component={ImageSlider1Screen}
            />
            <Stack.Screen
                name={Screens.ImageSlider2Screen}
                component={ImageSlider2Screen}
            />
            <Stack.Screen
                name={Screens.ImageSlider3Screen}
                component={ImageSlider3Screen}
            />
            <Stack.Screen
                name={Screens.DraggableScreen}
                component={DraggableScreen}
            />
            <Stack.Screen
                name={Screens.ShapeImageScreen}
                component={ShapeImageScreen}
            />
        </Stack.Navigator>
    )
}

export default AppNavigation