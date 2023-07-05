import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, useRoute } from '@react-navigation/native';

import styles from '../../styles';
import Header from '../header/Header';
import Location from './Location';
import BookSelectes from './BookSelectes';

const Book = () => {
  const { params: item } = useRoute();
  const navigation = useNavigation();
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
          <Text style={[styles.fs27, styles.textWhite, styles.lh32, styles.mb24, styles.fw300]}>
            Bạn đang đặt chuyến
          </Text>

          {/* location */}
          <Location navigation={navigation} data={item} />

          {/* select */}
          <BookSelectes />
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
          >
            <Text style={[styles.fs16, styles.textWhite]}>Tìm tài xế</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Book;
