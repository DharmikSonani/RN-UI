import { Animated, Platform, StyleSheet, TouchableOpacity, } from 'react-native'
import React, { memo, useRef, useState } from 'react'

const Image3DFlipCard = ({
    background,
    forground,
}) => {

    const animation = useRef(new Animated.Value(0)).current;
    const [height, setHeight] = useState();

    const UpAnimation = () => {
        Animated.timing(animation, {
            toValue: 1,
            duration: 350,
            useNativeDriver: true,
        }).start()
    }
    const DownAnimation = () => {
        Animated.timing(animation, {
            toValue: 0,
            duration: 350,
            useNativeDriver: true,
        }).start()
    }
    return (
        <Animated.View
            style={styles.Container}
            onLayout={layout => setHeight(layout.nativeEvent.layout.height)}
        >
            <Animated.Image
                source={background}
                style={[styles.BackImage,
                Platform.OS == 'ios' ? {
                    transform: [
                        { perspective: height ?? 1 },
                        { translateY: height * 0.5 },
                        {
                            rotateX: animation.interpolate({
                                inputRange: [0, 1],
                                outputRange: ['0deg', '90deg']
                            })
                        },
                        { translateY: -height * 0.5 },
                    ]
                } : {
                    transform: [
                        { perspective: height ?? 1 },
                        {
                            translateY: animation.interpolate({
                                inputRange: [0, 1],
                                outputRange: [height * 0.5, height * 0.685]
                            })
                        },
                        {
                            rotateX: animation.interpolate({
                                inputRange: [0, 1],
                                outputRange: ['0deg', '75deg']
                            })
                        },
                        { translateY: -height * 0.5 },
                    ]
                }]}
            />

            <TouchableOpacity
                activeOpacity={1}
                onPressIn={UpAnimation}
                onPressOut={DownAnimation}
                style={styles.Card}
            >
                <Animated.Image
                    source={forground}
                    style={[styles.ForImage, {
                        transform: [
                            {
                                translateY: animation.interpolate({
                                    inputRange: [0, 1],
                                    outputRange: [height * 0.2, 0]
                                })
                            },
                            {
                                scale: animation.interpolate({
                                    inputRange: [0, 1],
                                    outputRange: [0.9, 1],
                                })
                            }
                        ]
                    }]}
                />
            </TouchableOpacity>
        </Animated.View>
    )
}

export default memo(Image3DFlipCard)

const styles = StyleSheet.create({
    Container: {
        flex: 1,
        aspectRatio: 1 / 1.5,
        marginHorizontal: 5,
        overflow: 'hidden',
    },
    Card: {
        height: '100%',
        width: '100%',
        alignItems: 'center',
        borderRadius: 7,
        position: 'absolute',
    },
    BackImage: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
        borderRadius: 7,
        zIndex: -1,
    },
    ForImage: {
        width: '100%',
        height: '100%',
        resizeMode: 'contain',
    }
})