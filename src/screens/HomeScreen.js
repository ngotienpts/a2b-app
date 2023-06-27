import { View, Text } from 'react-native';
import React, { useState } from 'react';
import { TouchableOpacity, Image, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MagnifyingGlassIcon } from 'react-native-heroicons/outline';

import styles from '../styles';
import { logoDriver, logoSecondary, user } from '../assets/images';
import Result from '../components/Home/Result';
import { useNavigation } from '@react-navigation/native';

const HomeScreen = () => {
  const [results, setResults] = useState([1, 2, 3, 4, 5]);
  const navigation = useNavigation();
  return (
    <SafeAreaView style={[styles.flexFull, styles.relative]}>
      <View style={[styles.flexFull, styles.bgBlack]}>
        {/* header */}
        <View style={[styles.px15, styles.pt12, styles.pb20, styles.flexBetween]}>
          <TouchableOpacity>
            <Image
              source={(require = logoDriver)}
              style={{ width: 28, height: 32 }}
              resizeMode="cover"
            />
          </TouchableOpacity>
          <TouchableOpacity>
            <Image
              source={(require = logoSecondary)}
              style={{ width: 64, height: 32 }}
              resizeMode="contain"
            />
          </TouchableOpacity>
          <TouchableOpacity>
            <Image
              source={(require = user)}
              style={{ width: 32, height: 32 }}
              resizeMode="contain"
            />
          </TouchableOpacity>
        </View>

        {/* body */}
        <View style={[styles.px15, styles.flexFull]}>
          <Text style={[styles.textWhite, styles.fs16, styles.lh24, styles.mb12]}>
            Xin chào, Nguyễn Văn An!
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
              style={[styles.fs16, styles.textWhite, styles.pl24]}
              placeholder="Tìm kiếm"
              placeholderTextColor={'white'}
            />
            <TouchableOpacity style={[styles.absolute, styles.r0, styles.p12]}>
              <MagnifyingGlassIcon size={24} color={'white'} />
            </TouchableOpacity>
          </View>

          {/* result */}
          <Result results={results} navigation={navigation} />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;
