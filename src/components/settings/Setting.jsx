import { View, Text, TouchableOpacity, ScrollView, Image } from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';

import styles from '../../styles';
import Header from '../header/Header';
import { fallbackImage } from '../../api/DataFetching';
import PersonalInfoItem from './PersonalInfoItem';
import { ChevronRightIcon } from 'react-native-heroicons/outline';

const Setting = () => {
    const navigation = useNavigation();
    const dataGender = [
        { id: 0, label: 'Nam' },
        { id: 1, label: 'Nữ' },
        { id: 2, label: 'Khác' },
    ];
    const apiName = 'Nguyen Van A';
    const apiBirthday = '2023-05-12';
    const apiLinkFb = 'mr.otthanh';
    const apiPhoneNumber = '0912345678';
    const apiMyCar = 'Volvo S90';
    const apiBankAccount = '1111222233334444';

    const [name, setName] = useState(apiName);
    const [dateOfBirth, setDateOfBirth] = useState(new Date(apiBirthday));
    const [linkFb, setLinkFb] = useState(apiLinkFb);
    const [phoneNumber, setPhoneNumber] = useState(apiPhoneNumber);
    const [myCar, setMyCar] = useState(apiMyCar);
    const [bankAccount, setBankAccount] = useState(apiBankAccount);

    console.log('name', name);
    console.log('linkFb', linkFb);
    console.log('bỉthday', dateOfBirth);
    console.log('phone', phoneNumber);
    console.log('apiBankAccount', apiBankAccount);

    const handleNameChange = (newValue) => {
        setName(newValue);
    };
    const handleDateChange = (newDate) => {
        setDateOfBirth(newDate);
    };
    const handleLinkFbChange = (newValue) => {
        setLinkFb(newValue);
    };
    const handlePhoneNumberChange = (newPhoneNumber) => {
        setPhoneNumber(newPhoneNumber);
    };
    const handleMyCarChange = (newValue) => {
        setMyCar(newValue);
    };
    const handleBankAccountChange = (newValue) => {
        setBankAccount(newValue);
    };

    return (
        <SafeAreaView style={[styles.flexFull, styles.relative]}>
            <View style={[styles.flexFull, styles.bgBlack]}>
                {/* header */}
                <Header navigation={navigation} title="Tài khoản" />

                {/* body */}
                <ScrollView showsVerticalScrollIndicator={false} style={[styles.flexFull]}>
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
                    <View style={[styles.flexCenter, styles.my24]}>
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

                    {/* list */}
                    <View>
                        {/* thông tin cá nhân */}
                        <View keyboardShouldPersistTaps="handled" style={[styles.mb24]}>
                            {/* title */}
                            <Text
                                style={[
                                    styles.fs16,
                                    styles.lh24,
                                    styles.textGray77,
                                    styles.uppercase,
                                    styles.px15,
                                    styles.mb10,
                                ]}
                            >
                                Thông tin cá nhân
                            </Text>
                            {/* Tên */}
                            <PersonalInfoItem
                                label="Tên"
                                type="text"
                                value={name}
                                onChangeText={handleNameChange}
                            />
                            {/* Ngày sinh */}
                            <PersonalInfoItem
                                label="Ngày sinh"
                                type="date"
                                value={dateOfBirth}
                                onDateChange={handleDateChange}
                            />
                            {/* Giới tính */}
                            <PersonalInfoItem label="Giới tính" type="dropdown" data={dataGender} />
                            {/* Xác minh danh tính */}
                            <PersonalInfoItem label="Xác minh danh tính" type="text" value="Chưa" />
                        </View>
                        {/* thông tin liên hệ */}
                        <View keyboardShouldPersistTaps="handled" style={[styles.mb24]}>
                            {/* title */}
                            <Text
                                style={[
                                    styles.fs16,
                                    styles.lh24,
                                    styles.textGray77,
                                    styles.uppercase,
                                    styles.px15,
                                    styles.mb10,
                                ]}
                            >
                                Thông tin liên hệ
                            </Text>
                            {/*  */}
                            {/* sô điện thoại */}
                            <PersonalInfoItem
                                label="Số điện thoại"
                                type="phoneNumber"
                                value={phoneNumber}
                                onValueChange={handlePhoneNumberChange}
                            />
                            {/* Liên kết fb */}
                            <PersonalInfoItem
                                label="Liên kết Facebook"
                                type="Url_Fb"
                                linkFb={linkFb}
                                value={linkFb}
                                onChangeText={handleLinkFbChange}
                                maxLength={20}
                            />
                        </View>
                        {/* tôi làm tài xế  */}
                        <View keyboardShouldPersistTaps="handled" style={[styles.mb24]}>
                            {/* title */}
                            <Text
                                style={[
                                    styles.fs16,
                                    styles.lh24,
                                    styles.textGray77,
                                    styles.uppercase,
                                    styles.px15,
                                    styles.mb10,
                                ]}
                            >
                                Tôi làm tài xế
                            </Text>
                            {/*  */}
                            <View>
                                {/* Xe của tôi */}
                                <PersonalInfoItem
                                    type={'myCar'}
                                    label={'Xe của tôi'}
                                    value={myCar}
                                    onChangeText={handleMyCarChange}
                                />
                                {/* Số tài khoản */}
                                <PersonalInfoItem
                                    type={'bankAccount'}
                                    label={'Số tài khoản'}
                                    value={bankAccount}
                                    onChangeText={handleBankAccountChange}
                                    maxLength={19}
                                />
                                {/* Tên ngân hàng */}
                                <PersonalInfoItem
                                    label="Tên ngân hàng"
                                    type="dropdown"
                                    data={dataGender}
                                />
                                {/* Tên tài khoản */}
                                <PersonalInfoItem
                                    label="Tên tài khoản"
                                    type="text"
                                    value={name}
                                    onChangeText={handleNameChange}
                                />
                                {/* item */}
                                <View
                                    style={[
                                        styles.bg161e,
                                        styles.px15,
                                        styles.py12,
                                        styles.flexBetween,
                                        styles.borderBot,
                                    ]}
                                >
                                    <Text
                                        style={[
                                            styles.textWhite,
                                            styles.fs16,
                                            styles.lh24,
                                            styles.fw300,
                                        ]}
                                    >
                                        Giới thiệu bạn bè
                                    </Text>
                                    <Text
                                        style={[
                                            styles.textWhite,
                                            styles.fs16,
                                            styles.lh24,
                                            styles.fw400,
                                        ]}
                                    >
                                        <ChevronRightIcon size={20} color={'white'} />
                                    </Text>
                                </View>
                            </View>
                        </View>
                    </View>
                </ScrollView>
            </View>
        </SafeAreaView>
    );
};

export default Setting;
