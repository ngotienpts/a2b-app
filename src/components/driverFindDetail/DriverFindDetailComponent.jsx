import { View, Text, TouchableOpacity, ScrollView, StatusBar } from 'react-native';
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
import { fallbackImage, fetchDetailCustomer, fetchDetailTrip, fetchListCategoryVehicle, fetchReviewListEndpoint } from '../../api/DataFetching';
import { BookingFormContext } from '../../redux/bookingFormContext';
import SentFormBooking from '../sentFormBooking';
import MomentComponent from '../moment';
import PayNumber from '../editPayNumber';
import { MapContext } from '../../redux/mapContext';
import FormCustomer from '../formCustomer';
import { TokenContext } from '../../redux/tokenContext';
import Contact from '../contact';
import { Dimensions } from 'react-native';
import { Modal } from 'react-native';
import { filterReview } from '../../constants';
import getDirections from 'react-native-google-maps-directions';

const DriverFindDetailComponent = () => {
    const context = useContext(BookingFormContext);
    const { params: item } = useRoute();
    const navigation = useNavigation();
    const [reviewDriver, setReviewDriver] = useState([]);
    const [price, setPrice] = useState(0);
    const [detail, setDetail] = useState(null);
    const [customer, setCustomer] = useState(null);
    const [cateVehicle, setCateVehicle] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isLoadingCustomer, setIsLoadingCustomer] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [selectItem, setSelectItem] = useState('Mới nhất');
    const [coords, setCoords] = useState(null);
    const contextMap = useContext(MapContext);
    const contextToken = useContext(TokenContext);
    const maxHeight = Dimensions.get('window').height * 0.7;

    const handlePriceChange = (newPrice) => {
        setPrice(newPrice);
    };

    const detailTrip = async () => {
        const params = {
            trip_id: item?.id
        }
        await fetchDetailTrip(params,contextToken.token)
        .then((data) => {
            setDetail(data.result);
            if(data.res === 'success'){
                if(data.result.price_per_km){
                    setPrice(parseInt(data.result.price_per_km) * parseInt(data.result.distance_price))
                    const coordStart = data.result.coordinates_start.split(',');
                    const coordEnd = data.result.coordinates_end.split(',');
                    setCoords({
                        latStart: coordStart[0],
                        lngStart: coordStart[1],
                        latEnd: coordEnd[0],
                        lngEnd: coordEnd[1]
                    })
                }
                fetchDetailCustomer({
                    user_id: data?.result.user_id
                })
                .then((data) => {
                    setCustomer(data.result);
                })
                .catch((err) => {
                    console.log(err);
                })
                .finally(() => {
                    setIsLoadingCustomer(true);
                })
            }
        })
        .catch((err) => {
            console.log(err);
        })
        .finally(() => {
            setIsLoading(true);
        })
    }

    const getReviewList = async (id) => {
        await fetchReviewListEndpoint(id)
        .then((data) => {
            if(data.res === 'success'){
                setReviewDriver(data.result.list);
            }
        }) 
    };

    const listCateVehicle = async () => {
        await fetchListCategoryVehicle(contextToken.token)
        .then((data) => {
            if(data.res === 'success'){
                setCateVehicle(data.result);
            }
        })
        .catch((err) => {
            console.log(err);
        })
    }

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

    const handleSelectItem = (title, name, filter) => {
        setSelectItem(title);
        setModalVisible(false);
        // getReviewList(item?.driver_id,name,filter)
    }

    const openGoogleMap = () => {
        const data = {
            source: {
                latitude: parseFloat(coords?.latStart),
                longitude: parseFloat(coords?.lngStart)
            },
            destination: {
                latitude: parseFloat(coords?.latEnd),
                longitude: parseFloat(coords?.lngEnd)
            },
            params: [
                {
                    key: "travelmode",
                    value: "driving"        // may be "walking", "bicycling" or "transit" as well
                },
                {
                    key: "dir_action",
                    value: "navigate"       // this instantly initializes navigation using the given travel mode
                }
            ]
        }
      
        getDirections(data)
    }

    useEffect(() => {
        getReviewList(item.id);
        detailTrip();
        listCateVehicle();
    }, [item.id]);

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
                    {isLoading && isLoadingCustomer && (
                        <FormCustomer tripId={item.id} cateVehicle={cateVehicle} detail={detail} title="Thông tin chuyến đi" />
                    )}
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
                                    {detail?.distance_all}
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
                                    {detail?.duration_all}
                                </Text>
                                <Text style={[styles.fs16, styles.textWhite, styles.pl5]}>ph</Text>
                            </View>
                        </View>
                        {isLoading && (
                            <TouchableOpacity onPress={openGoogleMap} style={[styles.flexFull, styles.justifyBetween, styles.itemsCenter]}>
                                <View >
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
                            </TouchableOpacity>
                        )}
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
                            <Text style={[styles.fs16, styles.lh24, styles.fw400]}>{detail?.duration_all} phút</Text>
                        </View>
                        {/* khoang cach */}
                        <View style={[styles.flexBetween, styles.borderBot5, styles.py10]}>
                            <Text style={[styles.fs16, styles.lh24, styles.fw400]}>
                                Khoảng cách
                            </Text>
                            <Text style={[styles.fs16, styles.lh24, styles.fw400]}>{detail?.distance_all} km</Text>
                        </View>
                        {/* bao gia */}
                        <View style={[styles.borderBot5, styles.py10]}>
                            <View style={[styles.flexBetween, styles.mb15]}>
                                <Text style={[styles.fs16, styles.lh24, styles.fw400]}>
                                    Báo giá (VNĐ)
                                </Text>
                                <View
                                    style={[
                                        styles.border1,
                                        styles.borderSolid,
                                        styles.borderColorCyan2F,
                                        styles.px10,
                                    ]}
                                >
                                    <PayNumber
                                        value={price}
                                        label={'Báo giá'}
                                        onChange={handlePriceChange}
                                        style={[styles.fs16, styles.lh24, styles.fwBold]}
                                        maxLength={9}
                                    />
                                </View>
                            </View>
                            <TouchableOpacity
                                style={[styles.bgCyan2F, styles.h46, styles.flexCenter]}
                            >
                                <Text
                                    style={[
                                        styles.textWhite,
                                        styles.fs16,
                                        styles.fw400,
                                        styles.lh24,
                                        styles.flexFull,
                                        styles.textCenter,
                                    ]}
                                >
                                    Gửi khách
                                </Text>
                            </TouchableOpacity>
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
                                        Nạp điểm
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
                                <Text style={[styles.fs16, styles.lh24, styles.fw400]}>- {price * 0.03 / 1000}K</Text>
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
                                source={{ uri: customer?.image || fallbackImage }}
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
                                    {customer?.fullname}
                                </Text>
                                {item?.protected && (
                                    <View style={[styles.pl10]}>
                                        <ShieldCheckIcon size={16} color={'white'} />
                                    </View>
                                )}
                            </View>

                            {/* đánh sao*/}
                            {customer?.average_rates.toString() && (
                                <View style={[styles.flexRow, styles.itemsCenter]}>
                                    <StarIcon size={'16'} color={'white'} />
                                    <Text style={[styles.textWhite, styles.fs16, styles.lh24]}>
                                        {customer?.average_rates.toString()}
                                    </Text>
                                </View>
                            )}
                        </View>

                        {/* contact */}
                        <Contact item={customer}/>

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
                                    Đánh giá ({reviewDriver.length !== 0 ? reviewDriver.length : 0})
                                </Text>
                                <TouchableOpacity onPress={() => setModalVisible(true)}>
                                    <Text style={[styles.textWhite, styles.fs16, styles.lh24]}>
                                        {selectItem}
                                    </Text>
                                </TouchableOpacity>
                                <Modal
                                    visible={modalVisible} 
                                    animationType="slide" 
                                    transparent
                                >
                                    <TouchableOpacity
                                        style={[
                                            styles.flexFull,
                                            styles.itemsCenter,
                                            styles.justifyCenter,
                                            styles.bgBlack50,
                                        ]}
                                        onPress={() => setModalVisible(false)}
                                    >
                                        <View
                                            style={[
                                                styles.bgWhite,
                                                styles.border10,
                                                styles.hidden,
                                                { maxHeight: maxHeight, width: '60%' },
                                            ]}
                                        >
                                            <ScrollView showsVerticalScrollIndicator={false}>
                                                {filterReview.map((item, index) => (
                                                    <TouchableOpacity
                                                        key={index}
                                                        onPress={() => handleSelectItem(item?.title, item?.name, item?.filter)}
                                                        style={[
                                                            styles.py10,
                                                            selectItem === item?.title && styles.bg161e,
                                                        ]}
                                                    >
                                                        <Text
                                                            style={[
                                                                styles.fs18,
                                                                styles.px10,

                                                                selectItem === item?.title
                                                                    ? styles.textWhite
                                                                    : styles.textGray77,
                                                            ]}
                                                        >
                                                            {item?.title}
                                                        </Text>
                                                    </TouchableOpacity>
                                                ))}
                                            </ScrollView>
                                        </View>
                                    </TouchableOpacity>
                                </Modal>
                            </View>

                            {/* many reviews */}
                            {reviewDriver.length !== 0 ? reviewDriver.map((item) => (
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
                            )) : (
                                <View>
                                    <Text 
                                    style={[
                                        styles.textWhite,
                                        styles.fs16,
                                        styles.lh24,
                                        styles.fw400,
                                    ]}>
                                        Chưa có bình luận nào cả
                                    </Text>
                                </View>
                            )}
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
                        onPress={() => navigation.navigate('CancelBookDriverScreen')}
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
                        onPress={() => navigation.navigate('DriverPickScreen', item)}
                    >
                        <Text style={[styles.fs16, styles.textWhite]}>Đón khách</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    );
};

export default DriverFindDetailComponent;
