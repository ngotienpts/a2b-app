import {
    View,
    Text,
    TouchableOpacity,
    ScrollView,
    Dimensions,
    Animated,
    Easing,
} from 'react-native';
import React, { useState, useEffect, useContext } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, useRoute } from '@react-navigation/native';
import { MapPinIcon, StopCircleIcon, StarIcon } from 'react-native-heroicons/solid';
import {
    ChevronDownIcon,
    ClockIcon,
    CurrencyDollarIcon,
    PencilIcon,
    ShieldCheckIcon,
    TruckIcon,
} from 'react-native-heroicons/outline';
import Collapsible from 'react-native-collapsible';

import styles from '../../styles';
import Header from '../header/Header';
import { Image } from 'react-native';
import { driver } from '../../assets/images';
import { fallbackImage, fetchReviewListEndpoint } from '../../api/DataFetching';
import { BookingFormContext } from '../../redux/bookingFormContext';

const FindDetail = () => {
    const context = useContext(BookingFormContext);
    const { params: item } = useRoute();
    const navigation = useNavigation();
    const [isDropdownVisible, setDropdownVisible] = useState(false);
    const rotationValue = useState(new Animated.Value(0))[0];
    const [reviewDriver, setReviewDriver] = useState([]);

    useEffect(() => {
        Animated.timing(rotationValue, {
            toValue: isDropdownVisible ? 1 : 0,
            duration: 300,
            easing: Easing.linear,
            useNativeDriver: true,
        }).start();
    }, [isDropdownVisible]);

    const toogleDropdown = () => {
        setDropdownVisible((isDropdownVisible) => !isDropdownVisible);
    };
    const getReviewList = async (id) => {
        const data = await fetchReviewListEndpoint(id);
        if (data && data.result.list) setReviewDriver(data.result.list);
    };

    const calculateDaysDifference = (dateTimeString) => {
        const targetDate = new Date(dateTimeString);
        const currentDate = new Date();

        const timeDifference = currentDate.getTime() - targetDate.getTime();
        const daysDifference = Math.floor(timeDifference / (1000 * 3600 * 24));

        return daysDifference;
    };

    useEffect(() => {
        getReviewList(item.id);
    }, [item]);

    return (
        <SafeAreaView style={[styles.flexFull, styles.relative]}>
            <View style={[styles.flexFull, styles.bgBlack]}>
                {/* header */}
                <Header navigation={navigation} title="Tìm tài xế" />

                {/* body */}
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    style={[styles.flexFull, styles.pt15]}
                >
                    <View style={[styles.flexBetween, styles.mb24, styles.px15]}>
                        <Text style={[styles.fs27, styles.textWhite, styles.lh32, styles.fw300]}>
                            Bạn đang đặt chuyến
                        </Text>
                        <Text style={[styles.fs13, styles.textGray77]}>#4554212</Text>
                    </View>

                    <View style={[styles.px15]}>
                        {/* current position */}
                        <View style={[styles.flexRow, styles.mb24]}>
                            <StopCircleIcon size={20} color={'white'} style={{ marginTop: 2 }} />
                            <View style={[styles.ml5, styles.flexFull]}>
                                <Text
                                    style={[
                                        styles.fs16,
                                        styles.fw700,
                                        styles.textWhite,
                                        styles.mb5,
                                    ]}
                                >
                                    Vị trí hiện tại
                                </Text>
                                <Text style={[styles.textGray77, styles.fs15]}>
                                    286 Nguyễn xiển
                                </Text>
                            </View>
                        </View>
                        {/* destionation */}
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
                                    Vị trí hiện tại
                                </Text>
                                <Text style={[styles.textGray77, styles.fs15]}>
                                    286 Nguyễn xiển
                                </Text>
                            </View>
                        </View>
                        <Collapsible collapsed={!isDropdownVisible} duration={500}>
                            {/* type car */}
                            <View style={[styles.flexRow, styles.mb24]}>
                                <TruckIcon size={22} color={'white'} style={{ marginTop: 2 }} />
                                <View style={[styles.ml5, styles.flexFull]}>
                                    <Text
                                        style={[
                                            styles.fs16,
                                            styles.fw700,
                                            styles.textWhite,
                                            styles.mb5,
                                        ]}
                                    >
                                        Loại hình xe
                                    </Text>
                                    <Text style={[styles.textGray77, styles.fs15]}>
                                        286 Nguyễn xiển
                                    </Text>
                                </View>
                            </View>

                            {/* lich trinh */}
                            <View style={[styles.flexRow, styles.mb24]}>
                                <ClockIcon size={22} color={'white'} style={{ marginTop: 2 }} />
                                <View style={[styles.ml5, styles.flexFull]}>
                                    <Text
                                        style={[
                                            styles.fs16,
                                            styles.fw700,
                                            styles.textWhite,
                                            styles.mb5,
                                        ]}
                                    >
                                        Thời gian khởi hành
                                    </Text>
                                    <Text style={[styles.textGray77, styles.fs15]}>
                                        286 Nguyễn xiển
                                    </Text>
                                </View>
                            </View>

                            {/* note */}
                            <View style={[styles.flexRow, styles.mb24]}>
                                <PencilIcon size={22} color={'white'} style={{ marginTop: 2 }} />
                                <View style={[styles.ml5, styles.flexFull]}>
                                    <Text
                                        style={[
                                            styles.fs16,
                                            styles.fw700,
                                            styles.textWhite,
                                            styles.mb5,
                                        ]}
                                    >
                                        Ghi chú
                                    </Text>
                                    <Text style={[styles.textGray77, styles.fs15]}>
                                        286 Nguyễn xiển
                                    </Text>
                                </View>
                            </View>
                        </Collapsible>

                        <TouchableOpacity
                            style={[styles.flexCenter, styles.mb24]}
                            onPress={toogleDropdown}
                        >
                            <Animated.View
                                style={{
                                    transform: [
                                        {
                                            rotate: rotationValue.interpolate({
                                                inputRange: [0, 1],
                                                outputRange: ['0deg', '180deg'],
                                            }),
                                        },
                                    ],
                                }}
                            >
                                <ChevronDownIcon size={20} color={'white'} />
                            </Animated.View>
                            <Text style={[styles.textWhite]}>Xem chi tiết</Text>
                        </TouchableOpacity>
                    </View>

                    {/* thông tin tài xế */}

                    <View
                        style={[styles.border1, styles.borderTop, styles.borderSolid, styles.pt24]}
                    >
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
                            Thông tin tài xế
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
                                    <Text style={[styles.textWhite, styles.fs16, styles.lh24]}>
                                        {item?.star}
                                    </Text>
                                </View>
                            )}
                        </View>

                        {/* thông tin xe */}
                        <View
                            style={[
                                styles.px15,
                                styles.py10,
                                styles.bg161e,
                                styles.flexRow,
                                styles.flexFull,
                                styles.mb20,
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
                                    <View style={[styles.flexRow, styles.itemsCenter, styles.mt5]}>
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
                                <View key={item.rate_id} style={[styles.flexRow, styles.mb24]}>
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
                                            style={[styles.flexRow, styles.itemsCenter, styles.mt5]}
                                        >
                                            <StarIcon size={12} color={'white'} />
                                            <StarIcon size={12} color={'white'} />
                                            <StarIcon size={12} color={'white'} />
                                            <StarIcon size={12} color={'white'} />
                                            <StarIcon size={12} stroke={'white'} />
                                            <Text
                                                style={[
                                                    styles.textGray77,
                                                    styles.fs14,
                                                    styles.lh24,
                                                    styles.fw400,
                                                    styles.ml15,
                                                ]}
                                            >
                                                {calculateDaysDifference(item?.created_at)} ngày
                                                trước
                                            </Text>
                                        </View>
                                    </View>
                                </View>
                            ))}
                        </View>
                    </View>
                </ScrollView>

                {/* buttom  huy chuyen & tim tai xe*/}
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
                        <Text style={[styles.fs16, styles.textWhite]}>Chọn tài khác</Text>
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
                        <Text style={[styles.fs16, styles.textWhite]}>Đặt chuyến</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    );
};

export default FindDetail;
