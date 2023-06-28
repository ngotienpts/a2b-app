import { View, Text, TouchableOpacity, FlatList } from 'react-native';
import React from 'react';
import { MapPinIcon } from 'react-native-heroicons/outline';
import styles from '../../styles';

const Result = ({ results, navigation }) => {
  return (
    <View style={[styles.flexFull]}>
      <FlatList
        data={results}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item) => item.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('Book', item);
            }}
          >
            <View style={[styles.flexRow, styles.mb24]}>
              <MapPinIcon size={24} color={'white'} />
              <View style={[styles.ml5, styles.flexFull]}>
                <Text style={[styles.fs16, styles.fw700, styles.textWhite, styles.mb5]}>
                  Nhà riêng
                </Text>
                <Text style={[styles.textGray77, styles.fs15]}>
                  286 Nguyễn Xiển, Thanh Trì, Hà Nội
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default Result;
