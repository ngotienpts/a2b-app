import React, { useContext, useEffect, useMemo, useRef, useState } from 'react';
import { View, Text, Image, SafeAreaView, StatusBar } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
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
import { useNavigation, useRoute } from '@react-navigation/native';
import { fallbackImage, fetchDetailTrip } from '../../api/DataFetching';
import SentFormBooking from '../sentFormBooking';
import { BookingFormContext } from '../../redux/bookingFormContext';
import { Linking } from 'react-native';
import { DetailTripContext } from '../../redux/detailTripContext';
import MapViewDirections from 'react-native-maps-directions';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { MapContext } from '../../redux/mapContext';
import Contact from '../contact';
import { TokenContext } from '../../redux/tokenContext';

const PickComponent = () => {
    const contextToken = useContext(TokenContext);

    const context = useContext(BookingFormContext);
    const contextMap = useContext(MapContext);
    const contextDetailTrip = useContext(DetailTripContext);
    const bottomSheetRef = useRef(null);
    const { params: item } = useRoute();
    const navigation = useNavigation();
    const [duration, setDuration] = useState('');
    const [coordinatesPassenger, setCoordinatesPassenger] = useState({});
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        getCoordinates();
        // console.log(item);
        if(item?.is_notify || item?.isFlag){
            const paramsTrip = {
                trip_id: item?.id
            }
            detailTrip(paramsTrip);
        }else{
            setIsLoading(true);
        }
    },[])

    const getCoordinates = async () => {
        setCoordinatesPassenger({
            latitude: await AsyncStorage.getItem('lat'),
            longitude: await AsyncStorage.getItem('lng')
        })
    }

    const snapPoints = useMemo(() => ['25%', '50%', '90%'], []);
    const backgroundStyle = {
        backgroundColor: 'black',
    };
    const handleIndicatorStyle = {
        backgroundColor: 'gray',
    };


    const detailTrip = async (paramsTrip) => {
        await fetchDetailTrip(paramsTrip, contextToken.token)
        .then((data) => {
            if (data.res === 'success') {
                createContext(data); 
            }
        })
        .catch((err) => {
            console.log(err);
        })
        .finally(() => {
            setIsLoading(true);
        })
    }


    const createContext = async (data) => {
        await context.setBookingForm({
            ...context.bookingForm,
            eniqueId: data?.result.trip_id,
            startPoint: {
                start_name: data?.result.start_name,
                start: data?.result.start_location,
                coordinates: {
                    lat: data?.result.coordinates_start.split(',')[0],
                    lng: data?.result.coordinates_start.split(',')[1],
                }
            },
            endPoint: {
                name: data?.result.end_name,
                address: data?.result.end_location,
                coordinates: {
                    lat: data?.result.coordinates_end.split(',')[0],
                    lng: data?.result.coordinates_end.split(',')[1],
                }
            },
            typeCar: data?.result.vehicle_category_id,
            nameCar: data?.result.name_category,
            departureTime: data?.result.start_time,
            note: data?.result.comment,
            isPunish: data?.result.is_punish
        })

        await contextDetailTrip.setDetailTrip({
            ...contextDetailTrip.detailTrip,
            duration: data.result.duration_all,
            distance: data.result.distance_all,
            price_distance: parseInt(data.result.price_report).toLocaleString('vi-VN'),
        })

        await contextMap.setMap({
            ...contextMap.map,
            start: {
                name: data?.result.start_name,
                address: data?.result.start_location,
                coordinates: {
                    lat: data?.result.coordinates_start.split(',')[0],
                    lng: data?.result.coordinates_start.split(',')[1],
                }
            },
            end: {
                name: data?.result.end_name,
                address: data?.result.end_location,
                coordinates: {
                    lat: data?.result.coordinates_end.split(',')[0],
                    lng: data?.result.coordinates_end.split(',')[1],
                }
            }
        })
    }

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
                {isLoading && (
                <GestureHandlerRootView style={[styles.flexFull, styles.bgBlack]}>
                    {/* Map  */}
                    <MapView
                        style={[styles.flexFull]}
                        initialRegion={{
                            latitude: parseFloat(item?.lat),
                            longitude: parseFloat(item?.lng),
                            latitudeDelta: 0.0922,
                            longitudeDelta: 0.0421,
                        }}
                        // mapType={Platform.OS == "android" ? "none" : "standard"}
                        // provider={PROVIDER_GOOGLE}
                    >
                        <Marker
                            coordinate={{ latitude: parseFloat(item?.lat), longitude: parseFloat(item?.lng) }}
                            title="Vị trí của tài xế"
                            description="Vị trí di chuyển chi tiết của tài xế"
                            // onDragEnd={(e) => this.setState({ x: e.nativeEvent.coordinate })}
                        />
                        {contextMap.map.start.length !== 0 ? (
                            <Marker
                                coordinate={{ latitude: parseFloat(contextMap.map.start.coordinates.lat), longitude: parseFloat(contextMap.map.start.coordinates.lng)}}
                                title="Vị trí của khách đặt"
                                description="Vị trí di chuyển chi tiết của khách đặt"
                            />
                        ) : (
                            <Marker
                                coordinate={{ latitude: parsrFloat(coordinatesPassenger.lat), longitude: parseFloat(coordinatesPassenger.lng) }}
                                title="Vị trí của khách đặt"
                                description="Vị trí di chuyển chi tiết của khách đặt"
                            />
                        )}
                        {/* <MapViewDirections
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
                        /> */}
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
                                            {item?.is_confirmed_vehicle == 1 && (
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
                                                    {contextDetailTrip?.detailTrip.price_distance.toString()}
                                                </Text>
                                            </View>
                                        )}
                                    </View>
                                </View>
                            </View>
                            <SentFormBooking context={context} contextMap={contextMap} title="Tài xế đang đến" />
                            <TouchableOpacity onPress={() => navigation.navigate('MovingScreen',item)}>
                                <Text style={[styles.textWhite, styles.flexCenter, styles.fs27]}>Go Moving</Text>
                            </TouchableOpacity>
                        </BottomSheetScrollView>
                    </BottomSheet>
                </GestureHandlerRootView>
                )}
            </View>
        </SafeAreaView>
    );
};

export default PickComponent;
