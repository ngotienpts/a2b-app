import {
    View,
    Text,
    TouchableOpacity,
    ScrollView,
    Dimensions,
    Animated,
    Easing,
} from 'react-native';
import React, { useContext } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { StarIcon } from 'react-native-heroicons/solid';
import {
    ArrowUturnRightIcon,
    BeakerIcon,
    CurrencyDollarIcon,
    ShieldCheckIcon,
    WifiIcon,
} from 'react-native-heroicons/outline';
import { CircleFade } from 'react-native-animated-spinkit';

import styles from '../../styles';
import Header from '../header/Header';
import { Image } from 'react-native';
import { BookingFormContext } from '../../redux/bookingFormContext';
import { listDrivers } from '../../constants';
import { fallbackImage } from '../../api/DataFetching';
import SentFormBooking from '../SentFormBooking/SentFormBooking';

const FindComponent = () => {
    const context = useContext(BookingFormContext);
    // console.log(context);
    const navigation = useNavigation();

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
                    <SentFormBooking context={context} title="Bạn đang đặt chuyến" />
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

                    {/* driver list */}
                    <View>
                        <View style={[styles.flexBetween, styles.mb10, styles.px15]}>
                            <Text
                                style={[styles.fs27, styles.textWhite, styles.lh32, styles.fw300]}
                            >
                                Chọn tài xế
                            </Text>
                            <Text style={[styles.fs13, styles.textGray77]}>Sắp xếp</Text>
                        </View>
                        <Text style={[styles.fs16, styles.textGray77, styles.mb20, styles.px15]}>
                            Chuyến đi của bạn sẽ được tìm tài xế trước khi khởi hành 120 phút. Dưới
                            đây là danh sách các tài xế tham khảo ở thời điểm hiện tại:
                        </Text>

                        {/* list */}
                        <View>
                            {listDrivers.map((item) => (
                                <TouchableOpacity
                                    key={item.id.toString()}
                                    style={[
                                        styles.px15,
                                        styles.py10,
                                        styles.bg161e,
                                        styles.flexRow,
                                        styles.flexFull,
                                        styles.mb20,
                                    ]}
                                    onPress={() => navigation.navigate('FindDetailScreen', item)}
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

                                        {/* tên xe */}
                                        <View style={[styles.flexRow, styles.itemsCenter]}>
                                            <Text
                                                style={[
                                                    styles.textWhite,
                                                    styles.fs16,
                                                    styles.fw400,
                                                    styles.lh24,
                                                ]}
                                            >
                                                {item?.name_car} - {item?.model}
                                            </Text>
                                            {item.wifi && (
                                                <WifiIcon
                                                    size={16}
                                                    color={'white'}
                                                    style={[styles.ml10]}
                                                />
                                            )}
                                            {item.water && (
                                                <BeakerIcon
                                                    size={16}
                                                    color={'white'}
                                                    style={[styles.ml5]}
                                                />
                                            )}
                                        </View>

                                        {/* đánh sao & giá tiền */}
                                        <View style={[styles.flexRow, styles.itemsCenter]}>
                                            {item?.star && (
                                                <View style={[styles.flexRow, styles.itemsCenter]}>
                                                    <StarIcon size={'16'} color={'white'} />
                                                    <Text
                                                        style={[
                                                            styles.textWhite,
                                                            styles.fs16,
                                                            styles.lh24,
                                                            styles.ml5,
                                                        ]}
                                                    >
                                                        {item?.star}
                                                    </Text>
                                                </View>
                                            )}
                                            {item?.bill && (
                                                <View
                                                    style={[
                                                        styles.flexRow,
                                                        styles.itemsCenter,
                                                        styles.ml24,
                                                    ]}
                                                >
                                                    <CurrencyDollarIcon
                                                        size={'16'}
                                                        color={'white'}
                                                    />
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
                                </TouchableOpacity>
                            ))}
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

export default FindComponent;
