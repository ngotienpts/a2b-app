import React, { useCallback, useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, Platform } from 'react-native';
import {
  ClockIcon,
  CubeTransparentIcon,
  PencilIcon,
  RocketLaunchIcon,
  TruckIcon,
} from 'react-native-heroicons/outline';
// import * as Animatable from 'react-native-animatable';
import Slider from '@react-native-community/slider';
import Collapsible from 'react-native-collapsible';
import DateTimePicker from '@react-native-community/datetimepicker';

import styles from '../../styles';
import { transportations } from '../../constants';
import { format } from 'date-fns';

const BookSelects = () => {
  const [isDropdownVisible, setDropdownVisible] = useState(false);
  const [isTimeDropdownVisible, setTimeDropdownVisible] = useState(false);
  const [selectedOption, setSelectedOption] = useState('Xe sedan');
  const [activeIndex, setActiveIndex] = useState(0);
  const [note, setNote] = useState('');
  const [timeRange, setTimeRange] = useState(30);
  const [timeString, setTimeString] = useState('');

  const toggleDropdown = () => {
    setDropdownVisible(!isDropdownVisible);
  };

  const toggleTimeModal = () => {
    setTimeDropdownVisible(!isTimeDropdownVisible);
  };

  const handleOptionPress = useCallback(
    (item, index) => () => {
      setSelectedOption(item.name);
      setActiveIndex(index);
      setDropdownVisible(false);
    },
    []
  );

  const handleTimeRangeChange = (newValue) => {
    const hours = Math.floor(newValue / 60);
    const minutes = newValue % 60;

    const hoursString = hours > 0 ? `${hours} giờ` : '';
    const minutesString = minutes > 0 ? `${minutes} phút` : '';
    const newTimeString = `Sau ${hoursString} ${minutesString} nữa`;
    setTimeString(newTimeString);
  };

  useEffect(() => {
    handleTimeRangeChange(timeRange);
  }, [timeRange]);

  const [date, setDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);

  const onChangeDate = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowPicker(Platform.OS === 'ios');
    setDate(currentDate);
  };

  const showDatepicker = () => {
    setShowPicker(true);
  };
  return (
    <View style={[styles.pt24]}>
      {/* type car */}
      <View style={[styles.mb24]}>
        <TouchableOpacity onPress={toggleDropdown}>
          <View style={[styles.flexRow]}>
            <TruckIcon size={22} color={'white'} style={{ marginTop: 2 }} />
            <View style={[styles.ml5, styles.flexFull]}>
              <Text style={[styles.fs16, styles.fw700, styles.textWhite, styles.mb5]}>
                Loại hình xe
              </Text>
              <Text style={[styles.textGray77, styles.fs15]}>{selectedOption}</Text>
            </View>
          </View>
        </TouchableOpacity>
        <Collapsible collapsed={!isDropdownVisible} duration={500}>
          <View style={[{ backgroundColor: '#1B1B1B' }, styles.mt24]}>
            {transportations.map((item, index) => (
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
            ))}
          </View>
        </Collapsible>
      </View>

      {/*lich trinh */}
      <View style={[styles.mb24]}>
        <TouchableOpacity onPress={toggleTimeModal}>
          <View style={[styles.flexRow]}>
            <ClockIcon size={22} color={'white'} style={{ marginTop: 2 }} />
            <View style={[styles.ml5, styles.flexFull]}>
              <Text style={[styles.fs16, styles.fw700, styles.textWhite, styles.mb5]}>
                Thời gian khởi hành
              </Text>
              <Text style={[styles.textGray77, styles.fs15]}>{timeString}</Text>
            </View>
          </View>
        </TouchableOpacity>
        <Collapsible collapsed={!isTimeDropdownVisible} duration={500}>
          <View style={[styles.bgBlack, styles.mt24]}>
            {/* now */}
            <View
              style={[
                styles.flexRow,
                styles.itemsCenter,
                styles.border10,
                styles.p12,
                styles.border1,
                styles.dashed,
                styles.borderColor3e9,
                styles.bgBlue212,
              ]}
            >
              <RocketLaunchIcon size={50} color={'white'} />
              <View style={[styles.ml10, styles.flexFull]}>
                <Text style={[styles.fs15, styles.fw700, styles.textWhite, styles.mb10]}>
                  Tôi cần đi luôn
                </Text>
                <Text style={[styles.fs15, styles.fw400, styles.textWhite, styles.lh20]}>
                  Ưu tiên xe ở gần và đến sớm nhất có thể
                </Text>
              </View>
            </View>

            {/* range */}
            <View
              style={[
                styles.flexRow,
                styles.itemsCenter,
                styles.border10,
                styles.mt15,
                styles.p12,
                styles.border1,
                styles.dashed,
                styles.borderColor777,
                styles.bgGray2727,
              ]}
            >
              <CubeTransparentIcon size={50} color={'white'} />
              <View style={[styles.ml10, styles.flexFull]}>
                <Text style={[styles.fs15, styles.fw700, styles.textWhite, styles.mb10]}>
                  {timeString}
                </Text>
                <Slider
                  style={{ width: '100%', height: 40 }}
                  minimumValue={10}
                  maximumValue={150}
                  step={10}
                  onValueChange={(newValue) => {
                    setTimeRange(newValue);
                  }}
                  value={timeRange}
                  minimumTrackTintColor="#FFFFFF"
                  maximumTrackTintColor="rgba(255, 255, 255, 0.50)"
                />
              </View>
            </View>

            {/* time */}
            <View
              style={[
                styles.flexRow,
                styles.itemsCenter,
                styles.border10,
                styles.mt15,
                styles.p12,
                styles.border1,
                styles.dashed,
                styles.borderColor777,
                styles.bgGray2727,
              ]}
            >
              <ClockIcon size={50} color={'white'} />
              <View style={[styles.ml10, styles.flexFull]}>
                <Text style={[styles.fs15, styles.fw700, styles.textWhite, styles.mb10]}>
                  Lịch trình của tôi
                </Text>
                <View>
                  <TouchableOpacity onPress={showDatepicker}>
                    <Text
                      style={[
                        styles.textWhite,
                        styles.fs15,
                        styles.bgGray161,
                        styles.py5,
                        styles.px10,
                      ]}
                    >
                      {format(date, 'dd-MM-yyyy')}
                    </Text>
                  </TouchableOpacity>
                  {showPicker && (
                    <DateTimePicker
                      value={date}
                      mode="date"
                      display="default"
                      onChange={onChangeDate}
                    />
                  )}
                </View>
              </View>
            </View>
          </View>
        </Collapsible>
      </View>

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
          style={[styles.textGray77, styles.fs15, styles.textArea, styles.p15]}
          placeholder="VD: Gọi trước khi đến, không mang thú cưng"
          placeholderTextColor={'rgba(119,125,146,0.8)'}
          multiline
          numberOfLines={4}
          value={note}
          onChangeText={(text) => setNote(text)}
        />
      </View>
    </View>
  );
};

export default BookSelects;
