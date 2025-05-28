import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { memo } from 'react'
import FastImage from 'react-native-fast-image'

const IconCard = ({
    data,
    onSelect = () => { },
}) => {
    return (
        <TouchableOpacity
            style={styles.Button}
            onPress={() => { onSelect(data) }}
        >
            <FastImage
                source={data?.display}
                style={styles.IconStyle}
                resizeMode='contain'
            />
        </TouchableOpacity>
    )
}

export default memo(IconCard)

const styles = StyleSheet.create({
    Button: {
        flex: 1,
        aspectRatio: 1 / 1,
        padding: 20,
        margin: 10,
        borderRadius: 30,
        backgroundColor: 'rgba(246,246,246,1)'
    },
    IconStyle: {
        height: '100%',
        width: '100%',
    },
})