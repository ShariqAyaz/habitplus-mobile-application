import React, { useState } from 'react';
import { View, Text, TextInput, Button, ScrollView, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

const ReadingHabitMCQs = () => {
    const [userInput, setUserInput] = useState('');
    const [conversationHistory, setConversationHistory] = useState([]);
    const [scores, setScores] = useState(0);

    const isMessageUnique = (newMessage) => {
        return !conversationHistory.some(msg => msg.content === newMessage.content && msg.role === newMessage.role);
    };

    const sendUserInput = async () => {
        const payload = {
            book: "The Power of Habit - Charles",
            chapter: "1",
            userContent: userInput,
            stage: conversationHistory.length > 0 ? "response" : "initial",
            conversationHistory: conversationHistory.filter(msg => msg.role !== "system")
        };

        try {
            const response = await fetch('https://eyqmpyk6lf.execute-api.us-east-1.amazonaws.com/prod/questions', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });
            const data = await response.json();
            console.log(data);

            const scoreMessage = data.conversationHistory.find(msg => msg.role === 'assistant' && msg.content.includes('Total Score'));
            if (scoreMessage) {
                const totalScore = parseInt(scoreMessage.content.match(/Total Score: (\d+)\/\d+/)[1], 10);
                setScores(scores+totalScore); 
                setConversationHistory([]);
            }

            // Update conversation history by filtering out redundant messages
            const uniqueMessages = data.conversationHistory.filter(isMessageUnique);
            setConversationHistory([...conversationHistory, ...uniqueMessages]);
            setUserInput('');
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>READING APPLICATION & MEMORY RETENTION</Text>
            <View style={styles.scoresContainer}>
                <Text style={styles.scoresTitle}>Scores:</Text>
                    <Text style={styles.scores}>{scores}</Text>
            </View>
            <ScrollView style={styles.conversationHistory}>
                {conversationHistory
                    .filter(msg => msg.role !== 'system') // Filter out system messages here
                    .map((msg, index) => (
                        <View key={index} style={[styles.message, msg.role === 'user' ? styles.user : styles.assistant]}>
                            <Text style={styles.messageText}>{msg.content}</Text>
                        </View>
                    ))}
            </ScrollView>

            <TextInput
                style={styles.input}
                placeholder="Type your response here..."
                value={userInput}
                onChangeText={setUserInput}
            />
            <Button
                title="SEND"
                onPress={sendUserInput}
                color="green"
            />
            <Text style={styles.creditText}>Active Recall: A Simple Study Hack Backed by Science, by John Dunlosky, Katherine A. Rawson, Elizabeth J. Marsh, Mitchell J. Nathan, Daniel T. Willingham, Psychological Science in the Public Interest, 14(1), 1-58, 2013. DOI: 10.1177/1529100612453266. Authors: John Dunlosky, Katherine A. Rawson, Elizabeth J. Marsh, Mitchell J. Nathan, Daniel T. Willingham.</Text>
            <Text style={styles.creditText}>Segmented Study: A Study Strategy on the Verge of Application, by Doug Rohrer, Harold Pashler, Psychological Science in the Public Interest, 14(1), 106-121, 2013. DOI: 10.1177/1529100612453266. Authors: Doug Rohrer, Harold Pashler.</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        color: 'black',
        marginBottom: 20,
    },
    conversationHistory: {
        flex: 1,
        marginBottom: 20,
    },
    message: {
        padding: 8,
        borderRadius: 12,
        margin: 5,
        maxWidth: '80%',
    },
    user: {
        backgroundColor: '#4CAF50',
        alignSelf: 'flex-end',
        marginLeft: '20%',
    },
    assistant: {
        backgroundColor: '#0084ff',
        alignSelf: 'flex-start',
        marginRight: '20%',
    },
    messageText: {
        color: '#fff',
        lineHeight: 21.6,
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        color: 'black',
        marginBottom: 10,
        lineHeight: 19.2,
    },
    scoresContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginBottom: 20,
        color: 'black',
    },
    scores: {
        fontSize: 20,
        color: 'white',
        padding: 8,
        backgroundColor: 'green',
    },
    scoresTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#333333',
        padding: 8,
        backgroundColor: 'green',
    },creditText: {
        fontSize: 9,
        textAlign: 'center',
        color: '#999',
        marginVertical: 5,
      }
      
});

export default ReadingHabitMCQs;
