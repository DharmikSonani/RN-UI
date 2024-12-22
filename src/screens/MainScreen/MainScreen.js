import { FlatList, Text, } from 'react-native'
import React from 'react'
import useScreenHooks from './MainScreen.Hook'
import { styles } from './styles'
import ItemView from './component/ItemView'
import data from './screenhelper'

const MainScreen = (props) => {

    const {
        navigation,
    } = useScreenHooks(props)

    return (
        <FlatList
            data={data}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) =>
                <ItemView
                    item={item}
                    navigation={navigation}
                />
            }
            keyExtractor={(item, index) => index}
            style={styles.Container}
            contentContainerStyle={styles.ContentContainer}
            ListHeaderComponent={
                <Text style={styles.Header}>
                    UI Designs
                </Text>
            }
        />
    )
}

export default MainScreen