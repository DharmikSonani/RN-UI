import { Animated, Dimensions, StyleSheet, View } from 'react-native'
import React, { memo, useEffect, useRef, useState } from 'react'
import FastImage from 'react-native-fast-image';

const width = Dimensions.get('window').width;
const item_width = width * 0.7;
const paddingHorizontal = (width - item_width) / 2;

const ImageSlider4 = ({
    data,
}) => {

    const animation = useRef(new Animated.Value(0)).current;

    const startAnimation = (toValue) => {
        Animated.timing(animation, {
            toValue: toValue,
            duration: 200,
            useNativeDriver: true,
        }).start()
    }

    return (
        <Animated.FlatList
            data={data}
            keyExtractor={(item, index) => index}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            renderItem={({ item, index }) => {
                return (
                    <View style={styles.Container}>
                        <Animated.View style={[styles.Card, {
                            transform: [
                                {
                                    perspective: item_width * 3
                                },
                                {
                                    rotateY: animation.interpolate({
                                        inputRange: [0, 1],
                                        outputRange: ['0deg', '22.5deg']
                                    })
                                }
                            ]
                        }]}>
                            <FastImage
                                source={{ uri: item }}
                                style={[styles.Image]}
                                resizeMode='cover'
                            />
                        </Animated.View>
                    </View>
                )
            }}
            snapToInterval={item_width}
            scrollEventThrottle={0}
            style={{ flexGrow: 0, }}
            contentContainerStyle={{ paddingVertical: 50, paddingHorizontal: paddingHorizontal, }}
            onTouchStart={() => { startAnimation(1) }}
            onMomentumScrollEnd={() => { startAnimation(0) }}
        />
    )
}

export default memo(ImageSlider4)

const styles = StyleSheet.create({
    Container: {
        width: item_width,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
    },
    Card: {
        width: '100%',
        aspectRatio: 1 / 1.5,
        borderRadius: 30,
    },
    Image: {
        width: '100%',
        height: '100%',
        borderRadius: 30,
    },
})