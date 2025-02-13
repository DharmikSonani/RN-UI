import React, { memo } from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { AnimatedBottomTabBar1 } from './AnimatedBottomTabBar1';
import { Screens } from '../../tab-screens/TabScreenList';

const Tab = createBottomTabNavigator();

const AnimatedTab1 = () => {
    return (
        <Tab.Navigator
            screenOptions={{
                tabBarStyle: {
                    backgroundColor: 'transparent',
                },
                tabBarShowLabel: false,
                headerShown: false,
            }}
            tabBar={(props) => (<AnimatedBottomTabBar1 {...props} />)}
        >
            {
                Screens.map((Screen, i) =>
                    <Tab.Screen
                        key={i}
                        name={Screen.name}
                        component={Screen.component}
                        options={{
                            headerShown: false,
                            tabBarIcon: () => Screen.icon
                        }}
                    />
                )
            }
        </Tab.Navigator>
    )
}

export default AnimatedTab1