import { View, Text, TouchableOpacity, ScrollView, StatusBar } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';

import styles from '../../styles';
import Header from '../header';
import { notifications } from '../../constants';
import MomentComponent from '../moment';
import { useNotification } from '../../redux/notificationContext';

const Notification = () => {
    const { handleHiddenNoti } = useNotification();
    const navigation = useNavigation();

    // Xử lý khi thông báo được ẩn
    const handleHideNotification = () => {
        handleHiddenNoti();
    };
    return (
        <SafeAreaView style={[styles.flexFull, styles.relative, styles.bgBlack]}>
            <StatusBar barStyle="light-content" animated={true} />
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
                        <TouchableOpacity onPress={handleHideNotification}>
                            <Text style={[styles.fs14, styles.textGray77]}>Đã đọc tất cả</Text>
                        </TouchableOpacity>
                    </View>

                    {/* list notification */}
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
                                onPress={() => navigation.navigate(noti.screen)}
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

                                    {noti.status == 1 && (
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
                </ScrollView>
            </View>
        </SafeAreaView>
    );
};

export default Notification;
