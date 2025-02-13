import { Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import useScreenHooks from './BiometricsScreen.Hook'
import { styles } from './styles'

const BiometricsScreen = (props) => {

    const {
        onPress,
    } = useScreenHooks(props)

    return (
        <View style={styles.Container}>
            <TouchableOpacity
                onPress={onPress}
                style={styles.Button}
            >
                <Text style={styles.Text}>Verify Biometrics</Text>
            </TouchableOpacity>
        </View>
    )
}

export default BiometricsScreen