import React, { useState, useEffect } from 'react';
import { Image, View, TextInput, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import Draggable from 'react-native-draggable';

import HabContainer from '../components/HabContainer';

import { database } from '../../services/database/index';
import { Q } from '@nozbe/watermelondb';
import { json } from '@nozbe/watermelondb/decorators';


const MainScreen = ({ navigation }) => {

    const [apps, setApps] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const [scrollOffset, setScrollOffset] = useState(0);

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
    }, []);

    if (isLoading) {
        setTimeout(() => {
            return <Text style={[styles.greetingText]}>
                Loading...
            </Text>;
        }, 3000);
    }

    console.log(JSON.stringify(apps, null, 2));

    const transformedApps = apps.map(app => ({
        layout: 'vertical', // Assuming all use a vertical layout
        title: app.title,
        description: app.description,
        selected_theme: 1, // Assuming a default theme, adjust as necessary
        columns: [], // Adjust based on your actual data needs
        components: [
            { type: 'Text', props: { text: app.title, credit: 'By ' + app.author , id: app.id} },
            // Add any other components you need to render based on the app data
            { type: 'Button', props: { title: 'Make Schedule', onPress: () => console.log('Add Task') } },
        ],
    }));


    // const runnerApp = {
    //     layout: 'vertical',
    //     title: "RUNNER",
    //     description: "Runner is officially app under 'Habit++' ecosystem. It scheduling your runs and it use GPS to track your runs and provide you with the stats.",
    //     selected_theme: 1,
    //     columns: [],
    //     components: [
    //         { type: 'Text', props: { text: 'RUNNER', credit: 'By Shariq' } },
    //         { type: 'Button', props: { title: 'Make Schedule', onPress: () => { console.log('Add Task'); } } },
    //     ],
    // };


    // const readingApp = {
    //     layout: 'vertical',
    //     title: "READING",
    //     description: "Introducing Claudiu's revolutionary scheduling app: A user-friendly solution to manage your time effectively. With intelligent scheduling, task tracking, and analytics, this app simplifies your daily routines. Say goodbye to missed appointments and stress. Download today for a more organized and fulfilling life.",
    //     selected_theme: 1,
    //     components: [
    //         { type: 'Text', props: { text: 'READING', credit: 'By Claudiu' } },
    //         { type: 'Button', props: { title: 'Add Reading Task', onPress: () => { console.log('Add Task'); } } },
    //     ],
    // };

    // const calendarApp = {
    //     layout: 'vertical',
    //     title: "App Settings",
    //     description: "Configure your app settings here.",
    //     selected_theme: 1,
    //     columns: [
    //         { name: 'Task Number' },
    //         { name: 'Task Name' }
    //     ],
    //     components: [
    //         { type: 'Text', props: { text: 'SMART CALENDAR', credit: 'By David' } },
    //         { type: 'Text', props: { text: 'No Tasks 😮' } },
    //     ],
    // };


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
            <View style={[styles.topBar]}>
                <Text style={[styles.greetingText]}>Hi Shariq</Text>
            </View>
            <View style={styles.bodyContainer}>
                <ScrollView style={styles.body} scrollEventThrottle={6}>
                    {transformedApps.map((appConfig, index) => (
                        <HabContainer key={index} subAppConfig={appConfig} />
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