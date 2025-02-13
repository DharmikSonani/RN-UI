import { Animated, Dimensions, StyleSheet, View } from 'react-native'
import React, { memo, useRef } from 'react'
import FastImage from 'react-native-fast-image';
import { NatureImageList } from '../../../helper/ImageData';

const height = Dimensions.get('screen').height;
const width = Dimensions.get('window').width;

// -------------- Image Component --------------

const CardComponent = memo(({
    data,
    index,
    scrollX,
}) => {

    const translateX = scrollX.interpolate({
        inputRange: [(index - 1) * width, index * width, (index + 1) * width],
        outputRange: [-width, 0, width]
    });

    const scale = scrollX.interpolate({
        inputRange: [(index - 1) * width, (index - 0.5) * width, index * width, (index + 0.5) * width, (index + 1) * width],
        outputRange: [1, 1.5, 1, 1.5, 1]
    });

    return (
        <View style={[cardStyles.Container]}>
            <Animated.View
                style={[cardStyles.Layer1Background, {
                    transform: [
                        { translateX },
                        {
                            rotate: scrollX.interpolate({
                                inputRange: [(index - 0.8) * width, index * width, (index + 0.8) * width],
                                outputRange: ['180deg', '0deg', '-180deg']
                            }),
                        },
                        { scale },
                    ]
                }]}
            >
                <FastImage
                    source={{ uri: data }}
                    style={cardStyles.ImageStyle}
                    resizeMode='cover'
                />
            </Animated.View>

            <Animated.View
                style={[cardStyles.Layer2Background, {
                    transform: [
                        { translateX },
                        {
                            rotate: scrollX.interpolate({
                                inputRange: [(index - 0.6) * width, index * width, (index + 0.6) * width],
                                outputRange: ['180deg', '0deg', '-180deg']
                            }),
                        },
                        { scale },
                    ]
                }]}
            >
                {/* <Animated.View style={{ transform: [{ scale },] }}> */}
                <FastImage
                    source={{ uri: data }}
                    style={cardStyles.ImageStyle}
                    resizeMode='cover'
                />
                {/* </Animated.View> */}
                <View style={cardStyles.Overlay} />
            </Animated.View>

            <Animated.View
                style={[cardStyles.Layer3Background, {
                    transform: [
                        { translateX },
                        {
                            rotate: scrollX.interpolate({
                                inputRange: [(index - 0.4) * width, index * width, (index + 0.4) * width],
                                outputRange: ['180deg', '0deg', '-180deg']
                            }),
                        },
                        { scale },
                    ]
                }]}
            >
                {/* <Animated.View style={{ transform: [{ scale },] }}> */}
                <FastImage
                    source={{ uri: data }}
                    style={cardStyles.ImageStyle}
                    resizeMode='cover'
                />
                {/* </Animated.View> */}
            </Animated.View>
        </View>
    )
})

const cardStyles = StyleSheet.create({
    Container: {
        width: width,
        alignItems: 'center',
        overflow: 'hidden',
        justifyContent: 'center',
        height: height,
    },
    Layer1Background: {
        height: '100%',
        width: height * 2,
        alignItems: 'center',
        overflow: 'hidden',
    },
    Layer2Background: {
        width: width * 1.3,
        aspectRatio: 1 / 1,
        alignItems: 'center',
        overflow: 'hidden',
        position: 'absolute',
        zIndex: 10,
        justifyContent: 'center',
        borderRadius: height,
    },
    Layer3Background: {
        width: width * 0.65,
        aspectRatio: 1 / 1,
        alignItems: 'center',
        overflow: 'hidden',
        position: 'absolute',
        zIndex: 100,
        justifyContent: 'center',
        borderRadius: height,
    },
    ImageStyle: {
        width: height,
        aspectRatio: 1 / 1,
    },
    Overlay: {
        backgroundColor: 'rgba(0,0,0,0.3)',
        height: '100%',
        width: '100%',
        position: 'absolute',
    }
})

// -------------- Image Carousel 5 Screen --------------

const ImageCarousel5Screen = () => {
    const scrollX = useRef(new Animated.Value(0)).current;
    const data = NatureImageList;

    return (
        <Animated.FlatList
            data={data}
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
            keyExtractor={(item, index) => index}
            renderItem={({ item, index }) => <CardComponent data={item} index={index} scrollX={scrollX} />}
        />
    )
}

export default ImageCarousel5Screen