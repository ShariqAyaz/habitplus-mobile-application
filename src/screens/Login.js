import React, { useState } from 'react';
import { View, Image, Alert, TextInput, Button, Text, TouchableOpacity, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { API_URL, PORT } from "@env";

import { database } from '../../services/database/index';
import { seedDatabase } from '../../services/database/seedDatabase';
import { Q } from '@nozbe/watermelondb';
import { date, json } from '@nozbe/watermelondb/decorators';

const LoginScreen = () => {
    const navigation = useNavigation();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [isEmailValid, setIsEmailValid] = useState(false);
    const [isLoginButtonDisabled, setIsLoginButtonDisabled] = useState(false);

    const handleLogin = async () => {
        const trimmedEmail = email.trim().toLowerCase();
        const trimmedPassword = password.trim();

        if (isEmailValid) {
            setIsLoginButtonDisabled(true);
            try {
                const url = `${API_URL}/Login`;
                const response = await fetch(url, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ email: trimmedEmail, password: trimmedPassword }),
                });

                let accessToken;

                if (response.status === 200) {
                    const data = await response.json();

                    console.log(data);

                    if (data && data.accessToken) {
                        accessToken = data.accessToken;
                    }

                    if (accessToken) {

                        // Here adding the login user to the local database because it is offline first approach but still need internet access to login for the first time
                        const usersCollection = database.collections.get('users');

                        const user = await usersCollection.query(Q.where('email', trimmedEmail)).fetch();

                        if (user.length > 0) {
                            console.log("User found");

                            // if user found must chk if apps exits or not
                            await database.write(async () => {
                                user[0].update((record) => {
                                    record.email = trimmedEmail;
                                    record.accessToken = accessToken;
                                    record.updated_at = Date.now();
                                    record.userid = data.userid;
                                });
                            });
                        } else {
                            await database.write(async () => {
                                usersCollection.create((record) => {
                                    record.email = trimmedEmail;
                                    record.accessToken = accessToken;
                                    record.fullname = "",
                                        record.created_at = Date.now();
                                    record.updated_at = Date.now();
                                    record.userid = data.userid;
                                });
                            });

                            // seems first time for that user or first time 
                            seedDatabase();
                        }


                        await AsyncStorage.setItem('userToken', accessToken);
                        navigation.navigate('MainX');

                    } else {
                        console.log("Access token is undefined");
                        setErrorMessage('Access token is undefined. Please try again.');
                    }
                } else {
                    const errorData = await response.json();

                    console.log('Error response:', errorData);
                    setErrorMessage('Invalid credentials. Please try again.');
                    setIsLoginButtonDisabled(false);

                    // Show an alert box with the error message
                    Alert.alert('Login Failed', 'Invalid credentials. Please try again.');
                }

            } catch (error) {
                console.log(error);
                setErrorMessage('An error occurred. Please try again later.');
            }
        } else {
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
        // TODO: Implement handleForgotPassword functionality
    };

    const handleRegister = () => {
        // TODO: Implement handleRegister functionality
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
                <Button title="Login" onPress={handleLogin} disabled={isLoginButtonDisabled} />
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