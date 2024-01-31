import React, { useState } from 'react';
import DraggableFlatList from 'react-native-draggable-flatlist';
import { View, Text } from 'react-native';
import HabContainer from '../components/HabContainer';
import DraggableComponent from '../components/DraggableComponent';

const MyScreen = () => {
  const [data, setData] = useState([
    { key: 'item1' },
    { key: 'item2' },
    { key: 'item3' },
    { key: 'item4' },
    { key: 'item5' },
    // Add more items as needed
  ]);

  const renderItem = ({ item, drag, isActive }) => {
    return (
      <HabContainer
        style={{
          backgroundColor: isActive ? 'lightgreen' : 'lightblue',
          padding: 10,
          marginVertical: 10,
        }}
        onLongPress={drag}
      >
        <DraggableComponent>
          <Text>{`Draggable ${item.key}`}</Text>
        </DraggableComponent>
        {/* Add more components within HabContainer as needed */}
      </HabContainer>
    );
  };

  return (
    <DraggableFlatList
      data={data}
      renderItem={renderItem}
      keyExtractor={(item) => item.key}
      onDragEnd={({ data }) => setData(data)}
    />
  );
};

export default MyScreen;
