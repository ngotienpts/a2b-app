import { View, Text, TouchableOpacity, ScrollView, Image } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';

import styles from '../../styles';
import Header from '../header/Header';
import { fallbackImage } from '../../api/DataFetching';

const Setting = () => {
    const navigation = useNavigation();
    return (
        <SafeAreaView style={[styles.flexFull, styles.relative]}>
            <View style={[styles.flexFull, styles.bgBlack]}>
                {/* header */}
                <Header navigation={navigation} title="Tài khoản" />

                {/* body */}
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    style={[styles.flexFull, styles.pt15]}
                >
                    {/* top */}
                    <View style={[styles.bg161e, styles.px15, styles.py12]}>
                        <Text
                            style={[styles.fs16, styles.lh24, styles.textWhite, styles.textCenter]}
                        >
                            Điểm của bạn
                        </Text>
                        <View style={[styles.flexBaseLine, styles.justifyCenter, styles.my10]}>
                            <Text style={[styles.fs32, styles.textRedE8, styles.fw700]}>30</Text>
                            <Text style={[styles.fs18, styles.textRedE8, styles.fw700]}>k</Text>
                        </View>
                        <View style={[styles.flexBetween, styles.gap15]}>
                            <TouchableOpacity
                                style={[
                                    styles.flexFull,
                                    styles.border1,
                                    styles.borderColor777,
                                    styles.borderSolid,
                                    styles.border4,
                                    styles.h32,
                                    styles.flexCenter,
                                ]}
                            >
                                <Text
                                    style={[
                                        styles.fs16,
                                        styles.lh24,
                                        styles.textGray77,
                                        styles.fw400,
                                    ]}
                                >
                                    Lịch sử giao dịch
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[
                                    styles.flexFull,
                                    styles.border1,
                                    styles.borderColor777,
                                    styles.borderSolid,
                                    styles.border4,
                                    styles.h32,
                                    styles.flexCenter,
                                ]}
                            >
                                <Text
                                    style={[
                                        styles.fs16,
                                        styles.lh24,
                                        styles.textGray77,
                                        styles.fw400,
                                    ]}
                                >
                                    Nạp điểm
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                    {/* avatar */}
                    <View>
                        <Image
                            source={{
                                uri:
                                    'https://i.pinimg.com/236x/3b/a6/8d/3ba68dd05183a0233ea98974dd05a4d4.jpg' ||
                                    fallbackImage,
                            }}
                            style={[{ width: 114, height: 114 }, styles.borderFull]}
                            resizeMode="cover"
                        />
                    </View>
                </ScrollView>
            </View>
        </SafeAreaView>
    );
};

export default Setting;
