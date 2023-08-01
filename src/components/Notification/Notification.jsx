import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useIsFocused, useNavigation } from '@react-navigation/native';

import styles from '../../styles';
import Header from '../header';
import MomentComponent from '../moment';
import { fetchListNoti, fetchReadAllNoti } from '../../api/DataFetching';
import { TokenContext } from '../../redux/tokenContext';

const Notification = () => {
    const navigation = useNavigation();
    const context = useContext(TokenContext);
    const [notifications, setNotifications] = useState({});
    // const prevNoti = useRef(null);
    const [isUnmounted, setIsUnmounted] = useState(false);
    const [dot, setDot] = useState(true);
    const isFocused = useIsFocused();
    const [loading, setLoading] = useState(false);

    // useEffect này chỉ chạy một lần khi component mount
    useEffect(() => {
        listNotification();
    }, []);

    // useEffect(() => {
    //     if (!isFocused) {
    //       // Màn hình bị blur, thực hiện unmount
    //       setIsUnmounted(true);
    //     } else {
    //       // Màn hình được focus lại, không cần unmount
    //       setIsUnmounted(false);
    //     }
    //   }, [isFocused]);
    
    // useEffect(() => {
    // // Gọi API hoặc các tác vụ khác tại đây khi màn hình được render
    // // console.log(isUnmounted);
    // // Hãy chắc chắn kiểm tra isUnmounted trước khi thực hiện bất kỳ công việc nào tại đây
    //     if (!isUnmounted) {
    //         // Gọi API hoặc tác vụ khác...
    //         listNotification();

    //     }
    // }, [isUnmounted]);   
    
    const listNotification = () => {
        fetchListNoti(context.token)
        .then((data) => {
            if (data.res === 'success') {
                // console.log('Fetched notifications:', data.result);
                setNotifications(data.result);
            }
        })
        .catch((err) => {
            console.log(err);
        })
        .finally(() => {
            setLoading(true);
            // console.log('render');
        });
    };

    const handleClickAllNoti = () => {
        fetchReadAllNoti(context.token)
        .then((data) => {
            if(data.res === 'success') {
                setDot(false);
            }
        })
    }

    return (
        <SafeAreaView style={[styles.flexFull, styles.relative]}>
            <View style={[styles.flexFull, styles.bgBlack]}>
                {/* header */}
                <Header navigation={navigation} title="Thông báo" />

                {/* body */}
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    style={[styles.flexFull, styles.pt15]}
                >
                    {/* title */}
                    <View style={[styles.flexBetween, styles.mb24, styles.px15]}>
                        <Text style={[styles.fs27, styles.textWhite, styles.lh32, styles.fw300]}>
                            Thông báo
                        </Text>
                        <Text onPress={() => handleClickAllNoti()} style={[styles.fs14, styles.textGray77]}>Đã đọc tất cả</Text>
                    </View>

                    {/* list notification */}
                    {loading &&
                    <View style={{ paddingBottom: 100 }}>
                        {notifications.map((noti, index) => (
                            <TouchableOpacity
                                key={noti.notify_id}
                                style={[
                                    styles.bg161e,
                                    styles.px15,
                                    styles.py10,
                                    { marginBottom: index < notifications.length ? 12 : 0 },
                                ]}
                                onPress={() => navigation.navigate('UserScreen')}
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

                                    {noti.status == 0 && dot && (
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
                    }
                    
                </ScrollView>
            </View>
        </SafeAreaView>
    );
};

export default Notification;
