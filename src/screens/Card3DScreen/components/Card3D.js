import { Animated, Dimensions, StyleSheet, TouchableOpacity, View } from 'react-native'
import React, { memo, useRef, useState } from 'react'
import FastImage from 'react-native-fast-image';

const width = Dimensions.get('window').width;

const Card3D = ({
    background,
    forground,
    title
}) => {

    const animation = useRef(new Animated.Value(0)).current;

    const [height, setHeight] = useState(1);

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
        <View
            style={styles.Container}
            onLayout={layout => setHeight(layout.nativeEvent.layout.height)}
        >
            <FastImage
                style={styles.BackImage}
                source={background}
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
                        opacity: animation.interpolate({
                            inputRange: [0, 1],
                            outputRange: [0, 1]
                        }),
                        transform: [
                            {
                                translateY: animation.interpolate({
                                    inputRange: [0.2, 1],
                                    outputRange: [0, -height * 0.2]
                                })
                            },
                            {
                                scale: animation.interpolate({
                                    inputRange: [0, 1],
                                    outputRange: [0.8, 1],
                                })
                            }
                        ]
                    }]}
                />
                <Animated.Image
                    source={title}
                    style={[styles.Title,
                    {
                        transform: [
                            {
                                translateY: animation.interpolate({
                                    inputRange: [0, 1],
                                    outputRange: [0, -height * 0.03]
                                })
                            },
                            {
                                scale: animation.interpolate({
                                    inputRange: [0, 1],
                                    outputRange: [1, 1.1],
                                })
                            }
                        ]
                    }]}
                />
            </TouchableOpacity>
        </View>
    )
}

export default memo(Card3D)

const styles = StyleSheet.create({
    Container: {
        width: width,
        aspectRatio: 1 / 1.45,
    },
    Card: {
        width: '100%',
        height: '100%',
        alignItems: 'center',
        position: 'absolute',
        justifyContent: 'flex-end',
        elevation: 30,
        shadowOpacity: 0,
    },
    BackImage: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
        zIndex: -20,
    },
    ForImage: {
        width: '100%',
        height: '100%',
        resizeMode: 'contain',
        position: 'absolute',
    },
    Title: {
        width: '100%',
        height: '25%',
        resizeMode: 'contain',
        position: 'absolute',
        bottom: 0,
    }
})