import { Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { memo, useEffect, useState } from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons';
import FastImage from 'react-native-fast-image';
import ActiveLine from './ActiveLine';

const StoryModal = ({
    data,
    modalVisible,
    setModalVisible,
}) => {

    const [activeIndex, setActiveIndex] = useState(0);
    const [width, setWidth] = useState(0);
    const [timeoutId, setTimeoutId] = useState('');

    const count = data.story ? data.story?.length : 0;
    const duration = 2000;

    useEffect(() => {
        if (width > 0) {
            const id = setTimeout(() => {
                if (activeIndex < count - 1) {
                    setActiveIndex(activeIndex + 1);
                } else {
                    setModalVisible({});
                }
            }, duration);
            setTimeoutId(id);
        }
        return () => {
            clearTimeout(timeoutId);
        }
    }, [activeIndex, width])

    const onPrevPress = () => {
        clearTimeout(timeoutId);
        activeIndex > 0 && setActiveIndex(activeIndex - 1);
    }

    const onNextPress = () => {
        clearTimeout(timeoutId);
        activeIndex == count - 1 ? setModalVisible({}) : setActiveIndex(activeIndex + 1);
    }

    return (
        <Modal
            animationType='fade'
            transparent
            visible={modalVisible}
            statusBarTranslucent
            onRequestClose={() => { setModalVisible({}) }}
        >
            <View style={styles.ViewWrapper}>
                <View style={styles.TopContainer}>
                    <View style={styles.ActiveLineContainer}>
                        {
                            data?.story && data?.story?.map((item, i) => {
                                return (
                                    <ActiveLine
                                        key={i}
                                        duration={duration}
                                        isActive={i == activeIndex}
                                        index={i}
                                        current={activeIndex}
                                        width={width}
                                        onLayout={(layout) => setWidth(layout.nativeEvent.layout.width)}
                                    />
                                )
                            })
                        }
                    </View>

                    <View style={styles.DetailsContainer}>

                        <FastImage
                            source={{ uri: data?.profile }}
                            style={styles.ProfileImage}
                            resizeMode='cover'
                        />
                        <Text style={styles.NameText} numberOfLines={1}>
                            {data?.name}
                        </Text>

                        <TouchableOpacity
                            style={styles.CloseButton}
                            onPress={() => { setModalVisible({}) }}
                            activeOpacity={1}
                        >
                            <Ionicons name='close' size={25} color={'#fff'} />
                        </TouchableOpacity>
                    </View>
                    <View style={{
                        flex: 1,
                        marginTop: 10,
                        flexDirection: 'row',
                    }}>
                        <TouchableOpacity
                            style={{
                                flex: 1,
                            }}
                            onPress={onPrevPress}
                            activeOpacity={1}
                        />

                        <TouchableOpacity
                            style={{
                                flex: 1,
                            }}
                            onPress={onNextPress}
                            activeOpacity={1}
                        />
                    </View>
                </View>

                <View style={{
                    width: '100%',
                    height: '100%',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}>
                    <FastImage
                        source={{ uri: data.story[activeIndex] }}
                        style={styles.ImageStyle}
                        resizeMode='contain'
                    />
                </View>
            </View>
        </Modal>
    )
}

export default memo(StoryModal)

const styles = StyleSheet.create({
    ViewWrapper: {
        flex: 1,
        backgroundColor: '#000',
        paddingTop: 50,
    },
    TopContainer: {
        top: 50,
        zIndex: 100,
        position: 'absolute',
        padding: 10,
        width: '100%',
        height: '100%',
    },
    ActiveLineContainer: {
        width: '100%',
        flexDirection: 'row',
    },
    CloseButton: {
        borderRadius: 10,
        padding: 5,
        aspectRatio: 1 / 1,
    },
    ImageStyle: {
        width: '100%',
        height: '80%',
    },
    DetailsContainer: {
        marginTop: 10,
        flexDirection: 'row',
        paddingHorizontal: 10,
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    NameText: {
        color: '#fff',
        marginHorizontal: 10,
        flex: 1,
        fontWeight: 'bold',
    },
    ProfileImage: {
        height: 40,
        aspectRatio: 1 / 1,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: '#ffffff50',
    }
})