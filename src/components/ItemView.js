import { StyleSheet, Text, TouchableOpacity } from 'react-native'
import React, { memo } from 'react'
import { useNavigation } from '@react-navigation/native'

const ItemView = ({
    data,
}) => {
    const navigation = useNavigation();
    return (
        <TouchableOpacity
            style={styles.Container}
            onPress={() => { navigation.navigate(data?.screen) }}
        >
            <Text
                style={styles.TextStyle}
                numberOfLines={1}
            >
                {data?.title}
            </Text>
        </TouchableOpacity>
    )
}

export default memo(ItemView)

const styles = StyleSheet.create({
    Container: {
        width: "100%",
        backgroundColor: 'rgba(255,255,255,1)',
        paddingVertical: 12,
        borderRadius: 10,
        elevation: 5,
        shadowColor: 'rgba(0,0,0,1)',
        shadowOffset: { height: 3, },
        shadowOpacity: 0.2,
        shadowRadius: 5,
        padding: 15,
        marginBottom: 10,
    },
    TextStyle: {
        color: 'rgba(0,0,0,1)',
        fontSize: 14,
    }
})