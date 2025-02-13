import { Animated, StyleSheet, } from 'react-native'
import React, { memo } from 'react'
import FastImage from 'react-native-fast-image';

const TinderSwipeCard = ({
    data,
    isFirst,
    swipe,
    height,
    width,
    ...rest
}) => {

    const rotate = swipe.x.interpolate({
        inputRange: [-100, 0, 100],
        outputRange: ["-10deg", "0deg", "10deg"]
    })

    const opacity = swipe.x.interpolate({
        inputRange: [-200, 0, 200],
        outputRange: [0, 1, 0]
    })

    return (
        <Animated.View
            style={[styles.CardContainer, {
                height: height,
                width: width,
            }, isFirst && {
                transform: [...swipe.getTranslateTransform(), { rotate: rotate }],
                opacity: opacity,
                elevation: 10,
                shadowColor: '#0f0f0f',
                shadowOffset: { height: 10 },
                shadowOpacity: 0.5,
                shadowRadius: 10,
            }]}
            {...rest}
        >
            <FastImage
                style={styles.CardImage}
                source={{ uri: data.img }}
            />
        </Animated.View>
    )
}

export default memo(TinderSwipeCard)

const styles = StyleSheet.create({
    CardContainer: {
        position: 'absolute',
        borderRadius: 20,
        backgroundColor: '#fff',
    },
    CardImage: {
        height: '100%',
        width: '100%',
        resizeMode: 'cover',
        borderRadius: 20,
    },
})