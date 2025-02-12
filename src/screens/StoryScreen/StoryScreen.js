import { ScrollView, TouchableOpacity, View } from 'react-native'
import React from 'react'
import useScreenHooks from './StoryScreen.Hook'
import { styles } from './styles'
import StoryModal from './components/StoryModal'
import LinearGradient from 'react-native-linear-gradient'
import { data } from './helper'
import FastImage from 'react-native-fast-image'

const StoryScreen = (props) => {

    const {
        selectedStory, setSelectedStory,
    } = useScreenHooks(props)

    return (
        <View style={styles.Container}>

            <ScrollView
                style={{ flexGrow: 0, }}
                contentContainerStyle={{ padding: 10, gap: 10, }}
                horizontal
                showsHorizontalScrollIndicator={false}
            >
                {
                    data.map((item, i) => {
                        return (
                            <TouchableOpacity
                                key={i}
                                style={styles.ImageContainer}
                                onPress={() => { setSelectedStory(item) }}
                            >
                                <LinearGradient
                                    start={{ x: 0.0, y: 0.25 }}
                                    end={{ x: 0.5, y: 1.0 }}
                                    colors={['#FFFF00', '#ffA500', '#DE3163']}
                                    style={[styles.ImageStyle, item.story?.length > 0 && { padding: 2 }]}
                                >
                                    <View style={[styles.ImageStyle, { backgroundColor: '#fff', padding: 3, }]}>
                                        <FastImage
                                            source={{ uri: item.profile }}
                                            style={styles.ImageStyle}
                                            resizeMode='cover'
                                        />
                                    </View>
                                </LinearGradient>
                            </TouchableOpacity>
                        )
                    })
                }
            </ScrollView>

            {
                Object.keys(selectedStory).length > 0 &&
                <StoryModal
                    data={selectedStory}
                    modalVisible={Object.keys(selectedStory).length > 0}
                    setModalVisible={setSelectedStory}
                />
            }
        </View >
    )
}

export default StoryScreen