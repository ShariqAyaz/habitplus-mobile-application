import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { Calendar } from 'react-native-calendars';


const GettingStarted = () => {

    // Example functions for handling button presses
    const handleFirstButtonPress = () => {
        console.log('First Button Pressed');
        // Add your logic for the first button here
    };

    const handleSecondButtonPress = () => {
        console.log('Second Button Pressed');
        // Add your logic for the second button here
    };

    return (
        <View style={styles.container}>
            <Calendar
                // Initially visible month. Default = Date()
                current={Date()}
                // Handler which gets executed on day press. Default = undefined
                onDayPress={(day) => { console.log('selected day', day) }}
                // Month format in calendar title. Formatting values: http://arshaw.com/xdate/#Formatting
                monthFormat={'yyyy MM'}
                // Do not show days of other months in month page. Default = false
                hideExtraDays={true}
                // If hideArrows=false and hideExtraDays=false do not switch month when tapping on greyed out
                // day from another month that is visible in the calendar page. Default = false
                disableMonthChange={true}
                // If firstDay=1 week starts from Monday. Note that dayNames and dayNamesShort should still start from Sunday
                firstDay={1}
                // Show week numbers to the left. Default = false
                showWeekNumbers={true}
                // Handler which gets executed when press arrow icon left. It receive a callback can go back month
                onPressArrowLeft={subtractMonth => subtractMonth()}
                // Handler which gets executed when press arrow icon right. It receive a callback can go next month
                onPressArrowRight={addMonth => addMonth()}
                style={styles.calendar}
                // ...any other props you want to customize
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
        backgroundColor: '#007BFF', // Change as per your theme
        borderRadius: 5,
        alignItems: 'center',
    },
    buttonText: {
        color: '#FFFFFF',
        fontSize: 16,
    },
});
export default GettingStarted;
