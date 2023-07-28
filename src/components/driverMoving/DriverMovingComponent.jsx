import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import React, { useState, useEffect, useContext } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, useRoute } from '@react-navigation/native';
import { StarIcon } from 'react-native-heroicons/solid';
import {
    ArrowUturnRightIcon,
    ShieldCheckIcon,
    PhoneIcon,
    ChatBubbleOvalLeftIcon,
} from 'react-native-heroicons/outline';

import styles from '../../styles';
import Header from '../header/Header';
import { Image } from 'react-native';
import { fallbackImage, fetchReviewListEndpoint } from '../../api/DataFetching';
import { BookingFormContext } from '../../redux/bookingFormContext';
import SentFormBooking from '../sentFormBooking';
import MomentComponent from '../moment';

const DriverMovingComponent = () => {
    const context = useContext(BookingFormContext);
    const { params: item } = useRoute();
    const navigation = useNavigation();
    const [reviewDriver, setReviewDriver] = useState([]);

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

    useEffect(() => {
        getReviewList(item.id);
    }, [item]);

    return (
        <SafeAreaView style={[styles.flexFull, styles.relative]}>
            <View style={[styles.flexFull, styles.bgBlack]}>
                {/* header */}
                <Header navigation={navigation} title="Chi tiết chuyến đi" />

                {/* body */}
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    style={[styles.flexFull, styles.pt15]}
                >
                    <SentFormBooking context={context} title="Thông tin chuyến đi" />
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
                                <Text style={[styles.fs42, styles.textWhite, { lineHeight: 42 }]}>
                                    30
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
                                    15
                                </Text>
                                <Text style={[styles.fs16, styles.textWhite, styles.pl5]}>ph</Text>
                            </View>
                        </View>
                        <View style={[styles.flexFull, styles.justifyBetween, styles.itemsCenter]}>
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

                    {/* bang tinh */}
                    <View style={[styles.bgWhite, styles.p15]}>
                        <Text style={[styles.fs27, styles.lh32, styles.fw400, styles.mb15]}>
                            Bảng tính
                        </Text>
                        {/* thoi gian du tinh */}
                        <View style={[styles.flexBetween, styles.borderBot5, styles.py10]}>
                            <Text style={[styles.fs16, styles.lh24, styles.fw400]}>
                                Thời gian dự tính
                            </Text>
                            <Text style={[styles.fs16, styles.lh24, styles.fw400]}>45 phút</Text>
                        </View>
                        {/* khoang cach */}
                        <View style={[styles.flexBetween, styles.borderBot5, styles.py10]}>
                            <Text style={[styles.fs16, styles.lh24, styles.fw400]}>
                                Khoảng cách
                            </Text>
                            <Text style={[styles.fs16, styles.lh24, styles.fw400]}>30 km</Text>
                        </View>
                        {/* bao gia */}
                        <View style={[styles.borderBot5, styles.py10]}>
                            <View style={[styles.flexBetween, styles.mb15]}>
                                <Text style={[styles.fs16, styles.lh24, styles.fw400]}>
                                    Báo giá (VNĐ)
                                </Text>
                                <Text style={[styles.fs16, styles.lh24, styles.fw700]}>21.000</Text>
                            </View>
                        </View>
                        {/* so du diem */}
                        <View style={[styles.flexBetween, styles.borderBot5, styles.py10]}>
                            <View style={[styles.flexRow, styles.itemsCenter]}>
                                <Text style={[styles.fs16, styles.lh24, styles.fw400]}>
                                    Số dư điểm
                                </Text>
                                <TouchableOpacity
                                    style={[
                                        styles.bg161e,
                                        styles.px10,
                                        styles.flexCenter,
                                        styles.ml10,
                                    ]}
                                >
                                    <Text style={[styles.textWhite, styles.fs12, styles.lh20]}>
                                        Nạp
                                    </Text>
                                </TouchableOpacity>
                            </View>
                            <Text style={[styles.fs16, styles.lh24, styles.fw400]}>30K</Text>
                        </View>
                        {/* phi nen tang */}
                        <View style={[styles.py10]}>
                            <View style={[styles.flexBetween]}>
                                <Text style={[styles.fs16, styles.lh24, styles.fw400]}>
                                    Phí nền tảng (3%)
                                </Text>
                                <Text style={[styles.fs16, styles.lh24, styles.fw400]}>- 6K</Text>
                            </View>
                            <Text style={[styles.fs12, styles.fw400, styles.textGray77]}>
                                (Trừ sau khi kết thúc chuyến đi)
                            </Text>
                        </View>
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
                        onPress={() => navigation.navigate('DriverCompleteScreen', item)}
                    >
                        <Text style={[styles.fs16, styles.textWhite]}>Go Complete</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    );
};

export default DriverMovingComponent;
