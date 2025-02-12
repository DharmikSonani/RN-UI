import { StyleSheet, View, } from 'react-native'
import React from 'react'
import ShapedImage from './ShapedImage'

const CustomeMarkerShape = ({
    source,
    size = 1,
}) => {
    return (
        <View style={{
            width: 50 * size,
            height: 56 * size,
            alignItems: 'center',
        }}>
            <View style={{
                width: '100%',
                height: '100%',
                alignItems: 'center',
            }}>
                <View
                    style={{
                        width: '100%',
                        aspectRatio: 1 / 1,
                        borderRadius: 7 * size,
                        shadowColor: '#000',
                        shadowOffset: { height: 5 },
                        shadowOpacity: 0.5,
                        shadowRadius: 10,
                        backgroundColor: '#fff',
                        borderRadius: 13 * size,
                        elevation: 5,
                        zIndex: -1,
                    }} />
                <View
                    style={{
                        width: '100%',
                        aspectRatio: 1 / 1,
                        backgroundColor: '#fff',
                        borderRadius: 13 * size,
                        position: 'absolute',
                        zIndex: 0,
                    }} />
                <View
                    style={{
                        width: "36%",
                        aspectRatio: 1 / 1,
                        backgroundColor: '#fff',
                        transform: [
                            {
                                rotateZ: '45deg',
                            },
                        ],
                        borderBottomEndRadius: 7 * size,
                        bottom: 0,
                        shadowColor: '#000',
                        shadowOffset: { height: 5 },
                        shadowOpacity: 0.5,
                        shadowRadius: 10,
                        position: 'absolute',
                        elevation: 5,
                        zIndex: -1,
                    }}
                />
            </View>
            <ShapedImage
                source={source}
                width={50 * size}
                height={56 * size}
                borderWidth={3 * size}
                position={'absolute'}
                shape={
                    <View style={{
                        height: "100%",
                        width: "100%",
                        alignItems: 'center',
                    }}>
                        <View
                            style={{
                                width: '100%',
                                aspectRatio: 1 / 1,
                                backgroundColor: '#000',
                                borderRadius: 10 * size,
                            }} />
                        <View
                            style={{
                                width: "36%",
                                aspectRatio: 1 / 1,
                                backgroundColor: '#000',
                                transform: [
                                    {
                                        rotateZ: '45deg',
                                    },
                                ],
                                // borderRadius: 5 * size,
                                borderBottomEndRadius: 5 * size,
                                bottom: 1,
                                position: 'absolute',
                            }}
                        />
                    </View>
                }
            />
        </View>

    )
}

export default CustomeMarkerShape

const styles = StyleSheet.create({})