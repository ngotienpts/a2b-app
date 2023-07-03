import { View, Text, TouchableOpacity } from 'react-native';
import React from 'react';
import { StopCircleIcon, MapPinIcon } from 'react-native-heroicons/solid';

import styles from '../../styles';

const Location = ({ navigation }) => {
  return (
    <View style={[styles.borderBot]}>
      <TouchableOpacity onPress={() => navigation.navigate('MapScreen')}>
        <View style={[styles.flexRow, styles.mb24]}>
          <StopCircleIcon size={20} color={'white'} style={{ marginTop: 2 }} />
          <View style={[styles.ml5, styles.flexFull]}>
            <Text style={[styles.fs16, styles.fw700, styles.textWhite, styles.mb5]}>
              Vị trí hiện tại
            </Text>
            <Text style={[styles.textGray77, styles.fs15]}>286 Nguyễn xiển</Text>
          </View>
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('MapScreen')}>
        <View style={[styles.flexRow, styles.mb24]}>
          <MapPinIcon size={22} color={'white'} style={{ marginTop: 2 }} />
          <View style={[styles.ml5, styles.flexFull]}>
            <Text style={[styles.fs16, styles.fw700, styles.textWhite, styles.mb5]}>
              Cảng hàng không quốc tế Nội Bài
            </Text>
            <Text style={[styles.textGray77, styles.fs15]}>286 Nguyễn xiển</Text>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default Location;
