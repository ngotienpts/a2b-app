import { View, Text, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import { StopCircleIcon, MapPinIcon } from 'react-native-heroicons/solid';

import styles from '../../styles';
import { useRoute } from '@react-navigation/native';
import { fetchStartGPS } from '../../api/DataFetching';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Location = ({ navigation, data }) => {
  const [start,setStart] = useState('');
  const [startName,setStartName] = useState('');
  useEffect(() => {
    takeAddressFromGPS();
  },[]);

  const takeAddressFromGPS = async () => {
    const latString = await AsyncStorage.getItem('lat');
    const lngString = await AsyncStorage.getItem('lng');
    lat = parseFloat(latString);
    lng = parseFloat(lngString);
    const coords = lat+','+lng;
    fetchStartGPS({
      start: coords
    },1).then((data) => {
      console.log(data);
      if(data.res == 'success'){
        setStart(data.result.start)
        setStartName(data.result.start_name)
      }
    });
  }
  return (
    <View style={[styles.borderBot]}>
      <TouchableOpacity onPress={() => navigation.navigate('MapScreen')}>
        <View style={[styles.flexRow, styles.mb24]}>
          <StopCircleIcon size={20} color={'white'} style={{ marginTop: 2 }} />
          <View style={[styles.ml5, styles.flexFull]}>
            <Text style={[styles.fs16, styles.fw700, styles.textWhite, styles.mb5]}>
              Vị trí hiện tại: {startName}
            </Text>
            <Text style={[styles.textGray77, styles.fs15]}>{start}</Text>
          </View>
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('MapScreen')}>
        <View style={[styles.flexRow, styles.mb24]}>
          <MapPinIcon size={22} color={'white'} style={{ marginTop: 2 }} />
          <View style={[styles.ml5, styles.flexFull]}>
            <Text style={[styles.fs16, styles.fw700, styles.textWhite, styles.mb5]}>
              {data?.name}
            </Text>
            <Text style={[styles.textGray77, styles.fs15]}>{data?.address}</Text>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default Location;
