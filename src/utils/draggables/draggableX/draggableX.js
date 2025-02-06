import { useEffect, useRef } from "react";
import { Animated, PanResponder } from "react-native";

const defaultDuration = 250;

export const useDraggableX = ({
    defaultDrag = 0,
    draggableMaxArea = 0,
    duration,
    onLeftDrag = () => { },
    onRightDrag = () => { },
}) => {

    const drag = useRef(new Animated.Value(0)).current;
    const initialPosition = useRef(0);

    const panResponder = PanResponder.create({
        onMoveShouldSetPanResponder: (_, gestureState) => {
            return Math.abs(gestureState.dx) > 5 || Math.abs(gestureState.dy) > 5; // This line allows you to call child onPress method
        },
        onPanResponderGrant: () => {
            initialPosition.current = drag._value;
        },
        onPanResponderMove: (_, { dx, dy }) => {
            const newPosition = initialPosition.current + dx;
            newPosition >= 0 && newPosition <= draggableMaxArea && drag.setValue(newPosition);
        },
        onPanResponderRelease: (_, { dx }) => {
            const newPosition = initialPosition.current + dx;
            if (newPosition >= draggableMaxArea / 2) {
                Animated.timing(drag, {
                    toValue: draggableMaxArea,
                    useNativeDriver: true,
                    duration: duration ?? defaultDuration,
                }).start(onRightDrag);
            } else {
                Animated.timing(drag, {
                    toValue: 0,
                    useNativeDriver: true,
                    duration: duration ?? defaultDuration,
                }).start(onLeftDrag);
            }
        },
    });

    // defaultDrag : 0 For Left-Align, 1 For Right Align
    useEffect(() => { drag.setValue(defaultDrag == 0 ? 0 : draggableMaxArea); }, [draggableMaxArea])

    return {
        drag,
        panResponder,
    }
}