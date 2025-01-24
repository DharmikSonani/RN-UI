import { Image, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { styles } from './styles'
import useScreenHooks from './DraggableScreen.Hook'
import DraggableView from '../../utils/draggables/draggableXY/DraggableView'

const DraggableScreen = (props) => {

    const {
        bounceHorizontal, setBounceHorizontal,
        bounceVertical, setBounceVertical
    } = useScreenHooks(props)

    return (
        <View style={styles.Container}>
            <View style={styles.DragContainer}>
                <DraggableView
                    x={300}
                    y={400}
                    bounceHorizontal={bounceHorizontal}
                    bounceVertical={bounceVertical}
                >
                    <Image
                        source={require('../../assets/icon/rn-icon.png')}
                        style={styles.ObjectImage}
                    />
                </DraggableView>
            </View>

            <TouchableOpacity
                style={[styles.BounceButton, {
                    backgroundColor: bounceHorizontal ? 'green' : 'red',
                }]}
                onPress={() => { setBounceHorizontal(pre => !pre) }}
                activeOpacity={1}
            >
                <Text style={styles.BounceButtonText}>Bounce Horizontal</Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={[styles.BounceButton, {
                    backgroundColor: bounceVertical ? 'green' : 'red',
                }]}
                onPress={() => { setBounceVertical(pre => !pre) }}
                activeOpacity={1}
            >
                <Text style={styles.BounceButtonText}>Bounce Vertical</Text>
            </TouchableOpacity>
        </View>
    )
}

export default DraggableScreen