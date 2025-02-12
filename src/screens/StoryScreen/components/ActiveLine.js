import { Animated, StyleSheet, View } from 'react-native'
import React, { memo, useEffect, useRef, } from 'react'

const ActiveLine = ({
    duration,
    isActive,
    onLayout,
    width,
    index,
    current,
}) => {

    const _animation = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        current > index ? _animation.setValue(1) : _animation.setValue(0)
        if (isActive) {
            Animated.timing(_animation, {
                toValue: 1,
                duration: duration,
                useNativeDriver: false,
            }).start();
        }
    }, [isActive, current])

    return (
        <View
            style={styles.Container}
            onLayout={onLayout}
        >
            <Animated.View style={[styles.AnimatedLine, {
                width: _animation.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, width],
                }),
            }]} />
        </View>
    )
}

export default memo(ActiveLine)

const styles = StyleSheet.create({
    Container: {
        backgroundColor: '#ffffff50',
        height: 2,
        flex: 1,
        marginHorizontal: 2,
        borderRadius: 1,
    },
    AnimatedLine: {
        backgroundColor: '#fff',
        height: '100%',
        borderRadius: 1,
    }
})