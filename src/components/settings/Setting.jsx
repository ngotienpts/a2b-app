import { View, Text, TouchableOpacity, ScrollView, Image, Alert, StatusBar, KeyboardAvoidingView } from 'react-native';
import React, { useCallback, useContext, useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { ChevronRightIcon } from 'react-native-heroicons/outline';

import styles from '../../styles';
import Header from '../header/Header';
import { fallbackImage, fetchBankNameEndpoint, fetchSettingEndpoint, fetchGetUserProfile, fetchUpdateProfile } from '../../api/DataFetching';
import PersonalInfoItem from './PersonalInfoItem';
import NextPageSetting from './NextPageSetting';
import { dataGender } from '../../constants';
import ChoseImage from './ChoseImage';
import { TokenContext } from '../../redux/tokenContext';
import LoadingSetting from './LoadingSetting';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Platform } from 'react-native';

const Setting = () => {
    const navigation = useNavigation();
    const regex = /\d/;
    const base64Regex = /^data:image\/jpeg;base64/;

    const [avatar, setAvatar] = useState('');
    const [name, setName] = useState('');
    const [dateOfBirth, setDateOfBirth] = useState(null);
    const [gender, setGender] = useState('');
    const [identity, setIdentity] = useState('')
    const [phoneNumber, setPhoneNumber] = useState('');
    const [linkFb, setLinkFb] = useState('');
    const [carName, setCarName] = useState('');
    const [bankAccount, setBankAccount] = useState('');
    const [bankName, setBankName] = useState('');
    const [nameBankAccount, setNameBankAccount] = useState('');
    const [bankNameData, setBankNameData] = useState([]);
    const [userProfile, setUserProfile] = useState({});
    const [loading, setloading] = useState(true)
    const contextToken = useContext(TokenContext);

    const handleAvaterChange = (newValue) => {
        setAvatar(newValue);
    };
    const handleNameChange = useCallback((newValue) => {
        setName(newValue);
    }, []);
    const handleDateChange = useCallback((newDate) => {
        setDateOfBirth(newDate);
    }, []);
    const handleGenderChange = useCallback((newValue) => {
        setGender(newValue);
    }, []);
    const handleIdentityChange = useCallback((newValue) => {
        setIdentity(newValue);
    }, []);
    const handlePhoneNumberChange = useCallback((newPhoneNumber) => {
        setPhoneNumber(newPhoneNumber);
    }, []);
    const handleLinkFbChange = useCallback((newValue) => {
        setLinkFb(newValue);
    }, []);
    const handleBankAccountChange = useCallback((newValue) => {
        setBankAccount(newValue);
    }, []);
    const handleBankNameChange = useCallback((newValue) => {
        setBankName(newValue);
    }, []);
    const handleNameBankAccountChange = useCallback((newValue) => {
        setNameBankAccount(newValue);
    }, []);

    useEffect(() => {
        setAvatar(userProfile?.image);
        setName(userProfile?.fullname);
        setDateOfBirth(userProfile?.birthday);
        setGender(userProfile?.sex);
        setIdentity(userProfile?.is_confirmed);
        setPhoneNumber(userProfile?.phone);
        setLinkFb(userProfile?.link_fb);
        setCarName(userProfile?.vehicle_name);
        setBankAccount(userProfile?.bank_number);
        setBankName(userProfile?.bank_name);
        setNameBankAccount(userProfile?.bank_account);
    }, [userProfile])

    useEffect(() => {
        getUserProfile();
        getListBank();
    }, [])
    
    const getListBank = () => {
        fetchBankNameEndpoint()
            .then((data) => {
                if (data.res == 'success') {
                    setBankNameData(data.result);
                }
            })
            .catch(error => {
                console.error("Error:", error);
            })
            .finally(() => setloading(false))
    }

    const getUserProfile = () => {
        fetchGetUserProfile(contextToken.token)
        .then((data) => {
            if(data.res == 'success'){
                setUserProfile(data.result);
            }
        })
        .finally(() => setloading(false))
    }

    const updateProfile = () => {
        fetchUpdateProfile({
            image: base64Regex.test(avatar) ? avatar : '',
            fullName: name,
            birthday: typeof dateOfBirth == 'object' ? dateOfBirth.toISOString().slice(0, 10) : '',
            sex: gender,
            phone: phoneNumber.replace('84', '0'),
            link_fb: linkFb,
            bank_number: bankAccount.replace(/-/g, ''),
            bank_id: regex.test(bankName) ? bankName : '',
            bank_name: nameBankAccount,
        },contextToken.token)
        .then((data) => {
            if(data.res === 'success'){
                console.log(data);
                Alert.alert('Thành công', 'Cập nhật thành công!', [{ text: 'OK' }])
                // navigation.navigate('DriverScreen');
            }
            else{
                alert(data.status.fullname || data.status.birthday || data.status.phone || data.status.bankId || data.status.bankName || data.status.bankNumber || data.status.image)
            }
        })
        .finally(() => setloading(false))
    }

    const handleLogout = async () => {
        contextToken.setToken({});
        navigation.navigate('Login');
    }

    return (
        <SafeAreaView style={[styles.flexFull, styles.relative, styles.bgBlack]}>
            <KeyboardAwareScrollView 
                contentContainerStyle={styles.flexFull}
                style={[styles.flexFull]} 
            >
                <StatusBar barStyle="light-content" animated={true} />
                <View style={[styles.flexFull, styles.bgBlack]}>
                    {/* header */}
                    <Header navigation={navigation} title="Tài khoản" />
                    {loading ? (
                        <LoadingSetting />
                    ) : (
                        /* body */
                        <ScrollView showsVerticalScrollIndicator={false} style={[styles.flexFull]}>
                            {/* top */}
                            <View style={[styles.bg161e, styles.px15, styles.py12]}>
                                <Text
                                    style={[styles.fs16, styles.lh24, styles.textWhite, styles.textCenter]}
                                >
                                    Điểm của bạn
                                </Text>
                                <View style={[styles.flexBaseLine, styles.justifyCenter, styles.my10]}>
                                    <Text style={[styles.fs32, styles.textRedE8, styles.fw700]}>{userProfile?.coin}</Text>
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
                                        onPress={() => navigation.navigate('DiaryScreen',{data:2})}
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
                                        onPress={() => navigation.navigate('AddCoinScreen')}
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
                                    onChangeImage={handleAvaterChange}
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
                                        selectedName={gender == 0 ? 'Nam' : 'Nữ'}
                                        onChangeDropdown={handleGenderChange}
                                    />
                                    {/* Xác minh danh tính */}
                                    <NextPageSetting
                                        onPress={() => navigation.navigate('VerificationScreen')}
                                        title={'Xác minh danh tính'}
                                        value={identity == 0 ? 'Chưa xác thực' : 'Đang xác thực'}
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
                                        value={phoneNumber ? phoneNumber.replace('84', 0) : phoneNumber}
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
                                            value={carName}
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
                                            type="dropdownBankData"
                                            data={bankNameData}
                                            selectedName={bankName}
                                            onChangeDropdown={handleBankNameChange}
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
                            
                            <KeyboardAvoidingView>
                                <View>
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
                                        onPress={updateProfile}
                                    >
                                        <Text style={[styles.fs16, styles.textWhite]}>Cập nhật</Text>
                                    </TouchableOpacity>
                                    {/* log out */}
                                    <TouchableOpacity onPress={handleLogout} style={[styles.flexCenter, styles.mb24]}>
                                        <View style={[styles.my24]}>
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
                                </View>
                            </KeyboardAvoidingView>

                        </ScrollView>

                    )}


                </View>
            </KeyboardAwareScrollView>
        </SafeAreaView>
    );
};

export default Setting;