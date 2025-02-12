import { StyleSheet, View } from 'react-native'
import React from 'react'
import ImageSlider1 from '../components/ImageSlider1'
import { ImageSliderList } from '../../../helper/ImageData'

const ImageSlider1Screen = () => {
    return (
        <View style={styles.Container}>
            <ImageSlider1 data={ImageSliderList} />
        </View>
    )
}

export default ImageSlider1Screen

const styles = StyleSheet.create({
    Container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#FFFFFF',
    }
})