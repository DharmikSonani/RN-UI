import { Animated, StyleSheet, TouchableOpacity, } from 'react-native'
import React, { memo, useEffect, useRef } from 'react'

export default AnimatedTabButton4 = memo(({ Data, onPress, focused, buttonSize }) => {

    const Animation = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.timing(Animation, {
            toValue: focused ? 1 : 0,
            useNativeDriver: false,
            duration: 500,
        }).start()
    }, [focused])

    return (
        <TouchableOpacity
            onPress={onPress}
            activeOpacity={1}
            style={[styles.TabButtonView, { width: buttonSize, }]}
        >
            <Animated.View
                style={[styles.ActiveLine, {
                    backgroundColor: Data.bg,
                    transform: [{
                        translateY: Animation.interpolate({
                            inputRange: [0, 1],
                            outputRange: [0, 50]
                        })
                    }]
                }]}
            />
            <Animated.View
                style={styles.Icon}
            >
                <Data.Icon name={Data.name} size={30} color={Data.bg} />
            </Animated.View>
            <Animated.View
                style={[styles.Icon, {
                    height: Animation.interpolate({
                        inputRange: [0, 1],
                        outputRange: [50, 0]
                    }),
                    opacity: Animation.interpolate({
                        inputRange: [0, 1],
                        outputRange: [1, 0]
                    }),
                    position: 'absolute',
                }]}
            >
                <Data.Icon name={Data.name} size={30} color={"#ffffff30"} />
            </Animated.View>
        </TouchableOpacity >
    )
})

const styles = StyleSheet.create({
    TabButtonView: {
        alignItems: 'center',
        justifyContent: 'flex-end',
    },
    Icon: {
        padding: 2,
        alignItems: 'center',
        justifyContent: 'flex-end',
        borderRadius: 60,
        backgroundColor: '#000',
    },
    ActiveLine: {
        position: 'absolute',
        width: 50,
        height: 5,
        zIndex: 1,
        top: -10,
        borderRadius: 20,
    },
})