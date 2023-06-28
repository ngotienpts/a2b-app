import { View, Text } from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';

import styles from '../../styles';
import Header from './Header';
import Search from '../Search';
import Result from './Result';

const Home = () => {
  const [results, setResults] = useState([1, 2, 3, 4, 5]);
  const navigation = useNavigation();
  return (
    <SafeAreaView style={[styles.flexFull, styles.relative]}>
      <View style={[styles.flexFull, styles.bgBlack]}>
        {/* header */}
        <Header navigation={navigation} />

        {/* body */}
        <View style={[styles.px15, styles.flexFull]}>
          <Text style={[styles.textWhite, styles.fs16, styles.lh24, styles.mb12]}>
            Xin chào, Nguyễn Văn An!
          </Text>
          <Text style={[styles.textWhite, styles.fs27, styles.lh40, styles.fw300, styles.mb10]}>
            Bạn cần đi đâu?
          </Text>

          {/* search */}
          <Search />

          {/* result */}
          <Result results={results} navigation={navigation} />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Home;
