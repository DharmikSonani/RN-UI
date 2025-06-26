import { Text, View } from 'react-native'
import React from 'react'
import { styles } from './styles'
import useScreenHooks from './PaymentGatewayScreen.Hook'
import { FlatList } from 'react-native-gesture-handler'
import ItemView from '../../components/ItemView'
import data from './screenhelper'

const PaymentGatewayScreen = () => {

    const {

    } = useScreenHooks()

    return (
        <FlatList
            data={data}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) =>
                <ItemView
                    data={item}
                />
            }
            keyExtractor={(item, index) => index}
            style={styles.Container}
            contentContainerStyle={styles.ContentContainer}
            ListHeaderComponent={
                <Text style={styles.Header}>
                    Payment Gateways
                </Text>
            }
        />
    )
}

export default PaymentGatewayScreen