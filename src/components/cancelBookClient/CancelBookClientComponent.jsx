import { View, Text, TouchableOpacity, StatusBar, FlatList } from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { RadioButton } from 'react-native-paper';

import styles from '../../styles';
import Header from '../header/Header';
import { cancelBookClient } from '../../constants';

const CancelBookClientComponent = () => {
    const navigation = useNavigation();
    const [selectedId, setSelectedId] = useState(0);
    const handleRadioChange = (id) => {
        setSelectedId(id === selectedId ? -1 : id);
    };

    const renderItem = (item) => {
        return (
            <TouchableOpacity
                onPress={() => handleRadioChange(item.id)}
                style={[styles.flexRow, styles.mb24]}
            >
                <RadioButton
                    value={item.id}
                    status={selectedId === item.id ? 'checked' : 'unchecked'}
                    onPress={() => handleRadioChange(item.id)}
                    color="white"
                />
                <View style={[styles.ml5]}>
                    <Text
                        style={[
                            styles.textWhite,
                            styles.fs16,
                            styles.fw700,
                            styles.lh24,
                            styles.mb5,
                        ]}
                    >
                        {item.title}
                    </Text>
                    <Text style={[styles.textGray77, styles.fs15, styles.fw400]}>{item.des}</Text>
                </View>
            </TouchableOpacity>
        );
    };

    return (
        <SafeAreaView style={[styles.flexFull, styles.relative, styles.bgBlack]}>
            <StatusBar barStyle="light-content" animated={true} />
            <View style={[styles.flexFull, styles.bgBlack]}>
                {/* body */}
                <View style={[styles.flexFull, styles.p15]}>
                    <Text
                        style={[
                            styles.fs27,
                            styles.textWhite,
                            styles.lh32,
                            styles.mb5,
                            styles.fw300,
                        ]}
                    >
                        Xác nhận hủy chuyến
                    </Text>
                    <View style={[styles.mt24]}>
                        <FlatList
                            data={cancelBookClient}
                            keyExtractor={(item) => item.id.toString()}
                            renderItem={({ item }) => renderItem(item)}
                        />
                    </View>
                </View>

                {/* buttom  huy chuyen & tim tai xe*/}
                <View style={[styles.flexRow]}>
                    <TouchableOpacity
                        style={[
                            styles.h48,
                            styles.bgGray161,
                            styles.flexFull,
                            styles.itemsCenter,
                            styles.justifyCenter,
                        ]}
                        onPress={() => navigation.goBack()}
                    >
                        <Text style={[styles.fs16, styles.textWhite]}>Đóng</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[
                            styles.h48,
                            styles.bgRed,
                            styles.flexFull,
                            styles.itemsCenter,
                            styles.justifyCenter,
                        ]}
                        onPress={() => navigation.navigate('HomeScreen')}
                    >
                        <Text style={[styles.fs16, styles.textWhite]}>Hủy chuyến</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    );
};

export default CancelBookClientComponent;
