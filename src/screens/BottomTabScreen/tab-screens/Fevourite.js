import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const Fevourite = () => {
    return (
        <View style={styles.Container}>
            <Text>Fevourite</Text>
        </View>
    )
}

export default Fevourite

const styles = StyleSheet.create({
    Container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
})