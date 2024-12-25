import { Animated, Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { memo, useEffect, useRef, useState } from 'react'
import FastImage from 'react-native-fast-image';

const AnimatedBall = memo(({
    width,
}) => {

    const animation = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.timing(animation, {
            toValue: 1,
            duration: 350,
            useNativeDriver: true,
        }).start();
    }, [])

    return (
        <Animated.View
            style={[styles.Object, {
                width: 18,
                right: width * 0.225,
                borderRadius: animation.interpolate({
                    inputRange: [0, 1],
                    outputRange: [10, 50],
                }),
                opacity: animation.interpolate({
                    inputRange: [0, 1],
                    outputRange: [1, 0],
                }),
                transform: [
                    {
                        rotate: animation.interpolate({
                            inputRange: [0, 1],
                            outputRange: ['240deg', '181deg'],
                        })
                    },
                    {
                        translateX: animation.interpolate({
                            inputRange: [0, 1],
                            outputRange: [0, ((width - 35) * 0.72)],
                        }),
                    },
                    {
                        scale: animation.interpolate({
                            inputRange: [0, 1],
                            outputRange: [1, 0.7]
                        })
                    }
                ],
            }]}
        />
    );
})

const SpwanAnimation = ({
    width = Dimensions.get('window').width,
}) => {

    const [views, setViews] = useState([]);
    const [items, setItems] = useState(0);

    const animation = useRef(new Animated.Value(0)).current;

    const handleButtonPress = () => {
        setItems(items + 1)
        setViews([...views.filter(i => i.id > items - 5), { id: items }]);
        StartAnimation();
    };

    const StartAnimation = () => {
        animation.setValue(0);
        Animated.timing(animation, {
            useNativeDriver: true,
            toValue: 1,
            duration: 350,
        }).start();
    }

    return (
        <View style={{ width: width }}>
            {views.map(view => <AnimatedBall key={view.id} width={width} />)}

            <View style={[styles.InnerContainer]}>
                <View style={styles.CartContainer}>
                    <FastImage
                        source={{ uri: 'https://www.freepnglogos.com/uploads/shopping-cart-png/shopping-cart-svg-png-icon-download-28.png' }}
                        style={styles.CartStyle}
                        resizeMode='contain'
                    />

                    {
                        items > 0 &&
                        <Animated.View
                            style={[styles.Object, {
                                position: 'absolute',
                                borderRadius: '50%',
                                aspectRatio: 1 / 1,
                                top: -7,
                                marginLeft: 28,
                                justifyContent: 'center',
                                alignItems: 'center',
                                transform: [
                                    {
                                        scale: animation.interpolate({
                                            inputRange: [0, 1],
                                            outputRange: [0.5, 1],
                                        })
                                    }
                                ],
                                elevation: animation.interpolate({
                                    inputRange: [0, 1],
                                    outputRange: [5, 0],
                                })
                            }]}
                        >
                            <Text style={styles.ItemCountText}>{items}</Text>
                        </Animated.View>
                    }
                </View>

                <TouchableOpacity
                    activeOpacity={1}
                    style={styles.Button}
                    onPress={handleButtonPress}
                >
                    <Text style={styles.Text}>
                        Add To Cart
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default memo(SpwanAnimation)

const styles = StyleSheet.create({
    Object: {
        width: 20,
        zIndex: 0,
        aspectRatio: 1 / 1,
        backgroundColor: 'rgba(0,0,0,1)',
        top: 0,
        position: 'absolute',
    },
    Button: {
        backgroundColor: 'rgba(0,0,0,1)',
        paddingVertical: 12,
        width: '50%',
        alignItems: 'center',
        borderRadius: 12,
    },
    CartContainer: {
        width: '50%',
    },
    CartStyle: {
        aspectRatio: 1 / 1,
        width: 35,
        tintColor: 'rgba(0,0,0,1)',
    },
    ItemCountText: {
        color: 'rgba(255,255,255,1)',
        fontSize: 10,
    },
    Text: {
        fontSize: 12,
        color: 'rgba(255, 255, 255, 1)',
    },
    InnerContainer: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
})