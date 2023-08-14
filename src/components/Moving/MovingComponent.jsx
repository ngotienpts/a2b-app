import { View, Text, TouchableOpacity, ScrollView, Image, StatusBar } from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, useRoute } from '@react-navigation/native';
import { StarIcon } from 'react-native-heroicons/solid';
import {
    ArrowUturnRightIcon,
    ShieldCheckIcon,
} from 'react-native-heroicons/outline';

import styles from '../../styles';
import Header from '../header/Header';
import { BookingFormContext } from '../../redux/bookingFormContext';
import { fallbackImage } from '../../api/DataFetching';
import SentFormBooking from '../sentFormBooking';
import { MapContext } from '../../redux/mapContext';
import { DetailTripContext } from '../../redux/detailTripContext';

import getDirections from 'react-native-google-maps-directions';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Contact from '../contact';
import QrCode from '../qrCode/QrCode';

const MovingComponent = () => {
    const context = useContext(BookingFormContext);
    const contextMap = useContext(MapContext);
    const contextDetailTrip = useContext(DetailTripContext);
    const {params: item} = useRoute();
    const navigation = useNavigation();
    const [coordinatesPassenger, setCoordinatesPassenger] = useState({});

    
    useEffect(() => {
        getCoordinates();
        // console.log(contextDetailTrip?.detailTrip.price_distance.replace('.',''));
    },[])
    
    const getCoordinates = async () => {
        setCoordinatesPassenger({
            latitude: await AsyncStorage.getItem('lat'),
            longitude: await AsyncStorage.getItem('lng')
        })
    }

    const openGoogleMap = () => {
        const data = {
            source: {
                latitude: item?.lat,
                longitude: item?.lng
            },
            destination: {
                latitude: contextMap.map.start.length !== 0 ? parseFloat(contextMap.map.start.coordinates.lat) : parseFloat(coordinatesPassenger.lat),
                longitude: contextMap.map.start.length !== 0 ? parseFloat(contextMap.map.start.coordinates.lng) : parseFloat(coordinatesPassenger.lng)
            },
            params: [
                {
                    key: "travelmode",
                    value: "driving"        // may be "walking", "bicycling" or "transit" as well
                },
                {
                    key: "dir_action",
                    value: "navigate"       // this instantly initializes navigation using the given travel mode
                }
            ]
        }
      
        getDirections(data)
    }

    return (
        <SafeAreaView style={[styles.flexFull, styles.relative, styles.bgBlack]}>
            <StatusBar barStyle="light-content" animated={true} />
            <View style={[styles.flexFull, styles.bgBlack]}>
                {/* header */}
                <Header navigation={navigation} title="Chi tiết chuyến đi" />

                {/* body */}
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    style={[styles.flexFull, styles.pt15]}
                >
                    {/* khoang cach & thoi gian */}
                    <View
                        style={[
                            styles.mb24,
                            styles.pb15,
                            styles.border1,
                            styles.borderBot,
                            styles.flexRow,
                        ]}
                    >
                        <View
                            style={[
                                styles.flexFull,
                                styles.justifyBetween,
                                styles.itemsCenter,
                                styles.borderRight,
                                styles.borderSolid,
                            ]}
                        >
                            <Text
                                style={[
                                    styles.fs16,
                                    styles.textGray77,
                                    styles.lh24,
                                    styles.textCenter,
                                ]}
                            >
                                Quãng đường
                            </Text>
                            <View
                                style={[
                                    styles.flexRow,
                                    styles.justifyCenter,
                                    styles.itemsCenter,
                                    styles.pt20,
                                ]}
                            >
                                <Text style={[styles.fs42, styles.textWhite, { lineHeight: 42 }]}>
                                    {contextDetailTrip.detailTrip.distance}
                                </Text>
                                <Text style={[styles.fs16, styles.textWhite, styles.pl5]}>km</Text>
                            </View>
                        </View>
                        <View
                            style={[
                                styles.flexFull,
                                styles.justifyBetween,
                                styles.itemsCenter,
                                styles.borderRight,
                                styles.borderSolid,
                            ]}
                        >
                            <Text
                                style={[
                                    styles.fs16,
                                    styles.textGray77,
                                    styles.lh24,
                                    styles.textCenter,
                                ]}
                            >
                                Thời gian
                            </Text>
                            <View
                                style={[
                                    styles.flexRow,
                                    styles.justifyCenter,
                                    styles.itemsCenter,
                                    styles.pt20,
                                ]}
                            >
                                <Text
                                    style={[
                                        styles.fs42,
                                        styles.textWhite,
                                        { lineHeight: 42, includeFontPadding: false },
                                    ]}
                                >
                                    {contextDetailTrip.detailTrip.duration}
                                </Text>
                                <Text style={[styles.fs16, styles.textWhite, styles.pl5]}>ph</Text>
                            </View>
                        </View>
                        <TouchableOpacity onPress={openGoogleMap} style={[styles.flexFull, styles.justifyBetween, styles.itemsCenter]}>
                            <View>
                                <Text
                                    style={[
                                        styles.fs16,
                                        styles.textGray77,
                                        styles.lh24,
                                        styles.textCenter,
                                    ]}
                                >
                                    Google map
                                </Text>
                                <View
                                    style={[
                                        styles.flexCenter,
                                        styles.bgGray161,
                                        styles.mt20,
                                        { width: 73, height: 42 },
                                    ]}
                                >
                                    <ArrowUturnRightIcon size={25} color={'white'} />
                                </View>
                            </View>
                        </TouchableOpacity>
                    </View>

                    {/* thông tin tài xế */}

                    <View style={[styles.border1, styles.borderSolid, styles.pt10]}>
                        <View style={[styles.flexColumn, styles.itemsCenter, styles.mb20]}>
                            {/* avatar */}
                            <Image
                                source={{
                                    uri: item?.image_driver ||fallbackImage,
                                }}
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
                                {item?.is_confirmed == 1 && (
                                    <View style={[styles.pl10]}>
                                        <ShieldCheckIcon size={16} color={'white'} />
                                    </View>
                                )}
                            </View>

                            {/* đánh sao*/}
                            <View style={[styles.flexRow, styles.itemsCenter]}>
                                <StarIcon size={'16'} color={'white'} />
                                <Text style={[styles.textWhite, styles.fs16, styles.lh24]}>
                                    {item?.average_rates}
                                </Text>
                            </View>
                        </View>

                        {/* contact */}
                        <Contact 
                            item={item}
                        />

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
                                    <ShieldCheckIcon size={16} color={'white'} />
                                </View>

                                {/* biển số xe */}
                                {item?.license_plates_color == 1 ? (
                                        <View style={[styles.flexRow, styles.itemsCenter, styles.mt5]}>
                                            <Text
                                                style={[
                                                    styles.fs16,
                                                    styles.fw400,
                                                    styles.lh24,
                                                    styles.bgYellow,
                                                    styles.textWhite,
                                                    styles.px10,
                                                ]}
                                            >
                                                {item?.license_plates}
                                            </Text>
                                        </View>
                                    ) : (
                                        <View style={[styles.flexRow, styles.itemsCenter, styles.mt5]}>
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
                                        </View>
                                    )}

                                {/* wifi */}
                                {item?.name_wifi && (
                                    <View style={[styles.flexRow, styles.itemsCenter, styles.mt5]}>
                                        <Text style={[styles.textWhite, styles.fs16, styles.lh24]}>
                                            Wifi:{item?.name_wifi}|{item?.pass_wifi}
                                        </Text>
                                    </View>
                                )}
                            </View>
                        </View>
                    </View>

                    {/* qr code */}
                    <QrCode
                        item={item}
                        contextDetailTrip={contextDetailTrip}
                        context={context}
                    />
                    <View style={[styles.mb24]}>
                        <SentFormBooking context={context} contextMap={contextMap} title="Bạn đang đặt chuyến" />
                    </View>

                    {/*  */}
                    <TouchableOpacity onPress={() => navigation.navigate('CompleteScreen', item)}>
                        <Text
                            style={[styles.textCenter, styles.fs27, styles.textWhite, styles.mb24]}
                        >
                            Go Moving
                        </Text>
                    </TouchableOpacity>
                </ScrollView>
            </View>
        </SafeAreaView>
    );
};

export default MovingComponent;
