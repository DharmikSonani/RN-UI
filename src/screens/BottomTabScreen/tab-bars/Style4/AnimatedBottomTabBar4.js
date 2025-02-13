import { Dimensions, View, StyleSheet, } from 'react-native'
import React, { memo } from 'react'
import AnimatedTabButton4 from './AnimatedTabButton4';

const ScreenWidth = Dimensions.get("window").width;

export const AnimatedBottomTabBar4 = memo((props) => {

    const TabButtonWidth = ScreenWidth / props.state.routes.length;

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
                        <AnimatedTabButton4
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
    )
})

const styles = StyleSheet.create({
    TabBarContainer: {
        width: ScreenWidth,
        backgroundColor: "#000",
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: { height: -2, width: -2 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
        paddingTop: 20,
        paddingBottom: 40,
        flexDirection: 'row',
    },
})