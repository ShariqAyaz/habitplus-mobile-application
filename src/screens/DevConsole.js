import React, { useEffect, useState } from 'react';
import { Button, View, ScrollView, Text } from 'react-native';
import { database } from '../../services/database/index';
import { isObj } from '@nozbe/watermelondb/utils/fp';

const DevConsole = ({ navigation }) => {
    const [locationData, setLocationData] = useState([]);
    const [usersData, setUsersData] = useState([]);
    const [appData, setAppData] = useState([]);
    const [isDataVisible, setDataVisible] = useState(false);
    const [appActivities, setAppActivities] = useState([]);
    const [appActivityData, setAppActivityData] = useState([]);

    useEffect(() => {
        const fetchLocations = async () => {
            const locations = await database.collections.get('locations').query().fetch();
            setLocationData(locations.map(loc => loc._raw));
        };

        const fetchApps = async () => {
            const apps = await database.collections.get('apps').query().fetch();
            setAppData(apps.map(app => app._raw));
        }

        const fetchAppActivities = async () => {
            const app_activities = await database.collections.get('app_activity').query().fetch();
            setAppActivities(app_activities.map(app_activity => app_activity._raw));
        }

        const fetchAppActivityData = async () => {
            const app_activity_data = await database.collections.get('app_activity_data').query().fetch();
            setAppActivityData(app_activity_data.map(app_activity_data => app_activity_data._raw));

            console.log(app_activity_data);
        }

        const fetchUsers = async () => {
            const users = await database.collections.get('users').query().fetch();
            setUsersData(users.map(user => user._raw));
        };

        fetchUsers();
        fetchLocations();
        fetchApps();
        fetchAppActivities();
        fetchAppActivityData();
    }, []);

    const toggleDataVisibility = () => {
        setDataVisible(!isDataVisible);
    };

    const deleteRecord = async (tableName, id) => {
        if (typeof id === 'object') {
            console.log('deleting multiple records');
        } else if (typeof id === 'string') {
            const table = database.collections.get(tableName);
            await table.find(id).destroy();
            console.log('record deleted');
        }
    }

    return (
        <View style={{ height: '100%', backgroundColor: 'transparent' }}>
            <Text style={{ backgroundColor: 'blue', width: '100%', textAlignVertical: 'center', textAlign: 'center', color: 'white' }}>Dev Console</Text>
            <ScrollView>
                <Button onPress={toggleDataVisibility} style={{ backgroundColor: 'green', width: '100%', height: 50, textAlignVertical: 'center', textAlign: 'center', color: 'white' }} title='Data in database'></Button>
                {isDataVisible && (
                    <>
                        <Text>App</Text>
                        <ScrollView>
                            {appData.map((app, index) => (
                                <View key={index} style={{ backgroundColor: 'blue', padding: 10, marginVertical: 2 }}>
                                    <Text style={{ color: 'white' }}>Name: {app.appid}</Text>
                                    <Text style={{ color: 'white' }}>Name: {app.title}</Text>
                                    <Text style={{ fontSize: 10, color: 'white' }}>Description: {app.description}</Text>
                                    <Text style={{ color: 'white' }}>Author: {app.author}</Text>
                                    <Button onPress={() => deleteRecord('apps', app.appid)} title={`Delete ${app.appid}`} />
                                </View>
                            ))}
                        </ScrollView>
                        <Text>Location</Text>
                        <ScrollView>
                            {locationData.map((location, index) => (
                                <View key={index} style={{ backgroundColor: 'blue', padding: 10, marginVertical: 2 }}>
                                    <Text style={{ color: 'white' }}>Latitude: {location.latitude}</Text>
                                    <Text style={{ color: 'white' }}>Longitude: {location.longitude}</Text>
                                    <Text style={{ color: 'white' }}>Timestamp: {new Date(location.timestamp).toLocaleString()}</Text>
                                    <Button onPress={() => deleteRecord('location', location)} title={`Delete ${location.appid}`} />
                                </View>
                            ))}
                        </ScrollView>
                        <Text>App Activities</Text>
                        <ScrollView>
                            {appActivities.map((app_activity, index) => (
                                <View key={index} style={{ backgroundColor: 'blue', padding: 10, marginVertical: 2 }}>
                                    <Text style={{ color: 'white' }}>Title: {app_activity.title}</Text>
                                </View>
                            ))}
                        </ScrollView>
                        <Text>
                            App Activity Data
                        </Text>
                        <ScrollView>
                            {appActivityData.map((a, index) => (
                                <View key={index} style={{ backgroundColor: 'blue', padding: 10, marginVertical: 2 }}>
                                    <Text style={{ color: 'white' }}>ActivityID: {a.activityid}</Text>
                                </View>
                            ))}
                        </ScrollView>
                        <Text>Users</Text>
                        <ScrollView>
                            {usersData.map((user, index) => (
                                <View key={index} style={{ backgroundColor: 'blue', padding: 10, marginVertical: 2 }}>
                                    <Text style={{ color: 'white' }}>Name: {user.fullname}</Text>
                                    <Text style={{ color: 'white' }}>Email: {user.email}</Text>
                                    <Text style={{ color: 'white' }}>userid: {user.userid}</Text>
                                    <Button onPress={() => deleteRecord('users', user.userid)} title={`Delete ${user.name}`} />
                                </View>
                            ))}
                        </ScrollView>
                    </>
                )}
            </ScrollView>
        </View>
    );
};

export default DevConsole;
