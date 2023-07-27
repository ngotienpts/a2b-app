import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { StopCircleIcon, MapPinIcon } from 'react-native-heroicons/solid';

import styles from '../../styles';
import Header from '../header/Header';
import { BoltIcon, CurrencyDollarIcon, ViewfinderCircleIcon } from 'react-native-heroicons/outline';
import Slider from '@react-native-community/slider';
import { Switch } from 'react-native';
const DriverComponent = () => {
    const navigation = useNavigation();
    const [timeRange, setTimeRange] = useState(30);
    const [priceRange, setPriceRange] = useState(5000);
    const [isEnabled, setIsEnabled] = useState(false);
    const toggleSwitch = () => setIsEnabled((previousState) => !previousState);

    return (
        <SafeAreaView style={[styles.flexFull, styles.relative]}>
            <View style={[styles.flexFull, styles.bgBlack]}>
                {/* header */}
                <Header navigation={navigation} title="Xe tìm khách" />

                {/* body */}
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    style={[styles.flexFull, styles.pt15, styles.px15]}
                >
                    <Text
                        style={[
                            styles.fs27,
                            styles.textWhite,
                            styles.lh32,
                            styles.mb24,
                            styles.fw300,
                        ]}
                    >
                        Cung đường của bạn
                    </Text>

                    {/* location */}
                    <View>
                        {/* vị trí hiện tại */}
                        <TouchableOpacity onPress={() => navigation.navigate('MapScreen')}>
                            <View style={[styles.flexRow, styles.mb24]}>
                                <StopCircleIcon
                                    size={20}
                                    color={'rgba(119,125,146,0.8)'}
                                    style={{ marginTop: 2 }}
                                />
                                <View style={[styles.ml5, styles.flexFull]}>
                                    <Text
                                        style={[
                                            styles.fs16,
                                            styles.fw700,
                                            styles.textGray77,
                                            styles.mb5,
                                        ]}
                                    >
                                        Vị trí hiện tại
                                    </Text>
                                    <Text style={[styles.textGray77, styles.fs15]}>
                                        286 Nguyễn Xiển, Thanh Trì, Hà Nội.
                                    </Text>
                                </View>
                            </View>
                        </TouchableOpacity>

                        {/* điểm đến */}
                        <TouchableOpacity onPress={() => navigation.navigate('MapScreen')}>
                            <View style={[styles.flexRow, styles.mb24]}>
                                <MapPinIcon size={22} color={'white'} style={{ marginTop: 2 }} />
                                <View style={[styles.ml5, styles.flexFull]}>
                                    <Text
                                        style={[
                                            styles.fs16,
                                            styles.fw700,
                                            styles.textWhite,
                                            styles.mb5,
                                        ]}
                                    >
                                        Cảng hàng không quốc tế Nội Bài
                                    </Text>
                                    <Text style={[styles.textGray77, styles.fs15]}>
                                        Phú Minh, Sóc Sơn, Hà Nội
                                    </Text>
                                </View>
                            </View>
                        </TouchableOpacity>

                        {/* Phạm vi đón trả khách */}
                        <View style={[styles.flexRow, styles.mb15]}>
                            <ViewfinderCircleIcon
                                size={22}
                                color={'white'}
                                style={{ marginTop: 2 }}
                            />
                            <View style={[styles.ml5, styles.flexFull]}>
                                <Text
                                    style={[
                                        styles.fs16,
                                        styles.fw700,
                                        styles.textWhite,
                                        styles.mb5,
                                    ]}
                                >
                                    Phạm vi đón trả khách: {timeRange} km
                                </Text>
                                <Slider
                                    style={{
                                        width: '100%',
                                        height: 40,
                                        marginLeft: -10,
                                    }}
                                    minimumValue={10}
                                    maximumValue={100}
                                    step={5}
                                    onValueChange={(newValue) => {
                                        setTimeRange(newValue);
                                    }}
                                    value={timeRange}
                                    minimumTrackTintColor="#FFFFFF"
                                    maximumTrackTintColor="rgba(255, 255, 255, 0.50)"
                                />
                            </View>
                        </View>

                        {/* Báo giá tự động */}
                        <View style={[styles.flexRow, styles.mb24]}>
                            <BoltIcon size={22} color={'white'} style={{ marginTop: 2 }} />
                            <View style={[styles.ml5, styles.flexFull]}>
                                <View style={[styles.mb5, styles.flexBetween]}>
                                    <Text style={[styles.fs16, styles.fw700, styles.textWhite]}>
                                        Báo giá tự động
                                    </Text>
                                    <Switch
                                        trackColor={{ false: '#767577', true: '#808080' }}
                                        thumbColor={isEnabled ? '#2884EF' : '#f4f3f4'}
                                        ios_backgroundColor="#3e3e3e"
                                        onValueChange={toggleSwitch}
                                        value={isEnabled}
                                        style={{ height: 24 }}
                                    />
                                </View>
                                <Text style={[styles.textGray77, styles.fs15]}>
                                    Hệ thống sẽ gửi báo giá tự động khi có khách
                                </Text>
                            </View>
                        </View>

                        {/* Báo giá */}
                        <View style={[styles.flexRow, styles.mb24]}>
                            <CurrencyDollarIcon
                                size={22}
                                color={'white'}
                                style={{ marginTop: 2 }}
                            />
                            <View style={[styles.ml5, styles.flexFull]}>
                                <Text
                                    style={[
                                        styles.fs16,
                                        styles.fw700,
                                        styles.textWhite,
                                        styles.mb5,
                                    ]}
                                >
                                    Báo giá: {priceRange} VND/km
                                </Text>
                                <Slider
                                    style={{
                                        width: '100%',
                                        height: 40,
                                        marginLeft: -10,
                                    }}
                                    minimumValue={0}
                                    maximumValue={20000}
                                    step={1000}
                                    onValueChange={(newValue) => {
                                        setPriceRange(newValue);
                                    }}
                                    value={priceRange}
                                    minimumTrackTintColor="#FFFFFF"
                                    maximumTrackTintColor="rgba(255, 255, 255, 0.50)"
                                />
                            </View>
                        </View>
                    </View>
                </ScrollView>
            </View>
            {/* buttom  huy chuyen & tim tai xe*/}
            <View style={[styles.flexRow, styles.bgBlack]}>
                <TouchableOpacity
                    style={[
                        styles.h48,
                        styles.bgGray161,
                        styles.flexFull,
                        styles.itemsCenter,
                        styles.justifyCenter,
                    ]}
                    onPress={() => navigation.navigate('HomeScreen')}
                >
                    <Text style={[styles.fs16, styles.textWhite]}>Trang chủ</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[
                        styles.h48,
                        styles.bgRed,
                        styles.flexFull,
                        styles.itemsCenter,
                        styles.justifyCenter,
                    ]}
                    onPress={() => navigation.navigate('DriverFindScreen')}
                >
                    <Text style={[styles.fs16, styles.textWhite]}>Tìm khách</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

export default DriverComponent;
