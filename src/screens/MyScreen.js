// MyScreen.js
import React from 'react';
import { View, Text } from 'react-native';
import HabContainer from '../components/HabContainer';

import DraggableComponent from '../components/DraggableComponent';

const MyScreen = () => {

  return (
    <View>  
      <Text>
        My Screen
      </Text>
    </View>
    // <HabContainer style={{ backgroundColor: 'lightblue' }}>
    //   <DraggableComponent>
    //     <Text>Draggable Item 1</Text>
    //   </DraggableComponent>
    //   <DraggableComponent>
    //     <Text>Draggable Item 2</Text>
    //   </DraggableComponent>
    //   <DraggableComponent>
    //     <Text>Draggable Item 3</Text>
    //   </DraggableComponent>
    //   <DraggableComponent>
    //     <Text>Draggable Item 4</Text>
    //   </DraggableComponent>
    //   <DraggableComponent>
    //     <Text>Draggable Item 5</Text>
    //   </DraggableComponent>
    //   {/* Other components */}
    // </HabContainer>
  );
};

export default MyScreen;
