import { View, Text, TouchableOpacity, ScrollView, Dimensions, StatusBar } from 'react-native';
import React, { useState, useCallback } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';

import styles from '../../styles';
import Header from '../header/Header';
import { fallbackImage } from '../../api/DataFetching';
import ChoseImage from '../settings/ChoseImage';

const VerificationComponent = () => {
    const img = 'https://media.a2b.vn/user/2023/05/12/khanhhoang-093520.jpg';

    var { width } = Dimensions.get('window');
    const navigation = useNavigation();
    const [image1, setImage1] = useState('');
    const [image2, setImage2] = useState('');

    const HandleImageChange1 = useCallback((newValue) => {
        setImage1(newValue);
    }, []);

    const HandleImageChange2 = useCallback((newValue) => {
        setImage2(newValue);
    }, []);

    return (
        <SafeAreaView style={[styles.flexFull, styles.relative, styles.bgBlack]}>
            <StatusBar barStyle="light-content" animated={true} />
            <View style={[styles.flexFull, styles.bgBlack]}>
                {/* header */}
                <Header navigation={navigation} title="Xác minh danh tính" />

                {/* body */}
                <ScrollView showsVerticalScrollIndicator={false} style={[styles.flexFull]}>
                    {/* image */}
                    <View style={[styles.flexCenter, styles.mb24]}>
                        <ChoseImage
                            avatar={image1 != 0 ? image1 : fallbackImage}
                            width={width}
                            height={width / 2}
                            aspect={[2, 1]}
                            onChangeImage={HandleImageChange1}
                        />
                    </View>
                    {/* image */}
                    <View style={[styles.flexCenter, styles.mb24]}>
                        <ChoseImage
                            avatar={image2 != 0 ? image2 : fallbackImage}
                            width={width}
                            height={width / 2}
                            aspect={[2, 1]}
                            onChangeImage={HandleImageChange2}
                        />
                    </View>
                </ScrollView>
            </View>
            {/* buttom huy & xac minh*/}
            <View style={[styles.flexRow]}>
                <TouchableOpacity
                    style={[
                        styles.h48,
                        styles.bgGray161,
                        styles.flexFull,
                        styles.itemsCenter,
                        styles.justifyCenter,
                    ]}
                    onPress={() => navigation.goBack()}
                >
                    <Text style={[styles.fs16, styles.textWhite]}>Quay lại</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[
                        styles.h48,
                        styles.bgRed,
                        styles.flexFull,
                        styles.itemsCenter,
                        styles.justifyCenter,
                    ]}
                >
                    <Text style={[styles.fs16, styles.textWhite]}>Xác minh</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

export default VerificationComponent;