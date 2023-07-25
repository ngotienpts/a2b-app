import { Image, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import ImagePicker from 'react-native-image-crop-picker';

import { fallbackImage } from '../../api/DataFetching';
import styles from '../../styles';

const ChoseImage = ({ avatar, width, height }) => {
    const [imageUri, setImageUri] = useState(avatar);

    const handleSelectImage = () => {
        ImagePicker.openPicker({
            width: width,
            height: height,
            cropping: true,
        }).then((image) => {
            // Xử lý sau khi chọn ảnh từ thư viện
            console.log(image);
            setImageUri(image.path);
        });
    };

    return (
        <TouchableOpacity onPress={handleSelectImage}>
            {imageUri && (
                <Image
                    source={{ uri: imageUri || fallbackImage }}
                    style={[{ width: width, height: height }, styles.borderFull]}
                    resizeMode="cover"
                />
            )}
        </TouchableOpacity>
    );
};

export default ChoseImage;
