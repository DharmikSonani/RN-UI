import { Animated, Dimensions, View, StyleSheet, Platform } from 'react-native'
import React, { memo, useEffect, useRef } from 'react'
import AnimatedTabButton3 from './AnimatedTabButton3';

const ScreenWidth = Dimensions.get("window").width;

export const AnimatedBottomTabBar3 = memo((props) => {

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
        <View style={styles.TabBarOuterContainer}>
            <View style={styles.TabBarInnerContainer}>
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
                            <AnimatedTabButton3
                                key={i}
                                Data={options?.params}
                                focused={focused}
                                onPress={onPress}
                                buttonSize={TabButtonWidth}
                            />
                        )
                    })
                }
            </View>

            {/* Selected Tab View */}
            <Animated.View style={[styles.SelectedTabContainer, {
                width: TabButtonWidth,
                transform: [
                    ...TabAnimation.getTranslateTransform()
                ],
            }]}>
                {/* Middle White Circle */}
                <View style={styles.SelectedTab} />
            </Animated.View>
        </View>
    )
})

const styles = StyleSheet.create({
    TabBarOuterContainer: {
        width: ScreenWidth,
        backgroundColor: "#fff",
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: { height: -2, width: -2 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
    },
    TabBarInnerContainer: {
        width: ScreenWidth,
        alignItems: 'center',
        flexDirection: 'row',
        paddingBottom: 15,
        backgroundColor: "#fff",
    },
    SelectedTabContainer: {
        position: 'absolute',
        height: '100%',
        top: 0,
        flexDirection: 'row',
        justifyContent: 'center',
        zIndex: -1,
    },
    SelectedTab: {
        width: 65,
        padding: 8,
        aspectRatio: 1 / 1,
        borderTopLeftRadius: 50,
        borderTopRightRadius: 50,
        top: -37.5,
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: { height: -2, width: -2 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
        backgroundColor: '#fff',
    },
})