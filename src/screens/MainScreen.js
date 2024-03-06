import React, { useRef, useState, useEffect } from 'react';
import { styles } from './styles/MainScreenStyle';
import AppActivityService from '../../services/database/AppActivityService';

import {
    NativeModules, SafeAreaView, Switch, Image, Alert, View,
    TextInput, Text, TouchableOpacity, ScrollView, Modal,
    Keyboard, TouchableWithoutFeedback
    //BackHandler
} from 'react-native';

import { ColorScheme } from '../constants/ColorScheme';
import DatePicker from '@react-native-community/datetimepicker';
import { WebView } from 'react-native-webview';
import { Picker } from '@react-native-picker/picker';
import HabContainer from '../components/HabContainer';
import { database } from '../../services/database/index';
import { Q } from '@nozbe/watermelondb';
import { date, json } from '@nozbe/watermelondb/decorators';
import { PermissionsAndroid } from 'react-native';
import Geolocation from 'react-native-geolocation-service';


const MainScreen = ({ navigation }) => {

    const [showDatePicker, setShowDatePicker] = useState(false);
    const [activityModal, setActivityModal] = useState(false);
    const [newActivityModal, setNewActivityModal] = useState(false);
    const [location, setLocation] = useState('');
    const [apps, setApps] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isStart, setIsStart] = useState(false);
    const [startLocation, setStartLocation] = useState(null);
    const [stopLocation, setStopLocation] = useState(null);
    const [selectedDaySlot, setSelectedDaySlot] = useState('MONDAY');
    const [userCoordinates, setUserCoordinates] = useState([0.00, -0.01]);
    const [habitType, setHabitType] = useState('N/A');
    const [title, setTitle] = useState('Make A Run Habit');
    const [description, setDescription] = useState('A Fresh air dose. A few miles more. A habit to adore.');
    const [selectedAppDetails, setSelectedAppDetails] = useState({ verbose_title: '', verbose_description: '', appid: '' });
    const [type, setType] = useState('');
    const [time, setTime] = useState('');
    const [month, setMonth] = useState(null);
    const [notify, setNotify] = useState(true);
    const [date, setDate] = useState(new Date());
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());

    const toggleSwitch = () => setNotify(curstate => !curstate);

    useEffect(() => {
        let intervalId;
        const fetchAndProcessLocation = async () => {
            const newLocation = await getCurrentLocation();
            setLocation(newLocation);
        };
        if (isStart) {
            fetchAndProcessLocation();
            intervalId = setInterval(fetchAndProcessLocation, 10000);
        }
        return () => {
            if (intervalId) {
                clearInterval(intervalId);
            }
        };
    }, [isStart]);

    useEffect(() => {
        if (location) {
            if (!isNaN(location.latitude) && !isNaN(location.longitude)) {
                setUserCoordinates([location.latitude, location.longitude]);
            }
        }
    }, [location]);

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

    const backAction = () => {

        if (newActivityModal === true) {
            if (title.trim() && description.trim()) {
                saveActivity();
            } else {
                return true;
            }
        }
        return false
    };

    // useEffect(() => {
    //     const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);
    //     console.log(backHandler);
    //     return () => backHandler.remove();
    // }, [title, description]);

    const mapHtmlContent = `
    <html>
    <head>
        <title>OpenStreetMap with Line</title>
        <meta name="viewport" content="initial-scale=1.0, user-scalable=no, width=device-width" />
        <link rel="stylesheet" href="https://unpkg.com/leaflet@1.7.1/dist/leaflet.css"
        integrity="sha512-xodZBNTC5n17Xt2atTPuE1HxjVMSvLVW9ocqUKLsCC5CXdbqCmblAshOMAS6/keqq/sMZMZ19scR4PsZChSR7A=="
        crossorigin=""/>
        <script src="https://unpkg.com/leaflet@1.7.1/dist/leaflet.js"
        integrity="sha512-XQoYMqMTK8LvdxXYG3nZ448hOEQiglfqkJs1NOQV44cWnUrBc8PkAOcXy20w0vlaXaVUearIOBhiXZ5V3ynxwA=="
        crossorigin=""></script>
    </head>
    <body>
        <div id="map" style="width: 100%; height: 100%"></div>
        <script>
        var pointA = [51.5905141, -0.22971917934976066];
                var pointB = [51.5909852, -0.23096917935986088];
                var pointC = [51.5916963, -0.22972917936996099];
                var pointD = [51.5905141, -0.22971917934976066];
                function calculateCenter(points) {
                    var sumLat = 0;
                    var sumLng = 0;
                    points.forEach(function(point) {
                        sumLat += point[0];
                        sumLng += point[1];
                    });
                    var avgLat = sumLat / points.length;
                    var avgLng = sumLng / points.length;
                    return [avgLat, avgLng];
                }
                var centerPoint = calculateCenter([pointA, pointB, pointC, pointD]);
                console.log("Center Point:", centerPoint);
                  var map = L.map('map').setView(centerPoint, 17);
                  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  }).addTo(map);
                  var pointList = [pointA, pointB, pointC, pointD];
                  var firstpolyline = new L.Polyline(pointList, {
                      color: 'blue',
                      weight: 3,
                      opacity: 0.7,
                      smoothFactor: 0
                  });
                  firstpolyline.addTo(map);
        </script>
    </body>
    </html>`;

    // this is for the New Habit Modal reset
    const resetModalState = () => {
        setTitle('');
        setDescription('');
        setHabitType('N/A');
    };

    const handleAppSelection = (app) => {
        setSelectedAppDetails({
            verbose_title: app.verbose_title,
            verbose_description: app.verbose_description,
            appid: app.appid
        });
        setNewActivityModal(true);
    };


    const saveActivity = async () => {
        if (title.trim() === '' || description.trim() === '' || habitType === 'N/A') {
            return Alert.alert("Invalid Input", "Please fill all the fields and select a habit type.");
        }

        console.log("Saving new habit for app ID:", selectedAppDetails.appid, habitType, startDate);

        const currentDate = new Date();
        const defaultDate = currentDate.toISOString().split('T')[0];
        const defaultTime = `${currentDate.getHours()}:${currentDate.getMinutes()}`;

        const finalDate = date || defaultDate;
        const finalTime = time || defaultTime;
        const finalDay = selectedDaySlot || currentDate.getDay();

        let newAppActivityData = {};

        if (habitType === 'MONTHLY') {
            newAppActivityData = {
                title: title,
                description: description,
                appid: '101', //selectedAppDetails.appid, 
                activityid: '3',
                type: habitType,
                time: finalTime,
                day: finalDay,
                date: Date.parse(startDate), // Convert date to timestamp
                month: month || currentDate.getMonth() + 1,
                frequency: 1,
                start_date: Date.parse(startDate), // Convert date to timestamp
                end_date: endDate ? Date.parse(endDate) : Date.parse(new Date(currentDate.getFullYear() + 1, currentDate.getMonth(), currentDate.getDate())),
                notify: notify,
                isExpire: false,
                isVisible: true,
            };

        } else if (habitType === 'DAILY') {
            newAppActivityData = {
                title: title,
                description: description,
                appid: '101', //selectedAppDetails.appid, 
                activityid: '3',
                type: habitType,
                time: finalTime,
                day: finalDay,
                date: finalDate,
                month: month || currentDate.getMonth() + 1,
                frequency: 1,
                start_date: startDate || currentDate,
                end_date: endDate || new Date(currentDate.getFullYear() + 1, currentDate.getMonth(), currentDate.getDate()),
                notify: notify,
                isExpire: false,
                isVisible: true,
            };

        }
        else if (habitType === 'WEEKLY') {
            newAppActivityData = {
                title: title,
                description: description,
                appid: '101', //selectedAppDetails.appid, 
                activityid: '3',
                type: habitType,
                time: finalTime,
                day: selectedDaySlot,
                date: finalDate,
                month: month || currentDate.getMonth() + 1,
                frequency: 1,
                start_date: startDate || currentDate,
                end_date: endDate || new Date(currentDate.getFullYear() + 1, currentDate.getMonth(), currentDate.getDate()),
                notify: notify,
                isExpire: false,
                isVisible: true,
            };
        }

        try {

            await AppActivityService.createActivity(newAppActivityData);
            console.log("Activity saved successfully.");
            setNewActivityModal(false);
            resetModalState();
        } catch (error) {
            console.error("Error saving activity:", error);
        }



    };

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

    if (isLoading) {
        setTimeout(() => {
            return <Text style={[styles.greetingText]}>
                Loading...
            </Text>;
        }, 3000);
    }

    const newHabit = async (id) => {
        const activity = await database.collections.get('apps').query(Q.where('appid', id)).fetch(1);
        console.log('New Activity Entry Form', id);
        console.log(activity[0].title);
        setNewActivityModal(true);
    };

    const loadApps = apps.map(app => ({
        layout: 'vertical',
        title: app.title,
        description: app.desacription,
        selected_theme: 1,
        appid: app.appid,
        columns: [],
        components: [
            { type: 'Text', props: { text: app.title, credit: 'By ' + app.author, appid: app.appid } },
            { type: 'Button', props: { title: 'Make A New Habit', onPress: () => { newHabit(app.appid) } } },
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

    const getCurrentLocation = (action) => {
        Geolocation.getCurrentPosition(
            (position) => {
                const newLocation = {
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                };
                if (!isNaN(newLocation.latitude) && !isNaN(newLocation.longitude)) {
                    setLocation(newLocation);
                    if (action === 'start') {
                    } else if (action === 'end') {
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

    const activityIndividual = async (id) => {
        console.log('activityIndividual', id)
        setActivityModal(true);
    }

    closeNewHabitModal = () => {
        Alert.alert("Close without saving?", "Are you sure you want to close it without saving changes?",
            [
                { text: "No", style: "cancel" },
                {
                    text: "Yes", onPress: () => {
                        resetModalState();
                        setNewActivityModal(false);
                    }
                }
            ]
        );
    };

    const onHabitTypeValueChange = (value) => {
        setHabitType(value);
    }

    const TimeSlot = Array.from({ length: 96 }, (_, i) => {
        const hour = Math.floor(i / 4);
        const minute = 15 * (i % 4);
        return `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
    });

    const onDateChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShowDatePicker(false);
        setStartDate(currentDate);
    };

    const openDatePicker = () => {
        setShowDatePicker(true);
    };

    function onHabitTypeChange() {
        switch (habitType) {
            case 'DAILY':
                return (<><Text style={styles.helpingTitle}>SELECT TIME</Text>
                    <Picker
                        selectedValue={time}
                        style={styles.picker}
                        onValueChange={value => setTime(value)}
                    >
                        {TimeSlot.map((time, index) => (
                            <Picker.Item key={index} label={time} value={time} />
                        ))}
                    </Picker></>);
            case 'WEEKLY':
                return (<><Text style={styles.helpingTitle}>SELECT DAY</Text>
                    <Picker
                        selectedValue={selectedDaySlot}
                        style={styles.picker}
                        onValueChange={value => setSelectedDaySlot(value)}
                    >
                        {["MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY", "SATURDAY", "SUNDAY"].map((day, index) =>
                            <Picker.Item key={index} label={day} value={index} />
                        )}
                    </Picker>
                    <Text style={styles.helpingTitle}>SELECT TIME</Text>
                    <Picker
                        selectedValue={time}
                        style={styles.picker}
                        onValueChange={value => setTime(value)}
                    >
                        {TimeSlot.map((time, index) => (
                            <Picker.Item key={index} label={time} value={time} />
                        ))}
                    </Picker></>);
            case 'MONTHLY':
                return (<><View>
                    {showDatePicker && <><DatePicker
                        style={styles.input}
                        value={startDate}
                        mode="date"
                        display="default"
                        placeholder="Start Date (YYYY-MM-DD)"
                        format="YYYY-MM-DD"
                        minDate={new Date()}
                        maxDate="2100-12-31"
                        confirmBtnText="Confirm"
                        cancelBtnText="Cancel"
                        onChange={onDateChange}
                    /></>}<View>
                        <Text style={styles.helpingTitle}>
                            SELECTED DATE
                        </Text>
                        <TouchableOpacity style={styles.datePicker} onPress={() => setShowDatePicker(true)}>
                            <Text style={styles.datePickerbtn}>{startDate.toLocaleDateString()}</Text>
                        </TouchableOpacity>
                    </View>
                    <Text style={styles.helpingTitle}>SELECT TIME</Text>
                    <Picker
                        selectedValue={time}
                        style={styles.picker}
                        onValueChange={(itemValue) => setTime(itemValue)}
                    >
                        {TimeSlot.map((time, index) => (
                            <Picker.Item key={index} label={time} value={time} />
                        ))}
                    </Picker>
                </View>
                </>
                );
            default:
                return null;
        }
    }

    return (
        <View style={styles.container}>
            <Modal
                animationType="slide"
                visible={newActivityModal}
                backgroundColor={'#333333'}
                transparent={false}
                onRequestClose={() => setNewActivityModal(false)}>
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <View style={styles.modalNewHabit}>
                        <View style={{ marginBottom: 12, paddingBottom: 4, borderBottomWidth: 0.4, backgroundColor: 'white', borderBottomColor: 'black', width: '100%' }}>
                            <Text style={styles.modalTitle}>
                                {selectedAppDetails.verbose_title || 'MAKE A NEW HABIT'}
                            </Text>
                            <Text style={styles.modalSubTitle}>
                                {selectedAppDetails.verbose_description || 'Lace up and go, feel the fresh air flow.'}
                            </Text>
                        </View>
                        <ScrollView style={{ flex: 1, marginBottom: 68, marginTop: -10 }} >
                            <View style={[styles.ModalGroupView, { marginTop: 10 }]}>
                                <View style={{ alignItems: 'center' }}>
                                    <Text style={styles.helpingTitle}>TITLE</Text>
                                    <TextInput
                                        style={styles.inputTitle}
                                        placeholder="Title"
                                        value={title}
                                        onChangeText={text => setTitle(text)}
                                    />
                                    <Text style={styles.helpingTitle}>DESCRIPTION</Text>
                                    <TextInput
                                        style={styles.inputDescription}
                                        placeholder="Description"
                                        value={description}
                                        multiline={true}
                                        onChangeText={text => setDescription(text)}
                                    />
                                </View>
                            </View>
                            <View style={styles.ModalGroupView}>
                                <Text style={styles.helpingTitle}>HOW REGULARLY ?</Text>
                                <Picker
                                    selectedValue={habitType}
                                    style={styles.picker}
                                    onValueChange={value => onHabitTypeValueChange(value)}>
                                    <Picker.Item label="HOW REGULARLY ?" value="N/A" />
                                    <Picker.Item label="DAILY" value="DAILY" />
                                    <Picker.Item label="WEEKLY" value="WEEKLY" />
                                    <Picker.Item label="MONTHLY" value="MONTHLY" />
                                </Picker>
                                {onHabitTypeChange(habitType)}
                            </View>
                            <View style={styles.ModalGroupView}>
                                <View style={styles.notifyView}>
                                    <Text style={styles.notifyText}>NOTIFY?</Text>
                                    <Switch
                                        trackColor={{ false: "#767577", true: "black" }}
                                        thumbColor={notify ? "green" : "darkgray"}
                                        ios_backgroundColor="#3e3e3e"
                                        onValueChange={toggleSwitch}
                                        value={notify}
                                    />
                                </View>
                            </View>
                        </ScrollView>
                        <View style={styles.bottomModal}>
                            <View style={{ flex: 1, justifyContent: 'space-around', flexDirection: 'row' }}>
                                <TouchableOpacity
                                    style={styles.saveButton}
                                    onPress={() => saveActivity()}>
                                    <Text style={styles.saveButtonText}>Save Habit</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={styles.closeButton}
                                    onPress={() => closeNewHabitModal()}>
                                    <Text style={styles.closeButtonText}>Close</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </TouchableWithoutFeedback>
            </Modal>
            <Modal
                animationType="slide"
                visible={activityModal}
                backgroundColor={'#333333'}
                transparent={false}
                onRequestClose={() => setActivityModal(false)}>
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
                            <Text style={styles.btnLocationStartStop}>{isStart ? 'Stop' : 'Start'}</Text>
                        </TouchableOpacity>
                        {startLocation && (
                            <>
                                <Text style={styles.btnLocationStartStop}>Start Name: {startLocation.name}</Text>
                                <Text style={styles.btnLocationStartStop}>Start Latitude: {startLocation.lat}</Text>
                                <Text style={styles.btnLocationStartStop}>Start Longitude: {startLocation.lon}</Text>
                            </>
                        )}
                        {stopLocation && (
                            <>
                                <Text style={styles.btnLocationStartStop}>Stop Name: {stopLocation.name}</Text>
                                <Text style={styles.btnLocationStartStop}>Stop Latitude: {stopLocation.lat}</Text>
                                <Text style={styles.btnLocationStartStop}>Stop Longitude: {stopLocation.lon}</Text>
                            </>
                        )}
                    </View>
                    <View>
                        <SafeAreaView style={{ height: 400, width: '100%' }}>
                            <WebView
                                style={{ height: 400, width: '100%' }}
                                originWhitelist={['*']}
                                source={{ html: mapHtmlContent }}
                            />
                        </SafeAreaView>
                    </View>

                    <TouchableOpacity
                        style={styles.closeButton}
                        onPress={() => setActivityModal(false)}>
                        <Text style={styles.closeButtonText}>Close</Text>
                    </TouchableOpacity>
                </View>
            </Modal>
            <View style={[styles.topBar, { flexDirection: 'column' }]}>
                <Text style={{ color: ColorScheme.greetingText }}>Hi Shariq</Text>
                <Text style={{ color: 'red' }}>Score: 45</Text>
            </View>

            {/* Apps Container */}
            <View style={styles.bodyContainer}>
                <ScrollView style={styles.body} scrollEventThrottle={6}>
                    {/* HabContainer Injected Pull */}
                    {loadApps.map((appConfig, index) => (
                        <HabContainer key={index}
                            subAppConfig={appConfig}
                            onDelete={deleteContainer}
                            onActivityRun={activityIndividual}
                            onAppSelected={handleAppSelection}
                        />
                    ))}
                    {/* HabContainer Injected Pull END */}
                </ScrollView>
            </View>
            {/* Apps Container END */}

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