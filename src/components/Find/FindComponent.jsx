import { View, Text, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';

import styles from '../../styles';
import Header from '../header/Header';
import { MapPinIcon, StopCircleIcon } from 'react-native-heroicons/solid';
import {
    ArrowUturnRightIcon,
    ClockIcon,
    PencilIcon,
    TruckIcon,
} from 'react-native-heroicons/outline';
import { Image } from 'react-native';
import { driver } from '../../assets/images';
import { he } from 'date-fns/locale';

const { width, height } = Dimensions.get('window');

const FindComponent = () => {
    const navigation = useNavigation();
    return (
        <SafeAreaView style={[styles.flexFull, styles.relative]}>
            <View style={[styles.flexFull, styles.bgBlack]}>
                {/* header */}
                <Header navigation={navigation} title="Tìm tài xế" />

                {/* body */}
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    style={[styles.flexFull, styles.pt15, styles.px15]}
                >
                    <View style={[styles.flexBetween, styles.mb24]}>
                        <Text style={[styles.fs27, styles.textWhite, styles.lh32, styles.fw300]}>
                            Bạn đang đặt chuyến
                        </Text>
                        <Text style={[styles.fs13, styles.textGray77]}>#4554212</Text>
                    </View>

                    <View>
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
                    </View>

                    {/* khoang cach & thoi gian */}
                    <View
                        style={[
                            styles.my24,
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

                    {/* driver list */}
                    <View>
                        <View style={[styles.flexBetween, styles.mb10]}>
                            <Text
                                style={[styles.fs27, styles.textWhite, styles.lh32, styles.fw300]}
                            >
                                Chọn tài xế
                            </Text>
                            <Text style={[styles.fs13, styles.textGray77]}>Sắp xếp</Text>
                        </View>
                        <Text style={[styles.fs16, styles.textGray77, styles.mb20]}>
                            Chuyến đi của bạn sẽ được tìm tài xế trước khi khởi hành 120 phút. Dưới
                            đây là danh sách các tài xế tham khảo ở thời điểm hiện tại:
                        </Text>

                        {/* list */}
                        <View style={[styles.mb24]}>
                            <View>
                                <Image
                                    source={driver}
                                    style={{ width: 133, height: 72 }}
                                    resizeMode="cover"
                                />
                            </View>
                        </View>
                    </View>
                </ScrollView>

                {/* buttom  huy chuyen */}
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
                        ]}
                    >
                        <Text style={[styles.fs16, styles.textWhite]}>Hủy chuyến</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    );
};

export default FindComponent;
