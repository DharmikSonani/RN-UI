import React, { memo } from 'react'
import Icon from 'react-native-vector-icons/Ionicons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { AnimatedBottomTabBar3 } from './AnimatedBottomTabBar3';
import Home from '../../tab-screens/Home';
import Fevourite from '../../tab-screens/Fevourite';
import Profile from '../../tab-screens/Profile';
import Setting from '../../tab-screens/Setting';

const Tab = createBottomTabNavigator();

const AnimatedTab3 = () => {
    return (
        <Tab.Navigator
            screenOptions={{
                tabBarStyle: {
                    backgroundColor: '#fff',
                    elevation: 5,
                },
                tabBarShowLabel: false,
                headerShown: false,
            }}
            tabBar={(props) => (<AnimatedBottomTabBar3 {...props} />)}
        >
            {
                Screens.map((Screen, i) =>
                    <Tab.Screen
                        key={i}
                        name={Screen.name}
                        component={Screen.component}
                        options={{
                            headerShown: false,
                            params: {
                                Icon: Screen.icon,
                                name: Screen.iconname,
                                bg: Screen.bg,
                            }
                        }}
                    />
                )
            }
        </Tab.Navigator>
    )
}

export default AnimatedTab3

const Screens = [
    {
        name: "Home",
        component: Home,
        icon: Icon,
        iconname: "home-outline",
        bg: 'rgba(33,150,246,1)',
    },
    {
        name: "Favourite",
        component: Fevourite,
        icon: Icon,
        iconname: "heart-outline",
        bg: 'rgba(243,67,52,1)',
    },
    {
        name: "Profile",
        component: Profile,
        icon: Icon,
        iconname: "person-outline",
        bg: 'rgba(254,161,22,1)',
    },
    {
        name: "Setting",
        component: Setting,
        icon: Icon,
        iconname: "settings-outline",
        bg: 'rgba(179,68,233,1)',
    },
]