import React, { useState } from 'react';
import { Image, View, TextInput, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import Draggable from 'react-native-draggable';

import HabContainer from '../components/HabContainer';
import DraggableComponent from '../components/DraggableComponent';

const MainScreen = ({ navigation }) => {
    const [scrollOffset, setScrollOffset] = useState(0);

    // App One
    const runnerApp = {
        layout: 'vertical',
        components: [
            { type: 'Text', props: { text: 'RUNNER', credit: 'By Shariq' } },
            { type: 'Button', props: { title: 'Make Schedule', onPress: () => { console.log('Add Task'); } } },
            {
                type: 'FlatList',
                props: {
                    data: [],
                    renderItem: ({ item }) => <Text>{item.text}</Text>,
                    keyExtractor: item => item.key,
                    ListEmptyComponent: () => <Text style={styles.emptyText}>Oops, no schedule ?{'\n'}Don't fret! Whenever you're ready 🏃‍♂️{'\n'}You've got this! 💪</Text>,
                },
            },
            
            // { type: 'TextInput', props: { placeholder: 'Add Something' } },
        ],
    };

    // App Two
    const readingApp = {
        layout: 'vertical',
        columns: [
            { name: 'Task Number' },
            { name: 'Task Name' }
        ],
        components: [
            { type: 'Text', props: { text: 'READING', credit: 'By Claudiu' } },
            { type: 'Button', props: { title: 'Add Reading Task', onPress: () => { console.log('Add Task'); } } },
            {
                type: 'FlatList',
                props: {
                    data: [
                        // { key: '1', text: 'Read Chapter 1 - Done' },
                        // { key: '2', text: 'Read Chapter 2 - Fail' },
                        // { key: '3', text: 'Read Chapter 3 - Due' },
                    ],
                    renderItem: ({ item }) => <Text>{item.text}</Text>,
                    keyExtractor: item => item.key,
                    ListEmptyComponent: () => <Text style={styles.emptyText}>Oops, no schedule ?{'\n'}Don't fret! Whenever you're ready 🏃‍♂️{'\n'}You've got this! 💪</Text>,
                }
            },
        ],
    };

    // App Three
    const calendarApp = {
        layout: 'vertical',
        components: [
            { type: 'Text', props: { text: 'CALENDAR', credit: 'By David' } },
            { type: 'Text', props: { text: 'No Tasks 😮' } },
        ],
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

            <View style={[styles.topBar]}>
                <Text style={[styles.greetingText]}>Hi Shariq</Text>
            </View>

            <View style={styles.bodyContainer}>
                <ScrollView
                    style={styles.body}
                    scrollEventThrottle={6}
                >
                    <HabContainer subAppConfig={runnerApp} />
                    <HabContainer subAppConfig={calendarApp} />
                    <HabContainer subAppConfig={readingApp} />

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