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

### Import the Hook

```javascript
import { useDraggableXY } from './path-to/draggableXY';
```

### Configure the Hook

```javascript
const { drag, panResponder } = useDraggableXY({
    draggableMaxAreaX: 300, // Maximum horizontal drag area
    draggableMaxAreaY: 500, // Maximum vertical drag area
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