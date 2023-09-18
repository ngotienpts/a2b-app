import { View, Text, StatusBar, TouchableOpacity } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { ClockIcon, PencilIcon, TruckIcon } from 'react-native-heroicons/outline';
import { StopCircleIcon, MapPinIcon } from 'react-native-heroicons/solid';

import styles from '../../styles';
import Header from './Header';
import { ScrollView } from 'react-native';

const HomebackTertiary = () => {
    const navigation = useNavigation();

    return (
        <SafeAreaView style={[styles.flexFull, styles.relative, styles.bgBlack]}>
            <StatusBar barStyle="light-content" animated={true} />
            <View style={[styles.flexFull, styles.bgBlack]}>
                {/* header */}
                <Header navigation={navigation} />

                {/* body */}
                <View style={[styles.px15, styles.flexFull]}>
                    <Text style={[styles.textWhite, styles.fs16, styles.lh24, styles.mb12]}>
                        Xin chào, Nguyễn Văn An!
                    </Text>
                    <View style={[styles.flexBetween, styles.mb24, styles.mt24]}>
                        <Text style={[styles.fs27, styles.textWhite, styles.lh32, styles.fw300]}>
                            Bạn đang trong hành trình
                        </Text>
                        <Text style={[styles.fs14, styles.textGray77]}>#12345</Text>
                    </View>
                    {/*  */}
                    <ScrollView style={[styles.flexFull]}>
                        <View>
                            {/* vị trí hiện tại */}
                            <View style={[styles.flexRow, styles.mb24]}>
                                <StopCircleIcon
                                    size={20}
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
                                        Từ:Vị trí hiện tại
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
                                        Đến: Cảng hàng không quốc tế Nội Bài
                                    </Text>
                                    <Text style={[styles.textGray77, styles.fs15]}>
                                        Phú Minh, Sóc Sơn, Hà Nội
                                    </Text>
                                </View>
                            </View>

                            {/* loại hình xe */}
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
                                    <Text style={[styles.textGray77, styles.fs15]}>Xe Sedan</Text>
                                </View>
                            </View>

                            {/* thời gian khởi hành */}
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
                                        30 phút nữa
                                    </Text>
                                </View>
                            </View>

                            {/* ghi chú */}
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
                                        Ghi chú cho tài xế
                                    </Text>
                                    <Text style={[styles.textGray77, styles.fs15]}>
                                        Mô tả hành lý hoặc vấn đề chưa được liệt kê ở trên
                                    </Text>
                                </View>
                            </View>
                        </View>
                        {/* btn */}
                        <View style={[styles.flexRow]}>
                            <TouchableOpacity
                                style={[
                                    styles.h48,
                                    styles.bgRed,
                                    styles.flexFull,
                                    styles.itemsCenter,
                                    styles.justifyCenter,
                                    styles.mx15,
                                ]}
                            >
                                <Text style={[styles.fs16, styles.textWhite]}>Xem chi tiết</Text>
                            </TouchableOpacity>
                        </View>
                    </ScrollView>
                </View>
            </View>
        </SafeAreaView>
    );
};

export default HomebackTertiary;
