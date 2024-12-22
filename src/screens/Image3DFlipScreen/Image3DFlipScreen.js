import { FlatList } from 'react-native'
import React from 'react'
import useScreenHooks from './Image3DFlipScreen.Hook'
import { styles } from './styles'
import { Marvel3DList } from '../../helper/ImageData'
import Image3DFlipCard from './components/Image3DFlipCard'

const Image3DFlipScreen = (props) => {

    const {

    } = useScreenHooks(props)

    return (
        <FlatList
            data={Marvel3DList}
            numColumns={2}
            keyExtractor={(item, index) => index}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) =>
                <Image3DFlipCard
                    forground={item.forground}
                    background={{ uri: item.background }}
                />
            }
            style={styles.Container}
            contentContainerStyle={styles.ContentContainer}
        />
    )
}

export default Image3DFlipScreen