import { Text, View } from 'react-native'
import React from 'react'
import useScreenHooks from './WidgetScreen.Hook'
import { styles } from './styles'
import WidgetView from './widget/WidgetView'

const WidgetScreen = () => {

    const {

    } = useScreenHooks()

    return (
        <View style={styles.Container}>
            <View style={styles.HeaderContainer}>
                <Text style={styles.Header}>
                    {`Widgets`}
                </Text>
            </View>

            <WidgetView />
        </View>
    )
}

export default WidgetScreen