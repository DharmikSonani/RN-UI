import { StyleSheet, View } from 'react-native'
import React from 'react'
import { ImageSliderList } from '../../../helper/ImageData'
import ImageSlider4 from '../components/ImageSlider4'

const ImageSlider4Screen = () => {
    return (
        <View style={styles.Container}>
            <ImageSlider4 data={ImageSliderList} />
        </View>
    )
}

export default ImageSlider4Screen

const styles = StyleSheet.create({
    Container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#FFFFFF',
    }
})