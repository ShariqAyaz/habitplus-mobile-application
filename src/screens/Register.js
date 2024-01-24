import React, { useState } from 'react';
import { View, Image, TextInput, Text, TouchableOpacity, StyleSheet, Linking, Alert, Platform, ScrollView, KeyboardAvoidingView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Sound from 'react-native-sound';
import AsyncStorage from '@react-native-async-storage/async-storage'; 
import {API_URL, PORT} from "@env"

const RegisterScreen = () => {

    const navigation = useNavigation();
    const [fullName, setFullName] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [age, setAge] = useState('');
    const [isLicenseAgreed, setIsLicenseAgreed] = useState(false);
    const [isEmailValid, setIsEmailValid] = useState(false); 

    const successSound = new Sound(require('../assets/sounds/success.mp3'), (error) => {
        if (error) {
            console.log('Failed to load the sound', error);
        }
    });

    const handleRegister = async () => {
        
        if (isLicenseAgreed) {
            if (isEmailValid) {
                const userData = {
                    fullName: fullName.trim(),
                    username: username.trim(),
                    email: email.trim(),
                    password: password.trim(),
                    age: age.trim()
                };

                const response = await fetch(`${API_URL}/Register`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({email:email, password:password, username:username})
                })

                console.log(response);
                if (response.status === 200) {

                    const data = await response.json();
                    console.log(data);

                   // await AsyncStorage.setItem('userToken', data.accessToken);

                    successSound.play();
                        Alert.alert(
                            'Registration successful',
                            'Hello ' + userData.fullName + '! \nDo you want to login now?',
                            [
                                {
                                    text: 'Yes',
                                    onPress: async () => {

                                        console.log(email, userData.password);

                                        try {
                                    
                                            const response = await fetch(`${API_URL}/api/Register`, {
                                                method: 'POST',
                                                headers: {
                                                    'Content-Type': 'application/json',
                                                },
                                                body: JSON.stringify({ email: userData.email.toLowerCase(), username: userData.user ,password: userData.password }),
                                            });
                                    
                                            if (response.status === 200) {
                                                const data = await response.json();
                                                console.log(data);
                                                await AsyncStorage.setItem('userToken', data.accessToken); 
                                                navigation.navigate('MainX');
                                            } else {
                                                console.log('Invalid credentials. Please try again.');
                                            }
                                        } catch (error) {
                                            console.error(error);
                                            console.log('An error occurred. Please try again later.');
                                        }

                                    }
                                },
                                {
                                    text: 'No',
                                    onPress: () => navigation.navigate('Login')
                                }
                            ]
                        );
                    navigation.navigate('MainX');
                }
                else {
                    setErrorMessage('Invalid credentials. Please try again.');
                }

            } else {
                console.log("Invalid email");
            }
        } else {
            console.log("Unchecked, Register");
        }
    };

    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        setIsEmailValid(emailRegex.test(email));
        setEmail(email);
    };

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <View style={styles.logoContainer}>
                    <Image
                        source={require('../assets/img/logo.png')}
                        style={styles.logo}
                    />
                </View>
                <View style={styles.formContainer}>
                    <TextInput
                        style={styles.input}
                        placeholder="Full Name"
                        placeholderTextColor="rgba(0, 0, 0, 0.5)"
                        value={fullName}
                        onChangeText={setFullName}
                        maxLength={100}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Username"
                        placeholderTextColor="rgba(0, 0, 0, 0.5)"
                        value={username}
                        onChangeText={setUsername}
                        maxLength={100}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Email"
                        placeholderTextColor="rgba(0, 0, 0, 0.5)"
                        value={email}
                        onChangeText={validateEmail}
                        keyboardType="email-address" 
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Password"
                        placeholderTextColor="rgba(0, 0, 0, 0.5)"
                        secureTextEntry
                        value={password}
                        onChangeText={setPassword}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Confirm Password"
                        placeholderTextColor="rgba(0, 0, 0, 0.5)"
                        secureTextEntry
                        value={confirmPassword}
                        onChangeText={setConfirmPassword}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Age"
                        placeholderTextColor="rgba(0, 0, 0, 0.5)"
                        value={age}
                        onChangeText={setAge}
                    />
                    <TouchableOpacity
                        style={styles.checkboxContainer}
                        onPress={() => setIsLicenseAgreed(!isLicenseAgreed)}
                    >
                        <View style={styles.checkbox}>
                            {isLicenseAgreed ? <Text style={styles.checkboxText}>✓</Text> : null}
                        </View>
                        <Text style={styles.checkboxLabel}>
                            I agree to the{' '}
                            <Text
                                style={styles.linkText}
                                onPress={() => Linking.openURL('http:///term')}
                            >
                                {"User "}Terms & Conditions
                            </Text>
                        </Text>
                    </TouchableOpacity>
                    <View>
                        <TouchableOpacity
                            style={styles.registerButton}
                            onPress={handleRegister}
                        >
                            <Text style={styles.registerButtonText}>Register</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        padding: 20,
    },
    scrollContainer: {
        flexGrow: 1,
    },
    logoContainer: {
        paddingTop: 50,
        paddingBottom: 60,
        width: '100%',
        alignItems: 'center',
    },
    logo: {
        width: 100,
        height: 100,
        resizeMode: 'contain',
    },
    formContainer: {
        flex: 1,
    },
    linkText: {
        color: 'blue',
        textDecorationLine: 'underline',
    },
    input: {
        backgroundColor: 'lightgray',
        borderRadius: 3,
        color: 'black',
        padding: 10,
        marginBottom: 10,
        fontSize: 15,
    },
    checkboxContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10,
        marginBottom: 10,
    },
    checkbox: {
        width: 20,
        height: 20,
        borderWidth: 1,
        borderColor: 'black',
        marginRight: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    checkboxText: {
        fontSize: 16,
        color: 'black',
    },
    checkboxLabel: {
        fontSize: 16,
        color: 'black',
    },
    registerButton: {
        backgroundColor: '#007bff',
        borderRadius: 4,
        alignItems: 'center',
        justifyContent: 'center',
        height: 50,
        width: '100%',
        alignSelf: 'center',
        marginTop: 20,
    },
    registerButtonText: {
        color: 'white',
        fontSize: 16,
    },
});

export default RegisterScreen;
