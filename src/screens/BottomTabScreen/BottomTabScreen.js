import { Text } from 'react-native'
import React from 'react'
import useScreenHooks from './BottomTabScreen.Hook'
import { styles } from './styles'
import { FlatList } from 'react-native-gesture-handler'
import data from './screenhelper'
import ItemView from '../../components/ItemView'

const BottomTabScreen = (props) => {

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
                    Bottom Tabs
                </Text>
            }
        />
    )
}

export default BottomTabScreen