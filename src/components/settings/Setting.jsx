import { View, Text, TouchableOpacity, ScrollView, Image } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';

import styles from '../../styles';
import Header from '../header/Header';
import { fallbackImage } from '../../api/DataFetching';
import EditTextComponent from '../editTextSetting';
import EditDateOfBirth from '../editDateOfBirthSetting';
import PhoneNumberInput from '../editPhoneNumberSetting';
import PickerSelect from '../pickerSelect';
import SampleApp from '../pickerSelect/SampleApp';

const Setting = () => {
    const navigation = useNavigation();

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
                            {/*  */}
                            <View>
                                {/* tên */}
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
                                        Tên
                                    </Text>
                                    <EditTextComponent
                                        label={'Tên'}
                                        initialValue={'Nguyen Van A'}
                                        maxLength={20}
                                    />
                                </View>

                                {/* ngày sinh */}
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
                                        Ngày sinh
                                    </Text>
                                    <EditDateOfBirth
                                        label={'Ngày sinh'}
                                        initialValue={'2023-05-12'}
                                    />
                                </View>

                                {/* giới tính */}
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
                                        Giới tính
                                    </Text>
                                    {/* <Text
                                        style={[
                                            styles.textWhite,
                                            styles.fs16,
                                            styles.lh24,
                                            styles.fw400,
                                        ]}
                                    >
                                        Nguyễn Văn A
                                    </Text> */}
                                    {/* <SampleApp /> */}
                                </View>
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
                                        Xác minh danh tính
                                    </Text>
                                    <Text
                                        style={[
                                            styles.textWhite,
                                            styles.fs16,
                                            styles.lh24,
                                            styles.fw400,
                                        ]}
                                    >
                                        Nguyễn Văn A
                                    </Text>
                                </View>
                            </View>
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
                            <View>
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
                                        Số điện thoại
                                    </Text>
                                    <PhoneNumberInput label={'Sdt'} initialValue={'0912345678'} />
                                </View>
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
                                        Ngày sinh
                                    </Text>
                                    <Text
                                        style={[
                                            styles.textWhite,
                                            styles.fs16,
                                            styles.lh24,
                                            styles.fw400,
                                        ]}
                                    >
                                        Nguyễn Văn A
                                    </Text>
                                </View>
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
                                        Giới tính
                                    </Text>
                                    <Text
                                        style={[
                                            styles.textWhite,
                                            styles.fs16,
                                            styles.lh24,
                                            styles.fw400,
                                        ]}
                                    >
                                        Nguyễn Văn A
                                    </Text>
                                </View>
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
                                        Xác minh danh tính
                                    </Text>
                                    <Text
                                        style={[
                                            styles.textWhite,
                                            styles.fs16,
                                            styles.lh24,
                                            styles.fw400,
                                        ]}
                                    >
                                        Nguyễn Văn A
                                    </Text>
                                </View>
                            </View>
                        </View>
                        {/* tôi làm tài xế  */}
                        <View style={[styles.mb24]}>
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
                                        Tên
                                    </Text>
                                    <Text
                                        style={[
                                            styles.textWhite,
                                            styles.fs16,
                                            styles.lh24,
                                            styles.fw400,
                                        ]}
                                    >
                                        Nguyễn Văn A
                                    </Text>
                                </View>
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
                                        Ngày sinh
                                    </Text>
                                    <Text
                                        style={[
                                            styles.textWhite,
                                            styles.fs16,
                                            styles.lh24,
                                            styles.fw400,
                                        ]}
                                    >
                                        Nguyễn Văn A
                                    </Text>
                                </View>
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
                                        Giới tính
                                    </Text>
                                    <Text
                                        style={[
                                            styles.textWhite,
                                            styles.fs16,
                                            styles.lh24,
                                            styles.fw400,
                                        ]}
                                    >
                                        Nguyễn Văn A
                                    </Text>
                                </View>
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
                                        Xác minh danh tính
                                    </Text>
                                    <Text
                                        style={[
                                            styles.textWhite,
                                            styles.fs16,
                                            styles.lh24,
                                            styles.fw400,
                                        ]}
                                    >
                                        Nguyễn Văn A
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
