import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native';

const MarketPlace = () => {
    const items = [
        {
            id: 1,
            //img: require('../assets/item1.png'),
            title: 'Item 1',
            vendor: 'Vendor 1',
            stars: 4,
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        },
        {
            id: 2,
            //img: require('../assets/item2.png'),
            title: 'Item 2',
            vendor: 'Vendor 2',
            stars: 3,
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        },
        // Add more items as needed
    ];

    const handleItemClick = (item) => {
        // Handle item click event
        console.log('Item clicked:', item);
    };

    return (
        <ScrollView>
            {items.map((item) => (
                <TouchableOpacity
                    key={item.id}
                    onPress={() => handleItemClick(item)}
                    style={{ padding: 16, borderBottomWidth: 1, borderBottomColor: '#ccc' }}
                >
                    <Image source={item.img} style={{ width: 100, height: 100 }} />
                    <Text style={{ fontSize: 18, fontWeight: 'bold', marginTop: 8 }}>{item.title}</Text>
                    <Text style={{ fontSize: 16, marginTop: 4 }}>{item.vendor}</Text>
                    <Text style={{ fontSize: 14, marginTop: 4 }}>Stars: {item.stars}</Text>
                    <Text style={{ fontSize: 14, marginTop: 4 }}>{item.description}</Text>
                </TouchableOpacity>
            ))}
        </ScrollView>
    );
};

export default MarketPlace;
