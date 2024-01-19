import React, { useState } from 'react';
import { View, Image, TextInput, Button, Text, TouchableOpacity, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage'; 
import { useNavigation } from '@react-navigation/native';
import {API_URL, PORT} from "@env"


const LoginScreen = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigation = useNavigation();
    const [isEmailValid, setIsEmailValid] = useState(false);

    const handleLogin = async () => {;
        
        const trimmedEmail = email.trim().toLowerCase();
        
            const trimmedPassword = password.trim();

        if  (isEmailValid){

        try {
            
            const response = await fetch(`${API_URL}:${PORT}/api/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email: trimmedEmail, password: trimmedPassword }),
            });
    
            console.log(response.status);

            if (response.status === 200) {
                const data = await response.json();
                console.log(data);
                await AsyncStorage.setItem('userToken', data.accessToken); 
                navigation.navigate('Main');
            } else {
                setErrorMessage('Invalid credentials. Please try again.');
            }
        } catch (error) {
            console.error(error);
            setErrorMessage('An error occurred. Please try again later.');
        }
    }
    else {
        console.log('Invalid email. Please try again.');
    }
    };
    
    const handleLogout = async () => {
        try {
            await AsyncStorage.removeItem('userToken');
            navigation.navigate('Login');
        } catch (error) {
            console.error(error);
            setErrorMessage('An error occurred. Please try again later.');
        }
    };
    
    const handleForgotPassword = () => {
        
    };

    const handleRegister = () => {
        
    };

    
    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        setIsEmailValid(emailRegex.test(email.trim()));
        setEmail(email.replace(/\s/g, '')); 
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
                    placeholderTextColor="rgba(0, 0, 0, 0.5)" 
                    value={email}
                    onChangeText={validateEmail}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Password"
                    placeholderTextColor="rgba(0, 0, 0, 0.5)" 
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
        fontSize: 16, 
    },
    forgotPasswordText: {
        paddingTop: 10,
        color: 'blue',
        textAlign: 'center',
    },
});

export default LoginScreen;
