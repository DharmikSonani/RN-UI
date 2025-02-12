import { StyleSheet, View } from 'react-native'
import React from 'react'
import ImageSlider2 from '../components/ImageSlider2'
import { ImageSliderList } from '../../../helper/ImageData'

const ImageSlider2Screen = () => {
    return (
        <View style={styles.Container}>
            <ImageSlider2 data={ImageSliderList} />
        </View>
    )
}

export default ImageSlider2Screen

const styles = StyleSheet.create({
    Container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#FFFFFF',
    }
})