import { StyleSheet, View } from 'react-native'
import React, { memo } from 'react'

const Shape = ({
    width,
}) => {

    const styles = StyleSheet.create({
        CenterWrapper: {
            overflow: 'hidden',
            position: 'absolute',
            height: '100%',
            width: '100%',
            alignItems: 'center',
            zIndex: -10,
            top: '11%',
            justifyContent: 'flex-end',
        },
        CenterView: {
            width: '200%',
            aspectRatio: 1 / 1,
            borderRadius: '100%',
            borderStyle: 'solid',
            borderColor: '#000',
            bottom: '5%',
            borderWidth: width / 1.5,
        },
        RoundCorners: {
            height: '17%',
            width: '19%',
            backgroundColor: "#000",
            position: 'absolute',
        },
    })

    return (
        <>
            <View style={[styles.RoundCorners, { left: '-0.5%', borderTopRightRadius: '90%', }]} />

            <View style={styles.CenterWrapper}>
                <View style={styles.CenterView} />
            </View>

            <View style={[styles.RoundCorners, { right: '-0.5%', borderTopLeftRadius: '90%', }]} />
        </>
    )
}

export default memo(Shape)