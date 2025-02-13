import { Animated, Dimensions, StyleSheet, View } from 'react-native'
import React, { memo, useEffect, useRef, } from 'react'
import AnimatedTabButton2 from './AnimatedTabButton2';

const ScreenWidth = Dimensions.get("window").width;

export const AnimatedBottomTabBar2 = memo((props) => {
    const TabButtonWidth = ScreenWidth / props.state.routes.length;
    const TabAnimation = useRef(new Animated.ValueXY()).current;

    useEffect(() => {
        Animated.timing(TabAnimation, {
            useNativeDriver: true,
            toValue: { x: props.state.index * TabButtonWidth, y: 0 },
            duration: 300,
            delay: 50,
        }).start()
    }, [props.state.index])

    return (
        <Animated.View style={styles.TabBarContainer}>
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
                        <AnimatedTabButton2
                            key={i}
                            icon={options?.tabBarIcon()}
                            focused={focused}
                            onPress={onPress}
                            buttonSize={TabButtonWidth}
                        />
                    )
                })
            }

            {/* Animated Selected Tab  */}
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
                <View style={styles.SelectedTab} />

                {/* Right Round Corner */}
                <View
                    style={[styles.RoundCorners, {
                        borderTopRightRadius: 15,
                        transform: [{ rotate: "-57deg" }]
                    }]}
                />
            </Animated.View>
        </Animated.View>
    )
})

const styles = StyleSheet.create({
    TabBarContainer: {
        width: ScreenWidth,
        alignItems: 'center',
        flexDirection: 'row',
        paddingBottom: 25,
        paddingTop: 5,
        backgroundColor: "#5B37B7",
    },
    SelectedTabContainer: {
        position: 'absolute',
        height: '100%',
        top: 0,
        flexDirection: 'row',
        justifyContent: 'center',
        zIndex: -1,
        overflow: 'hidden',
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
        backgroundColor: "#5B37B7",
    },
})