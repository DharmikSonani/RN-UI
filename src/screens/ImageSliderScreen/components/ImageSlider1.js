import { Animated, Dimensions, StyleSheet, TouchableOpacity, View } from 'react-native'
import React, { memo, useRef } from 'react'
import FastImage from 'react-native-fast-image';

const width = Dimensions.get('window').width;

const ImageSlider1 = ({
    data,
    height = width * 1.5,
}) => {

    const scrollX = useRef(new Animated.Value(0)).current;
    const _scrollview = useRef();

    return (
        <View style={{ height: height, }}>
            <Animated.ScrollView
                ref={_scrollview}
                horizontal
                showsHorizontalScrollIndicator={false}
                pagingEnabled
                onScroll={Animated.event(
                    [
                        {
                            nativeEvent: {
                                contentOffset: {
                                    x: scrollX,
                                }
                            },
                        },
                    ],
                    { useNativeDriver: false }
                )}
            >
                {
                    data.map((item, i) => {
                        return (
                            <FastImage
                                key={i}
                                source={{ uri: item }}
                                style={{
                                    width: width,
                                    height: height,
                                }}
                            />
                        )
                    })
                }
            </Animated.ScrollView>

            <View style={styles.IndicatorContainer}>
                {
                    data.map((item, i) => {
                        const inputRange = [
                            (i - 2) * width,
                            (i - 1) * width,
                            i * width,
                            (i + 1) * width,
                            (i + 2) * width
                        ]

                        const backgroundColor = scrollX.interpolate({
                            inputRange,
                            outputRange: ['#D5D5D5', '#D5D5D5', "#726772", '#D5D5D5', '#D5D5D5'],
                        })

                        const indicatorWidth = scrollX.interpolate({
                            inputRange,
                            outputRange: [5, 5, 20, 5, 5],
                        })

                        return (
                            <TouchableOpacity
                                key={i}
                                activeOpacity={1}
                                onPress={() => _scrollview.current.scrollTo({ x: i * width })}
                            >
                                <Animated.View
                                    style={[styles.Indicators, {
                                        backgroundColor,
                                        width: indicatorWidth
                                    },]}
                                />
                            </TouchableOpacity>
                        )
                    })
                }
            </View>
        </View>
    )
}

export default memo(ImageSlider1)

const styles = StyleSheet.create({
    IndicatorContainer: {
        width: width,
        flexDirection: "row",
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 10,
    },
    Indicators: {
        height: 5,
        width: 5,
        backgroundColor: '#D5D5D5',
        borderRadius: 10,
        marginHorizontal: 4,
    },
})