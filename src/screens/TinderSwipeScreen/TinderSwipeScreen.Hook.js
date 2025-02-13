import { useEffect, useRef, useState } from "react";
import { MarvelImageList } from "../../helper/ImageData";
import { Animated, PanResponder } from "react-native";

const useScreenHooks = (props) => {

    // variables
    const navigation = props.navigation;
    const swipe = useRef(new Animated.ValueXY()).current;

    // useStates
    const [data, setData] = useState(MarvelImageList);

    // useEffects
    useEffect(() => { swipe.setValue({ x: 0, y: 0 }); }, [data])

    // methods
    const RemoveCard = () => {
        setData(pre => pre.length > 1 ? pre.slice(1) : MarvelImageList);
    }

    const panResponder = PanResponder.create({
        onMoveShouldSetPanResponder: () => true,
        onPanResponderMove: (_, { dx, dy }) => {
            swipe.setValue({ x: dx, y: dy })
        },
        onPanResponderRelease: (_, { dx, dy }) => {
            const Direction = Math.sign(dx);
            const IsActiveAction = Math.abs(dx) > 150;

            if (IsActiveAction) {
                Animated.timing(swipe, {
                    toValue: { x: 500 * Direction, y: 0 },
                    useNativeDriver: true,
                    duration: 500,
                }).start();
                RemoveCard()
            } else {
                Animated.spring(swipe, {
                    toValue: { x: 0, y: 0 },
                    useNativeDriver: true,
                    friction: 5,
                }).start();
            }
        },
    });

    return {
        navigation,
        data,
        swipe,
        panResponder,
    };
}

export default useScreenHooks