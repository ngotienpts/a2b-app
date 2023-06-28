import { FlatList, Text, TouchableHighlight, View } from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';

import styles from '../../styles';
import { useNavigation } from '@react-navigation/native';

const LoginBtn = () => {
  const navigation = useNavigation();
  const btnList = [
    {
      id: 1,
      icon: 'google',
      text: 'Đăng nhập qua Google',
      styleView: [styles.bgRed, styles.flexCenter, styles.w250, styles.h48, styles.border4],
    },
    {
      id: 2,
      icon: 'apple',
      text: 'Đăng nhập qua Apple',
      styleView: [styles.bgGray, styles.flexCenter, styles.w250, styles.h48, styles.border4],
    },
  ];

  const handleButtonClick = (form) => () => {
    // chuyển sang home page
    navigation.navigate('Home', form);
  };

  return (
    <View style={styles.mt60}>
      <FlatList
        data={btnList}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item, index }) => (
          <TouchableHighlight
            onPress={handleButtonClick(item)}
            style={index > 0 ? [item.styleView, { marginTop: 20 }] : item.styleView}
          >
            <>
              <Icon name={item.icon} style={[styles.textWhite, styles.fs28, styles.mr10]} />
              <Text style={[styles.fs16, styles.lh24, styles.textWhite]}>{item.text}</Text>
            </>
          </TouchableHighlight>
        )}
      />
    </View>
  );
};

export default LoginBtn;
