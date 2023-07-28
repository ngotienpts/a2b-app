import React, { useContext, useMemo, useRef } from 'react';
import { View, Text, Image } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import BottomSheet, { BottomSheetScrollView } from '@gorhom/bottom-sheet';
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

const PickComponent = () => {
    const context = useContext(BookingFormContext);
    const bottomSheetRef = useRef(null);
    const { params: item } = useRoute();

    const snapPoints = useMemo(() => ['25%', '50%', '90%'], []);
    const backgroundStyle = {
        backgroundColor: 'black',
    };
    const handleIndicatorStyle = {
        backgroundColor: 'gray',
    };

    return (
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
                    style={[styles.ml5, styles.fs16, styles.textWhite, styles.lh24, styles.fw400]}
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
                    <BottomSheetScrollView style={[styles.bgBlack]}>
                        <View
                            style={[styles.borderBot, styles.borderSolid, styles.pt24, styles.mb24]}
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
                                        <Text style={[styles.textWhite, styles.fs16, styles.lh24]}>
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
                                            {item?.name_car} - {item?.model}
                                        </Text>
                                        {item?.protected && (
                                            <ShieldCheckIcon size={16} color={'white'} />
                                        )}
                                    </View>

                                    {/* tên xe */}
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
                                            {item?.license_plate}
                                        </Text>
                                    </View>

                                    {/* đánh sao & giá tiền */}
                                    {item?.bill && (
                                        <View
                                            style={[styles.flexRow, styles.itemsCenter, styles.mt5]}
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
                                                {item?.bill}
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
    );
};

export default PickComponent;
