# DraggableView Component

The `DraggableView` is a reusable React Native component that allows you to create draggable views within a specified area. It supports optional bounce effects for horizontal and vertical movements.

## Features

- Drag a view within a defined area (`x`, `y` dimensions).
- Enable or disable horizontal and vertical bouncing.
- Fully customizable with styles and optional constraints.

## Installation

1. Clone or download the repository.
2. Ensure you have the `useDraggableXY` hook included in your project (see `draggableXY.js`).

## Usage

To use the `DraggableView` component in your project, import it and define its configuration properties:

```jsx
import DraggableView from './DraggableView';
import React from 'react';
import { View, StyleSheet } from 'react-native';

const App = () => {
  return (
    <View style={styles.container}>
      <DraggableView
        x={300}
        y={400}
        bounceHorizontal={true}
        bounceVertical={true}
      >
        <View style={styles.draggableContent} />
      </DraggableView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  draggableContent: {
    width: 100,
    height: 100,
    backgroundColor: 'blue',
  },
});

export default App;
```

## Props

The `DraggableView` component supports the following props:

| Prop              | Type      | Default | Description                                                                                 |
|-------------------|-----------|---------|---------------------------------------------------------------------------------------------|
| `style`           | `Object`  | `null`  | Custom styles for the `DraggableView`.                                                     |
| `x`               | `Number`  | `null`  | Maximum horizontal drag boundary.                                                          |
| `y`               | `Number`  | `null`  | Maximum vertical drag boundary.                                                            |
| `bounceHorizontal`| `Boolean` | `false` | Enables bounce effect for horizontal dragging.                                             |
| `bounceVertical`  | `Boolean` | `false` | Enables bounce effect for vertical dragging.                                               |
| `border`          | `Number`  | `0`     | Adds a border space to prevent clipping during dragging.                                   |
| `disabled`        | `Boolean` | `false` | Disables the drag functionality.                                                           |
| `duration`        | `Number`  | `300`   | Animation duration (in milliseconds) for bounce effects.                                   |
| `children`        | `Node`    | `null`  | The content inside the draggable view.                                                     |

## Example

```jsx
<DraggableView
  x={200}
  y={500}
  bounceHorizontal={true}
  bounceVertical={false}
  duration={500}
>
  <View style={{ width: 50, height: 50, backgroundColor: 'red' }} />
</DraggableView>
```

In the example above:
- The view can be dragged horizontally up to 200 units and vertically up to 500 units.
- Bouncing is enabled horizontally but disabled vertically.
- A bounce animation duration of 500ms is applied.

## Customization

The draggable content can be styled by passing custom styles to the `DraggableView` or its children.