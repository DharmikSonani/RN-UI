import { Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import useScreenHooks from './SaveFileScreen.Hook'
import { styles } from './styles'

const SaveFileScreen = (props) => {

    const {
        onSavePress
    } = useScreenHooks(props)

    return (
        <View style={styles.Container}>
            <TouchableOpacity
                style={styles.Button}
                onPress={onSavePress}
            >
                <Text style={styles.ButtonText}>Save</Text>
            </TouchableOpacity>
        </View>
    )
}

export default SaveFileScreen