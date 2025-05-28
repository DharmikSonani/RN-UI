import { FlatList, Text } from 'react-native'
import React from 'react'
import useScreenHooks from './DynamicAppIconScreen.Hook'
import { styles } from './styles'
import IconCard from './components/IconCard'

const DynamicAppIconScreen = (props) => {

    const {
        data,
        handleIconSelection,
    } = useScreenHooks(props)

    return (
        <FlatList
            data={data}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) =>
                <IconCard
                    data={item}
                    onSelect={handleIconSelection}
                />
            }
            keyExtractor={(item, index) => index.toString()}
            style={styles.Container}
            numColumns={2}
            contentContainerStyle={styles.ContentContainer}
            ListHeaderComponent={
                <Text style={styles.Header}>
                    Dynamic App Icons
                </Text>
            }
        />
    )
}

export default DynamicAppIconScreen