/*
Disclaimer: the image appears are copied from various sites subject to fair use policy.
            NOIMAGE icon from: https://iconscout.com/icons/ban-team
            NICE icon from: https://www.nicepng.com/ourpic/u2q8i1o0q8o0a9a9_nice-png-nice-png/
            https://thenounproject.com/browse/icons/term/market-place/
*/

import React, { useState } from 'react';
import { Image, View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import Draggable from 'react-native-draggable';

import HabContainer from '../components/HabContainer';
import DraggableComponent from '../components/DraggableComponent';


const MainScreen = ({ navigation }) => {
    const [scrollOffset, setScrollOffset] = useState(0);

    const handleScroll = (event) => {
        const offsetY = event.nativeEvent.contentOffset.y;
        setScrollOffset(offsetY);
    };


    const topBarHeight = Math.max(40, 80 - scrollOffset / 2);
    const topBarFontSize = Math.max(13, 26 - scrollOffset / 20);


    const bodyMarginTop = topBarHeight + 4;

    const navScreens = {
        'Explore': 'MarketPlace',
        'Profile': 'Profile',
        'Settings': 'Settings'
        // Add more mappings if needed
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
            <View style={[styles.topBar, { height: topBarHeight }]}>
                <Text style={[styles.greetingText, { fontSize: topBarFontSize }]}>Hi Shariq</Text>
            </View>
            <ScrollView
                style={[styles.body, { marginTop: bodyMarginTop }]}
                onScroll={handleScroll}
                scrollEventThrottle={16}
            >
                <HabContainer style={{ backgroundColor: 'white' }}>
                    <Text>Draggable Item 1</Text>
                </HabContainer>
                <HabContainer style={{ backgroundColor: 'white' }}>
                    <Text>Draggable Item 1</Text>
                </HabContainer>
                <HabContainer style={{ backgroundColor: 'white' }}>
                    <Text>Draggable Item 1</Text>
                </HabContainer>
                <HabContainer style={{ backgroundColor: 'white' }}>
                    <Text>Draggable Item 1</Text>
                </HabContainer>
            </ScrollView>

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
    topBar: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        backgroundColor: '#ffffff',
        justifyContent: 'center',
        paddingLeft: 16,
    },
    greetingText: {
        fontFamily: 'Roboto-Bold',
        color: '#000000',
    },
    bodyText: {
        fontFamily: 'Roboto-Regular',
        fontSize: 13,
        color: 'black',
    },
    body: {
        flex: 1,
        padding: 8,
        paddingBottom: 60,
        marginBottom: 60,
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
        color: '#000000',
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