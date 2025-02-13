import { Animated, View } from 'react-native'
import React from 'react'
import useScreenHooks from './SlideImageScreen.Hook'
import { styles } from './styles'
import FastImage from 'react-native-fast-image'

const SlideImageScreen = (props) => {

    const {
        _scrollView,
        width,
        data,

        imageHeight, setImageHeight,

        scrollTo,
    } = useScreenHooks(props)

    return (
        <View
            style={styles.Container}
            onLayout={(layout) => setImageHeight(layout.nativeEvent.layout.height)}
        >
            <Animated.ScrollView
                ref={_scrollView}
                style={{ flex: 1, }}
                horizontal
                contentContainerStyle={{ width: width * data?.length }}
                showsHorizontalScrollIndicator={false}
                bounces={false}
                onLayout={() => { setTimeout(() => { scrollTo(); }, 0); }}
                pagingEnabled
            >
                {
                    data.map((imgUri, i) =>
                        <FastImage
                            key={i}
                            resizeMode='cover'
                            source={{ uri: imgUri }}
                            style={[styles.BackImageStyle, { width: width }]}
                        />
                    ).reverse()
                }
            </Animated.ScrollView>

            <Animated.FlatList
                data={data}
                horizontal
                pagingEnabled
                bounces={false}
                showsHorizontalScrollIndicator={false}
                keyExtractor={(item, index) => index}
                onScroll={(event) => { scrollTo(event.nativeEvent.contentOffset.x); }}
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
        </View>
    )
}

export default SlideImageScreen