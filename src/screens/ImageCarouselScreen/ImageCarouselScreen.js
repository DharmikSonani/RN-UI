import { FlatList, Text, } from 'react-native'
import React from 'react'
import useScreenHooks from './ImageCarouselScreen.Hook'
import { styles } from './styles'
import ItemView from '../../components/ItemView'
import data from './screenhelper'

const ImageCarouselScreen = (props) => {

    const {
        navigation
    } = useScreenHooks(props)

    return (
        <FlatList
            data={data}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) =>
                <ItemView
                    data={item}
                    navigation={navigation}
                />
            }
            keyExtractor={(item, index) => index}
            style={styles.Container}
            contentContainerStyle={styles.ContentContainer}
            ListHeaderComponent={
                <Text style={styles.Header}>
                    Image Carousel
                </Text>
            }
        />
    )
}

export default ImageCarouselScreen