import React, { useState, useEffect } from 'react';
import { styles } from './styles/MainScreenStyle';
import { Image, Alert, View, TextInput, Text, TouchableOpacity, ScrollView, Modal, StyleSheet } from 'react-native';
import Draggable from 'react-native-draggable';

import HabContainer from '../components/HabContainer';

import { database } from '../../services/database/index';
import { Q } from '@nozbe/watermelondb';
import { date, json } from '@nozbe/watermelondb/decorators';

import { PermissionsAndroid } from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import MapboxGL from "@rnmapbox/maps";

import { MAPBPOX_API } from "@env";

MapboxGL.setAccessToken(MAPBPOX_API);

const MainScreen = ({ navigation }) => {

    const [mapVisible, setMapVisible] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [location, setLocation] = useState('');
    const [apps, setApps] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [scrollOffset, setScrollOffset] = useState(0);
    const [isStart, setIsStart] = useState(false);
    const [startLocation, setStartLocation] = useState(null);
    const [stopLocation, setStopLocation] = useState(null);
    const [obtainedLocation, setObtainedLocation] = useState(false);
    const [userCoordinates, setUserCoordinates] = useState([0.00, -0.01]);

    useEffect(() => {
        MapboxGL.setTelemetryEnabled(false);
    }, []);

    useEffect(() => {
        const intervalId = setInterval(() => {
            if (obtainedLocation === true) {
                console.log('Fetching and Saving Location');
                fetchAndSaveLocation();
            }
        }, 10000);
        return () => clearInterval(intervalId);

    }, []);

    useEffect(() => {
        if (location) {
            if (!isNaN(location.latitude) && !isNaN(location.longitude)) {
                setUserCoordinates([location.latitude, location.longitude]);
            }
        }
    }, [location]);

    useEffect(() => {
        const intervalId = setInterval(() => {
            fetchLocation();
        }, 10000);
        return () => clearInterval(intervalId);

    }, []);

    useEffect(() => {
        const fetchAppsData = async () => {
            setIsLoading(true);
            const appsData = await database.collections.get('apps').query().fetch();
            setApps(appsData.map(app => ({
                ...app._raw,

            })));
            setIsLoading(false);
        };

        fetchAppsData();
        requestLocationPermission();
    }, []);

    const toggleStartStop = () => {
        setIsStart(!isStart);
    };


    const deleteContainer = (title) => {
        setApps(prevApps => prevApps.filter(app => app.title !== title));
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

    const MapComponent = React.memo(({ location }) => {
        if (mapVisible === true) {
            if (location && !isNaN(location.latitude) && !isNaN(location.longitude)) {
                return (
                    <MapboxGL.MapView style={styles.map}>
                        <MapboxGL.Camera
                            zoomLevel={16}
                            centerCoordinate={[parseFloat(location.longitude), parseFloat(location.latitude)]}
                        />
                        <MapboxGL.PointAnnotation
                            coordinate={[parseFloat(location.longitude), parseFloat(location.latitude)]}
                            id="my-location"
                        />
                    </MapboxGL.MapView>
                );
            } else {
                return (<Text>NO LOCATION</Text>);
            }
        }
    });


    if (isLoading) {
        setTimeout(() => {
            return <Text style={[styles.greetingText]}>
                Loading...
            </Text>;
        }, 3000);
    }

    const ActivityRun = async (id) => {
        //console.log('From ActivityRun Function √\n');
        const activity = await database.collections.get('apps').query(Q.where('id', id)).fetch(1);

        //console.log(activity[0].id);

        if (activity[0].title === 'RUNNER') {

            setModalVisible(true);

        }
        else {
            Alert.alert('Not Implemented', 'The activity is not implemented yet.\nPlease try another activity. ');
        }
    };

    const transformedApps = apps.map(app => ({
        layout: 'vertical',
        title: app.title,
        description: app.description,
        selected_theme: 1,
        columns: [],
        components: [
            { type: 'Text', props: { text: app.title, credit: 'By ' + app.author, id: app.id } },

            { type: 'Button', props: { title: 'Make A New Habit', onPress: () => ActivityRun(app.id) } },
        ],
    }));

    const fetchLocation = () => {

        Geolocation.getCurrentPosition(

            (position) => {
                const newLocation = {

                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                };

                if (!location || location.latitude !== newLocation.latitude || location.longitude !== newLocation.longitude) {
                    setLocation(newLocation);
                }
                const currentTime = new Date();
                console.log('Current Location:', position.coords.latitude, position.coords.longitude, currentTime);
                setUserCoordinates([position.coords.latitude, position.coords.longitude]);

            },
            (error) => {
                console.log(error.code, error.message);
            },
            {
                enableHighAccuracy: true, timeout: 15000, maximumAge: 10000
            }
        );
    };

    async function fetchAndSaveLocation() {
        getCurrentLocation();
        if (location) {
            try {

                await database.write(async () => {
                    const newloc = await database.collections.get('locations').create((locations) => {
                        locations.latitude = location.latitude;
                        locations.longitude = location.longitude + i;
                        locations.timestamp = new Date();
                    });
                    console.log('Location Saved:', newloc.id);
                });

            } catch (error) {
                console.error('Error saving location:' + location.latitude, error);
            }
        }
    }
    
    async function fetchAndProcessLocations() {
        try {
            const locations = await database.collections.get('locations').query().fetch();

            if (locations.length > 0) {

                for (const location of locations) {

                    const { id, latitude, longitude, timestamp } = location._raw;


                    console.log(`Location ID: ${id}, Latitude: ${latitude}, Longitude: ${longitude}, Timestamp: ${timestamp}`);
                }
            } else {
                console.log('No records found in the "locations" collection.');
            }
        } catch (error) {
            console.error('Error fetching and processing locations:', error);
        }
    }

    const getCurrentLocation = (action) => {
        console.log('Getting Current Location');
        Geolocation.getCurrentPosition(
            (position) => {
                setLocation({
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                });

                setObtainedLocation([position.coords.latitude, position.coords.longitude]);

                const url = `https://t6hlbd54wg.execute-api.us-east-1.amazonaws.com/api/Location?latitude=${position.coords.latitude}&longitude=${position.coords.longitude}`;
                fetch(url)
                    .then(response => response.json())
                    .then(data => {

                        if (action === 'start') {
                            setStartLocation(data);
                            setObtainedLocation(true);
                        } else if (action === 'end') {
                            setStopLocation(data);
                            setObtainedLocation(false);
                            fetchAndProcessLocations();
                        }
                    })
                    .catch(error => {
                        console.error(error);
                    });
            },
            (error) => {
                console.log(error.code, error.message);
            },
            { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
        );
    };

    const navScreens = {
        'Explore': 'MarketPlace',
        'Profile': 'Profile',
        'Settings': 'Settings'
    };

    const nav = (screen) => {
        console.log(screen);
        const route = navScreens[screen];
        if (route) {
            navigation.navigate(route);
        }
    };


    return (
        <View style={styles.container}>
            <Modal
                animationType="slide"
                visible={modalVisible}
                backgroundColor={'#333333'}
                transparent={false}
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={{ backgroundColor: '#333333', flex: 1, opacity: 0.99 }}>
                    <View style={{ margin: 0, padding: 0 }}>
                        <Text style={{ textAlign: 'center', marginTop: 8, paddingTop: 6, fontFamily: 'Roboto-Black', color: 'white', fontSize: 24 }}>
                            MAKE YOUR RUN SCHEDULE
                        </Text>
                        <View style={[styles.separator]} />
                        <TouchableOpacity
                            style={[styles.startButton]}
                            onPress={() => {
                                if (!isStart) {
                                    getCurrentLocation('start');
                                } else {
                                    getCurrentLocation('end');
                                }
                                setIsStart(!isStart);
                            }}
                        >
                            <Text style={styles.closeButtonText}>{isStart ? 'Stop' : 'Start'}</Text>
                        </TouchableOpacity>
                        {startLocation && (
                            <>
                                <Text style={styles.closeButtonText}>Start Name: {startLocation.name}</Text>
                                <Text style={styles.closeButtonText}>Start Latitude: {startLocation.lat}</Text>
                                <Text style={styles.closeButtonText}>Start Longitude: {startLocation.lon}</Text>
                            </>
                        )}

                        {stopLocation && (
                            <>
                                <Text style={styles.closeButtonText}>Stop Name: {stopLocation.name}</Text>
                                <Text style={styles.closeButtonText}>Stop Latitude: {stopLocation.lat}</Text>
                                <Text style={styles.closeButtonText}>Stop Longitude: {stopLocation.lon}</Text>
                            </>
                        )}

                    </View>

                    <View style={[styles.container, { alignItems: 'center', paddingTop: 20, paddingBottom: 95 }]}>
                        <MapComponent location={location} />
                    </View>

                    <TouchableOpacity
                        style={styles.closeButton}
                        onPress={() => setModalVisible(false)}>
                        <Text style={styles.closeButtonText}>Close</Text>
                    </TouchableOpacity>
                </View>
            </Modal>
            <View style={[styles.topBar]}>
                <Text style={[styles.greetingText]}>Hi Shariq</Text>
            </View>
            <View style={styles.bodyContainer}>
                <ScrollView style={styles.body} scrollEventThrottle={6}>
                    {transformedApps.map((appConfig, index) => (
                        <HabContainer key={index} subAppConfig={appConfig}
                            onDelete={deleteContainer}
                        />

                    ))}
                </ScrollView>
            </View>
            <View style={styles.bottomBar}>
                <TouchableOpacity style={styles.bottomBarButton} onPress={() => nav('Explore')}>
                    <View style={styles.iconContainer}>
                        <Image source={require('../assets/img/mp.png')} style={styles.icon} />
                        <Text style={styles.bottomBarButtonText}>Explore</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity style={styles.bottomBarButton} onPress={() => nav('Search')}>
                    <View style={styles.iconContainer}>
                        <Image source={require('../assets/img/searchico.png')} style={styles.icon} />
                        <Text style={styles.bottomBarButtonText}>Search</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity style={styles.bottomBarButton} onPress={() => nav('Settings')}>
                    <View style={styles.iconContainer}>
                        <Image source={require('../assets/img/settings.png')} style={styles.icon} />
                        <Text style={styles.bottomBarButtonText}>Settings</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity style={styles.bottomBarButton} onPress={() => nav('Profile')}>
                    <View style={styles.iconContainer}>
                        <Image source={require('../assets/img/profileico.png')} style={styles.icon} />
                        <Text style={styles.bottomBarButtonText}>Profile</Text>
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default MainScreen;