import { FlatList } from 'react-native'
import React from 'react'
import useScreenHooks from './Card3DScreen.Hook'
import { styles } from './styles'
import { Card3DImageList } from '../../helper/ImageData'
import Card3D from './components/Card3D'

const Card3DScreen = (props) => {

    const {

    } = useScreenHooks(props)

    return (
        <FlatList
            data={Card3DImageList}
            keyExtractor={(item, index) => index}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            renderItem={({ item }) => {
                return (
                    <Card3D
                        background={item.background}
                        forground={item.forground}
                        title={item.title}
                    />
                )
            }}
            style={styles.Container}
            contentContainerStyle={styles.ContentContainer}
        />
    )
}

export default Card3DScreen