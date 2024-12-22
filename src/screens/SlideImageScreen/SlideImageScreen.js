import { Animated, View } from 'react-native'
import React from 'react'
import useScreenHooks from './SlideImageScreen.Hook'
import { styles } from './styles'
import FastImage from 'react-native-fast-image'

const SlideImageScreen = (props) => {

    const {
        _scrollView,
        isFocused,
        width,
        NatureImageList,

        imageHeight, setImageHeight,

    } = useScreenHooks(props)

    return (
        <View
            style={styles.Container}
            onLayout={(layout) => setImageHeight(layout.nativeEvent.layout.height)}
        >
            {
                isFocused &&
                <Animated.ScrollView
                    ref={_scrollView}
                    style={{
                        flex: 1,
                    }}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    bounces={false}
                >
                    {
                        NatureImageList.map((imgUri, i) =>
                            <FastImage
                                key={i}
                                resizeMode='cover'
                                source={{ uri: imgUri }}
                                style={[styles.BackImageStyle, { width: width }]}
                            />
                        ).reverse()
                    }
                </Animated.ScrollView>
            }

            {
                isFocused &&
                <Animated.FlatList
                    data={NatureImageList}
                    horizontal
                    pagingEnabled
                    bounces={false}
                    showsHorizontalScrollIndicator={false}
                    keyExtractor={(item, index) => index}
                    onScroll={event => _scrollView.current.scrollTo({ x: ((NatureImageList.length - 1) * width) - event.nativeEvent.contentOffset.x, animated: false })}
                    renderItem={({ item }) =>
                        <View style={[styles.ImageBack, {
                            height: imageHeight / 3,
                            width: width,
                        }]}>
                            <FastImage
                                source={{ uri: item }}
                                style={[{ height: imageHeight, width: '100%', }]}
                                resizeMode='cover'
                            />
                        </View>
                    }
                    style={[styles.FrontContainer, { height: imageHeight }]}
                    contentContainerStyle={styles.FrontContentContainer}
                />
            }
        </View>
    )
}

export default SlideImageScreen