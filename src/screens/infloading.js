import React, { useState, useEffect } from 'react';
import { View, Text, Button, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import { PermissionsAndroid } from 'react-native';

const hypotheticalData = Array.from({ length: 100 }, (_, index) => ({
  id: index,
  title: `Item ${index + 1}`
}));

const InfiniteScrollScreen = ({ navigation }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [location, setLocation] = useState(null);
  const [page, setPage] = useState(0);
  const itemsPerPage = 10;

  const fetchData = () => {
    if (loading) return;
    setLoading(true);

    setTimeout(() => {
      const newData = hypotheticalData.slice(page * itemsPerPage, (page + 1) * itemsPerPage);
      setData(prevData => [...prevData, ...newData]);
      setPage(prevPage => prevPage + 1);
      setLoading(false);
    }, 1500);
  };

  const fetchLocation = () => {
    Geolocation.getCurrentPosition(
      (position) => {
        setLocation(position);
        console.log(position);
        console.log(`Latitude: ${position.coords.latitude}, Longitude: ${position.coords.longitude}`);
      },
      (error) => {
        console.log(error.code, error.message);
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
    );
  };

  async function requestLocationPermission() {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          'title': 'Location Access Required',
          'message': 'This App needs to Access your location'
        }
      )
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log("Location Permission Granted.");
      } else {
        console.log("Location Permission Denied.");
      }
    } catch (err) {
      console.warn(err)
    }
  }

  useEffect(() => {
    fetchLocation();
    requestLocationPermission();
    fetchData();
  }, []);

  const handleLogout = () => {
    console.log('Logout pressed');
  };

  const handleNavigateToMainScreen = () => {
    navigation.navigate('MainX');
  };

  const renderFooter = () => {
    if (!loading) return null;
    return (
      <View style={styles.footer}>
        <Text>Loading more...</Text>
      </View>
    );
  };

  return (
    <View style={[styles.container, { backgroundColor: 'white' }]}>
      <TouchableOpacity onPress={handleNavigateToMainScreen} style={styles.navigateButton}>
        <Text style={styles.navigateButtonText}>Navigate</Text>
      </TouchableOpacity>
      <Button title="Logout" onPress={handleLogout} style={styles.logoutButton} />
      <View style={styles.locationContainer}>
        {location && (
          <View style={styles.locationContainer}>
            <Text style={styles.locationText}>
              Latitude: {location.coords.latitude}, Longitude: {location.coords.longitude}
            </Text>
          </View>
        )}
      </View>
      <FlatList
        data={data}
        keyExtractor={(item) => item.id.toString()}
        onEndReached={fetchData}
        onEndReachedThreshold={0.5}
        ListFooterComponent={renderFooter}
        renderItem={({ item }) => <Text style={{ fontWeight: 'bold' }}>{item.title}</Text>}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  logoutButton: {
    position: 'absolute',
    right: 10,
    top: 10,
    zIndex: 1,
  },
  navigateButton: {
    position: 'absolute',
    left: 10,
    top: 10,
    zIndex: 1,
    backgroundColor: 'lightblue',
    padding: 5,
    borderRadius: 5,
  },
  navigateButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  locationContainer: {
    alignItems: 'center',
    padding: 10,
  },
  footer: {
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default InfiniteScrollScreen;
