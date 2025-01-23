# DraggableX Hook

A custom React Native hook (`useDraggableX`) to create draggable UI components restricted to horizontal movement. This hook allows you to implement smooth dragging functionality within specified boundaries and trigger actions based on drag direction.

## Features

- Horizontal dragging with configurable boundaries.
- Customizable actions on left or right drag release.
- Smooth animations using React Native's `Animated` library.
- Supports enabling or disabling dragging dynamically.

## Installation

1. Copy the `draggableX.js` file to your project.
2. Place it in an appropriate directory, such as `src/hooks/`.

## Usage

### Import the Hook

```javascript
import { useDraggableX } from './draggableX';
```

### Configure the Hook

```javascript
const { drag, panResponder } = useDraggableX({
    defaultDrag: 0, // 0 for left-align, 1 for right-align
    draggableMaxArea: 300, // Maximum horizontal drag area
    duration: 300, // Animation duration in milliseconds
    onLeftDrag: () => console.log('Dragged to the left'),
    onRightDrag: () => console.log('Dragged to the right'),
});
```

### Apply the Hook to a Component

```javascript
<Animated.View
    style={{ transform: [{ translateX: drag }] }}
    {...panResponder.panHandlers}
/>
```

## Example

Here is a complete example of how to use the `useDraggableX` hook in a React Native project:

```javascript
import React from 'react';
import { View, Animated, StyleSheet } from 'react-native';
import { useDraggableX } from './draggableX';

const App = () => {
    const { drag, panResponder } = useDraggableX({
        defaultDrag: 0,
        draggableMaxArea: 300,
        duration: 250,
        onLeftDrag: () => console.log('Dragged left!'),
        onRightDrag: () => console.log('Dragged right!'),
    });

    return (
        <View style={styles.container}>
            <Animated.View
                style={[styles.draggableBox, { transform: [{ translateX: drag }] }]}
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
        backgroundColor: 'coral',
        borderRadius: 10,
    },
});

export default App;
```

## Parameters

| Property            | Type      | Default | Description                                                                 |
|---------------------|-----------|---------|-----------------------------------------------------------------------------|
| `disabled`          | `boolean` | `false` | Disables dragging if set to `true`.                                        |
| `defaultDrag`       | `number`  | `0`     | Initial drag position: `0` for left-align, `1` for right-align.            |
| `draggableMaxArea`  | `number`  | `0`     | Defines the maximum horizontal drag area.                                  |
| `duration`          | `number`  | `250`   | Duration of the bounce-back animation in milliseconds.                     |
| `onLeftDrag`        | `function`| `() => {}` | Callback triggered when dragged to the left.                               |
| `onRightDrag`       | `function`| `() => {}` | Callback triggered when dragged to the right.                              |

## Return Values

| Method        | Description                                                                 |
|---------------|-----------------------------------------------------------------------------|
| `drag`        | An `Animated.Value` object to handle the transform styles of the view.     |
| `panResponder`| PanResponder handlers to manage drag gestures.                             |

## Notes

1. Ensure the `draggableMaxArea` value corresponds to your container's width minus the draggable component's width.
2. The `onLeftDrag` and `onRightDrag` callbacks can be used to execute custom logic based on drag direction.

## License

MIT License

Feel free to use and modify this code for your projects.