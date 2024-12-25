import { View } from 'react-native'
import React from 'react'
import useScreenHooks from './AddToCartScreen.Hook'
import { styles } from './styles'
import SpwanAnimation from './components/SpwanAnimation'

const AddToCartScreen = (props) => {

    const {

    } = useScreenHooks(props)

    return (
        <View style={styles.Container}>
            <SpwanAnimation width={200} />
            <SpwanAnimation width={300} />
            <SpwanAnimation />
        </View>
    )
}

export default AddToCartScreen