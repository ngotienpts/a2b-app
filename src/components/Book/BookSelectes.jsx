import React, { useCallback, useState } from 'react';
import { View, Text, TouchableOpacity, FlatList } from 'react-native';
import { ClockIcon, TruckIcon } from 'react-native-heroicons/outline';
import * as Animatable from 'react-native-animatable';
import Modal from 'react-native-modal';

import styles from '../../styles';

import { transportations } from '../../constants';

const BookSelectes = () => {
  const [isModalVisible, toggleModalVisible] = useState(false);
  const [selectOption, setSelection] = useState('');

  const handleShowDropdown = () => {
    toggleModalVisible(!isModalVisible);
  };

  const handleOptionPress = useCallback(
    (item) => () => {
      setSelection(item.name);
      toggleModalVisible(false);
    },
    []
  );

  return (
    <View style={[styles.pt24]}>
      <TouchableOpacity onPress={handleShowDropdown}>
        <View style={[styles.flexRow, styles.mb24]}>
          <TruckIcon size={20} color={'white'} style={{ marginTop: 2 }} />
          <View style={[styles.ml5, styles.flexFull]}>
            <Text style={[styles.fs16, styles.fw700, styles.textWhite, styles.mb5]}>
              Loại hình xe
            </Text>
            <Text style={[styles.textGray77, styles.fs15]}>{selectOption || 'Xe sedan'}</Text>
          </View>
        </View>
      </TouchableOpacity>

      <Modal
        isVisible={isModalVisible}
        onBackdropPress={handleShowDropdown}
        onBackButtonPress={handleShowDropdown}
      >
        <Animatable.View animation={isModalVisible ? 'slideInUp' : 'slideOutDown'} duration={800}>
          <View style={{ backgroundColor: 'white', padding: 20 }}>
            <FlatList
              data={transportations}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => (
                <TouchableOpacity key={item.id} onPress={handleOptionPress(item)}>
                  <Text style={[styles.textBlack]}>{item.name}</Text>
                  <Text style={[styles.textBlack]}>{item.description}</Text>
                </TouchableOpacity>
              )}
            />
          </View>
        </Animatable.View>
      </Modal>

      <TouchableOpacity>
        <View style={[styles.flexRow, styles.mb24]}>
          <ClockIcon size={22} color={'white'} style={{ marginTop: 2 }} />
          <View style={[styles.ml5, styles.flexFull]}>
            <Text style={[styles.fs16, styles.fw700, styles.textWhite, styles.mb5]}>
              Thời gian khởi hành
            </Text>
            <Text style={[styles.textGray77, styles.fs15]}>30 phút nữa</Text>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default BookSelectes;
