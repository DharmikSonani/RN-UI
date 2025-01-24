# DraggableView Component

A customizable React Native component for creating draggable UI elements with optional bounce-back effects. The `DraggableView` component supports both horizontal and vertical dragging, allowing developers to easily implement interactive and dynamic UI.

## Features

- Supports horizontal and vertical dragging.
- Configurable boundaries for the draggable area.
- Optional bounce-back animations for smoother interactions.
- Easy integration with existing UI components.
- Fully customizable.

## Installation

1. Add the `DraggableView.js` and `draggableXY.js` files to your project.
2. Place them in an appropriate directory, such as `src/components/` or `src/hooks/`.

## Usage

### Import the Component

```javascript
import DraggableView from './DraggableView';
```

### Configure and Use the Component

```javascript
<DraggableView
    x={300} // Maximum horizontal draggable area
    y={400} // Maximum vertical draggable area
    bounceHorizontal={true} // Enable horizontal bounce-back
    bounceVertical={true} // Enable vertical bounce-back
>
    <View style={{ width: 100, height: 100, backgroundColor: 'red' }} />
</DraggableView>
```

## Example

Here is a complete example of how to use the `DraggableView` component:

```javascript
import React from 'react';
import { View, StyleSheet } from 'react-native';
import DraggableView from './DraggableView';

const App = () => {
    return (
        <View style={styles.container}>
            <DraggableView
                x={300}
                y={400}
                bounceHorizontal={true}
                bounceVertical={true}
            >
                <View style={styles.box} />
            </DraggableView>
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
    box: {
        width: 100,
        height: 100,
        backgroundColor: 'dodgerblue',
        borderRadius: 10,
    },
});

export default App;
```

## Props

| Prop               | Type       | Default | Description                                                   |
|--------------------|------------|---------|---------------------------------------------------------------|
| `x`                | `number`   | `0`     | Maximum horizontal draggable area (in pixels).               |
| `y`                | `number`   | `0`     | Maximum vertical draggable area (in pixels).                 |
| `bounceHorizontal` | `boolean`  | `false` | Enables horizontal bounce-back effect after releasing drag.  |
| `bounceVertical`   | `boolean`  | `false` | Enables vertical bounce-back effect after releasing drag.    |
| `border`           | `number`   | `0`     | Additional border padding for calculating draggable area.    |
| `disabled`         | `boolean`  | `false` | Disables dragging when set to `true`.                        |
| `duration`         | `number`   | `250`   | Duration of the bounce-back animation (in milliseconds).     |

## Notes

1. The `x` and `y` props should be set based on the available space for dragging.
2. The `bounceHorizontal` and `bounceVertical` props are optional and can be enabled for smoother interactions.
3. Use the `style` prop to customize the appearance of the draggable view.

## License

This project is licensed under the MIT License. Feel free to use and modify it in your projects.