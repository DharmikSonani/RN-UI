# DraggableXY Hook

A custom React Native hook (`useDraggableXY`) to create draggable UI components with optional bounce-back effects. This hook allows you to easily implement draggable views within specified boundaries.

## Features

- Horizontal and vertical dragging capabilities.
- Configurable draggable boundaries.
- Bounce-back animations for smoother interaction.
- Fully customizable with minimal setup.

## Installation

1. Copy the `draggableXY.js` file to your project.
2. Place it in an appropriate directory, such as `src/hooks/`.

## Usage

### Create draggableXY.js

```javascript
import { useRef } from "react";
import { Animated, PanResponder } from "react-native";

const defaultDuration = 250;

export const useDraggableXY = ({
    disabled,
    draggableMaxAreaX = 0, 
    draggableMaxAreaY = 0, 
    bounceHorizontal,
    bounceVertical,
    duration,
}) => {

    const drag = useRef(new Animated.ValueXY()).current;
    const initialPositionX = useRef(0);
    const initialPositionY = useRef(0);

    const panResponder = PanResponder.create({
        onMoveShouldSetPanResponder: () => !disabled,
        onPanResponderGrant: () => {
            initialPositionX.current = drag.x._value;
            initialPositionY.current = drag.y._value;
        },
        onPanResponderMove: (_, { dx, dy }) => {
            const newPositionX = initialPositionX.current + dx;
            const newPositionY = initialPositionY.current + dy;
            newPositionX >= 0 &&
                newPositionX <= draggableMaxAreaX &&
                newPositionY >= 0 &&
                newPositionY <= draggableMaxAreaY &&
                drag.setValue({ x: newPositionX, y: newPositionY });
        },
        onPanResponderRelease: (_, { dx, dy }) => {
            const newPositionX = initialPositionX.current + dx;
            const newPositionY = initialPositionY.current + dy;

            if (bounceHorizontal && bounceVertical) {
                if (newPositionX >= draggableMaxAreaX / 2 && newPositionY >= draggableMaxAreaY / 2) {
                    animateObjectPosition({ x: draggableMaxAreaX, y: draggableMaxAreaY })
                } else if (newPositionX >= draggableMaxAreaX / 2 && newPositionY < draggableMaxAreaY / 2) {
                    animateObjectPosition({ x: draggableMaxAreaX })
                } else if (newPositionX < draggableMaxAreaX / 2 && newPositionY >= draggableMaxAreaY / 2) {
                    animateObjectPosition({ y: draggableMaxAreaY })
                } else {
                    animateObjectPosition({});
                }
            } else if (bounceHorizontal && !bounceVertical) {
                if (newPositionX >= draggableMaxAreaX / 2) {
                    animateObjectPosition({ x: draggableMaxAreaX, y: drag.y._value })
                } else {
                    drag.y._value >= 0 && drag.y._value <= draggableMaxAreaY && animateObjectPosition({ y: drag.y._value });
                }
            } else if (!bounceHorizontal && bounceVertical) {
                if (newPositionY >= draggableMaxAreaY / 2) {
                    animateObjectPosition({ x: drag.x._value, y: draggableMaxAreaY })
                } else {
                    drag.x._value >= 0 && drag.x._value <= draggableMaxAreaX && animateObjectPosition({ x: drag.x._value });
                }
            }
        },
    });

    const animateObjectPosition = ({ x = 0, y = 0 }) => {
        Animated.timing(drag, {
            toValue: { x: x, y: y },
            useNativeDriver: true,
            duration: duration ?? defaultDuration,
        }).start();
    }

    return {
        drag,
        panResponder,
    }
}
```

### Import the Hook

```javascript
import { useDraggableXY } from './draggableXY';
```

### Configure the Hook

```javascript
const { drag, panResponder } = useDraggableXY({
    draggableMaxAreaX: 300, // Maximum horizontal drag area (Require for horizontal drag)
    draggableMaxAreaY: 500, // Maximum vertical drag area (Require for vertical drag)
    bounceHorizontal: true, // Enable horizontal bounce-back
    bounceVertical: true,   // Enable vertical bounce-back
    duration: 300,          // Animation duration in milliseconds
});
```

### Apply the Hook to a Component

```javascript
<Animated.View
    style={{ transform: drag.getTranslateTransform() }}
    {...panResponder.panHandlers}
/>
```

## Example

Here is a complete example of how to use the `useDraggableXY` hook in a React Native project:

```javascript
import React from 'react';
import { View, Animated, StyleSheet } from 'react-native';
import { useDraggableXY } from './path-to/draggableXY';

const App = () => {
    const { drag, panResponder } = useDraggableXY({
        draggableMaxAreaX: 300,
        draggableMaxAreaY: 500,
        bounceHorizontal: true,
        bounceVertical: true,
        duration: 250,
    });

    return (
        <View style={styles.container}>
            <Animated.View
                style={[styles.draggableBox, { transform: drag.getTranslateTransform() }]}
                {...panResponder.panHandlers}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f5f5f5',
    },
    draggableBox: {
        width: 100,
        height: 100,
        backgroundColor: 'dodgerblue',
        borderRadius: 10,
    },
});

export default App;
```

## Parameters

| Property            | Type      | Default | Description                                                                 |
|---------------------|-----------|---------|-----------------------------------------------------------------------------|
| `disabled`          | `boolean` | `false` | Disables dragging if set to `true`.                                        |
| `draggableMaxAreaX` | `number`  | `0`     | Defines the maximum draggable width.                                       |
| `draggableMaxAreaY` | `number`  | `0`     | Defines the maximum draggable height.                                      |
| `bounceHorizontal`  | `boolean` | `false` | Enables a bounce-back effect horizontally.                                 |
| `bounceVertical`    | `boolean` | `false` | Enables a bounce-back effect vertically.                                   |
| `duration`          | `number`  | `250`   | Duration of the bounce-back animation in milliseconds.                     |

## Return Values

| Method        | Description                                                                 |
|---------------|-----------------------------------------------------------------------------|
| `drag`        | An `Animated.ValueXY` object to handle the transform styles of the view.   |
| `panResponder`| PanResponder handlers to manage drag gestures.                             |

## Notes

1. Ensure that `draggableMaxAreaX` and `draggableMaxAreaY` are calculated based on the container and component dimensions.
2. The `duration` parameter defines how quickly the bounce-back effect is completed.

## License

MIT License

Feel free to use and modify this code for your projects.