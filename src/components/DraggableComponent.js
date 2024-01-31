// DraggableComponent.js
import React from 'react';
import Draggable from 'react-native-draggable';

const DraggableComponent = ({ children }) => {
  return (
    <Draggable>
      {children}
    </Draggable>
  );
};

export default DraggableComponent;