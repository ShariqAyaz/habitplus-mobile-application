/*
Disclaimer: the image appears are copied from various sites subject to fair use policy.
            NOIMAGE icon from: https://iconscout.com/icons/ban-team
            NICE icon from: https://www.nicepng.com/ourpic/u2q8i1o0q8o0a9a9_nice-png-nice-png/
*/

import React, { useState } from 'react';
import { View, Text, ScrollView, Image, TouchableOpacity } from 'react-native';

const MarketPlace = () => {
    return (
        <View style={{ flex: 1, width: '100%', height: '100%' }}>
            <View style={{
                width: '100%',
                height: 60,
                backgroundColor: '#E01E5A',
                justifyContent: 'center',
                alignItems: 'center',
                textShadowColor: 'gray',
                borderColor: 'blue',
                textShadowOffset: { width: 3, height: 2 },
                borderBottomWidth: 0.7,
            }}>
                <Text style={{ color: 'white', fontSize: 18, fontFamily: 'Roboto-Black' }}>
                    Market Place
                </Text>
            </View>
            <ScrollView style={{
                flex: 1,
                backgroundColor: 'white',
                borderColor: 'green',
                textShadowOffset: { width: 2, height: 2 },
                borderBottomWidth: 1,
            }}>
                {renderObjects()}
            </ScrollView>
            <View style={{ height: 40, backgroundColor: '#2EB67D' }}>
                <TouchableOpacity style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{ color: 'white', fontSize: 16 }}>
                        Installed Application
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const renderObjects = () => {

    const [expanded, setExpanded] = useState({});

    const toggleDescription = (index) => {
        setExpanded(prevState => ({ ...prevState, [index]: !prevState[index] }));
    };

    const renderDescription = (description, index) => {
        const isExpanded = expanded[index];
        const snippet = description.length > 100 ? description.substring(0, 100) + '...' : description;

        return (
            <TouchableOpacity onPress={() => toggleDescription(index)}>
                <Text style={{ margin: 2, fontSize: 12, fontWeight: 'light', color: 'black', fontStyle: 'italic', textShadowColor: 'gray', textShadowOffset: { width: 1, height: 3 }, textAlign: 'justify' }}>
                    {isExpanded ? description : snippet}
                </Text>
            </TouchableOpacity>
        );
    };

    const objects = [
        {
            title: 'Disiplina',
            author: 'David Gamez',
            description: 'A routine of productivity and discipline. This routine is for those who want to be productive and proactive in their life. There are set of daily routines and habits need to incorporate, may replace your one',
            stars: 5,
            downloads: 100,
            img: require('../assets/img/NICE.png'),
        },
        {
            title: 'Proactive Student',
            author: 'Shariq Ayaz',
            description: 'A Typical Routine of a Student and software engineer part-time. This routine is for those who want to be productive and proactive in their life.',
            stars: 5,
            downloads: 50,
            img: require('../assets/img/logo.png'),
        },
        {
            title: 'Mindful Meditation',
            author: 'Emma Lopez',
            description: 'Explore the art of mindfulness and meditation to enhance focus and tranquility in your everyday life.',
            stars: 4,
            downloads: 75,
            img: require('../assets/img/noimage.webp'),
        },
        {
            title: 'Healthy Cooking',
            author: 'John Doe',
            description: 'Discover simple and delicious recipes for a healthier lifestyle. Ideal for busy individuals seeking nutritious meals.',
            stars: 4,
            downloads: 80,
            img: require('../assets/img/noimage.webp'),
        },
        {
            title: 'Yoga for Beginners',
            author: 'Sara Yin',
            description: 'Embark on a journey of self-discovery with beginner-friendly yoga routines that promote physical and mental well-being.',
            stars: 4.5,
            downloads: 120,
            img: require('../assets/img/NICE.png'),
        },
        {
            title: 'Time Management Skills',
            author: 'Alan Smith',
            description: 'Master the art of managing your time effectively to boost productivity and reduce stress in your professional and personal life.',
            stars: 4,
            downloads: 60,
            img: require('../assets/img/noimage.webp'),
        },
        {
            title: 'Creative Writing',
            author: 'Rachel Green',
            description: 'Unleash your creativity and improve your writing skills with tips, techniques, and inspiring exercises.',
            stars: 5,
            downloads: 90,
            img: require('../assets/img/NICE.png'),
        },
        {
            title: 'Photography Fundamentals',
            author: 'Mark Brown',
            description: 'Learn the basics of photography, from composition to lighting, and start taking stunning photographs.',
            stars: 4,
            downloads: 70,
            img: require('../assets/img/NICE.png'),
        },
        {
            title: 'Gardening 101',
            author: 'Lucy White',
            description: 'Grow your green thumb with this beginner\'s guide to gardening. Learn about plant care, garden design, and more.',
            stars: 3.5,
            downloads: 65,
            img: require('../assets/img/NICE.png'),
        },
        {
            title: 'Financial Planning',
            author: 'Robert Lee',
            description: 'Gain control of your finances with practical advice on budgeting, saving, and investing for your future.',
            stars: 4.5,
            downloads: 110,
            img: require('../assets/img/NICE.png'),
        },
        {
            title: 'Cycling Adventures',
            author: 'Olivia Wilson',
            description: 'Explore the world on two wheels with tips on cycling routes, gear, and maintaining your bike.',
            stars: 4,
            downloads: 95,
            img: require('../assets/img/NICE.png'),
        },
        {
            title: 'Language Learning Tips',
            author: 'Sophia Khan',
            description: 'Break the language barrier with effective strategies and tools to learn and master any new language.',
            stars: 5,
            downloads: 85,
            img: require('../assets/img/noimage.webp'),
        },
        {
            title: 'Home Brewing',
            author: 'Mike Johnson',
            description: 'Discover the art of brewing your own beer at home with step-by-step guides and recipes.',
            stars: 4,
            downloads: 40,
            img: require('../assets/img/NICE.png'),
        },
        {
            title: 'Pet Care Essentials',
            author: 'Alice Martinez',
            description: 'Learn how to provide the best care for your furry friends with expert advice on health, nutrition, and training.',
            stars: 4.5,
            downloads: 130,
            img: require('../assets/img/NICE.png'),
        },
        {
            title: 'DIY Home Decor',
            author: 'Ethan Lee',
            description: 'Transform your space with do-it-yourself home decor projects that are both fun and budget-friendly.',
            stars: 3,
            downloads: 55,
            img: require('../assets/img/NICE.png'),
        },
        {
            title: 'Astronomy for Amateurs',
            author: 'Nora Roberts',
            description: 'Embark on a stellar journey exploring the wonders of the universe from your backyard.',
            stars: 4.5,
            downloads: 60,
            img: require('../assets/img/NICE.png'),
        }
    ];

    return objects.map((object, index) => (
        <View key={index} style={{ flexDirection: 'row', alignItems: 'center', borderBottomWidth: 0.3, borderColor: 'darkgray', paddingLeft: 10, paddingRight: 10 }}>
            <Image source={object.img} style={{ width: 30, height: 30, aspectRatio: 1, resizeMode: 'stretch' }} />
            <View style={{ flex: 1, marginLeft: 10, margin: 5 }}>
                <TouchableOpacity onPress={() => toggleDescription(index)} style={{ flex: 1, marginLeft: 10, margin: 5 }}>
                    <Text style={{ fontSize: 13, fontWeight: 'bold', color: 'black' }}>{object.title}</Text>
                    <Text style={{ fontSize: 10, fontWeight: 'light', color: 'black' }}>Author: {object.author}</Text>
                    {renderDescription(object.description, index)}
                </TouchableOpacity>
            </View>
            <View style={{ marginLeft: 10, }}>
                <TouchableOpacity style={{ margin: 1, fontWeight:'bold',fontSize: 8, padding: 2, backgroundColor: 'rgba(46, 182, 125, 0.5)', borderRadius: 10 }}>
                    <Text style={{ fontSize: 14, textAlign: 'center', color: 'black' }}>Get</Text>
                </TouchableOpacity>
                <View style={{ marginLeft: 1 }}>
                    <Text style={{ fontSize: 10, fontWeight: 'light', color: 'black' }}>Downloads: {object.downloads}</Text>
                    <Text style={{ fontSize: 10, fontWeight: 'light', color: 'black' }}>Stars: {object.stars}</Text>
                </View>
            </View>
        </View>
    ));
};

export default MarketPlace;
