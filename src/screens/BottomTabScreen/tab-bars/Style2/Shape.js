import { StyleSheet, View } from 'react-native'
import React, { memo } from 'react'

const Shape = ({
    width,
}) => {
    return (
        <>
            <View style={[styles.RoundCorners, { left: '-0.5%', borderTopRightRadius: '90%', }]} />

            <View style={styles.CenterWrapper}>
                <View style={[styles.CenterView, { borderWidth: width / 1.5, }]} />
            </View>

            <View style={[styles.RoundCorners, { right: '-0.5%', borderTopLeftRadius: '90%', }]} />
        </>
    )
}

export default memo(Shape)

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
        borderColor: "#5B37B7",
        top: '22.5%',
    },
    RoundCorners: {
        height: '16%',
        width: '18%',
        backgroundColor: "#5B37B7",
        position: 'absolute',
    },
})