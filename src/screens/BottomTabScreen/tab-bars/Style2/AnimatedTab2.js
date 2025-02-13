import React, { memo } from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Screens } from '../../tab-screens/TabScreenList';
import { AnimatedBottomTabBar2 } from './AnimatedBottomTabBar2';

const Tab = createBottomTabNavigator();

const AnimatedTab2 = memo(() => {
    return (
        <Tab.Navigator
            screenOptions={{
                tabBarStyle: {
                    backgroundColor: 'transparent',
                },
                tabBarShowLabel: false,
                headerShown: false,
            }}
            tabBar={(props) => (<AnimatedBottomTabBar2 {...props} />)}
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
})

export default AnimatedTab2