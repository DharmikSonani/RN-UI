import { Dimensions, View } from 'react-native'
import React from 'react'
import useScreenHooks from './TinderSwipeScreen.Hook'
import { styles } from './styles'
import TinderSwipeCard from './components/TinderSwipeCard'

const width = Dimensions.get('window').width
const image_width = width * 0.7;
const image_height = image_width * 1.5;

const TinderSwipeScreen = (props) => {

    const {
        data,
        swipe,
        panResponder
    } = useScreenHooks(props)

    return (
        <View style={styles.Container}>
            <View style={{ width: image_width, height: image_height }}>
                {
                    data.map((item, i) => {
                        const drage = i === 0 ? panResponder.panHandlers : {};
                        return (
                            <TinderSwipeCard
                                key={i}
                                data={item}
                                width={image_width}
                                height={image_height}
                                isFirst={i === 0}
                                swipe={swipe}
                                {...drage}
                            />
                        )
                    }).reverse()
                }
            </View>
        </View>
    )
}

export default TinderSwipeScreen