import { Animated, StyleSheet, TouchableOpacity, } from 'react-native'
import React, { memo, useEffect, useRef } from 'react'

export default AnimatedTabButton3 = memo(({ Data, onPress, focused, buttonSize }) => {

    const Animation = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.timing(Animation, {
            toValue: focused ? 1 : 0,
            useNativeDriver: true,
            duration: 350,
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
                }, focused && {
                    backgroundColor: Data.bg,
                    elevation: 10,
                    shadowColor: Data.bg,
                    shadowOffset: { height: 2 },
                    shadowOpacity: 0.5,
                    shadowRadius: 10,
                }]}
            >
                <Data.Icon name={Data.name} size={22} color={focused ? "#fff" : "#000"} />
            </Animated.View>
        </TouchableOpacity >
    )
})

const styles = StyleSheet.create({
    TabButtonView: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    Icon: {
        width: 50,
        aspectRatio: 1 / 1,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 60,
    },
})