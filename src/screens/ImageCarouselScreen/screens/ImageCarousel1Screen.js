import { Animated, Dimensions, FlatList, StyleSheet, View } from 'react-native'
import React, { memo, useCallback, useRef } from 'react'
import FastImage from 'react-native-fast-image';
import { NatureImageList } from '../../../helper/ImageData';

const width = Dimensions.get('window').width
const image_width = width * 0.7;
const paddingHorizontal = (width - image_width) / 2;


// -------------- Background Image Component --------------

const BackgroundImage = memo(({
    data,
    inputRange,
    scrollX,
}) => {
    return (
        <View style={backgroundImageStyles.Container}>
            <Animated.View
                style={[backgroundImageStyles.ImageContainer, {
                    transform: [{
                        translateX: scrollX?.interpolate({
                            inputRange: inputRange,
                            outputRange: [-width, 0, width]
                        }),
                    }]
                }]}
            >
                <FastImage
                    source={{ uri: data }}
                    style={backgroundImageStyles.ImageStyle}
                    resizeMode='cover'
                />
            </Animated.View>
        </View>
    )
});


const backgroundImageStyles = StyleSheet.create({
    Container: {
        width: width,
        height: '100%',
        alignItems: 'center',
        overflow: 'hidden',
    },
    ImageContainer: {
        height: '100%',
        width: width * 2,
        alignItems: 'center',
    },
    ImageStyle: {
        width: width,
        height: '100%',
    },
});


// -------------- Card Component --------------

const Card = memo(({
    data,
    scrollX,
    inputRange,
}) => {
    return (
        <View style={cardStyles.Container}>
            <Animated.View
                style={[cardStyles.ImageContainer, {
                    transform: [
                        {
                            translateY: scrollX?.interpolate({
                                inputRange: inputRange,
                                outputRange: [30, -30, 30]
                            })
                        },
                    ]
                }]}
            >
                <FastImage
                    style={cardStyles.ImageStyle}
                    source={{ uri: data }}
                    resizeMode='cover'
                />
            </Animated.View>
        </View>
    );
})

const cardStyles = StyleSheet.create({
    Container: {
        width: image_width,
        padding: 10,
    },
    ImageContainer: {
        width: '100%',
        aspectRatio: 1 / 1.2,
        borderRadius: 30,
        backgroundColor: '#fff',
        elevation: 10,
        shadowColor: '#0f0f0f',
        shadowOffset: { height: 10 },
        shadowOpacity: 0.5,
        shadowRadius: 10,
    },
    ImageStyle: {
        height: '100%',
        width: '100%',
        borderRadius: 30,
        borderWidth: 5,
        borderColor: '#FFF',
    },
});

// -------------- Image Carousel 1 Screen --------------

const ImageCarousel1Screen = () => {
    const _scrollview = useRef();
    const scrollX = useRef(new Animated.Value(0)).current;
    const data = NatureImageList;

    const inputRange = useCallback((index) => [
        (data.length - 1 - index - 1) * (width),
        (data.length - 1 - index) * (width),
        (data.length - 1 - index + 1) * (width),
    ], [data])

    const scrollTo = useCallback((value = 0) => {
        _scrollview.current.scrollTo({ x: (data.length - 1 - value) * width, animated: false })
    }, [_scrollview.current])

    return (
        <View style={styles.Container}>
            <Animated.ScrollView
                ref={_scrollview}
                style={styles.BackgroudContainer}
                horizontal
                alwaysBounceHorizontal={false}
                showsHorizontalScrollIndicator={false}
                scrollEnabled={false}
                onScroll={Animated.event(
                    [{ nativeEvent: { contentOffset: { x: scrollX } } }],
                    { useNativeDriver: true, }
                )}
            >
                {
                    data.map((item, index) => {
                        return (
                            <BackgroundImage
                                key={index}
                                data={item}
                                scrollX={scrollX}
                                inputRange={inputRange(index)}
                            />
                        )
                    }).reverse()
                }
            </Animated.ScrollView>

            <FlatList
                data={data}
                style={styles.CardContainer}
                contentContainerStyle={styles.CardContentContainer}
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
                onScroll={(scroll) => { scrollTo(scroll.nativeEvent.contentOffset.x / image_width); }}
                onLayout={() => { scrollTo(); }}
            />
        </View >
    )
}

export default ImageCarousel1Screen

const styles = StyleSheet.create({
    Container: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    BackgroudContainer: {
        position: 'absolute',
        zIndex: 1,
        height: '100%',
        width: '100%',
    },
    CardContainer: {
        flexGrow: 0,
        zIndex: 2,
        paddingTop: 30,
    },
    CardContentContainer: {
        paddingHorizontal: paddingHorizontal,
        paddingBottom: 60,
    },
})
