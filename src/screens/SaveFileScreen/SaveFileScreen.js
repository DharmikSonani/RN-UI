import { FlatList, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React from 'react'
import useScreenHooks from './SaveFileScreen.Hook'
import { styles } from './styles'

const SaveFileScreen = (props) => {

    const {
        demoUrls,
        url, setUrl,
        onSavePress
    } = useScreenHooks(props)

    return (
        <View style={styles.Container}>
            <View style={styles.RowContainer}>
                <TextInput
                    value={url}
                    onChangeText={setUrl}
                    placeholder='Url with file extention'
                    style={styles.InputStyle}
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
            <FlatList
                data={demoUrls}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) =>
                    <TouchableOpacity
                        style={styles.ItemStyle}
                        onPress={() => { setUrl(item) }}
                    >
                        <Text>{item}</Text>
                    </TouchableOpacity>
                }
                showsVerticalScrollIndicator={true}
                style={{ maxHeight: '40%', width: '100%' }}
                contentContainerStyle={{
                    gap: 15,
                    width: '100%',
                }}
            />
        </View>
    )
}

export default SaveFileScreen