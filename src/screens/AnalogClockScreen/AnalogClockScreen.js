import { ScrollView } from 'react-native'
import React from 'react'
import useScreenHooks from './AnalogClockScreen.Hook'
import { styles } from './styles'
import AnalogClock1 from './clocks/AnalogClock1'
import AnalogClock2 from './clocks/AnalogClock2'

const AnalogClockScreen = (props) => {

    const {

    } = useScreenHooks(props)

    return (
        <ScrollView
            style={styles.Container}
            contentContainerStyle={styles.ContentContainer}
            showsVerticalScrollIndicator={false}
            bounces={false}
        >
            <AnalogClock1 />

            <AnalogClock2 />
        </ScrollView>
    )
}

export default AnalogClockScreen