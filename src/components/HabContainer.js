// HabContainer.js
import React from 'react';
import { View, StyleSheet } from 'react-native';

const HabContainer = ({ children, style }) => {
  const defaultStyle = StyleSheet.create({
    container: {
      height: 100,
      minHeight: 100, // Minimum height
      borderRadius: 26,
      padding: 2,
      margin: 1,
      // other default styles
      ...style,
    },
  });

  return <View style={defaultStyle.container}>{children}</View>;
};

export default HabContainer;
