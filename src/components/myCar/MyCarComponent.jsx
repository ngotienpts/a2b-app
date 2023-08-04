import { View, Text, TouchableOpacity, ScrollView, Image, Dimensions } from 'react-native';
import React, { useState, useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';

import styles from '../../styles';
import Header from '../header/Header';
import { typeCar, licenseColor, bill, water } from '../../constants';
import PersonalInfoItem from '../settings/PersonalInfoItem';
import { bgCar } from '../../assets/images';
import { fallbackImage, fetchListMyCar, fetchGetOneCategoryVehicle, fetchListCategoryVehicle, fetchUpdateMycar } from '../../api/DataFetching';
import ChoseImage from '../settings/ChoseImage';

const MyCarComponent = () => {
    useEffect(() => {
        showMyCar();
        ListCategoryVehicle();
    }, []);
    
    var { width } = Dimensions.get('window');
    const navigation = useNavigation();
    const apiCarName = 'BMW X5';
    const apiCarModel = '2021';
    const apiLicensePlate = '30H-12345';
    const apiFreight = '7000';
    
    const [ListMyCar, setListMyCar] = useState([]);
    const [backgroundCar, setBackgroundCar] = useState(bgCar);
    const [CarName, setCarName] = useState([]);  
    const [CarModel, setCarModel] = useState('');
    const [CarType, setCarType] = useState('');
    const [LicensePlate, setLicensePlate] = useState([]);
    const [LicensePlateColor, setLicensePlateColor] = useState([]);
    const [Bill, setBill] = useState([]);
    const [Bottle, setBottle] = useState([]);
    const [Freight, setFreight] = useState([]);
    const [CateVehicle, setCateVehicle] = useState([]);
    const [loading, setloading] = useState(true);

    const handleCarNameChange = (newValue) => {
        setCarName(newValue);
    };
    const handleCarModelChange = (newValue) => {
        setCarModel(newValue);
        console.log('val', newValue);
    };
    const handleCarTypeChange = (newValue) => {
        setCarType(newValue);
    };
    const handleLicensePlateChange = (newValue) => {
        setLicensePlate(newValue);
    };
    const handleLicensePlateColorChange = (newValue) => {
        setLicensePlateColor(newValue);
    };
    const handleBillChange = (newValue) => {
        setBill(newValue);
    };
    const handleBottleChange = (newValue) => {
        setBottle(newValue);
    };
    const handleFreightChange = (newValue) => {
        setFreight(newValue);
    };
    
    
    const showMyCar = () => {
        fetchListMyCar('79ee7846612b106c445826c19')
            .then((data) => {
                if (data.res == 'success') {
                    setListMyCar(data.result)
                }
            })
            .finally(() => setloading(false))
        // finally {
        //     setloading(false);
        // }
    }

    // const GetOneCategoryVehicle = (vehicle_category_id) => {
    //     fetchGetOneCategoryVehicle('79ee7846612b106c445826c19', { vehicle_category_id: vehicle_category_id })
    //         .then((data) => {
    //             if (data.res == 'success') {
    //                 setCarType(data.result.category_name)
    //             }
    //         })
    //         .finally(() => setloading(false))
    // }

    const ListCategoryVehicle = () => {
        // try {
        fetchListCategoryVehicle('79ee7846612b106c445826c19')
            .then((data) => {
                if (data.res == 'success') {
                    setCateVehicle(data.result)
                    // setloading(false);
                }
            })
            .finally(() => setloading(false))
        // } catch (error) {
        //     console.error('Error fetching data:', error);
        // } finally {
        //     setloading(false);
        // }
    }


    const updateMyCar = () => {
        fetchUpdateMycar({
            vehicleName : CarName == 0 ? ListMyCar?.vehicle_name : CarName,
            vehicleLife : CarModel == 0 ? ListMyCar?.vehicle_life : CarModel,
            vehicleCategory : CarType == 0 ? ListMyCar?.vehicle_category_id : CarType,
            licensePlates : LicensePlate == 0 ? ListMyCar?.license_plates : LicensePlate,
            platesColor : LicensePlateColor == 0 ? ListMyCar?.license_plates_color : LicensePlateColor,
            pricePerKm : Freight == 0 ? ListMyCar?.price_per_km : Freight,
            isBottle : Bottle == 0 ? ListMyCar?.is_bottle : Bottle,
        },'79ee7846612b106c445826c19')
        .then((data) => {
            if(data.res === 'success'){
                // navigation.navigate('DriverScreen');
                console.log(data);
            }
        })
        // console.log(CarType == 0 ? ListMyCar?.vehicle_category_id : CarType);
    }
    // console.log(CarModel);
 
    return (
        <SafeAreaView style={[styles.flexFull, styles.relative, styles.bgBlack]}>
            <View style={[styles.flexFull, styles.bgBlack]}>
                {/* header */}
                <Header navigation={navigation} title="Xe của tôi" />
                {loading ? (<Text>Đang lấy dữ liệu...</Text>) : (
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
                                    value={ListMyCar?.vehicle_name}
                                    onChangeText={handleCarNameChange}
                                />
                                {/* Đời xe */}
                                <PersonalInfoItem
                                    label="Đời xe"
                                    type="number"
                                    value={ListMyCar?.vehicle_life}
                                    maxLength={4}
                                    onChangeText={handleCarModelChange}
                                />

                                {/* Loại xe */}
                                <PersonalInfoItem
                                    label="Loại hình xe"
                                    type="dropdown1"
                                    data={CateVehicle}
                                    selectedName={ListMyCar?.vehicle_category_id == 1 ? 'Xe Sedan' : 'Xe SUV'}
                                    onChangeDropdown={handleCarTypeChange}
                                />

                                {/* Biển số xe */}
                                <PersonalInfoItem
                                    label="Biển số xe"
                                    type="license"
                                    value={ListMyCar?.license_plates}
                                    onChangeText={handleLicensePlateChange}
                                    maxLength={9}
                                />

                                {/* Màu biển */}
                                <PersonalInfoItem
                                    label="Màu biển"
                                    type="dropdown"
                                    data={licenseColor}
                                    selectedName={ListMyCar?.license_plates_color == 0 ? 'Trắng' : 'Vàng'}
                                    onChangeDropdown={handleLicensePlateColorChange}
                                />

                                {/* Xuất hóa đơn */}
                                <PersonalInfoItem
                                    label="Xuất hóa đơn"
                                    type="dropdown"
                                    data={bill}
                                    selectedName={ListMyCar?.is_bill == 0 ? 'Không' : 'Có'}
                                    onChangeDropdown={handleBillChange}
                                />

                                {/* Nước uống */}
                                <PersonalInfoItem
                                    label="Nước uống đóng chai miễn phí"
                                    type="dropdown"
                                    data={water}
                                    selectedName={ListMyCar?.is_bottle == 0 ? 'Không' : 'Có'}
                                    onChangeDropdown={handleBottleChange}
                                />

                                {/* Cước */}
                                <PersonalInfoItem
                                    label="Cước phí /1km"
                                    type="number"
                                    value={ListMyCar?.price_per_km}
                                    pay
                                    suffixes="VND"
                                    maxLength={10}
                                    onChangeText={handleFreightChange}
                                />
                            </View>
                        </View>
                    </ScrollView>
                )}
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
                    onPress={updateMyCar}
                    // onPress={() => navigation.navigate('DriverScreen')}
                >
                    <Text style={[styles.fs16, styles.textWhite]}>Tìm khách</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

export default MyCarComponent;
