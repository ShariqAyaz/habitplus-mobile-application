/**
 * Represents the AlarmScreen component.
 * Allows the user to set an alarm and trigger an alarm when the time is up.
 */

import React, { useState, useEffect } from 'react';
import { View, Text, Button, Vibration, Platform } from 'react-native';

const AlarmScreen = () => {
    const [hours, setHours] = useState(0);
    const [minutes, setMinutes] = useState(0);
    const [seconds, setSeconds] = useState(0);
    const [totalSeconds, setTotalSeconds] = useState(0);
    const [isActive, setIsActive] = useState(false);

    useEffect(() => {
        let interval = null;
        if (isActive && totalSeconds > 0) {
            interval = setInterval(() => {
                setTotalSeconds((seconds) => seconds - 1);
            }, 1000);
        } else if (totalSeconds === 0 && isActive) {
            triggerAlarm();
            setIsActive(false);
        }
        return () => clearInterval(interval);
    }, [isActive, totalSeconds]);

    const startTimer = () => {
        setTotalSeconds(hours * 3600 + minutes * 60 + seconds);
        setIsActive(true);
    };

    const triggerAlarm = () => {
        Vibration.vibrate(10 * 1000);
    };

    const formatTime = () => {
        let remainingSeconds = totalSeconds;
        const hours = Math.floor(remainingSeconds / 3600);
        remainingSeconds -= hours * 3600;
        const minutes = Math.floor(remainingSeconds / 60);
        remainingSeconds -= minutes * 60;
        const seconds = remainingSeconds;

        return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    };

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>Set Alarm</Text>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around' }}>
                <TextInput
                    style={{ borderWidth: 1, padding: 10, width: 60 }}
                    keyboardType="numeric"
                    placeholder="HH"
                    onChangeText={(text) => setHours(Number(text))}
                />
                <TextInput
                    style={{ borderWidth: 1, padding: 10, width: 60 }}
                    keyboardType="numeric"
                    placeholder="MM"
                    onChangeText={(text) => setMinutes(Number(text))}
                />
                <TextInput
                    style={{ borderWidth: 1, padding: 10, width: 60 }}
                    keyboardType="numeric"
                    placeholder="SS"
                    onChangeText={(text) => setSeconds(Number(text))}
                />
            </View>

            <Text>{formatTime()}</Text>
            <Button title="Set" onPress={startTimer} />
        </View>
    );
};

export default AlarmScreen;
