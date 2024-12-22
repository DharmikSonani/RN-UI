import { Text, View } from 'react-native'
import React from 'react'
import useScreenHooks from './Demo.Hook'
import { styles } from './styles'

const Demo = (props) => {

    const {

    } = useScreenHooks(props)

    return (
        <View style={styles.Container}>
            <Text>Demo</Text>
        </View>
    )
}

export default Demo