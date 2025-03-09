import { Animated, Dimensions, StyleSheet, View } from 'react-native'
import React, { memo, useEffect, useRef, } from 'react'
import AnimatedTabButton2 from './AnimatedTabButton2';
import Shape from './Shape';

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
        <View style={styles.TabBarContainer}>
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
                    ...TabAnimation.getTranslateTransform(),
                ],
            }]}>
                <View style={styles.TabBar} />

                <View style={{
                    height: '100%',
                    width: TabButtonWidth,
                    flexDirection: 'row',
                    justifyContent: 'center',
                }} >
                    <Shape width={TabButtonWidth} />
                </View>

                <View style={styles.TabBar} />
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
        paddingTop: 5,
        position: 'absolute',
        bottom: 0,
        zIndex: 10,
    },
    TabBar: {
        width: ScreenWidth,
        backgroundColor: "#5B37B7",
        height: '100%',
        marginHorizontal: -1,
    },
    SelectedTabContainer: {
        position: 'absolute',
        height: '150%',
        top: 0,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: -10,
    },
})