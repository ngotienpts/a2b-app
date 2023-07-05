import { Text, TouchableOpacity, View, Platform } from 'react-native';
import React, { useContext } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';

import styles from '../../styles';
import { useNavigation } from '@react-navigation/native';

const ios = Platform.OS == 'ios';

const LoginBtn = () => {
  const navigation = useNavigation();
  const handleButtonClick = () => {
    // chuyển sang home page
    navigation.navigate('Home');
  };

  return (
    <View style={styles.mt60}>
      <TouchableOpacity onPress={handleButtonClick}>
        <View style={[styles.bgRed, styles.flexCenter, styles.w250, styles.h48, styles.border4]}>
          <Icon name={'google'} style={[styles.textWhite, styles.fs28, styles.mr10]} />
          <Text style={[styles.fs16, styles.lh24, styles.textWhite]}>Đăng nhập qua Google</Text>
        </View>
      </TouchableOpacity>
      {ios ? (
        <TouchableOpacity onPress={handleButtonClick}>
          <View
            style={[
              styles.bgGray,
              styles.flexCenter,
              styles.w250,
              styles.h48,
              styles.border4,
              styles.mt20,
            ]}
          >
            <Icon name={'apple'} style={[styles.textWhite, styles.fs28, styles.mr10]} />
            <Text style={[styles.fs16, styles.lh24, styles.textWhite]}>Đăng nhập qua Apple</Text>
          </View>
        </TouchableOpacity>
      ) : null}
    </View>
  );
};

export default LoginBtn;
