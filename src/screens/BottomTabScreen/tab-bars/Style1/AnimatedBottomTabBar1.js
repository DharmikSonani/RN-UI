import { Animated, Dimensions, View, StyleSheet } from 'react-native'
import React, { memo, useEffect, useRef } from 'react'
import AnimatedTabButton1 from './AnimatedTabButton1';
import Shape from './Shape';

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
                    <View style={styles.SelectedCircle} />
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
        position: 'absolute',
        bottom: 0,
        zIndex: 10,
    },
    TabBar: {
        width: ScreenWidth,
        backgroundColor: '#000',
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
    },
    SelectedCircle: {
        width: 50,
        aspectRatio: 1 / 1,
        borderRadius: 60,
        backgroundColor: '#17A9FF',
        top: -50 / 2,
        marginHorizontal: 22,
    },
})