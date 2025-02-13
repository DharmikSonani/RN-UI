import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const Setting = () => {
    return (
        <View style={styles.Container}>

            <Text>Setting</Text>
        </View>
    )
}

export default Setting

const styles = StyleSheet.create({
    Container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
})