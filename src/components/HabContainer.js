// HabContainer.js
import React from 'react';
import { View, StyleSheet } from 'react-native';

const HabContainer = ({ children, style }) => {
  const defaultStyle = StyleSheet.create({
    container: {
      height: 100,
      minHeight: 100,
      borderRadius: 14,
      padding: 10,
      margin: 10,
      ...style,
      shadowColor: 'black',
      shadowOffset: {
        width: -10, // Updated value for left offset
        height: 10, // Updated value for bottom offset
      },
      shadowOpacity: 0.9,
      shadowRadius: 1.84,
      elevation: 3,
    },
  });

  return <View style={defaultStyle.container}>{children}</View>;
};

export default HabContainer;
