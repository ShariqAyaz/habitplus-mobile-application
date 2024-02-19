import React, { useEffect, useState } from 'react';
import { Button, View, ScrollView, Text } from 'react-native';
import { database } from '../../services/database/index';

const DevConsole = ({ navigation }) => {
    const [locationData, setLocationData] = useState([]);
    const [appData, setAppData] = useState([]);
    const [isDataVisible, setDataVisible] = useState(false);

    useEffect(() => {

        const fetchLocationData = async () => {
            const locations = await database.collections.get('locations').query().fetch();
            setLocationData(locations.map(loc => loc._raw));
        };

        const fetchAppData = async () => {
            const apps = await database.collections.get('apps').query().fetch();
            setAppData(apps.map(app => app._raw));
        }

        fetchLocationData();
        fetchAppData();
    }, []);

    const toggleDataVisibility = () => {
        setDataVisible(!isDataVisible);
    };

    const deleteRecord = async (tableName, id) => {
        const table = database.collections.get(tableName);
        await table.find(id).destroy();
        console.log('record deleted');
    }

    return (
        <View style={{ height: '100%',backgroundColor: 'transparent' }}>
            <Text style={{ backgroundColor: 'blue', width: '100%', textAlignVertical: 'center' , textAlign: 'center', color: 'white' }}>Dev Console</Text>
            <ScrollView>
                <Button onPress={toggleDataVisibility} style={{ backgroundColor: 'green', width: '100%', height: 50,textAlignVertical: 'center' , textAlign: 'center', color: 'white' }} title='Data in database'></Button>
                {isDataVisible && (
                    <>
                        <Text>App</Text>
                        <ScrollView>
                            {appData.map((app, index) => (
                                <View key={index} style={{ backgroundColor: 'blue', padding: 10, marginVertical: 2 }}>
                                    <Text style={{ color: 'white' }}>Name: {app.title}</Text>
                                    <Text style={{ fontSize:10, color: 'white' }}>Description: {app.description}</Text>
                                    <Text style={{ color: 'white' }}>Author: {app.author}</Text>
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
                                </View>
                            ))}
                        </ScrollView>
                        <Text>App</Text>
                    </>
                )}
            </ScrollView>
        </View>
    );
};

export default DevConsole;
