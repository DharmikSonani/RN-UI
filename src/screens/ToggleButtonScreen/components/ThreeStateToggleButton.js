import { Animated, StyleSheet, TouchableOpacity, View, } from 'react-native'
import React, { memo, useEffect, useRef, useState } from 'react'

const ThreeStateToggleButton = ({
    width,
    value,
    onStateChange = () => { }
}) => {

    const [toggle, setToggle] = useState(value);
    const Time = useRef(new Animated.Value(toggle == 'On' ?
        0
        :
        toggle == 'PauseO' ?
            0.5
            :
            toggle == 'Off' ?
                1
                :
                0.5)).current;

    const Colors = {
        On: 'rgba(33,150,83,1)',
        Off: 'rgba(126,128,138,1)',
        Pause: 'rgba(242,181,0,1)',
    }

    const StartAnimation = () => {
        Animated.timing(Time, {
            toValue: toggle == 'On' ?
                0.5
                :
                toggle == 'PauseO' ?
                    1
                    :
                    toggle == 'Off' ?
                        0.5
                        :
                        0
            ,
            duration: 250,
            useNativeDriver: false,
        }).start()
        setToggle(
            toggle == 'On' ? 'PauseO' : toggle == 'PauseO' ? 'Off' : toggle == 'Off' ? 'PauseF' : 'On'
        );
    }

    useEffect(() => {
        onStateChange(toggle);
    }, [toggle])

    return (
        <View style={[
            { width: width, }
        ]}>
            <TouchableOpacity
                style={[styles.Button, {
                    borderColor: 'rgba(245,244,245,1)',
                    backgroundColor: '#fff',
                    borderWidth: 1,
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
                            width: width * 0.38,
                            backgroundColor: Time.interpolate({
                                inputRange: [0, 0.5, 1],
                                outputRange: [Colors.On, Colors.Pause, Colors.Off]
                            }),
                            transform: [{
                                translateX: Time.interpolate({
                                    inputRange: [0, 1],
                                    outputRange: [0, (width * 0.6)]
                                })
                            }]
                        },
                    ]} >

                </Animated.View>

            </TouchableOpacity>
        </View>
    )
}

export default memo(ThreeStateToggleButton)

const styles = StyleSheet.create({
    Button: {
        aspectRatio: 2.5 / 1,
        justifyContent: 'center',
        borderRadius: 300,
    },
    Circle: {
        aspectRatio: 1 / 1,
        borderRadius: 200,
        elevation: 2,
        shadowOffset: { height: 1.5, width: 1.5, },
        shadowOpacity: 0.4,
        shadowRadius: 4,
        zIndex: 100,
    },
})