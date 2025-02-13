import { Animated, Dimensions, StyleSheet, View } from 'react-native'
import React, { memo, useRef } from 'react'
import FastImage from 'react-native-fast-image';

const width = Dimensions.get('window').width;
const Item_Width = width * 0.7;
const Item_Height = Item_Width * 1.5;

const ImageSlider3 = ({
    data,
}) => {

    const scrollX = useRef(new Animated.Value(0)).current;

    return (
        <Animated.FlatList
            data={data}
            keyExtractor={(item, index) => index}
            horizontal
            pagingEnabled
            onScroll={Animated.event(
                [{ nativeEvent: { contentOffset: { x: scrollX } } }],
                { useNativeDriver: true }
            )}
            showsHorizontalScrollIndicator={false}
            renderItem={({ item, index }) => {
                return (
                    <View style={styles.Container}>
                        <View style={styles.Card}>
                            <View style={styles.ImageCard}>
                                <Animated.View
                                    style={[styles.Image, {
                                        transform: [{
                                            translateX: scrollX.interpolate({
                                                inputRange: [(index - 1) * width, index * width, (index + 1) * width],
                                                outputRange: [-width * 0.7, 0, width * 0.7]
                                            }),
                                        }]
                                    }]}
                                >
                                    <FastImage
                                        source={{ uri: item }}
                                        style={[styles.Image]}
                                        resizeMode='cover'
                                    />
                                </Animated.View>
                            </View>
                        </View>
                    </View>
                )
            }}
            style={{ flexGrow: 0, }}
            contentContainerStyle={{ paddingVertical: 50, }}
        />
    )
}

export default memo(ImageSlider3)

const styles = StyleSheet.create({
    Container: {
        width: width,
        justifyContent: 'center',
        alignItems: 'center',
    },
    Card: {
        width: Item_Width,
        height: Item_Height,
        borderRadius: 30,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 10 },
        shadowRadius: 10,
        backgroundColor: '#fff',
        shadowOpacity: 0.3,
        elevation: 10,
    },
    ImageCard: {
        width: "100%",
        height: "100%",
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
        backgroundColor: '#fff',
    },
    Image: {
        width: Item_Width * 1.4,
        height: Item_Height,
        resizeMode: 'cover',
    },
})