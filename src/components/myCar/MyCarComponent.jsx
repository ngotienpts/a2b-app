import {
    View,
    Text,
    TouchableOpacity,
    ScrollView,
    Image,
    Dimensions,
    StatusBar,
} from 'react-native';
import React, { useCallback, useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, useRoute } from '@react-navigation/native';

import styles from '../../styles';
import Header from '../header/Header';
import { typeCar, licenseColor, bill, water } from '../../constants';
import PersonalInfoItem from '../settings/PersonalInfoItem';
import { bgCar } from '../../assets/images';
import { fallbackImage, fetchMyCarEndpoint } from '../../api/DataFetching';
import ChoseImage from '../settings/ChoseImage';

const MyCarComponent = () => {
    const [infoMyCar, setInfoMyCar] = useState({});
    var { width } = Dimensions.get('window');
    const navigation = useNavigation();
    const { params: item } = useRoute();

    const [carName, setCarName] = useState(null);
    const [carModel, setCarModel] = useState(null);
    const [licensePlate, setLicensePlate] = useState(null);
    const [freight, setFreight] = useState(null);

    useEffect(() => {
        setCarName(infoMyCar?.vehicle_name);
        setCarModel(infoMyCar?.vehicle_life);
        setLicensePlate(infoMyCar?.license_plates);
        setFreight(infoMyCar?.price_per_km);
    }, [infoMyCar]);

    const handleCarNameChange = useCallback((newValue) => {
        setCarName(newValue);
    }, []);
    const handleCarModelChange = useCallback((newValue) => {
        setCarModel(newValue);
    }, []);
    const handleLicensePlateChange = useCallback((newValue) => {
        setLicensePlate(newValue);
    }, []);
    const handleFreightChange = useCallback((newValue) => {
        setFreight(newValue);
    }, []);

    const getMyCarApi = async (id) => {
        const data = await fetchMyCarEndpoint(id);
        if (data && data.result) setInfoMyCar(data.result);
    };
    useEffect(() => {
        getMyCarApi(item.id);
    }, [item]);

    return (
        <SafeAreaView style={[styles.flexFull, styles.relative, styles.bgBlack]}>
            <StatusBar barStyle="light-content" animated={true} />
            <View style={[styles.flexFull, styles.bgBlack]}>
                {/* header */}
                <Header navigation={navigation} title="Xe của tôi" />

                {/* body */}
                <ScrollView showsVerticalScrollIndicator={false} style={[styles.flexFull]}>
                    {/* image */}
                    <View style={[styles.flexCenter]}>
                        {/* <Image
                            source={{ uri: fallbackImage }}
                            style={[{ width: width, height: width / 2 }]}
                            resizeMode="cover"
                        /> */}
                        <ChoseImage
                            avatar={fallbackImage}
                            width={width}
                            height={width / 2}
                            aspect={[2, 1]}
                        />
                    </View>

                    {/* list */}
                    <View>
                        {/* thông tin cá nhân */}
                        <View keyboardShouldPersistTaps="handled" style={[styles.mb24]}>
                            {/* Tên */}
                            <PersonalInfoItem
                                label="Dòng xe"
                                type="text"
                                value={carName}
                                onChangeText={handleCarNameChange}
                            />
                            {/* Đời xe */}
                            <PersonalInfoItem
                                label="Đời xe"
                                type="number"
                                value={carModel}
                                maxLength={4}
                                onChangeText={handleCarModelChange}
                            />

                            {/* Loại xe */}
                            <PersonalInfoItem
                                label="Loại hình xe"
                                type="dropdown"
                                data={typeCar}
                                selectedName={'SUV'}
                            />

                            {/* Biển số xe */}
                            <PersonalInfoItem
                                label="Biển số xe"
                                type="license"
                                value={licensePlate}
                                onChangeText={handleLicensePlateChange}
                                maxLength={9}
                            />

                            {/* Màu biển */}
                            <PersonalInfoItem
                                label="Màu biển"
                                type="dropdown"
                                data={licenseColor}
                                selectedName={'Vàng'}
                            />

                            {/* Xuất hóa đơn */}
                            <PersonalInfoItem
                                label="Xuất hóa đơn"
                                type="dropdown"
                                data={bill}
                                selectedName={'Không'}
                            />

                            {/* Nước uống */}
                            <PersonalInfoItem
                                label="Nước uống đóng chai miễn phí"
                                type="dropdown"
                                data={water}
                                selectedName={'Có'}
                            />

                            {/* Cước */}
                            <PersonalInfoItem
                                label="Cước phí /1km"
                                type="number"
                                value={freight}
                                pay
                                suffixes="VND"
                                maxLength={10}
                                onChangeText={handleFreightChange}
                            />
                        </View>
                    </View>
                </ScrollView>
            </View>
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
                    onPress={() => navigation.navigate('DriverScreen')}
                >
                    <Text style={[styles.fs16, styles.textWhite]}>Tìm khách</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

export default MyCarComponent;
