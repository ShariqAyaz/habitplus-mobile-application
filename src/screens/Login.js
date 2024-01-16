import React, { useState } from 'react';
import { View, Image, TextInput, Button, Text, TouchableOpacity, StyleSheet } from 'react-native';

const LoginScreen = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = () => {
        // Handle login logic here
    };

    const handleForgotPassword = () => {
        // Handle forgot password logic here
    };

    const handleRegister = () => {
        // Handle register logic here
    };

    return (
        <View style={styles.container}>
            <View style={styles.logoContainer}>
                <Image
                    source={require('../assets/img/logo.png')}
                    style={styles.logo}
                />
            </View>
            <View style={styles.formContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="Email/Username"
                    placeholderTextColor="rgba(0, 0, 0, 0.5)" // Change the placeholder color here
                    value={email}
                    onChangeText={setEmail}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Password"
                    placeholderTextColor="rgba(0, 0, 0, 0.5)" // Change the placeholder color here
                    secureTextEntry
                    value={password}
                    onChangeText={setPassword}
                />
                <Button title="Login" onPress={handleLogin} />
                <TouchableOpacity onPress={handleForgotPassword}>
                    <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        padding: 20,
    },
    logoContainer: {
        paddingTop: 40,
        width: '50',
        height: '50',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    logo: {
        width: 150,
        height: 150,
        resizeMode: 'contain',
    },
    formContainer: {
        flex: 1,
        justifyContent: 'center',
    },
    input: {
        backgroundColor: 'lightgray',
        borderRadius: 0,
        color: 'black',
        padding: 10,
        marginBottom: 10,
        fontSize: 16, // Increase the font size here
    },
    forgotPasswordText: {
        paddingTop: 10,
        color: 'blue',
        textAlign: 'center',
    },
});

export default LoginScreen;
