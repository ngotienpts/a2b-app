import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import React, { useState, useEffect, useContext } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, useRoute } from '@react-navigation/native';
import { StarIcon } from 'react-native-heroicons/solid';
import { CurrencyDollarIcon, ShieldCheckIcon } from 'react-native-heroicons/outline';

import styles from '../../styles';
import Header from '../header/Header';
import { Image } from 'react-native';
import { fallbackImage, fetchReviewListEndpoint } from '../../api/DataFetching';
import { BookingFormContext } from '../../redux/bookingFormContext';
import SentFormBooking from '../SentFormBooking/SentFormBooking';

const Confirm = () => {
    const context = useContext(BookingFormContext);
    const { params: item } = useRoute();
    const navigation = useNavigation();
    const [reviewDriver, setReviewDriver] = useState([]);

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
                <Header navigation={navigation} title="Thành công" />

                {/* body */}
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    style={[styles.flexFull, styles.pt15]}
                >
                    <SentFormBooking context={context} title="Tài xế đang đến" />

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
                    </View>
                </ScrollView>

                {/* buttom  huy chuyen & tim tai xe*/}
                <View style={[styles.flexRow]}>
                    <TouchableOpacity
                        style={[
                            styles.h48,
                            styles.bgBlack,
                            styles.flexFull,
                            styles.itemsCenter,
                            styles.justifyCenter,
                            styles.border1,
                            styles.borderColorWhite,
                            styles.borderSolid,
                            styles.border4,
                            styles.mx15,
                        ]}
                        onPress={() => navigation.goBack()}
                    >
                        <Text style={[styles.fs16, styles.textWhite]}>Hủy chuyến</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    );
};

export default Confirm;