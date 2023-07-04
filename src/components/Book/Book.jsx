import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, useRoute } from '@react-navigation/native';
import { StopCircleIcon, MapPinIcon } from 'react-native-heroicons/solid';

import styles from '../../styles';
import Header from '../header/Header';

const Book = () => {
  const navigation = useNavigation();
  const {params} = useRoute();
  // console.log(params);
  return (
    <SafeAreaView style={[styles.flexFull, styles.relative]}>
      <View style={[styles.flexFull, styles.bgBlack]}>
        {/* header */}
        <Header navigation={navigation} title="Đặt chuyến" />

        {/* body */}
        <ScrollView style={[styles.flexFull, styles.pt15, styles.px15]}>
          <Text style={[styles.fs27, styles.textWhite, styles.lh32, styles.mb24, styles.fw300]}>
            Bạn đang đặt chuyến
          </Text>
          {/*  */}
          <View>
            <TouchableOpacity onPress={() => navigation.navigate('MapScreen')}>
              <View style={[styles.flexRow, styles.mb24]}>
                <StopCircleIcon size={20} color={'white'} style={{ marginTop: 3 }} />
                <View style={[styles.ml5, styles.flexFull]}>
                  <Text style={[styles.fs16, styles.fw700, styles.textWhite, styles.mb5]}>
                    Vị trí hiện tại
                  </Text>
                  <Text style={[styles.textGray77, styles.fs15]}>286 Nguyễn xiển</Text>
                </View>
              </View>
            </TouchableOpacity>
            <TouchableOpacity>
              <View style={[styles.flexRow, styles.mb24]}>
                <MapPinIcon size={22} color={'white'} style={{ marginTop: 3 }} />
                <View style={[styles.ml5, styles.flexFull]}>
                  <Text style={[styles.fs16, styles.fw700, styles.textWhite, styles.mb5]}>
                    Cảng hàng không quốc tế Nội Bài
                  </Text>
                  <Text style={[styles.textGray77, styles.fs15]}>286 Nguyễn xiển</Text>
                </View>
              </View>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default Book;
