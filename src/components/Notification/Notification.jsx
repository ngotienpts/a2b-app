import React, { useContext, useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StatusBar, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useIsFocused, useNavigation } from '@react-navigation/native';

import styles from '../../styles';
import Header from '../header';
import MomentComponent from '../moment';
import { fetchListNoti, fetchReadAllNoti, fetchReadOneNoti } from '../../api/DataFetching';
import { TokenContext } from '../../redux/tokenContext';
import { useNotification } from '../../redux/notificationContext';
import Skenleton from '../skeleton/Skenleton';
import { waiting } from '../../constants';

const Notification = () => {
    const { handleHiddenNoti } = useNotification();
    const navigation = useNavigation();
    const context = useContext(TokenContext);
    const [notifications, setNotifications] = useState({});
    const [isUnmounted, setIsUnmounted] = useState(false);
    const [isDot, setIsDot] = useState(true);
    const isFocused = useIsFocused();
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [count, setCount] = useState(0);
    const cardWidth = Dimensions.get("window").width * 0.8;
    // useEffect này chỉ chạy một lần khi component mount

    useEffect(() => {
        if (isFocused) {
            // Gọi API hoặc tác vụ khác...
            listNotification(page);
        }
    }, [isFocused]);

    const listNotification = (newPage, isLoading = false) => {
        let params = {
            page: newPage
        };
        fetchListNoti(params,'79ee7846612b106c445826c19')
            .then((data) => {
                if (data.res === 'success') {
                    let newData = data.result;
                    if (newPage > 1 || isLoading) {
                        //tranh truong hợp về cuối dễ bị trùng khi unmount lại
                        newData = newData.filter(item => !notifications.some((noti) => noti.notify_id == item.notify_id)); 
                        // some la phuong thuc kiem tra neu dung tra ve true con khong ve false 
                        setNotifications([...notifications, ...newData]);
                    } else {
                        setNotifications(newData);
                    }
                    setPage(newPage);
                    handleHiddenNoti(data.count);
                    setCount(data.count - 1);
                }
            })
            .catch((err) => {
                console.log(err);
            })
            .finally(() => {
                setLoading(true);
            });
    };
    // Xử lý khi thông báo được ẩn
    const handleHideNotification = () => {
        const updatedNotifications = notifications.map((noti) => ({
            ...noti,
            isRead: true
        }));
        setNotifications(updatedNotifications);
        fetchReadAllNoti(context.token)
            .then((data) => {
                // console.log(data);
                if (data.res === 'success') {
                    handleHiddenNoti(0);
                    // handleHiddenNoti(context.token);
                }
            })
    };

    // Xử lý từng thông báo bị ẩn
    const handleClickOneNoti = (noti) => {
        // const index = notifications.findIndex((n) => n.notify_id === noti.notify_id && n.status == 0); //tim vi tri key noti chon voi danh sach noti api
        // if (index !== -1) {
        //     // Đánh dấu thông báo là đã đọc bằng cách đặt isRead thành true
        //     const updatedNotifications = [...notifications]; // lay danh sách noti của api kết hợp
        //     updatedNotifications[index] = { ...noti, isRead: true }; // kết hợp noti thứ i của api với noti được chọn và thêm key isRead = true
        //     setNotifications(updatedNotifications); // cập nhật lại noti
        //     setCount(prevCount => Math.max(0, prevCount - 1));
        //     handleHiddenNoti(count)
        // }
        fetchReadOneNoti({
            notify_id: noti.notify_id
        }, context.token)
            .then((data) => {
                if (data.res === 'success') {
                    navigation.navigate(noti.screen, noti.data && JSON.parse(noti.data));
                }
            })
    }

    const handleScroll = (event) => {
        const { layoutMeasurement, contentOffset, contentSize } = event.nativeEvent;
        const isCloseToBottom = layoutMeasurement.height + contentOffset.y >= contentSize.height - 80;
        if (isCloseToBottom) {
            listNotification(page + 1, true);
        }

    };

    return (
        <SafeAreaView style={[styles.flexFull, styles.relative, styles.bgBlack]}>
            <StatusBar barStyle="light-content" animated={true} />
            <View style={[styles.flexFull, styles.bgBlack]}>
                {/* header */}
                <Header navigation={navigation} title="Thông báo" />

                {/* body */}
                <ScrollView
                    style={[styles.flexFull, styles.pt15]}
                    showsVerticalScrollIndicator={false}
                    onScroll={handleScroll}
                    scrollEventThrottle={1600}
                >
                    {/* title */}
                    <View style={[styles.flexBetween, styles.mb24, styles.px15]}>
                        <Text style={[styles.fs27, styles.textWhite, styles.lh32, styles.fw300]}>
                            Thông báo
                        </Text>
                        {/* <Text onPress={() => handleClickAllNoti()} style={[styles.fs14, styles.textGray77]}>Đã đọc tất cả</Text> */}
                        <TouchableOpacity onPress={handleHideNotification}>
                            <Text style={[styles.fs14, styles.textGray77]}>Đã đọc tất cả</Text>
                        </TouchableOpacity>
                    </View>

                    {/* list notification */}
                    {loading ? (
                        <View style={{ paddingBottom: 100 }}>
                            {notifications.length != undefined && notifications.map((noti, index) => (
                                <TouchableOpacity
                                    key={noti.notify_id + Math.random()}
                                    style={[
                                        styles.bg161e,
                                        styles.px15,
                                        styles.py10,
                                        { marginBottom: index < notifications.length ? 12 : 0 },
                                    ]}
                                    onPress={() => handleClickOneNoti(noti)}
                                >
                                    <View style={[styles.flexBetween, styles.mb12]}>
                                        <MomentComponent
                                            timeString={noti.created_at}
                                            style={[
                                                styles.textGray77,
                                                styles.fs16,
                                                styles.lh24,
                                                styles.fw300,
                                            ]}
                                        />


                                        {!noti.isRead && noti.status == 0 && (
                                            <Text
                                                style={[
                                                    styles.bgRed,
                                                    styles.borderFull,
                                                    { width: 10, height: 10 },
                                                ]}
                                            ></Text>
                                        )}

                                    </View>
                                    <Text style={[styles.textWhite, styles.fs16, styles.lh24]}>
                                        {noti.content}
                                    </Text>
                                </TouchableOpacity>
                            ))}
                        </View>
                    ) : (
                        <View>
                            {waiting.map((val) => (
                                <View key={val?.id} style={[styles.card, { width: cardWidth + 80, marginBottom: 10 }]}>
                                    <View>
                                        <Skenleton height={16} width={cardWidth - 216} style={{ marginTop: 10, alignItems: 'flex-end' }} />
                                        <Skenleton height={16} width={cardWidth - 80} style={{ marginTop: 10, marginBottom: 10, alignItems: 'flex-end' }} />
                                    </View>
                                </View>
                            ))}
                        </View>
                    )}

                </ScrollView>
            </View>
        </SafeAreaView>
    );
};

export default Notification;
