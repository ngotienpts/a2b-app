import { View, Text } from 'react-native';
import React from 'react';
import { TouchableOpacity } from 'react-native';
import { Image } from 'react-native';
import { user } from '../../assets/images';
import { ChevronLeftIcon } from 'react-native-heroicons/outline';
import styles from '../../styles';

const Header = ({ navigation, title }) => {
  return (
    <View style={[styles.px15, styles.pt12, styles.pb20, styles.flexBetween]}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <ChevronLeftIcon size={40} color={'white'} style={{ marginLeft: -10 }} />
      </TouchableOpacity>
      <View>
        <Text style={[styles.textWhite, styles.fs16]}>{title}</Text>
        <View style={[styles.underline, styles.mt10, { with: 100 }]} />
      </View>
      <TouchableOpacity onPress={() => navigation.navigate('UserScreen')}>
        <Image source={(require = user)} style={{ width: 32, height: 32 }} resizeMode="contain" />
      </TouchableOpacity>
    </View>
  );
};

export default Header;
