import { ScrollView, TouchableOpacity, View } from 'react-native'
import React from 'react'
import useScreenHooks from './ImageDimensionsGridScreen.Hook'
import { styles } from './styles'
import ImageView from './components/ImageView'
import Entypo from 'react-native-vector-icons/Entypo';

const ImageDimensionsGridScreen = () => {

    const {
        data,

        handleButtonPress,
    } = useScreenHooks()

    return (
        <>
            <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
                <View style={styles.gridWrapper}>
                    <View style={styles.gridContainer}>
                        {data?.map((uri, index) => index % 2 === 0 && <ImageView key={index} uri={uri} />)}
                    </View>

                    <View style={styles.gridContainer}>
                        {data?.map((uri, index) => index % 2 !== 0 && <ImageView key={index} uri={uri} />)}
                    </View>
                </View>
            </ScrollView>

            <TouchableOpacity
                style={styles.floatingButton}
                onPress={handleButtonPress}
            >
                <Entypo
                    name={`folder-images`}
                    size={25}
                    color={`rgba(255,255,255,1)`}
                />
            </TouchableOpacity>
        </>
    )
}

export default ImageDimensionsGridScreen