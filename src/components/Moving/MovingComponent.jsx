import { View, Text, TouchableOpacity, ScrollView, Image, StatusBar } from 'react-native';
import React, { useContext } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { StarIcon } from 'react-native-heroicons/solid';
import {
    ArrowUturnRightIcon,
    ShieldCheckIcon,
    PhoneIcon,
    ChatBubbleOvalLeftIcon,
    Square2StackIcon,
} from 'react-native-heroicons/outline';

import styles from '../../styles';
import Header from '../header/Header';
import { BookingFormContext } from '../../redux/bookingFormContext';
import { fallbackImage } from '../../api/DataFetching';
import SentFormBooking from '../sentFormBooking';
import { qrCode } from '../../assets/images';

const MovingComponent = () => {
    const context = useContext(BookingFormContext);
    const navigation = useNavigation();
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

                    {/* thông tin tài xế */}

                    <View style={[styles.border1, styles.borderSolid, styles.pt10]}>
                        <View style={[styles.flexColumn, styles.itemsCenter, styles.mb20]}>
                            {/* avatar */}
                            <Image
                                source={{
                                    uri:
                                        'https://images.unsplash.com/photo-1564564321837-a57b7070ac4f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1176&q=80' ||
                                        fallbackImage,
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
                                    Nguyễn Văn A
                                </Text>
                                <View style={[styles.pl10]}>
                                    <ShieldCheckIcon size={16} color={'white'} />
                                </View>
                            </View>

                            {/* đánh sao*/}
                            <View style={[styles.flexRow, styles.itemsCenter]}>
                                <StarIcon size={'16'} color={'white'} />
                                <Text style={[styles.textWhite, styles.fs16, styles.lh24]}>
                                    5.0
                                </Text>
                            </View>
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
                                source={{
                                    uri:
                                        'https://images.unsplash.com/photo-1564564321837-a57b7070ac4f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1176&q=80' ||
                                        fallbackImage,
                                }}
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
                                        Volvo - 2021
                                    </Text>
                                    <ShieldCheckIcon size={16} color={'white'} />
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
                                        30H-12345
                                    </Text>
                                </View>

                                {/* wifi */}
                                <View style={[styles.flexRow, styles.itemsCenter, styles.mt5]}>
                                    <Text style={[styles.textWhite, styles.fs16, styles.lh24]}>
                                        Wifi:aibietdau/12345
                                    </Text>
                                </View>
                            </View>
                        </View>
                    </View>

                    {/* qr code */}
                    <View
                        style={[
                            styles.bgWhite,
                            styles.py12,
                            styles.px15,
                            styles.mb24,
                            styles.flexRow,
                        ]}
                    >
                        {/* img */}
                        <Image
                            source={(require = qrCode)}
                            style={{ width: 116, height: 116 }}
                            resizeMode="cover"
                        />
                        <View style={[styles.flexFull, styles.pl12]}>
                            <View style={[styles.flexBetween, styles.mb5]}>
                                <Text style={[styles.fw700, styles.lh24, styles.fs16]}>
                                    Techcombank
                                </Text>
                                <TouchableOpacity style={[styles.p5]}>
                                    <Square2StackIcon size={20} color={'#000'} />
                                </TouchableOpacity>
                            </View>
                            <View style={[styles.flexRow, styles.mb5]}>
                                <Text style={[styles.fs16, styles.fw300, styles.mr24]}>
                                    117 002 777 568
                                </Text>
                                <Text style={[styles.textRedE8, styles.fs16]}>Đã copy</Text>
                            </View>
                            <Text style={[styles.fs16, styles.fw300, styles.mb5, styles.textUpper]}>
                                Nguyen van toan
                            </Text>
                            <Text style={[styles.fs16, styles.fw300, styles.mb5]}>
                                500.000 - Chia sẻ xăng xe
                            </Text>
                        </View>
                    </View>
                    <View style={[styles.mb24]}>
                        <SentFormBooking context={context} title="Bạn đang đặt chuyến" />
                    </View>

                    {/*  */}
                    <TouchableOpacity onPress={() => navigation.navigate('CompleteScreen')}>
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
