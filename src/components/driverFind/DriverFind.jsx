import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import React, { useContext } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, useRoute } from '@react-navigation/native';
import { StopCircleIcon, MapPinIcon } from 'react-native-heroicons/solid';

import styles from '../../styles';
import Header from '../header/Header';
import {
    BoltIcon,
    ClockIcon,
    PencilSquareIcon,
    ShieldCheckIcon,
    ViewfinderCircleIcon,
} from 'react-native-heroicons/outline';
import { Image } from 'react-native';
import { fallbackImage } from '../../api/DataFetching';
import { CircleFade } from 'react-native-animated-spinkit';
import { BookingFormContext } from '../../redux/bookingFormContext';
import { StatusBar } from 'react-native';

const DriverFind = () => {
    const navigation = useNavigation();
    const context = useContext(BookingFormContext);

    return (
        <SafeAreaView style={[styles.flexFull, styles.relative, styles.bgBlack]}>
            <StatusBar barStyle="light-content" animated={true} />
            <View style={[styles.flexFull, styles.bgBlack]}>
                {/* header */}
                <Header navigation={navigation} title="Xe tìm khách" />

                {/* body */}
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    style={[styles.flexFull, styles.pt15]}
                >
                    <Text
                        style={[
                            styles.fs27,
                            styles.textWhite,
                            styles.lh32,
                            styles.mb24,
                            styles.fw300,
                            styles.px15,
                        ]}
                    >
                        Cung đường của bạn
                    </Text>

                    {/* location */}
                    <View style={[styles.borderBot, styles.px15]}>
                        {/* vị trí hiện tại */}
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

                        {/* điểm đến */}
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

                        {/* Báo giá tự động */}
                        <View style={[styles.flexRow, styles.mb24]}>
                            <BoltIcon size={22} color={'white'} style={{ marginTop: 2 }} />
                            <View style={[styles.ml5, styles.flexFull]}>
                                <Text
                                    style={[
                                        styles.fs16,
                                        styles.fw700,
                                        styles.textWhite,
                                        styles.mb5,
                                    ]}
                                >
                                    Báo giá tự động
                                </Text>
                                <Text style={[styles.textGray77, styles.fs15]}>Tắt</Text>
                            </View>
                        </View>
                        {/* Phạm vi đón trả khách */}

                        <View style={[styles.flexRow, styles.mb24]}>
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
                                    Phạm vi đón trả khách
                                </Text>
                                <Text style={[styles.textGray77, styles.fs15]}>30km</Text>
                            </View>
                        </View>
                    </View>

                    {/* khách phù hợp */}
                    <View style={[styles.mt24]}>
                        <View style={[styles.flexBetween, styles.mb20, styles.px15]}>
                            <Text
                                style={[styles.fs27, styles.textWhite, styles.lh32, styles.fw300]}
                            >
                                Khách phù hợp
                            </Text>
                            <Text style={[styles.fs13, styles.textGray77]}>Sắp xếp</Text>
                        </View>
                        <View>
                            {/* item */}
                            <TouchableOpacity
                                style={[styles.p15, styles.bg161e, styles.mb20]}
                                onPress={
                                    () => navigation.navigate('DriverFindDetailScreen', [{ id: 1 }]) //fake tam id
                                }
                            >
                                {/* top */}
                                <View style={[styles.flexRow, styles.mb10]}>
                                    <Image
                                        source={{ uri: fallbackImage }}
                                        style={[
                                            styles.w42,
                                            styles.h42,
                                            styles.borderFull,
                                            styles.cover,
                                        ]}
                                    />
                                    <View style={[styles.flexFull, styles.pl15]}>
                                        <View style={[styles.flexRow, styles.itemsCenter]}>
                                            <Text
                                                style={[
                                                    styles.textWhite,
                                                    styles.fs16,
                                                    styles.lh24,
                                                    styles.fw700,
                                                    styles.mr5,
                                                ]}
                                            >
                                                Nguyen Van A
                                            </Text>
                                            <ShieldCheckIcon size={16} color={'white'} />
                                        </View>
                                        <Text
                                            style={[styles.textGray77, styles.fs13, styles.fw400]}
                                        >
                                            Chưa báo giá
                                        </Text>
                                    </View>
                                </View>
                                {/* body */}
                                <View>
                                    {/* vi tri bat dau */}
                                    <View style={[styles.flexRow, styles.mb10]}>
                                        <StopCircleIcon
                                            size={20}
                                            color={'white'}
                                            style={{ marginTop: 2 }}
                                        />
                                        <Text
                                            style={[
                                                styles.fs16,
                                                styles.fw400,
                                                styles.textWhite,
                                                styles.flexFull,
                                                styles.ml10,
                                            ]}
                                        >
                                            Vị trí hiện tại
                                        </Text>
                                    </View>
                                    {/* vi tri ket thuc */}
                                    <View style={[styles.flexRow, styles.mb10]}>
                                        <MapPinIcon
                                            size={22}
                                            color={'white'}
                                            style={{ marginTop: 2 }}
                                        />
                                        <Text
                                            style={[
                                                styles.fs16,
                                                styles.fw400,
                                                styles.textWhite,
                                                styles.flexFull,
                                                styles.ml10,
                                            ]}
                                        >
                                            Vị trí hiện tại
                                        </Text>
                                    </View>
                                    {/* thoi gian */}
                                    <View style={[styles.flexRow, styles.mb10]}>
                                        <ClockIcon
                                            size={22}
                                            color={'white'}
                                            style={{ marginTop: 2 }}
                                        />
                                        <Text
                                            style={[
                                                styles.fs16,
                                                styles.fw400,
                                                styles.textWhite,
                                                styles.flexFull,
                                                styles.ml10,
                                            ]}
                                        >
                                            Vị trí hiện tại
                                        </Text>
                                    </View>
                                    {/* note */}
                                    <View style={[styles.flexRow, styles.mb10]}>
                                        <PencilSquareIcon
                                            size={22}
                                            color={'white'}
                                            style={{ marginTop: 2 }}
                                        />
                                        <Text
                                            style={[
                                                styles.fs16,
                                                styles.fw400,
                                                styles.textWhite,
                                                styles.flexFull,
                                                styles.ml10,
                                            ]}
                                        >
                                            Vị trí hiện tại
                                        </Text>
                                    </View>
                                </View>
                            </TouchableOpacity>
                            {/* item */}
                            <TouchableOpacity
                                style={[styles.p15, styles.bg161e, styles.mb20]}
                                onPress={
                                    () => navigation.navigate('DriverFindDetailScreen', [{ id: 2 }]) // fake tam id
                                }
                            >
                                {/* top */}
                                <View style={[styles.flexRow, styles.mb10]}>
                                    <Image
                                        source={{ uri: fallbackImage }}
                                        style={[
                                            styles.w42,
                                            styles.h42,
                                            styles.borderFull,
                                            styles.cover,
                                        ]}
                                    />
                                    <View style={[styles.flexFull, styles.pl15]}>
                                        <View style={[styles.flexRow, styles.itemsCenter]}>
                                            <Text
                                                style={[
                                                    styles.textWhite,
                                                    styles.fs16,
                                                    styles.lh24,
                                                    styles.fw700,
                                                    styles.mr5,
                                                ]}
                                            >
                                                Nguyen Van A
                                            </Text>
                                            <ShieldCheckIcon size={16} color={'white'} />
                                        </View>
                                        <Text
                                            style={[styles.textCyan2F, styles.fs13, styles.fw400]}
                                        >
                                            Đã báo giá
                                        </Text>
                                    </View>
                                </View>
                                {/* body */}
                                <View>
                                    {/* vi tri bat dau */}
                                    <View style={[styles.flexRow, styles.mb10]}>
                                        <StopCircleIcon
                                            size={20}
                                            color={'white'}
                                            style={{ marginTop: 2 }}
                                        />
                                        <Text
                                            style={[
                                                styles.fs16,
                                                styles.fw400,
                                                styles.textWhite,
                                                styles.flexFull,
                                                styles.ml10,
                                            ]}
                                        >
                                            Vị trí hiện tại
                                        </Text>
                                    </View>
                                    {/* vi tri ket thuc */}
                                    <View style={[styles.flexRow, styles.mb10]}>
                                        <MapPinIcon
                                            size={22}
                                            color={'white'}
                                            style={{ marginTop: 2 }}
                                        />
                                        <Text
                                            style={[
                                                styles.fs16,
                                                styles.fw400,
                                                styles.textWhite,
                                                styles.flexFull,
                                                styles.ml10,
                                            ]}
                                        >
                                            Vị trí hiện tại
                                        </Text>
                                    </View>
                                    {/* thoi gian */}
                                    <View style={[styles.flexRow, styles.mb10]}>
                                        <ClockIcon
                                            size={22}
                                            color={'white'}
                                            style={{ marginTop: 2 }}
                                        />
                                        <Text
                                            style={[
                                                styles.fs16,
                                                styles.fw400,
                                                styles.textWhite,
                                                styles.flexFull,
                                                styles.ml10,
                                            ]}
                                        >
                                            Vị trí hiện tại
                                        </Text>
                                    </View>
                                    {/* note */}
                                    <View style={[styles.flexRow, styles.mb10]}>
                                        <PencilSquareIcon
                                            size={22}
                                            color={'white'}
                                            style={{ marginTop: 2 }}
                                        />
                                        <Text
                                            style={[
                                                styles.fs16,
                                                styles.fw400,
                                                styles.textWhite,
                                                styles.flexFull,
                                                styles.ml10,
                                            ]}
                                        >
                                            Vị trí hiện tại
                                        </Text>
                                    </View>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>

                    {/* tắt thông báo */}
                    <View style={[styles.mt24, styles.pb50, styles.flexColumn, styles.itemsCenter]}>
                        <View style={[styles.mb20]}>
                            <CircleFade size={40} color="white" />
                        </View>
                        <Text style={[styles.fs11, styles.textWhite30, { marginBottom: 2 }]}>
                            Bạn có thể đóng ứng dụng
                        </Text>
                        <Text style={[styles.fs11, styles.textWhite30, { marginBottom: 2 }]}>
                            Hệ thống sẽ thông báo khi có tài xế
                        </Text>
                        <TouchableOpacity>
                            <Text style={[styles.fs16, styles.textWhite, styles.mt10]}>
                                Tắt thông báo
                            </Text>
                        </TouchableOpacity>
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
                >
                    <Text style={[styles.fs16, styles.textWhite]}>Tắt nhận chuyến</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

export default DriverFind;
