import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { Calendar } from 'react-native-calendars';


const GettingStarted = () => {

    
    const handleFirstButtonPress = () => {
        console.log('First Button Pressed');
        
    };

    const handleSecondButtonPress = () => {
        console.log('Second Button Pressed');
        
    };

    return (
        <View style={styles.container}>
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
            <View style={styles.buttonContainer}>
                <TouchableOpacity onPress={handleFirstButtonPress} style={styles.button}>
                    <Text style={styles.buttonText}>First Button</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={handleSecondButtonPress} style={styles.button}>
                    <Text style={styles.buttonText}>Second Button</Text>
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
        bottom: 20,
        left: 20,
        right: 20,
    },
    button: {
        flex: 1,
        marginHorizontal: 10,
        paddingVertical: 10,
        backgroundColor: '#007BFF', 
        borderRadius: 5,
        alignItems: 'center',
    },
    buttonText: {
        color: '#FFFFFF',
        fontSize: 16,
    },
});
export default GettingStarted;
