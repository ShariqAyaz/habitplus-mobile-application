import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

const LoginTest = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleLogin = () => {
        // Email format validation using regex
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            setErrorMessage('Invalid email format');
            return;
        }

        // Password length validation
        if (password.length < 8) {
            setErrorMessage('Password must be at least 8 characters long');
            return;
        }

        // Simulating login with a mock function or API call
        const loginSuccess = true; // Replace with your login logic
        if (loginSuccess) {
            navigation.navigate('Dashboard');
        } else {
            setErrorMessage('Incorrect email or password');
        }
    };

    const handleForgotPassword = () => {
        navigation.navigate('PasswordReset');
    };

    const handleSignUp = () => {
        navigation.navigate('Registration');
    };

    return (
        <View style={styles.container}>
            <Text style={styles.heading}>Login</Text>

            {errorMessage ? <Text style={styles.error}>{errorMessage}</Text> : null}

            <TextInput
                style={styles.input}
                placeholder="Email"
                onChangeText={setEmail}
                value={email}
            />

            <TextInput
                style={styles.input}
                placeholder="Password"
                onChangeText={setPassword}
                value={password}
                secureTextEntry
            />

            <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
                <Text style={styles.loginButtonText}>Login</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={handleForgotPassword}>
                <Text style={styles.link}>Forgot Password</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={handleSignUp}>
                <Text style={styles.link}>Sign Up</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F7F7F7',
    },
    heading: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 20,
        fontFamily: 'Roboto',
    },
    input: {
        height: 44,
        borderWidth: 1,
        borderColor: '#CCCCCC',
        backgroundColor: '#FFFFFF',
        paddingHorizontal: 10,
        marginBottom: 10,
        fontFamily: 'Roboto',
        fontSize: 16,
        color: '#333333',
    },
    loginButton: {
        height: 48,
        paddingHorizontal: 20,
        backgroundColor: '#007BFF',
        borderRadius: 4,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 10,
    },
    loginButtonText: {
        color: '#FFFFFF',
        fontFamily: 'Roboto',
        fontSize: 16,
    },
    link: {
        color: '#007BFF',
        fontSize: 14,
        fontFamily: 'Roboto',
        marginBottom: 10,
    },
    error: {
        fontSize: 14,
        color: '#DC3545',
        marginBottom: 10,
    },
});

export default LoginTest;