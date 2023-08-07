import React, { useEffect, useState } from 'react';
import { View, Image, TouchableOpacity } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

import styles from '../../styles';

const ChoseImage = ({ aspect, avatar, width, height, borderFull, onChangeAvatar }) => {
    const [selectedImage, setSelectedImage] = useState(null);

    const handleImagePicker = async () => {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
            alert('Bạn cần cấp quyền truy cập thư viện ảnh');
            return;
        }

        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: aspect,
            quality: 1,
        });

        if (!result.canceled) {
            setSelectedImage(result.assets[0].uri);
            onChangeAvatar(result.assets[0].uri);
        }
    };

    return (
        <View style={[styles.relative]}>
            {selectedImage ? (
                <Image
                    source={{ uri: selectedImage }}
                    style={[{ width: width, height: height }, borderFull]}
                />
            ) : (
                <Image
                    source={{
                        uri: avatar,
                    }}
                    style={[{ width: width, height: height }, borderFull]}
                />
            )}
            <TouchableOpacity
                onPress={handleImagePicker}
                style={[styles.absolute, styles.inset0]}
            ></TouchableOpacity>
        </View>
    );
};

export default ChoseImage;
