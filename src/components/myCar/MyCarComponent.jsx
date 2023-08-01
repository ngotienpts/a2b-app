import { View, Text, TouchableOpacity, ScrollView, Image, Dimensions } from 'react-native';
import React, { useState, useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';

import styles from '../../styles';
import Header from '../header/Header';
import { typeCar, licenseColor, bill, water } from '../../constants';
import PersonalInfoItem from '../settings/PersonalInfoItem';
import { bgCar } from '../../assets/images';
import { fallbackImage,fetchListMyCar } from '../../api/DataFetching';
import ChoseImage from '../settings/ChoseImage';

const MyCarComponent = () => {
    useEffect(() => {
        //Runs on every render
        showMyCar();
    },[]);
    var { width } = Dimensions.get('window');
    const navigation = useNavigation();
    const apiCarName = 'BMW X5';
    const apiCarModel = '2021';
    const apiLicensePlate = '30H-12345';
    const apiFreight = '7000';

    const [backgroundCar, setBackgroundCar] = useState(bgCar);
    const [carName, setCarName] = useState([]);
    const [carModel, setCarModel] = useState([]);
    const [licensePlate, setLicensePlate] = useState([]);
    const [freight, setFreight] = useState([]);
    const [loading, setloading] = useState(false);

    const handleCarNameChange = (newValue) => {
        setCarName(newValue);
    };
    const handleCarModelChange = (newValue) => {
        setCarModel(newValue);
    };
    const handleLicensePlateChange = (newValue) => {
        setLicensePlate(newValue);
    };
    const handleFreightChange = (newValue) => {
        setFreight(newValue);
    };
    const UpdateData = {
        vehicleName : carName,
    };
    const showMyCar = () => {
        fetchListMyCar('79ee7846612b106c445826c19')
        .then((data) => {
            if (data.res == 'success') {
                setCarName(data.result.vehicle_name)
                setCarModel(data.result.vehicle_life)
                setLicensePlate(data.result.license_plates)
                setFreight(data.result.price_per_km)
                // console.log(data.result);
            }
        })
        .finally(()=>setloading(true))
    }
    console.log(UpdateData.vehicleName);
    
    const updateMyCar = () => {
        fetchUpdateMycar(data,'79ee7846612b106c445826c19')
        .then((data) => {

        })
    }

    return (
        <SafeAreaView style={[styles.flexFull, styles.relative, styles.bgBlack]}>
            <View style={[styles.flexFull, styles.bgBlack]}>
                {/* header */}
                <Header navigation={navigation} title="Xe của tôi" />
                {loading && 
                /* body */
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
}
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
