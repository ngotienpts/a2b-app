import React, { useCallback, useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, TextInput } from 'react-native';
import { ClockIcon, PencilIcon, TruckIcon } from 'react-native-heroicons/outline';
import * as Animatable from 'react-native-animatable';
import Modal from 'react-native-modal';

import styles from '../../styles';

import { transportations } from '../../constants';

const BookSelectes = () => {
  const [isModalVisible, toggleModalVisible] = useState(false);
  const [selectOption, setSelection] = useState('Xe sedan');
  const [activeIndex, setActiveIndex] = useState(0);
  const [text, setText] = useState('');

  const handleShowDropdown = () => {
    toggleModalVisible(!isModalVisible);
  };

  const handleOptionPress = useCallback(
    (item, index) => () => {
      setSelection(item.name);
      setActiveIndex(index);
      toggleModalVisible(false);
    },
    []
  );

  return (
    <View style={[styles.pt24]}>
      <TouchableOpacity onPress={handleShowDropdown}>
        <View style={[styles.flexRow, styles.mb24]}>
          <TruckIcon size={22} color={'white'} style={{ marginTop: 2 }} />
          <View style={[styles.ml5, styles.flexFull]}>
            <Text style={[styles.fs16, styles.fw700, styles.textWhite, styles.mb5]}>
              Loại hình xe
            </Text>
            <Text style={[styles.textGray77, styles.fs15]}>{selectOption}</Text>
          </View>
        </View>
      </TouchableOpacity>

      <Modal
        isVisible={isModalVisible}
        onBackdropPress={handleShowDropdown}
        onBackButtonPress={handleShowDropdown}
      >
        <Animatable.View animation={isModalVisible ? 'slideInUp' : 'slideOutDown'} duration={800}>
          <View style={{ backgroundColor: '#1B1B1B' }}>
            <FlatList
              data={transportations}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item, index }) => (
                <TouchableOpacity
                  key={item.id}
                  onPress={handleOptionPress(item, index)}
                  style={[styles.p15, index === activeIndex && { backgroundColor: '#343434' }]}
                >
                  <Text style={[styles.textWhite, styles.fs15, styles.fw700, styles.mb15]}>
                    {item.name}
                  </Text>
                  <Text style={[styles.textWhite, styles.fs15, styles.fw400]}>
                    {item.description}
                  </Text>
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

      {/* note */}
      <View style={{ paddingBottom: 40 }}>
        <View style={[styles.flexRow, styles.mb10]}>
          <PencilIcon size={22} color={'white'} style={{ marginTop: 2 }} />
          <View style={[styles.ml5, styles.flexFull]}>
            <Text style={[styles.fs16, styles.fw700, styles.textWhite, styles.mb5]}>
              Ghi chú cho tài xế
            </Text>
          </View>
        </View>
        <TextInput
          style={[styles.textGray77, styles.fs15, styles.textArea, styles.bgGray161]}
          multiline={true}
          numberOfLines={4}
          value={text}
          onChangeText={(newText) => setText(newText)}
          placeholder="Mô tả hành lý hoặc những vấn đề chưa được liệt kê ở trên"
          placeholderTextColor={'rgba(119,125,146,0.8)'}
        />
      </View>
    </View>
  );
};

export default BookSelectes;
