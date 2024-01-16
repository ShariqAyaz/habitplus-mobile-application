import React, { useState } from 'react';
import { View, Image, TextInput, Text, TouchableOpacity, StyleSheet, Linking } from 'react-native';

const RegisterScreen = () => {
    const [firstName, setFirstName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [age, setAge] = useState('');
    const [isLicenseAgreed, setIsLicenseAgreed] = useState(false);
    const [isEmailValid, setIsEmailValid] = useState(false); // Add this line

    const handleRegister = () => {
        if (isLicenseAgreed) {
            if (isEmailValid) {
                console.log("Checked, Register");
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
                    placeholder="First Name"
                    placeholderTextColor="rgba(0, 0, 0, 0.5)"
                    value={firstName}
                    onChangeText={setFirstName}
                    maxLength={100}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Email"
                    placeholderTextColor="rgba(0, 0, 0, 0.5)"
                    value={email}
                    onChangeText={validateEmail}
                    keyboardType="email-address" // This ensures the keyboard is optimized for email input
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
                            onPress={() => Linking.openURL('https://abc.com/term')}
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