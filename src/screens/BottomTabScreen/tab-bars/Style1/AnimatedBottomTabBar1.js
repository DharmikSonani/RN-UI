import { Animated, Dimensions, View, StyleSheet } from 'react-native'
import React, { memo, useEffect, useRef } from 'react'
import AnimatedTabButton1 from './AnimatedTabButton1';

const ScreenWidth = Dimensions.get("window").width;

export const AnimatedBottomTabBar1 = memo((props) => {

    const TabButtonWidth = ScreenWidth / props.state.routes.length;
    const TabAnimation = useRef(new Animated.ValueXY()).current;

    useEffect(() => {
        Animated.timing(TabAnimation, {
            useNativeDriver: true,
            toValue: { x: props.state.index * TabButtonWidth, y: 0 },
            duration: 300,
        }).start()
    }, [props.state.index])

    return (
        <View style={styles.TabBarContainer}>

            {/* Tab Bar Buttons */}
            {
                props.state.routes.map((route, i) => {

                    const { options } = props.descriptors[route.key];
                    const focused = props.state.index === i;

                    const onPress = () => {
                        const event = props.navigation.emit({
                            type: 'tabPress',
                            target: route.key,
                            canPreventDefault: true,
                        });
                        if (!focused && !event.defaultPrevented) {
                            props.navigation.navigate(route.name);
                        }
                    };

                    return (
                        <AnimatedTabButton1
                            key={i}
                            icon={options?.tabBarIcon()}
                            focused={focused}
                            onPress={onPress}
                            buttonSize={TabButtonWidth}
                        />
                    )
                })
            }

            {/* Selected Tab View */}
            <Animated.View style={[styles.SelectedTabContainer, {
                width: TabButtonWidth,
                transform: [
                    ...TabAnimation.getTranslateTransform()
                ],
            }]}>

                {/* Left Round Corner */}
                <View
                    style={[styles.RoundCorners, {
                        borderTopLeftRadius: 15,
                        transform: [{ rotate: "57deg" }]
                    }]}
                />

                {/* Middle White Circle */}
                <View style={styles.SelectedTab}>

                    {/* Blue Selected Circle */}
                    <View
                        style={styles.SelectedCircle}
                    />
                </View>

                {/* Right Round Corner */}
                <View
                    style={[styles.RoundCorners, {
                        borderTopRightRadius: 15,
                        transform: [{ rotate: "-57deg" }]
                    }]}
                />
            </Animated.View>
        </View>
    )
})

const styles = StyleSheet.create({
    TabBarContainer: {
        width: ScreenWidth,
        alignItems: 'center',
        flexDirection: 'row',
        paddingBottom: 20,
        backgroundColor: "#000000",
    },
    SelectedTabContainer: {
        position: 'absolute',
        height: '100%',
        top: 0,
        flexDirection: 'row',
        justifyContent: 'center',
    },
    SelectedTab: {
        width: 65,
        padding: 8,
        aspectRatio: 1 / 1,
        borderBottomRightRadius: 32,
        borderTopLeftRadius: 40,
        transform: [{ rotate: "45deg" }],
        top: -32.5,
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: -1,
        backgroundColor: '#fff',
    },
    RoundCorners: {
        width: 30,
        aspectRatio: 1 / 1,
        backgroundColor: "#000",
    },
    SelectedCircle: {
        width: "100%",
        aspectRatio: 1 / 1,
        borderRadius: 60,
        backgroundColor: '#17A9FF',
    },
})