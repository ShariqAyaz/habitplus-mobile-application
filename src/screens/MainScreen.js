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

const MainScreen = ({ navigation }) => {

    const [modalVisible, setModalVisible] = useState(false);
    const [location, setLocation] = useState('');
    const [apps, setApps] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isStart, setIsStart] = useState(false);
    const [startLocation, setStartLocation] = useState(null);
    const [stopLocation, setStopLocation] = useState(null);
    const [userCoordinates, setUserCoordinates] = useState([0.00, -0.01]);

    useEffect(() => {
        if (isStart === true) {
            const fetchAndProcessLocation = async () => {
                const newLocation = await getCurrentLocation();
                setLocation(newLocation);
            };
            fetchAndProcessLocation();
            const intervalId = setInterval(() => {
                fetchAndProcessLocation();
            }, 10000);

            return () => clearInterval(intervalId);
        }
    }, []);

    useEffect(() => {

        if (isStart) {
            const intervalId = setInterval(() => {
                getCurrentLocation('start');
            }, 10000);

            return () => clearInterval(intervalId);
        }
    }, [isStart]);

    useEffect(() => {
        if (location) {
            console.log('useEffect->location-> \t Location:', location.latitude, location.longitude);
            if (!isNaN(location.latitude) && !isNaN(location.longitude)) {
                setUserCoordinates([location.latitude, location.longitude]);
            }
        }
    }, [location]);

    useEffect(() => {
        const fetchAppsData = async () => {
            console.log('fetchAppsData() \t Fetching Apps Data');
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
                console.log("requestLocationPermission() \t Location Permission Granted.");
            } else {
                console.log("requestLocationPermission() \t Location Permission Denied.");
            }
        } catch (err) {
            console.warn(err)
        }
    }

    // Map Function depreciated
    // const MapComponent = ({ location }) => {
    //     if (!mapVisible || !location || isNaN(location.latitude) || isNaN(location.longitude)) {
    //         return <Text>NO LOCATION</Text>;
    //     }

    //     return (
    //         <MapboxGL.MapView style={styles.map}>
    //             <MapboxGL.Camera
    //                 zoomLevel={16}
    //                 centerCoordinate={[parseFloat(location.longitude), parseFloat(location.latitude)]}
    //             />
    //             <MapboxGL.PointAnnotation
    //                 coordinate={[parseFloat(location.longitude), parseFloat(location.latitude)]}
    //                 id="my-location"
    //             />
    //         </MapboxGL.MapView>
    //     );
    // };

    if (isLoading) {
        setTimeout(() => {
            return <Text style={[styles.greetingText]}>
                Loading...
            </Text>;
        }, 3000);
    }

    const ActivityRun = async (id) => {

        const activity = await database.collections.get('apps').query(Q.where('id', id)).fetch(1);


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

    async function fetchAndProcessLocations() {
        try {
            const locations = await database.collections.get('locations').query().fetch();
            if (locations.length > 0) {
                for (const location of locations) {
                    const { id, latitude, longitude, timestamp } = location._raw;
                    const dateTime = new Date(timestamp).toLocaleString(undefined, { hour: 'numeric', minute: 'numeric' });
                    console.log(`fetchAndProcessLocations() -> \t Location ID: ${id}, Latitude: ${latitude}, Longitude: ${longitude}, Timestamp: ${dateTime}`);
                }
            } else {
                console.log('fetchAndProcessLocations() -> \t No records found in the "locations" collection.');
            }
        } catch (error) {
            console.error('fetchAndProcessLocations() -> \t Error fetching and processing locations:', error);
        }
    }

    // need to fix
    const getCurrentLocation = (action) => {

        console.log('getCurrentLocation() \t Getting Current Location');
        Geolocation.getCurrentPosition(
            (position) => {
                const newLocation = {
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                };
                if (!isNaN(newLocation.latitude) && !isNaN(newLocation.longitude)) {
                    setLocation(newLocation);
                    if (action === 'start') {
                        console.log("getCurrentLocation()->Start Location: textual data");
                    } else if (action === 'end') {
                        console.log("getCurrentLocation()->Stop Location: textual data");
                        fetchAndProcessLocations();
                    }

                    const url = `https://t6hlbd54wg.execute-api.us-east-1.amazonaws.com/api/Location?latitude=${position.coords.latitude}&longitude=${position.coords.longitude}`;
                    fetch(url)
                        .then(response => response.json())
                        .then(data => {

                            if (action === 'start') {
                                setStartLocation(data);

                                database.write(async () => {
                                    await database.collections.get('locations').create(location => {
                                        location.latitude = position.coords.latitude;
                                        location.longitude = position.coords.longitude;
                                        location.timestamp = new Date();
                                    });
                                });

                            } else if (action === 'end') {
                                setStopLocation(data);
                            }
                        })
                        .catch(error => {
                            console.error('Error fetching additional location data:', error);
                        });
                } else {
                    console.log('Invalid location data received:', newLocation);
                }
            },
            (error) => {
                console.log('Error getting current location:', error.code, error.message);
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

                    {/*
                    map function depreciated
                    */}
                    {/* 
                        <View style={[styles.container, { alignItems: 'center', paddingTop: 20, paddingBottom: 95 }]}>
                        <MapComponent location={location} />
                    </View> */}

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