import { View, Text, TouchableOpacity, ScrollView, TextInput } from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { StarIcon } from 'react-native-heroicons/solid';
import {
    ShieldCheckIcon,
    PhoneIcon,
    ChatBubbleOvalLeftIcon,
    Square2StackIcon,
} from 'react-native-heroicons/outline';
import { AirbnbRating } from 'react-native-ratings';

import styles from '../../styles';
import Header from '../header/Header';
import { Image } from 'react-native';
import { fallbackImage } from '../../api/DataFetching';
import { qrCode } from '../../assets/images';
import { reviewTextComplete } from '../../constants';

const Complete = () => {
    const navigation = useNavigation();
    const [rating, setRating] = useState(4);
    const [reviewText, setReviewText] = useState('');

    const handleRatingChange = (newRating) => {
        setRating(newRating);
    };

    const handleSubmitRate = () => {
        console.log('rate', reviewText);
        console.log('rating', rating);
    };

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

                        <Text
                            style={[
                                styles.flexCenter,
                                styles.textWhite,
                                styles.fs27,
                                styles.textCenter,
                                styles.mx24,
                                styles.fw300,
                                styles.mb24,
                            ]}
                        >
                            Cảm ơn bạn đã lựa chọn chuyến đi này!
                        </Text>
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
                                <TouchableOpacity styles={[styles.p5]}>
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

                    {/* rate */}
                    <View style={[styles.px15, styles.mb50]}>
                        <Text
                            style={[
                                styles.textWhite,
                                styles.fs16,
                                styles.fw700,
                                styles.lh24,
                                styles.mb24,
                            ]}
                        >
                            Bạn hài lòng về chuyến đi?
                        </Text>
                        {/*  */}
                        <View style={[styles.flexRow, styles.mb24]}>
                            <Image
                                source={{
                                    uri:
                                        'https://images.unsplash.com/photo-1564564321837-a57b7070ac4f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1176&q=80' ||
                                        fallbackImage,
                                }}
                                style={{ width: 52, height: 52, borderRadius: 999 }}
                                resizeMode="cover"
                            />
                            <View style={[styles.pl10, styles.flexFull]}>
                                <TextInput
                                    style={[
                                        styles.textGray77,
                                        styles.bg161e,
                                        styles.fs15,
                                        styles.textAreaRate,
                                        styles.p15,
                                    ]}
                                    placeholder="Đánh giá của bạn..."
                                    placeholderTextColor={'rgba(119,125,146,0.8)'}
                                    multiline
                                    numberOfLines={2}
                                    value={reviewText}
                                    onChangeText={setReviewText}
                                />
                                {/* btn */}
                                <View style={[styles.flexBetween, styles.mt10]}>
                                    {reviewTextComplete.map((reviewText) => (
                                        <TouchableOpacity
                                            key={reviewText.id}
                                            onPress={() => setReviewText(reviewText.name)}
                                        >
                                            <Text
                                                style={[
                                                    styles.textWhite,
                                                    styles.fs16,
                                                    styles.fw300,
                                                    styles.bgGray161,
                                                    styles.py5,
                                                    styles.px12,
                                                ]}
                                            >
                                                {reviewText.name}
                                            </Text>
                                        </TouchableOpacity>
                                    ))}
                                </View>

                                {/* start */}

                                <View style={[styles.flexBetween, styles.mt20]}>
                                    <AirbnbRating
                                        size={20}
                                        selectedColor={'white'}
                                        unSelectedColor={'#333'}
                                        showRating={false}
                                        startingValue={rating}
                                        onFinishRating={handleRatingChange}
                                    />
                                    <TouchableOpacity onPress={handleSubmitRate}>
                                        <Text
                                            style={[
                                                styles.textWhite,
                                                styles.bgRed,
                                                styles.px12,
                                                styles.py5,
                                                styles.border4,
                                                styles.fs14,
                                            ]}
                                        >
                                            Đánh giá
                                        </Text>
                                    </TouchableOpacity>
                                </View>
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
                        onPress={() => navigation.navigate('HomeScreen')}
                    >
                        <Text style={[styles.fs16, styles.textWhite]}>Trang chủ</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    );
};

export default Complete;
