import { Animated, StyleSheet, TouchableOpacity, } from 'react-native'
import React, { memo, useEffect, useRef } from 'react'

export default AnimatedTabButton1 = memo(({ icon, onPress, focused, buttonSize }) => {

    const Animation = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.timing(Animation, {
            toValue: focused ? 1 : 0,
            useNativeDriver: true,
            duration: 300,
        }).start()
    }, [focused])

    return (
        <TouchableOpacity
            onPress={onPress}
            activeOpacity={1}
            style={[styles.TabButtonView, { width: buttonSize, }]}
        >
            <Animated.View
                style={[styles.Icon, {
                    transform: [{
                        translateY: Animation.interpolate({
                            inputRange: [0, 1],
                            outputRange: [0, -30],
                        })
                    },],
                }]}
            >
                {icon}
            </Animated.View>
        </TouchableOpacity >
    )
})

const styles = StyleSheet.create({
    TabButtonView: {
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 10,
    },
    Icon: {
        width: 60,
        aspectRatio: 1 / 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
})