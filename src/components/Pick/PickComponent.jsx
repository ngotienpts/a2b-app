import React, { useContext, useEffect, useMemo, useRef, useState } from 'react';
import { View, Text, Image, SafeAreaView, StatusBar } from 'react-native';
import MapView, { Marker, Polyline } from 'react-native-maps';
import BottomSheet, { BottomSheetScrollView, TouchableOpacity } from '@gorhom/bottom-sheet';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { StarIcon } from 'react-native-heroicons/solid';
import {
    CurrencyDollarIcon,
    ShieldCheckIcon,
    PhoneIcon,
    ChatBubbleOvalLeftIcon,
    ClockIcon,
} from 'react-native-heroicons/outline';

import styles from '../../styles';
import { useRoute } from '@react-navigation/native';
import { fallbackImage } from '../../api/DataFetching';
import SentFormBooking from '../sentFormBooking';
import { BookingFormContext } from '../../redux/bookingFormContext';
import { Linking } from 'react-native';
import { DetailTripContext } from '../../redux/detailTripContext';
import MapViewDirections from 'react-native-maps-directions';
import AsyncStorage from '@react-native-async-storage/async-storage';

const PickComponent = () => {
    const context = useContext(BookingFormContext);
    const contextDetailTrip = useContext(DetailTripContext);
    const bottomSheetRef = useRef(null);
    const { params: item } = useRoute();
    const [duration, setDuration] = useState('');
    const [coordinatesPassenger, setCoordinatesPassenger] = useState({});

    useEffect(() => {
        getCoordinates()
    })

    const getCoordinates = async () => {
        setCoordinatesPassenger({
            latitude: await AsyncStorage.getItem('lat'),
            longitude: await AsyncStorage.getItem('lng')
        })
    }

    // console.log(item);
    const handleMakeCall = () => {
        if(item?.phone !== ''){
            Linking.openURL(`tel:${item?.phone}`);
        }else{
            alert('Tài xế này chưa có số điện thoại!');
        }
    }

    const handleMakeCallZalo = () => {
        if(item?.phone !== ''){
            Linking.openURL(`https://zalo.me/${item?.phone}`);
        }else{
            alert('Tài xế này chưa có số điện thoại!');
        }
    }

    const snapPoints = useMemo(() => ['25%', '50%', '90%'], []);
    const backgroundStyle = {
        backgroundColor: 'black',
    };
    const handleIndicatorStyle = {
        backgroundColor: 'gray',
    };

    return (
        <SafeAreaView style={[styles.flexFull, styles.relative, styles.bgBlack]}>
            <StatusBar barStyle="light-content" animated={true} />

            <View style={[styles.flexFull]}>
                <View
                    style={[
                        styles.absolute,
                        styles.z30,
                        styles.bgBlue1A7,
                        styles.px10,
                        styles.py5,
                        styles.flexCenter,
                        { top: 15, left: 15, borderRadius: 8 },
                    ]}
                >
                    <ClockIcon size={16} color={'white'} />
                    <Text
                        style={[
                            styles.ml5,
                            styles.fs16,
                            styles.textWhite,
                            styles.lh24,
                            styles.fw400,
                        ]}
                    >
                        {Math.floor(duration)} phút
                    </Text>
                </View>
                <GestureHandlerRootView style={[styles.flexFull, styles.bgBlack]}>
                    <MapView
                        style={[styles.flexFull]}
                        initialRegion={{
                            latitude: coordinatesPassenger.lat,
                            longitude: coordinatesPassenger.lng,
                            latitudeDelta: 0.0922,
                            longitudeDelta: 0.0421,
                        }}
                    >
                        <Marker
                            coordinate={{ latitude: coordinatesPassenger.lat, longitude: coordinatesPassenger.lng }}
                            title="Marker Title"
                            description="This is the marker description"
                        />
                        <Marker
                            coordinate={{ latitude: 20.97709739400339, longitude: 105.78411489129546 }}
                            title="Marker Title"
                            description="This is the marker description"
                        />
                        <MapViewDirections
                            origin={{ latitude: coordinatesPassenger.lat, longitude: coordinatesPassenger.lng }}
                            destination={{ latitude: 20.97709739400339, longitude: 105.78411489129546 }}
                            apikey={'AIzaSyD7824wLI-u0xlws9cJ1RlS8r4h65P1SzU'}
                            strokeWidth={4}
                            strokeColor="#000"
                            optimizeWaypoints={true}
                            timePrecision={"now"}
                            onReady={result => {
                                setDuration((result.duration));
                            }
                            
                            }
                        />
                    </MapView>

                    {/* Bottom Sheet Drawer */}
                    <BottomSheet
                        ref={bottomSheetRef}
                        snapPoints={snapPoints}
                        backgroundStyle={backgroundStyle}
                        handleIndicatorStyle={handleIndicatorStyle}
                    >
                        <BottomSheetScrollView style={[styles.bgBlack]}>
                            <View
                                style={[
                                    styles.borderBot,
                                    styles.borderSolid,
                                    styles.pt24,
                                    styles.mb24,
                                ]}
                            >
                                <View style={[styles.flexColumn, styles.itemsCenter, styles.mb20]}>
                                    {/* avatar */}
                                    <Image
                                        source={{ uri: item?.image_driver || fallbackImage }}
                                        style={[
                                            styles.mb15,
                                            { width: 120, height: 120, borderRadius: 999 },
                                        ]}
                                        resizeMode="cover"
                                    />
                                    {/* name */}
                                    <View style={[styles.flexRow, styles.itemsCenter]}>
                                        <Text
                                            style={[
                                                styles.textWhite,
                                                styles.fs16,
                                                styles.fw700,
                                                styles.lh24,
                                            ]}
                                        >
                                            {item?.fullname}
                                        </Text>
                                        {item?.is_confirmed === 1 && (
                                            <View style={[styles.pl10]}>
                                                <ShieldCheckIcon size={16} color={'white'} />
                                            </View>
                                        )}
                                    </View>

                                    {/* đánh sao*/}
                                    {item?.average_rates.toString() && (
                                        <View style={[styles.flexRow, styles.itemsCenter]}>
                                            <StarIcon size={'16'} color={'white'} />
                                            <Text
                                                style={[styles.textWhite, styles.fs16, styles.lh24]}
                                            >
                                                {item?.average_rates.toString()}
                                            </Text>
                                        </View>
                                    )}
                                </View>

                                {/* contact */}
                                <View style={[styles.flexCenter, styles.mb24]}>
                                    {/* phone */}
                                    <TouchableOpacity onPress={handleMakeCall}>
                                        <View
                                            style={[
                                                styles.flexCenter,
                                                styles.px12,
                                                styles.py5,
                                                styles.bgCyan2F,
                                                styles.borderLeftTop4,
                                                styles.borderLeftBot4,
                                            ]}
                                        >
                                            <PhoneIcon size={16} color={'white'} />
                                            <Text
                                                style={[
                                                    styles.textWhite,
                                                    styles.fs16,
                                                    styles.lh24,
                                                    styles.fw400,
                                                    styles.ml5,
                                                ]}
                                            >
                                                Gọi
                                            </Text>
                                        </View>
                                    </TouchableOpacity>
                                    {/* facebook */}
                                    <View
                                        style={[
                                            styles.flexCenter,
                                            styles.px12,
                                            styles.py5,
                                            styles.bgBlue237,
                                        ]}
                                    >
                                        <ChatBubbleOvalLeftIcon size={16} color={'white'} />
                                        <Text
                                            style={[
                                                styles.textWhite,
                                                styles.fs16,
                                                styles.lh24,
                                                styles.fw400,
                                                styles.ml5,
                                            ]}
                                        >
                                            Facebook
                                        </Text>
                                    </View>
                                    {/* zalo */}
                                    <TouchableOpacity onPress={handleMakeCallZalo}>
                                        <View
                                            style={[
                                                styles.flexCenter,
                                                styles.px12,
                                                styles.py5,
                                                styles.bgBlue009,
                                                styles.borderRightTop4,
                                                styles.borderRightBot4,
                                            ]}
                                        >
                                            <PhoneIcon size={16} color={'white'} />
                                            <Text
                                                style={[
                                                    styles.textWhite,
                                                    styles.fs16,
                                                    styles.lh24,
                                                    styles.fw400,
                                                    styles.ml5,
                                                ]}
                                            >
                                                Zalo
                                            </Text>
                                        </View>
                                    </TouchableOpacity>
                                </View>

                                {/* thông tin xe */}
                                <View
                                    style={[
                                        styles.px15,
                                        styles.py10,
                                        styles.bg161e,
                                        styles.flexRow,
                                        styles.flexFull,
                                        styles.mb24,
                                    ]}
                                >
                                    <Image
                                        source={{ uri: item?.image_car || fallbackImage }}
                                        style={{ width: 133, height: 72 }}
                                        resizeMode="cover"
                                    />
                                    <View style={[styles.pl15]}>
                                        {/* name */}
                                        <View style={[styles.flexRow, styles.itemsCenter]}>
                                            <Text
                                                style={[
                                                    styles.textWhite,
                                                    styles.fs16,
                                                    styles.fw700,
                                                    styles.lh24,
                                                    styles.pr10,
                                                ]}
                                            >
                                                {item?.vehicle_name} - {item?.vehicle_life}
                                            </Text>
                                            {item?.is_confirmed_vehicle === 1 && (
                                                <ShieldCheckIcon size={16} color={'white'} />
                                            )}
                                        </View>

                                        {/* tên xe */}
                                        <View style={[styles.flexRow, styles.itemsCenter, styles.mt5]}>
                                            {item?.license_plates_color === 1 ? (
                                                <Text
                                                    style={[
                                                        styles.fs16,
                                                        styles.fw400,
                                                        styles.lh24,
                                                        styles.bgWhite,
                                                        styles.px10,
                                                    ]}
                                                >
                                                    {item?.license_plates}
                                                </Text>
                                            ) : (
                                                <Text
                                                    style={[
                                                        styles.fs16,
                                                        styles.fw400,
                                                        styles.lh24,
                                                        styles.bgYellow,
                                                        styles.px10,
                                                        styles.textWhite
                                                    ]}
                                                >
                                                    {item?.license_plates}
                                                </Text>
                                            )}
                                            
                                        </View>

                                        {/* đánh sao & giá tiền */}
                                        {contextDetailTrip?.detailTrip.price_distance && (
                                            <View
                                                style={[
                                                    styles.flexRow,
                                                    styles.itemsCenter,
                                                    styles.mt5,
                                                ]}
                                            >
                                                <CurrencyDollarIcon size={'16'} color={'white'} />
                                                <Text
                                                    style={[
                                                        styles.textWhite,
                                                        styles.fs16,
                                                        styles.lh24,
                                                        styles.ml5,
                                                    ]}
                                                >
                                                    {contextDetailTrip?.detailTrip.price_distance}
                                                </Text>
                                            </View>
                                        )}
                                    </View>
                                </View>
                            </View>

                            <SentFormBooking context={context} title="Tài xế đang đến" />
                        </BottomSheetScrollView>
                    </BottomSheet>
                </GestureHandlerRootView>
            </View>
        </SafeAreaView>
    );
};

export default PickComponent;
