import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import React, { useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { MagnifyingGlassIcon, XMarkIcon } from 'react-native-heroicons/outline';
import * as Location from 'expo-location';
import styles from '../../styles';
import Header from './Header';
import Result from './Result';
import ResultDefault from './ResultDefault';
import { searchData } from '../../constants';
import { debounce } from 'lodash';
import { fetchProfileUser, fetchSearchEndpoint } from '../../api/DataFetching';
import { TokenContext } from '../../redux/tokenContext';

const Home = () => {
  const navigation = useNavigation();
  const [results, setResults] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [coordinates, setCoordinates] = useState({lat: 21.9933774, lng: 103.8082981});
  const [name, setName] = useState('');
  const [hasProfile, setHasProfile] = useState(false);
  const context = useContext(TokenContext);
  useEffect(() => {
    // console.log('token123',context.token)
    if(!hasProfile){
      showProfile();
      setHasProfile(true);
    }
  },[]) // dependences: 1 trong cac biến trong mang thay doi thi se thực thi lại useEffect

  useEffect(() => {
    requestLocationService();
    console.log(coordinates);
  },[coordinates])



  const requestLocationService = async () => {
    try {
      if (Platform.OS == 'android') {
        const result = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION, {
          title: 'Bật định vị',
          message: 'Chúng tôi có thể bật định vị không?',
          buttonNeutral: 'Hỏi lại sau',
          buttonNegative: 'Hủy',
          buttonPositive: 'Đồng ý',
        })
        if (result === 'granted') {
          console.log('Đã bật GPS');
        } else {
          console.log('You cannot use Geolocation');
          return false;
        }
      } else if (Platform.OS == 'macos' || Platform.OS == 'ios') {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          console.log('Bạn chưa bật GPS');
        }else{
          console.log('Bạn đã bật GPS');
        }
      }
      let { coords } = await Location.getCurrentPositionAsync({});
      setCoordinates({lat: coords.latitude,lng: coords.longitude})
    } catch (error) {
      return false;
    }
  }


  const showProfile = () => {
    fetchProfileUser(context.token)
    .then((data) => {
      if(data.res == 'success'){
        setName(data.result.fullname)
      }
    })
  }

  const handleSearch = (payload) => {

    if (payload && payload.length > 0) {
      console.log('kinh độ', coordinates.lat);
      console.log('vĩ độ', coordinates.lng);
      console.log(fetchSearchEndpoint({
        keyword: payload,
        lat: coordinates.lat,
        lng: coordinates.lng,
      },1));
      // fetchSearchEndpoint({
      //   keyword: payload,
      //   lat: latitude,
      //   lng: longitude,
      // },1).then((data) => {
      //   // console.log(data);
      //   if (data && data.result) setResults(data.result);
      // });
    } else {
      setResults([]);
    }
  };

  const handleSearchDebounce = useCallback(debounce(handleSearch, 300), []); 
  //debounce la sẽ tạo ra 1 phiên bản mới của hàm và ham co kha nang tri hoan việc thực thi và sẽ thực thi sau độ trễ đã xác định.
  //Trong TH nếu có thêm 1 hàm được gọi thì cái trước sẽ bị hủy và hàm mới sẽ chạy 

  const handleClearInput = () => {
    setInputValue('');
  };
  return (
    <SafeAreaView style={[styles.flexFull, styles.relative]}>
      <View style={[styles.flexFull, styles.bgBlack]}>
        {/* header */}
        <Header navigation={navigation} />

        {/* body */}
        <View style={[styles.px15, styles.flexFull]}>
          <Text style={[styles.textWhite, styles.fs16, styles.lh24, styles.mb12]}>
            Xin chào, {name}
          </Text>
          <Text style={[styles.textWhite, styles.fs27, styles.lh40, styles.fw300, styles.mb10]}>
            Bạn cần đi đâu?
          </Text>

          {/* search */}
          <View
            style={[
              styles.relative,
              styles.bg161e,
              styles.h48,
              styles.flexRow,
              styles.itemsCenter,
              styles.mb24,
            ]}
          >
            <TextInput
              onChangeText={(text) => {
                setInputValue(text);
                handleSearchDebounce(text);
              }}
              value={inputValue}
              style={[styles.fs16, styles.textWhite, styles.pl24, styles.pr50]}
              placeholder="Tìm kiếm"
              placeholderTextColor={'white'}
            />
            <View style={[styles.absolute, styles.r0, styles.p12, styles.bg161e]}>
              {inputValue.length > 0 ? (
                <TouchableOpacity onPress={handleClearInput}>
                  <XMarkIcon size={24} color={'white'} />
                </TouchableOpacity>
              ) : (
                <MagnifyingGlassIcon size={24} color={'white'} />
              )}
            </View>
          </View>

          {/* result */}
          {inputValue.length > 0 ? (
            <Result results={results} navigation={navigation} />
          ) : (
            <ResultDefault data={searchData} navigation={navigation} />
          )}
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Home;
