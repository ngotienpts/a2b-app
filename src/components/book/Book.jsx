import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import React, { useContext, useEffect, useId, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, useRoute } from '@react-navigation/native';
import { StopCircleIcon, MapPinIcon } from 'react-native-heroicons/solid';
import styles from '../../styles';
import Header from '../header/Header';
import Location from './Location';
import BookSelectes from './BookSelectes';
import { BookingFormContext } from '../../redux/bookingFormContext';
import { fetchCreateOneTrip, fetchStartGPS } from '../../api/DataFetching';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { TokenContext } from '../../redux/tokenContext';
import { format } from 'date-fns';

const Book = () => {
  const context = useContext(BookingFormContext);
  const contextToken = useContext(TokenContext);
  const eniqueId = useId();
  const { params: item } = useRoute();
  const navigation = useNavigation();
  const [currentPosition,setCurrentPosition] = useState({});
  const [coordStart, setCoordStart] = useState('');
  
  useEffect(() => {
    takeAddressFromGPS();
    console.log(item);
  }, [item, eniqueId]);


  // useEffect(() => {
  //   context.setBookingForm({
  //     ...context.bookingForm,
  //     eniqueId,
  //     endPoint: item,
  //   });
  // }, [item, eniqueId]);

  

  const takeAddressFromGPS = async () => {
    const latString = await AsyncStorage.getItem('lat');
    const lngString = await AsyncStorage.getItem('lng');
    lat = parseFloat(latString);
    lng = parseFloat(lngString);
    const coords = lat + ',' + lng;
    setCoordStart(coords);
    fetchStartGPS({
      start: coords
    }, 1).then((data) => {
      // console.log(data);
      if (data.res == 'success') {
        setCurrentPosition(data.result);
        context.setBookingForm({
          ...context.bookingForm,
          eniqueId,
          endPoint: item,
          startPoint: data.result,

        })
      }
    });
  }

  const createTrip = () => {
    // console.log(context);
    const latEnd = context.bookingForm.endPoint.coordinates.lat;
    const lngEnd = context.bookingForm.endPoint.coordinates.lng;
    const coordEnd = latEnd + ',' + lngEnd;
    navigation.navigate('FindScreen',item);
    // fetchCreateOneTrip({
    //   start_name: currentPosition.start_name,
    //   start: currentPosition.start,
    //   end_name: item.name,
    //   end: item.address,
    //   comment: context.bookingForm.note,
    //   is_punish: context.bookingForm.isPunish,
    //   start_time: context.bookingForm.departureTime,
    //   vehicle_category_id: context.bookingForm.typeCar,
    //   coordinates_start: coordStart,
    //   coordinates_end: coordEnd
    // },contextToken.token).then((data) => {
    //   // console.log(data);
    //   if(data.res === 'success'){
    //     context.setBookingForm({
    //       ...context.bookingForm,
    //       eniqueId: data.result,
    //     })
    //   }
    // })
  }

  return (
    <SafeAreaView style={[styles.flexFull, styles.relative]}>
      <View style={[styles.flexFull, styles.bgBlack]}>
        {/* header */}
        <Header navigation={navigation} title="Đặt chuyến" />

        {/* body */}
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={[styles.flexFull, styles.pt15, styles.px15]}
        >
          <Text
            style={[
              styles.fs27,
              styles.textWhite,
              styles.lh32,
              styles.mb24,
              styles.fw300,
            ]}
          >
            Bạn đang đặt chuyến
          </Text>

          {/* location */}
          <Location
            navigation={navigation}
            data={item}
            currentPosition={currentPosition}
          />

          {/* select */}
          <BookSelectes context={context} />
        </ScrollView>

        {/* buttom  huy chuyen & tim tai xe*/}
        <View style={[styles.flexRow]}>
          <TouchableOpacity
            style={[
              styles.h48,
              styles.bgGray161,
              styles.flexFull,
              styles.itemsCenter,
              styles.justifyCenter,
            ]}
            onPress={() => navigation.goBack()}
          >
            <Text style={[styles.fs16, styles.textWhite]}>Hủy chuyến</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.h48,
              styles.bgRed,
              styles.flexFull,
              styles.itemsCenter,
              styles.justifyCenter,
            ]}
            onPress={() => createTrip()}
          >
            <Text style={[styles.fs16, styles.textWhite]}>Tìm tài xế</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Book;
