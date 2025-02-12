import { Animated, Dimensions, StyleSheet, View } from 'react-native'
import React, { memo, useRef } from 'react'
import FastImage from 'react-native-fast-image';

const width = Dimensions.get('window').width;

const ImageSlider2 = ({
    data,
    height = width * 1.5,
}) => {

    const scrollX = useRef(new Animated.Value(0)).current;

    return (
        <Animated.ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            pagingEnabled
            bounces={false}
            alwaysBounceHorizontal={false}
            onScroll={Animated.event(
                [{ nativeEvent: { contentOffset: { x: scrollX } } }],
                { useNativeDriver: true }
            )}
            style={{ flexGrow: 0 }}
        >
            {
                data.map((item, index) => {
                    return (
                        <View
                            key={index}
                            style={[styles.Container, { height: height, }]}
                        >
                            <Animated.View
                                key={index}
                                style={[styles.ImageContainer, {
                                    transform: [{
                                        translateX: scrollX.interpolate({
                                            inputRange: [(index - 1) * width, index * width, (index + 1) * width],
                                            outputRange: [-width, 0, width]
                                        }),
                                    }]
                                }]}
                            >
                                <FastImage
                                    source={{ uri: item }}
                                    style={styles.ImageStyle}
                                    resizeMode='cover'
                                />
                            </Animated.View>
                        </View>
                    )
                })
            }
        </Animated.ScrollView>
    )
}

export default memo(ImageSlider2)

const styles = StyleSheet.create({
    Container: {
        width: width,
        alignItems: 'center',
        overflow: 'hidden',
    },
    ImageContainer: {
        height: '100%',
        width: width * 2,
        alignItems: 'center',
    },
    ImageStyle: {
        width: width + 10,
        height: '100%',
    },
})