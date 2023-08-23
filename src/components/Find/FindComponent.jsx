import React, { useContext, useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Image, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useIsFocused, useNavigation, useRoute } from '@react-navigation/native';
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
import { BookingFormContext } from '../../redux/bookingFormContext';
import { fallbackImage, fetchAutomaticQuote, fetchDetailTrip, fetchListReport } from '../../api/DataFetching';
import SentFormBooking from '../sentFormBooking/SentFormBooking';
import { DetailTripContext } from '../../redux/detailTripContext';
import { TokenContext } from '../../redux/tokenContext';
import { MapContext } from '../../redux/mapContext';
import { Dimensions } from 'react-native';
import { waiting } from '../../constants';


const FindComponent = () => {
    const context = useContext(BookingFormContext);
    const contextToken = useContext(TokenContext);
    const contextMap = useContext(MapContext);
    const contextDetailTrip = useContext(DetailTripContext);
    const [detail, setDetail] = useState({});
    const [reports, setReports] = useState({});
    const [loading, setLoading] = useState(false);
    const [loadingDetailTrip, setLoadingDetailTrip] = useState(false);
    const [isUnmounted, setIsUnmounted] = useState(false);
    const isFocused = useIsFocused();
    const navigation = useNavigation();
    const cardWidth = Dimensions.get("window").width * 0.8;

    const {params: item} = useRoute();
    const paramsTrip = {
        trip_id: item?.id
    }

    useEffect(() => {
        if (!isFocused) {
          // Màn hình bị blur, thực hiện unmount
          setIsUnmounted(true);
        } else {
          // Màn hình được focus lại, không cần unmount
          setIsUnmounted(false);
        }
      }, [isFocused]);
    
    useEffect(() => {
    // Gọi API hoặc các tác vụ khác tại đây khi màn hình được render
    // Hãy chắc chắn kiểm tra isUnmounted trước khi thực hiện bất kỳ công việc nào tại đây
        if (!isUnmounted) {
            // Gọi API hoặc tác vụ khác...
            detailTrip(paramsTrip,item?.isFlag)
            listReport(paramsTrip)
        }
    }, [isUnmounted]); 
    
    useEffect(() => {
        // Truyền giá trị từ context vào biến local
        detailTrip(paramsTrip,item?.isFlag)
        listReport(paramsTrip)
        automaticQuote(paramsTrip);
    }, []);

    const automaticQuote = async (paramsTrip) => {
        await fetchAutomaticQuote(paramsTrip, contextToken.token)
        // await fetchAutomaticQuote(paramsTrip, 'e1358385819f12b01db7990c1')
        .then((data) => {
            if(data.res === 'success'){
                listReport(paramsTrip);
            }
        })
        .catch((err) => {
            console.log(err);
        })
    }

    const detailTrip = async (paramsTrip, isFlag = 0) => {
        await fetchDetailTrip(paramsTrip,contextToken.token)
        // await fetchDetailTrip(paramsTrip,'e1358385819f12b01db7990c1')
        .then((data) => {
            if(data.res === 'success'){
                setDetail(data.result);
                contextDetailTrip.setDetailTrip({
                    ...contextDetailTrip.detailTrip,
                    duration: data.result.duration_all,
                    distance: data.result.distance_all
                })

                if(isFlag){
                    context.setBookingForm({
                        ...context.bookingForm,
                        eniqueId: data?.result.trip_id,
                        startPoint: {
                            start_name: data?.result.start_name,
                            start: data?.result.start_location,
                            coordinates: {
                                lat: data?.result.coordinates_start.split(',')[0],
                                lng: data?.result.coordinates_start.split(',')[1],
                            }
                        },
                        endPoint: {
                            name: data?.result.end_name,
                            address: data?.result.end_location,
                            coordinates: {
                                lat: data?.result.coordinates_end.split(',')[0],
                                lng: data?.result.coordinates_end.split(',')[1],
                            }
                        },
                        typeCar: data?.result.vehicle_category_id,
                        nameCar: data?.result.name_category,
                        departureTime: data?.result.start_time,
                        note: data?.result.comment,
                        isPunish: data?.result.is_punish
                    })
                }
            }
        })
        .catch((err) => {
            console.log(err);
        })
        .finally(() => {
            setLoadingDetailTrip(true);
        })
    }

    const listReport = async (paramsTrip) => {
        await fetchListReport(paramsTrip,contextToken.token)
        // await fetchListReport(paramsTrip,'e1358385819f12b01db7990c1')
        .then((data) => {
            if(data.res === 'success'){
                setReports(data.result);
            }
        })
        .catch((err) => {
            console.log(err);
        })
        .finally(() => {
            setLoading(true);
        })
    }

    return (
        <SafeAreaView style={[styles.flexFull, styles.relative, styles.bgBlack]}>
            <StatusBar barStyle="light-content" animated={true} />
            <View style={[styles.flexFull, styles.bgBlack]}>
                {/* header */}
                <Header navigation={navigation} title="Tìm tài xế" />

                {/* body */}
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    style={[styles.flexFull, styles.pt15]}
                >
                    <SentFormBooking context={context} contextMap={contextMap}  title="Bạn đang đặt chuyến" />
                    {/* khoang cach & thoi gian */}
                    {loadingDetailTrip && (
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
                                        {detail.distance_all}
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
                                        {detail.duration_all}
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
                    )}

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
                        {loading ? (
                            <View>
                                {reports.length !== undefined && reports.map((item) => (
                                    <TouchableOpacity
                                        key={item.reported_id.toString()}
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
                                            source={{ uri: item?.image || fallbackImage }}
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
                                                    {item?.fullname}
                                                </Text>
                                                {item?.is_confirmed == 1 && (
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
                                                    {item?.vehicle_name} - {item?.vehicle_life}
                                                </Text>
                                                {item.is_wifi == 1 && (
                                                    <WifiIcon
                                                        size={16}
                                                        color={'white'}
                                                        style={[styles.ml10]}
                                                    />
                                                )}
                                                {item.is_bottle == 1 && (
                                                    <BeakerIcon
                                                        size={16}
                                                        color={'white'}
                                                        style={[styles.ml5]}
                                                    />
                                                )}
                                            </View>

                                            {/* đánh sao & giá tiền */}
                                            <View style={[styles.flexRow, styles.itemsCenter]}>
                                                {item?.avg_star.toString() && (
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
                                                            {item?.avg_star.toString()}
                                                        </Text>
                                                    </View>
                                                )}
                                                {item?.price_distance.toString() && (
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
                                                            {item?.price_distance.toString()}
                                                        </Text>
                                                    </View>
                                                )}
                                            </View>
                                        </View>
                                    </TouchableOpacity>
                                ))}
                            </View>
                        ) : (
                            <View>
                                {waiting.map((val) => (
                                    <View key={val?.id} style={[styles.card, {width: cardWidth + 80, marginBottom: 10}]}>
                                        <View style={{flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start'}}>
                                        <Skenleton height={75} width={cardWidth - 198} style={{marginRight: 10, alignItems: 'flex-end'}}/>
                                        <View>
                                            <Skenleton height={16} width={cardWidth - 145} style={{marginTop: 4, alignItems: 'flex-end'}} />
                                            <Skenleton height={16} width={cardWidth - 145} style={{marginTop: 10, alignItems: 'flex-end'}} />
                                            <Skenleton height={16} width={cardWidth - 145} style={{marginTop: 10, alignItems: 'flex-end'}} />
                                        </View>
                                        </View>
                                    </View>
                                ))}
                            </View>
                        )}
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
                        onPress={() => navigation.navigate('CancelBookClientScreen')}
                    >
                        <Text style={[styles.fs16, styles.textWhite]}>Hủy chuyến</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    );
};

export default FindComponent;
