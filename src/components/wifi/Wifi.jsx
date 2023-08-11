import { View, Text, TouchableOpacity, ScrollView, Image, Dimensions, Alert } from 'react-native';
import React, { useState, useEffect, useCallback } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';

import styles from '../../styles';
import Header from '../header/Header';
import PersonalInfoItem from '../settings/PersonalInfoItem';
import { fallbackImage, fetchListMyCar, fetchGetOneCategoryVehicle, fetchListCategoryVehicle, fetchUpdateWifi } from '../../api/DataFetching';

const Wifi = () => {

  var { width } = Dimensions.get('window');
  const navigation = useNavigation();

  const [ListMyCar, setListMyCar] = useState([]);
  const [wifiName, setWifiName] = useState(null);
  const [wifiPass, setWifiPass] = useState(null);
  const [loading, setloading] = useState(true);

  const HandleWifiNameChange = useCallback((newValue) => {
    setWifiName(newValue);
  }, []);
  const handleWifiPassChange = useCallback((newValue) => {
    setWifiPass(newValue);
  }, []);

  useEffect(() => {
    showMyCar();
  }, []);

  useEffect(() => {
    setWifiName(ListMyCar?.name_wifi)
    setWifiPass(ListMyCar?.pass_wifi);
  }, [ListMyCar])

  const showMyCar = () => {
    fetchListMyCar('79ee7846612b106c445826c19')
      .then((data) => {
        if (data.res == 'success') {
          setListMyCar(data.result)
        }
      })
      .finally(() => setloading(false))
  }

  const updateWifi = () => {
    fetchUpdateWifi({
      name: wifiName  ? wifiName : '',
      pass: wifiPass  ? wifiPass : '',
    }, '79ee7846612b106c445826c19')
      .then((data) => {
        if (data.res === 'success') {
          console.log(data);
          Alert.alert('Thành công', 'Cập nhật Wifi thành công!', [{ text: 'OK' }])
        }
      })
      .finally(() => setloading(false))
    // console.log(CarType == 0 ? ListMyCar?.vehicle_category_id : CarType);
  }
  // console.log('1'+ new Date('2023-05-12'));

  return (
    <SafeAreaView style={[styles.flexFull, styles.relative, styles.bgBlack]}>
      <View style={[styles.flexFull, styles.bgBlack]}>
        {/* header */}
        <Header navigation={navigation} title="Wifi miễn phí" />
        {loading ? (<Text>Đang lấy dữ liệu...</Text>) : (
          /* body */
          <ScrollView showsVerticalScrollIndicator={false} style={[styles.flexFull]}>
            {/* list */}
            <View>
              {/* thông tin cá nhân */}
              <View keyboardShouldPersistTaps="handled" style={[styles.mb24]}>
                {/* Tên */}
                <PersonalInfoItem
                  label="Tên Wifi"
                  type="text"
                  value={wifiName}
                  onChangeText={HandleWifiNameChange}
                />
                <PersonalInfoItem
                  label="Mật khẩu"
                  type="text"
                  value={wifiPass}
                  onChangeText={handleWifiPassChange}
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
        onPress={updateWifi}
        >
          <Text style={[styles.fs16, styles.textWhite]}>Cập nhật</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Wifi;
