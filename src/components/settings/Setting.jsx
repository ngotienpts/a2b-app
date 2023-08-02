import { View, Text, TouchableOpacity, ScrollView, Image, StatusBar, KeyboardAvoidingView } from 'react-native';
import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { ChevronRightIcon } from 'react-native-heroicons/outline';

import styles from '../../styles';
import Header from '../header/Header';
import { fallbackImage, fetchBankNameEndpoint, fetchSettingEndpoint } from '../../api/DataFetching';
import PersonalInfoItem from './PersonalInfoItem';
import NextPageSetting from './NextPageSetting';
import { dataGender } from '../../constants';
import ChoseImage from './ChoseImage';

const Setting = () => {
    const navigation = useNavigation();
    const apiName = 'Nguyen Van A';
    const apiBirthday = '2023-05-12';
    const apiLinkFb = 'mr.otthanh';
    const apiPhoneNumber = '0912345678';
    const apiMyCar = 'Volvo S90';
    const apiBankAccount = '1111222233334444';
    const apiBankName = 'Techcombank';
    const apiNameBankAccount = 'NGUYEN VAN A';
    const img = 'https://media.a2b.vn/user/2023/05/12/khanhhoang-093520.jpg';

    const [settingData, setSettingData] = useState([]);
    const [avatar, setAvatar] = useState(img);
    const [name, setName] = useState(apiName);
    const [dateOfBirth, setDateOfBirth] = useState(new Date(apiBirthday));
    const [linkFb, setLinkFb] = useState(apiLinkFb);
    const [phoneNumber, setPhoneNumber] = useState(apiPhoneNumber);
    const [bankAccount, setBankAccount] = useState(apiBankAccount);
    const [bankName, setBankName] = useState(apiBankName);
    const [nameBankAccount, setNameBankAccount] = useState(apiNameBankAccount);
    const [bankNameData, setBankNameData] = useState([]);

    const handleAvaterChange = (newValue) => {
        setAvatar(newValue);
    };
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
    const handleBankAccountChange = (newValue) => {
        setBankAccount(newValue);
    };
    const handleNameBankAccountChange = (newValue) => {
        setNameBankAccount(newValue);
    };
    //dang xuat
    const handleLogoutApp = async () => {
        const removeItem = await AsyncStorage.removeItem('token');
        if(removeItem){
            navigation.navigate('LoginScreen');
        }
    }

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await fetchSettingEndpoint();
                if (response && response.result) {
                    setSettingData(response.result);
                }
            } catch (error) {
                // Xử lý lỗi
                console.log(error);
            }
        }
        fetchData();
    }, []);

    useEffect(() => {
        // Gọi hàm để lấy dữ liệu từ endpoint
        async function fetchData() {
            try {
                const response = await fetchBankNameEndpoint(); // Gọi endpoint tại đây
                if (response && response.result) {
                    setBankNameData(response.result);
                }
            } catch (error) {
                // Xử lý lỗi
                console.log(error);
            }
        }
        fetchData();
    }, []);

    return (
        <SafeAreaView style={[styles.flexFull, styles.relative, styles.bgBlack]}>
            <StatusBar barStyle="light-content" animated={true} />
                <View style={[styles.flexFull, styles.bgBlack]}>
                    {/* header */}
                    <Header navigation={navigation} title="Tài khoản" />
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
                            <ChoseImage
                                avatar={avatar}
                                width={114}
                                height={114}
                                aspect={[1, 1]}
                                borderFull={styles.borderFull}
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
                                <PersonalInfoItem
                                    label="Giới tính"
                                    type="dropdown"
                                    data={dataGender}
                                    selectedName={'Nam'}
                                />
                                {/* Xác minh danh tính */}
                                <NextPageSetting
                                    onPress={() => navigation.navigate('VerificationScreen')}
                                    title={'Xác minh danh tính'}
                                    value={'Chưa'}
                                />
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
                                    <NextPageSetting
                                        onPress={() => navigation.navigate('MyCarScreen')}
                                        title={'Xe của tôi'}
                                        value={'Volvo S90'}
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
                                        data={bankNameData}
                                        selectedName={bankName}
                                    />
                                    {/* Tên tài khoản */}
                                    <PersonalInfoItem
                                        label="Tên tài khoản"
                                        type="text"
                                        value={nameBankAccount}
                                        onChangeText={handleNameBankAccountChange}
                                    />
                                    {/* Giới thiệu cho bạn bè */}
                                    <NextPageSetting
                                        onPress={() => navigation.navigate('ShareScreen')}
                                        title={'Giới thiệu bạn bè'}
                                        value={<ChevronRightIcon size={20} color={'white'} />}
                                    />
                                </View>
                            </View>
                        </View>

                        {/* log out */}
                        <TouchableOpacity onPress={handleLogoutApp} style={[styles.flexCenter, styles.mb24]}>
                            <View>
                                <Text style={[styles.fs16, styles.textCenter, styles.textRedE8]}>
                                    Đăng xuất
                                </Text>
                                <View
                                    style={[
                                        styles.borderColorRedE8,
                                        styles.mt5,
                                        { borderBottomWidth: 1 },
                                    ]}
                                />
                            </View>
                        </TouchableOpacity>
                    </ScrollView>
                    {/* body */}
                    
                </View>
        </SafeAreaView>
    );
};

export default Setting;
