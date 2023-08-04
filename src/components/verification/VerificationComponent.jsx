import { View, Text, TouchableOpacity, ScrollView, Dimensions, StatusBar } from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';

import styles from '../../styles';
import Header from '../header/Header';
import { fallbackImage } from '../../api/DataFetching';
import ChoseImage from '../settings/ChoseImage';

const VerificationComponent = () => {
    var { width } = Dimensions.get('window');
    const navigation = useNavigation();

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
                            avatar={fallbackImage}
                            width={width}
                            height={width / 2}
                            aspect={[2, 1]}
                        />
                    </View>
                    {/* image */}
                    <View style={[styles.flexCenter, styles.mb24]}>
                        <ChoseImage
                            avatar={fallbackImage}
                            width={width}
                            height={width / 2}
                            aspect={[2, 1]}
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
