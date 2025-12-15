import { Image, StyleSheet, View } from 'react-native'
import React, { memo } from 'react'
import { useImageDimensions } from '../hooks/useImageDimensions'

const ImageView = ({
    uri,
}) => {
    const { dimensions } = useImageDimensions({ uri });
    return (
        <View style={[styles.container, { aspectRatio: dimensions?.aspectRatio, }]}>
            <Image
                source={{ uri }}
                resizeMode='cover'
                style={[styles.image]}
            />
        </View>
    )
}

export default memo(ImageView)

const styles = StyleSheet.create({
    container: {
        width: '100%',
        borderRadius: 12,
        backgroundColor: 'rgba(255,255,255,1)',
        elevation: 5,
        shadowColor: 'rgba(0,0,0,1)',
        shadowOpacity: 0.3,
        shadowOffset: { height: 3, width: 0 },
        shadowRadius: 5,
    },
    image: {
        width: '100%',
        height: '100%',
        borderRadius: 12,
    },
})