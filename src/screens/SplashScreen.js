// Author: Shariq

/**
 * This screen is the splash screen of the app.
 * It displays a logo that scales up and fades out after a delay.
 * After the animation completes, it navigates to the main screen.
 */

import React, { useEffect, useRef } from 'react';
import { View, Image, StyleSheet, Animated, Text } from 'react-native';

const SplashScreen = () => {
    const logoScale = useRef(new Animated.Value(1)).current;
    const logoOpacity = useRef(new Animated.Value(1)).current;

    useEffect(() => {
        const timer = setTimeout(() => {
            console.log('Navigating to Main screen');
        }, 3000);

        const expandAnimation = Animated.timing(logoScale, {
            toValue: 2,
            duration: 1000,
            delay: 2000, // Delay the start by 2000 milliseconds
            useNativeDriver: true,
        });

        const fadeOutAnimation = Animated.timing(logoOpacity, {
            toValue: 0,
            duration: 1000,
            delay: 2000, // Delay the start by 2000 milliseconds
            useNativeDriver: true,
        });

        Animated.sequence([
            Animated.delay(1000),
            Animated.parallel([expandAnimation, fadeOutAnimation]),
        ]).start();

        return () => {
            clearTimeout(timer);
        };
    }, []);

    return (
        <View style={styles.container}>
            <Animated.View style={[styles.logoContainer, { transform: [{ scale: logoScale }], opacity: logoOpacity }]}>
                <Image
                    source={require('../assets/img/logo.png')}
                    style={styles.logo}
                />
            </Animated.View>
            <View style={styles.promptContainer}>
                <Text style={styles.promptText}>
                    habitplus.com/app for more info
                </Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
    },
    logoContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    logo: {
        width: 150,
        height: 150,
        resizeMode: 'contain',
    },
    promptContainer: {
        padding: 10,
        backgroundColor: '#1DA1F2',
        alignSelf: 'stretch',
    },
    promptText: {
        color: 'black',
        textAlign: 'center',
        fontStyle: 'italic',
        overflow: 'hidden',
    },
});

export default SplashScreen;
