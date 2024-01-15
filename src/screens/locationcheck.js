import Geolocation from 'react-native-geolocation-service';
import React from 'react';
import { View, ImageBackground, TouchableOpacity, Text, StyleSheet } from 'react-native';

const getLocation = () => {
  Geolocation.getCurrentPosition(
    (position) => {
      console.log(position);
    },
    (error) => {
      // See error code charts below.
      console.log(error.code, error.message);
    },
    { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
  );
};
