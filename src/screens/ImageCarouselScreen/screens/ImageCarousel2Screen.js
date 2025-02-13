import { Animated, Dimensions, StyleSheet, View } from 'react-native'
import React, { memo, useCallback, useRef } from 'react'
import FastImage from 'react-native-fast-image';
import { Vishnu10Avatars } from '../../../helper/ImageData';

const width = Dimensions.get('window').width
const image_width = width * 0.7;
const paddingHorizontal = (width - image_width) / 2;

// -------------- Card Component --------------

const Card = memo(({
    data,
    scrollX,
    inputRange,
}) => {
    return (
        <Animated.View
            style={[cardStyles.Container, {
                transform: [
                    {
                        perspective: image_width * 2,
                    },
                    {
                        scale: scrollX?.interpolate({
                            inputRange: inputRange,
                            outputRange: [1.1, 1.1, 1, 1.1, 1.1]
                        })
                    },
                    {
                        rotateY: scrollX?.interpolate({
                            inputRange: inputRange,
                            outputRange: ['-90deg', '-90deg', '0deg', '90deg', '90deg']
                        })
                    },
                    {
                        translateX: scrollX?.interpolate({
                            inputRange: inputRange,
                            outputRange: [-image_width / 4, -image_width / 4, 0, image_width / 4, image_width / 4]
                        })
                    },
                ]
            }]}
        >
            <FastImage
                style={cardStyles.ImageStyle}
                source={data.img}
                resizeMode='cover'
            />
        </Animated.View>
    );
})

const cardStyles = StyleSheet.create({
    Container: {
        width: image_width,
        aspectRatio: 1 / 1.5,
        borderRadius: 20,
        backgroundColor: '#fff',
    },
    ImageStyle: {
        height: '100%',
        width: '100%',
        borderRadius: 20,
    },
});

// -------------- Image Carousel 2 Screen --------------

const ImageCarousel2Screen = () => {
    const scrollX = useRef(new Animated.Value(0)).current;
    const data = Vishnu10Avatars;

    const inputRange = useCallback((index) => [
        (index - 2) * (image_width),
        (index - 1) * (image_width),
        (index) * (image_width),
        (index + 1) * (image_width),
        (index + 2) * (image_width),
    ], [data])

    return (
        <View style={styles.Container}>
            <Animated.FlatList
                data={data}
                style={{ flexGrow: 0 }}
                contentContainerStyle={{ padding: paddingHorizontal }}
                keyExtractor={(item, index) => index}
                renderItem={({ item, index }) => {
                    return (
                        <Card
                            data={item}
                            scrollX={scrollX}
                            inputRange={inputRange(index)}
                        />
                    )
                }}
                horizontal
                pagingEnabled
                bounces={false}
                showsHorizontalScrollIndicator={false}
                snapToInterval={image_width}
                onScroll={Animated.event(
                    [{ nativeEvent: { contentOffset: { x: scrollX } } }],
                    { useNativeDriver: true, }
                )}
            />
        </View >
    )
}

export default ImageCarousel2Screen

const styles = StyleSheet.create({
    Container: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
    },
})
