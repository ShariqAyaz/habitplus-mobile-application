import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { Calendar } from 'react-native-calendars';
import Icon from 'react-native-vector-icons/FontAwesome';


const GettingStarted = () => {

    const handleFirstButtonPress = () => {
        console.log('First Button Pressed');
    };


    const btnReport = () => {
        console.log('First Button Pressed');
    };


    const handleSecondButtonPress = () => {
        console.log('Second Button Pressed');
    };

    return (
        <View style={[styles.container, { backgroundColor: 'white' }]}>
            <Calendar
                current={Date()}
                onDayPress={(day) => { console.log('selected day', day) }}
                monthFormat={'yyyy MM'}
                hideExtraDays={true}
                disableMonthChange={true}
                firstDay={1}
                showWeekNumbers={true}
                onPressArrowLeft={subtractMonth => subtractMonth()}
                onPressArrowRight={addMonth => addMonth()}
                style={styles.calendar}
            />
            <Icon name="music" size={30} color="black" />

            <View style={styles.buttonContainer}>
                <TouchableOpacity onPress={handleFirstButtonPress} style={[styles.button, { backgroundColor: '#ECB22E' }]}>
                    <Icon name="viadeo" size={30} color="#FFFFFF" /> 
                </TouchableOpacity>

                <TouchableOpacity onPress={handleFirstButtonPress} style={[styles.button, { backgroundColor: '#36C5F0' }]}>
                    <Icon name="quora" size={30} color="#FFFFFF" /> 
                </TouchableOpacity>

                <TouchableOpacity onPress={handleFirstButtonPress} style={[styles.button, { backgroundColor: '#2EB67D' }]}>
                    <Icon name="train" size={30} color="#FFFFFF" /> 
                </TouchableOpacity>

                <TouchableOpacity onPress={handleFirstButtonPress} style={[styles.button, { backgroundColor: '#36C5F0' }]}>
                    <Icon name="star-half-empty" size={30} color="#FFFFFF" /> 
                </TouchableOpacity>

                <TouchableOpacity onPress={btnReport} style={[styles.button, { backgroundColor: '#ECB22E' }]}>
                    <Icon name="music" size={30} color="#FFFFFF" /> 
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
    },
    button: {
        width: 70,
        height: 50,
        backgroundColor: '#007BFF',
        borderRadius: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonText: {
        color: '#FFFFFF',
        fontSize: 16,
    },
});

export default GettingStarted;
