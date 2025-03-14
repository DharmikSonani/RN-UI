import { Text, TextInput, TouchableOpacity, View } from 'react-native'
import React from 'react'
import useScreenHooks from './SaveFileScreen.Hook'
import { styles } from './styles'

const SaveFileScreen = (props) => {

    const {
        url, setUrl,
        onSavePress
    } = useScreenHooks(props)

    return (
        <View style={styles.Container}>
            <TextInput
                value={url}
                onChangeText={setUrl}
                placeholder='Url with file extention'
                style={styles.InputStyle}
                placeholderTextColor={'rgba(255,255,255,0.6)'}
                keyboardType='url'
                numberOfLines={1}
            />
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