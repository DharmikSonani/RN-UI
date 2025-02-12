import { View } from 'react-native'
import React from 'react'
import useScreenHooks from './ToggleButtonScreen.Hook'
import { styles } from './styles'
import TB1 from './components/ToggleButton1/ToggleButton'
import ThreeStateToggleButton from './components/ThreeStateToggleButton'

const ToggleButtonScreen = (props) => {

    const {

    } = useScreenHooks(props)

    return (
        <View style={styles.Container}>

            <TB1 width={250} />

            <ThreeStateToggleButton
                width={200}
                value={'On'}
                onStateChange={console.log}
            />

            <TB1 width={150} />

            <ThreeStateToggleButton
                width={100}
                value={'On'}
                onStateChange={console.log}
            />

            <TB1 width={50} />

        </View>
    )
}

export default ToggleButtonScreen