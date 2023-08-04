import { View, Text, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import { StopCircleIcon, MapPinIcon } from 'react-native-heroicons/solid';

import styles from '../../styles';

const Location = ({ navigation, data, currentPosition }) => {
    return (
        <View style={[styles.borderBot]}>
            <TouchableOpacity onPress={() => navigation.navigate('MapScreen',currentPosition)}>
            {/* <TouchableOpacity onPress={() => navigation.navigate('MapScreen', (item = data))}> */}
                <View style={[styles.flexRow, styles.mb24]}>
                    <StopCircleIcon size={20} color={'white'} style={{ marginTop: 2 }} />
                    <View style={[styles.ml5, styles.flexFull]}>
                        <Text style={[styles.fs16, styles.fw700, styles.textWhite, styles.mb5]}>
                            Vị trí hiện tại: {currentPosition.start_name}
                        </Text>
                        <Text style={[styles.textGray77, styles.fs15]}>
                            {currentPosition.start}
                        </Text>
                    </View>
                </View>
            </TouchableOpacity>
            {/* <TouchableOpacity onPress={() => navigation.navigate('MapScreen',data)}> */}
            <TouchableOpacity onPress={() => navigation.navigate('MapScreen', (item = data))}>
                <View style={[styles.flexRow, styles.mb24]}>
                    <MapPinIcon size={22} color={'white'} style={{ marginTop: 2 }} />
                    <View style={[styles.ml5, styles.flexFull]}>
                        <Text style={[styles.fs16, styles.fw700, styles.textWhite, styles.mb5]}>
                            {data?.name}
                        </Text>
                        <Text style={[styles.textGray77, styles.fs15]}>{data?.address}</Text>
                    </View>
                </View>
            </TouchableOpacity>
        </View>
    );
};

export default Location;
