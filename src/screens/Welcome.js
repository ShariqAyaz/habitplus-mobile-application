import React, { useState, useEffect } from 'react';
import { View, Image, Text, TouchableOpacity, StyleSheet, Animated } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const Welcome = () => {
    const navigation = useNavigation();

    const fadeAnim = useState(new Animated.Value(0))[0];

    useEffect(() => {
        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true,
        }).start();
    }, []);
    
    return (
        <View style={styles.container}>
            <Animated.View style={[styles.logoContainer, { opacity: fadeAnim }]}>
                <Image source={require('../assets/img/logo.png')} style={styles.logo} />
            </Animated.View>
            <Animated.View style={[styles.buttonContainer, { transform: [{ translateY: fadeAnim.interpolate({ inputRange: [0, 1], outputRange: [100, 0] }) }] }]}>
                
                {/* Navigation to Login */}
                <TouchableOpacity
                    style={[styles.button]}
                    onPress={() => navigation.navigate('Login')}>
                    <Text style={[styles.buttonText]}>Login</Text>
                </TouchableOpacity>

                {/* Navigation to Register */}
                <TouchableOpacity
                    style={[styles.button]}
                    onPress={() => navigation.navigate('Register')}>
                    <Text style={[styles.buttonText]}>Register</Text>
                </TouchableOpacity>
            </Animated.View>

        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    logoContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    logo: {
        resizeMode: 'center',
    },
    button: {
        backgroundColor: '#007bff',
        padding: 15,
        borderRadius: 2,
        width: '90%',
        alignItems: 'center',
        marginBottom: 10,
    },
    buttonContainer: {
        marginBottom: 20,
        width: '100%',
        alignItems: 'center',
    },
    buttonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default Welcome;