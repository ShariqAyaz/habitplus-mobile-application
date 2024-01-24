import React, { useState } from 'react';
import { View, Text, Image, Button } from 'react-native';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';

const Profile = () => {
    const [profileImage, setProfileImage] = useState(null);

    const selectProfileImage = () => {
        const options = {
            mediaType: 'photo',
            maxWidth: 200,
            maxHeight: 200,
            includeBase64: false,
        };

        launchImageLibrary(options, (response) => {
            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else {
                const source = { uri: response.assets[0].uri };
                setProfileImage(source.uri);
            }
        });
    };

    const takeProfilePicture = () => {
        const options = {
            mediaType: 'photo',
            maxWidth: 200,
            maxHeight: 200,
            includeBase64: false,
        };

        launchCamera(options, (response) => {
            if (response.didCancel) {
                console.log('User cancelled camera');
            } else if (response.error) {
                console.log('Camera Error: ', response.error);
            } else {
                const source = { uri: response.assets[0].uri };
                setProfileImage(source.uri);
            }
        });
    };

    return (
        <View style={{ padding: 6 }}>
            <Text style={{ fontSize: 24, fontWeight: 'bold', textAlign: 'center' }}>Hi Shariq</Text>
            {profileImage && <Image source={{ uri: profileImage }} style={{ width: 200, height: 200, alignSelf: 'center' }} />}
            <Button title="Change Profile Picture" onPress={selectProfileImage} />
            <Button title="Take Profile Picture" onPress={takeProfilePicture} />
            <Text>Email: gr8shariq@gmail.com</Text>
            <Text>Supervisor Email: ma3426@live.mdx.ac.uk</Text>
            <Text>Phone: 07723234526</Text>
        </View>
    );
};

export default Profile;
