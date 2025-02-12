import { StyleSheet, View } from 'react-native'
import React from 'react'
import { ImageSliderList } from '../../../helper/ImageData'
import ImageSlider3 from '../components/ImageSlider3'

const ImageSlider3Screen = () => {
    return (
        <View style={styles.Container}>
            <ImageSlider3 data={ImageSliderList} />
        </View>
    )
}

export default ImageSlider3Screen

const styles = StyleSheet.create({
    Container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#FFFFFF',
    }
})