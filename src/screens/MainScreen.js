import React, { useState, useEffect } from 'react';
import { Image, Alert, View, TextInput, Text, TouchableOpacity, ScrollView, Modal, StyleSheet } from 'react-native';
import { PermissionsAndroid } from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import Draggable from 'react-native-draggable';

import HabContainer from '../components/HabContainer';

import { database } from '../../services/database/index';
import { Q } from '@nozbe/watermelondb';
import { json } from '@nozbe/watermelondb/decorators';


const MainScreen = ({ navigation }) => {
    const [modalVisible, setModalVisible] = useState(false);
    const [location, setLocation] = useState('');
    const [Clocation, setCLocation] = useState(null);


    const [apps, setApps] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const [scrollOffset, setScrollOffset] = useState(0);
    const [isStart, setIsStart] = useState(false);
    const [startLocation, setStartLocation] = useState(null);
    const [stopLocation, setStopLocation] = useState(null);
    const [obtainedLocation, setObtainedLocation] = useState(false);
    const [userCoordinates, setUserCoordinates] = useState(null);


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
        if (Clocation) {
            setUserCoordinates([Clocation.latitude, Clocation.longitude]);
        }
    }, [Clocation]);

    const renderMap = () => {
    //     if (userCoordinates) {
    //         const position = {
    //             latitude: userCoordinates.latitude,
    //             longitude: userCoordinates.longitude,
    //             latitudeDelta: 0.0922, // Adjust as needed
    //             longitudeDelta: 0.0421, // Adjust as needed
    //         };

    //         return (
    //             <MapView
    //                 style={{ height: 200, width: '100%' }} // Adjust size as needed
    //                 initialRegion={position}
    //             >
    //                 <UrlTile
    //                     /**
    //                      * This URL is a template for OpenStreetMap tiles, which will be used to display the map.
    //                      * You can replace it with any other tile server URL if you have specific preferences or requirements.
    //                      */
    //                     urlTemplate="http://tile.openstreetmap.org/{z}/{x}/{y}.png"
    //                     maximumZ={19}
    //                 />
    //                 <Marker coordinate={position} /> {/* Displays a pin at the user's location */}
    //             </MapView>
    //         );
    //     } else {
    //         return <Text style={{ textAlign: 'center' }}>Fetching location...</Text>;
    //     }
    // };



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
        fetchLocation();
        requestLocationPermission();
    }, []);

    if (isLoading) {
        setTimeout(() => {
            return <Text style={[styles.greetingText]}>
                Loading...
            </Text>;
        }, 3000);
    }



    const ActivityRun = async (id) => {
        console.log('From ActivityRun Function √\n');
        const activity = await database.collections.get('apps').query(Q.where('id', id)).fetch(1);

        console.log(activity[0].id);

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
                setCLocation(position);
                console.log(`Latitude: ${position.coords.latitude}, Longitude: ${position.coords.longitude}`);
            },
            (error) => {
                console.log(error.code, error.message);
            },
            { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
        );
    };

    async function fetchAndSaveLocation() {
        getCurrentLocation();
        if (Clocation) {
            try {

                await database.write(async () => {
                    const newloc = await database.collections.get('locations').create((locations) => {
                        locations.latitude = Clocation.latitude;
                        locations.longitude = Clocation.longitude;
                        locations.timestamp = new Date();
                    });
                    console.log('Location Saved:', newloc.id);
                });


            } catch (error) {
                console.error('Error saving location:' + Clocation.latitude, error);
            }
        }
    }

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
                setCLocation({
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                });

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
                    
                    <View>
                        {renderMap()}
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

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    closeButton: {
        width: 120,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F14F21',
        marginBottom: 20,
        borderRadius: 30,
        alignSelf: 'center', position: 'absolute', bottom: 0, marginBottom: 20
    },
    startButton: {
        width: 200,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#eb8634',
        borderRadius: 10,
        marginTop: 20,
        alignSelf: 'center',
    },
    closeButtonText: {
        fontFamily: 'Roboto-Bold',
        fontWeight: 'bold',
        color: 'white',
        fontSize: 16,
    },
    emptyText: {
        color: '#F14F21',
        fontSize: 13,
        marginTop: 4,
        paddingLeft: 26,
        lineHeight: 18,
        letterSpacing: 1,
        textShadowColor: 'silver',
        textShadowOffset: { width: 0.01, height: 0.05 },
        textShadowRadius: 0.1,
    },
    topBar: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: 60,
        backgroundColor: 'transparent',
        justifyContent: 'center',
        paddingLeft: 16,
        shadowColor: '#333333',
        shadowOffset: {
            width: -2,
            height: 4,
        },
        shadowOpacity: 0.5,
        shadowRadius: 0,
        elevation: 4,
    },
    greetingText: {
        fontFamily: 'Roboto-Black',
        color: '#2EB67D',
        fontSize: 28,
    },
    bodyContainer: {
        flex: 1,
        marginTop: 80,
        height: '100%',
        width: '100%',
        marginBottom: 60,
    },
    body: {
        flex: 1,
    },
    bottomBar: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: 60,
        backgroundColor: 'silver',
        flexDirection: 'row',
        justifyContent: 'space-around',
        padding: 4,
        paddingTop: 6,
        alignItems: 'center',
    },

    separator: {
        height: 1,
        backgroundColor: '#ECB22E',
        width: '90%',
        marginVertical: 4,
        alignSelf: 'center',
    },
    bottomBarButton: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    bottomBarButtonText: {
        color: 'black',
        fontFamily: 'Roboto-Medium',
        fontSize: 11,
        textAlign: 'center',
    },
    iconContainer: {
        alignItems: 'center',
    },
    icon: {
        width: 20,
        height: 20,
    },
});

export default MainScreen;