import { ScrollView, } from 'react-native'
import React from 'react'
import useScreenHooks from './ImageSliderScreen.Hook'
import { styles } from './styles'
import ImageSlider2 from './components/ImageSlider2'
import { ImageSliderList } from '../../helper/ImageData'
import ImageSlider1 from './components/ImageSlider1'

const ImageSliderScreen = (props) => {

    const {

    } = useScreenHooks(props)

    return (
        <ScrollView
            style={styles.Container}
            contentContainerStyle={styles.ContentContainer}
            bounces={false}
            showsVerticalScrollIndicator={false}
        >
            <ImageSlider1 data={ImageSliderList} />
            <ImageSlider2 data={ImageSliderList} />
        </ScrollView>
    )
}

export default ImageSliderScreen