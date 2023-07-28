import React, { useContext, useEffect, useMemo, useRef, useState } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import BottomSheet, { BottomSheetScrollView } from '@gorhom/bottom-sheet';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { StarIcon } from 'react-native-heroicons/solid';
import {
    ShieldCheckIcon,
    PhoneIcon,
    ChatBubbleOvalLeftIcon,
    ClockIcon,
    ArrowUturnRightIcon,
} from 'react-native-heroicons/outline';

import styles from '../../styles';
import { useNavigation, useRoute } from '@react-navigation/native';
import { fallbackImage, fetchReviewListEndpoint } from '../../api/DataFetching';
import SentFormBooking from '../sentFormBooking';
import { BookingFormContext } from '../../redux/bookingFormContext';
import MomentComponent from '../moment';

const DriverPickComponent = () => {
    const navigation = useNavigation();
    const context = useContext(BookingFormContext);
    const bottomSheetRef = useRef(null);
    const { params: item } = useRoute();
    const [reviewDriver, setReviewDriver] = useState([]);
    const snapPoints = useMemo(() => ['25%', '50%', '90%'], []);

    const getReviewList = async (id) => {
        const data = await fetchReviewListEndpoint(id);
        if (data && data.result.list) setReviewDriver(data.result.list);
    };

    const StarsDisplay = ({ value }) => {
        const starCount = 5;

        return (
            <View style={[styles.flexRow, styles.itemsCenter]}>
                {[...Array(starCount)].map((_, index) => (
                    <StarIcon
                        key={index}
                        size={12}
                        color={index < value ? 'white' : undefined}
                        stroke={index < value ? undefined : 'white'}
                    />
                ))}
            </View>
        );
    };
    const backgroundStyle = {
        backgroundColor: 'black',
    };
    const handleIndicatorStyle = {
        backgroundColor: 'gray',
    };

    useEffect(() => {
        getReviewList(item.id);
    }, [item]);

    return (
        <View style={[styles.flexFull]}>
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
                        14 Phút
                    </Text>
                </View>
                <GestureHandlerRootView style={[styles.flexFull, styles.bgBlack]}>
                    <MapView
                        style={[styles.flexFull]}
                        initialRegion={{
                            latitude: 37.78825,
                            longitude: -122.4324,
                            latitudeDelta: 0.0922,
                            longitudeDelta: 0.0421,
                        }}
                    >
                        <Marker
                            coordinate={{ latitude: 37.78825, longitude: -122.4324 }}
                            title="Marker Title"
                            description="This is the marker description"
                        />
                    </MapView>

                    {/* Bottom Sheet Drawer */}
                    <BottomSheet
                        ref={bottomSheetRef}
                        snapPoints={snapPoints}
                        backgroundStyle={backgroundStyle}
                        handleIndicatorStyle={handleIndicatorStyle}
                    >
                        <BottomSheetScrollView style={[styles.bgBlack, styles.pt24]}>
                            <SentFormBooking context={context} title="Đi đón khách" />

                            {/* khoang cach & thoi gian */}
                            <View
                                style={[
                                    styles.mb24,
                                    styles.py15,
                                    styles.border1,
                                    styles.borderTop,
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
                                        <Text
                                            style={[
                                                styles.fs42,
                                                styles.textWhite,
                                                { lineHeight: 42 },
                                            ]}
                                        >
                                            30
                                        </Text>
                                        <Text style={[styles.fs16, styles.textWhite, styles.pl5]}>
                                            km
                                        </Text>
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
                                            15
                                        </Text>
                                        <Text style={[styles.fs16, styles.textWhite, styles.pl5]}>
                                            ph
                                        </Text>
                                    </View>
                                </View>
                                <View
                                    style={[
                                        styles.flexFull,
                                        styles.justifyBetween,
                                        styles.itemsCenter,
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
                            </View>

                            {/* thông tin tài xế */}
                            <View style={[styles.pt10]}>
                                <Text
                                    style={[
                                        styles.fs27,
                                        styles.textWhite,
                                        styles.lh32,
                                        styles.fw300,
                                        styles.px15,
                                        styles.mb24,
                                    ]}
                                >
                                    Thông tin hành khách
                                </Text>
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
                                            {item?.name_driver}
                                        </Text>
                                        {item?.protected && (
                                            <View style={[styles.pl10]}>
                                                <ShieldCheckIcon size={16} color={'white'} />
                                            </View>
                                        )}
                                    </View>

                                    {/* đánh sao*/}
                                    {item?.star && (
                                        <View style={[styles.flexRow, styles.itemsCenter]}>
                                            <StarIcon size={'16'} color={'white'} />
                                            <Text
                                                style={[styles.textWhite, styles.fs16, styles.lh24]}
                                            >
                                                {item?.star}
                                            </Text>
                                        </View>
                                    )}
                                </View>

                                {/* contact */}
                                <View style={[styles.flexCenter, styles.mb24]}>
                                    {/* phone */}
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
                                </View>

                                {/* đánh giá */}
                                <View style={[styles.px15, styles.pb60]}>
                                    {/* header */}
                                    <View style={[styles.flexBetween, styles.mb24]}>
                                        <Text
                                            style={[
                                                styles.textWhite,
                                                styles.fs16,
                                                styles.fw700,
                                                styles.lh24,
                                            ]}
                                        >
                                            Đánh giá (99)
                                        </Text>
                                        <Text style={[styles.textWhite, styles.fs16, styles.lh24]}>
                                            Mới nhất
                                        </Text>
                                    </View>

                                    {/* many reviews */}
                                    {reviewDriver.map((item) => (
                                        <View
                                            key={item.rate_id}
                                            style={[styles.flexRow, styles.mb24]}
                                        >
                                            <Image
                                                source={{ uri: item?.image || fallbackImage }}
                                                style={{ width: 52, height: 52, borderRadius: 999 }}
                                                resizeMode="cover"
                                            />
                                            <View style={[styles.pl10, styles.flexFull]}>
                                                <Text
                                                    style={[
                                                        styles.textWhite,
                                                        styles.fs16,
                                                        styles.lh24,
                                                        styles.fw400,
                                                    ]}
                                                >
                                                    {item?.name}: {item?.comment}
                                                </Text>
                                                <View
                                                    style={[
                                                        styles.flexRow,
                                                        styles.itemsCenter,
                                                        styles.mt5,
                                                    ]}
                                                >
                                                    <StarsDisplay value={item?.star} />
                                                    <MomentComponent
                                                        style={[
                                                            styles.textGray77,
                                                            styles.fs14,
                                                            styles.lh24,
                                                            styles.fw400,
                                                            styles.ml15,
                                                        ]}
                                                        timeString={item?.created_at}
                                                    />
                                                </View>
                                            </View>
                                        </View>
                                    ))}
                                </View>
                            </View>
                        </BottomSheetScrollView>
                    </BottomSheet>
                </GestureHandlerRootView>
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
                >
                    <Text style={[styles.fs16, styles.textWhite]}>Hủy chuyến</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[
                        styles.h48,
                        styles.bgRed,
                        styles.flexFull,
                        styles.itemsCenter,
                        styles.justifyCenter,
                    ]}
                    onPress={() => navigation.navigate('DriverMovingScreen', item)}
                >
                    <Text style={[styles.fs16, styles.textWhite]}>Go Moving</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default DriverPickComponent;
