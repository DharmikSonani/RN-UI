import { Animated, Image, StyleSheet, TouchableOpacity, View, } from 'react-native'
import React, { memo, useRef, useState } from 'react'

const ToggleButton = ({ width }) => {

    const [toggle, setToggle] = useState(false);
    const Time = useRef(new Animated.Value(toggle ? 1 : 0)).current;
    const Spring = useRef(new Animated.Value(toggle ? 1 : 0)).current;

    const Colors = {
        Night: 'rgba(29,31,44,1)',
        Day: 'rgba(81,139,179,1)',
        BDay: 'rgba(236,202,53,1)',
        BNight: 'rgba(194,201,209,1)'
    }

    const StartAnimation = () => {
        Animated.timing(Time, {
            toValue: toggle ? 0 : 1,
            duration: 250,
            useNativeDriver: true,
        }).start()
        Animated.spring(Spring, {
            toValue: toggle ? 0 : 1,
            useNativeDriver: true,
            friction: 6,
        }).start()
        setToggle(!toggle);
    }

    return (
        <View style={[
            styles.ToggleContainer,
            { width: width, }
        ]}>
            <TouchableOpacity
                style={[styles.Button, {
                    backgroundColor: Time.interpolate({
                        inputRange: [0, 1],
                        outputRange: [Colors.Day, Colors.Night]
                    }),
                    borderColor: Time.interpolate({
                        inputRange: [0, 1],
                        outputRange: [Colors.Day, Colors.Night]
                    })
                }]}
                activeOpacity={1}
                onPress={() => {
                    StartAnimation();
                }}
            >
                {/* Main Circle */}
                <Animated.View
                    style={[
                        styles.Circle, {
                            width: width * 0.48,
                            backgroundColor: Colors.BDay,
                            transform: [{
                                translateX: Time.interpolate({
                                    inputRange: [0, 1],
                                    outputRange: [(width * 0.03), (width * 0.4888888)]
                                })
                            }]
                        },
                    ]} >
                    <View style={{
                        width: '100%',
                        height: '100%',
                        borderRadius: 100,
                        overflow: 'hidden',
                    }}>
                        <Animated.View
                            style={[
                                styles.Circle, {
                                    backgroundColor: Colors.BNight,
                                    transform: [{
                                        translateX: Time.interpolate({
                                            inputRange: [0, 1],
                                            outputRange: [width * 0.49, 0]
                                        })
                                    }]
                                },
                            ]} >
                            <Image
                                source={require('./assets/ns.png')}
                                style={{ width: '100%', height: '100%' }}
                                resizeMode='contain'
                            />
                        </Animated.View>
                    </View>
                </Animated.View>

                {/* C1 */}
                <Animated.View
                    style={[
                        styles.BackCircles, {
                            width: width * 0.64,
                            zIndex: -20,
                            transform: [{
                                translateX: Spring.interpolate({
                                    inputRange: [0, 1],
                                    outputRange: [0, width * 0.36]
                                })
                            }]
                        },
                    ]} />

                {/* C2 */}
                <Animated.View
                    style={[
                        styles.BackCircles, {
                            width: width * 0.78,
                            zIndex: -30,
                            transform: [{
                                translateX: Spring.interpolate({
                                    inputRange: [0, 1],
                                    outputRange: [0, width * 0.22]
                                })
                            }]
                        },
                    ]} />

                <Animated.Image
                    source={require("./assets/cf.png")}
                    style={[styles.ImageBg, {
                        opacity: 0.9,
                        width: width,
                        height: width * 0.55,
                        transform: [{
                            translateY: Time.interpolate({
                                inputRange: [0, 1],
                                outputRange: [0, width * 0.555555]
                            })
                        }]
                    }]}
                />

                <Animated.Image
                    source={require("./assets/cb.png")}
                    style={[styles.ImageBg, {
                        zIndex: -40,
                        opacity: 0.4,
                        width: width,
                        height: width * 0.55,
                        transform: [{
                            translateY: Time.interpolate({
                                inputRange: [0, 1],
                                outputRange: [0, width * 0.555555]
                            })
                        }]
                    }]}
                />

                <Animated.Image
                    source={require("./assets/stars.png")}
                    style={[styles.ImageBg, {
                        zIndex: 40,
                        width: width,
                        height: width * 0.55,
                        transform: [{
                            translateY: Spring.interpolate({
                                inputRange: [0, 1],
                                outputRange: [-width * 0.555555, 0]
                            })
                        }]
                    }]}
                />
            </TouchableOpacity>
        </View>
    )
}

export default memo(ToggleButton)

const styles = StyleSheet.create({

    Button: {
        aspectRatio: 1.82 / 1,
        justifyContent: 'center',
        borderRadius: 300,
        overflow: 'hidden',
    },
    Circle: {
        aspectRatio: 1 / 1,
        borderRadius: 200,
        backgroundColor: '#fff',
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { height: 1.5, width: 1.5, },
        shadowOpacity: 0.4,
        shadowRadius: 4,
        zIndex: 100,
    },
    BackCircles: {
        aspectRatio: 1 / 1,
        borderRadius: 200,
        backgroundColor: 'rgba(255,255,255,0.15)',
        position: 'absolute',
    },
    ImageBg: {
        resizeMode: 'cover',
        tintColor: '#fff',
        position: 'absolute',
        zIndex: 10,
    }
})