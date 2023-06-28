import { View, TextInput, TouchableOpacity } from 'react-native';
import React from 'react';
import { MagnifyingGlassIcon } from 'react-native-heroicons/outline';

import styles from '../../styles';

const Search = () => {
  return (
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
        style={[styles.fs16, styles.textWhite, styles.pl24, styles.pr50]}
        placeholder="Tìm kiếm"
        placeholderTextColor={'white'}
      />
      <TouchableOpacity style={[styles.absolute, styles.r0, styles.p12, styles.bg161e]}>
        <MagnifyingGlassIcon size={24} color={'white'} />
      </TouchableOpacity>
    </View>
  );
};

export default Search;
