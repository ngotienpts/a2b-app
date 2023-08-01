import { View, TouchableOpacity, Text, TextInput, StatusBar, SafeAreaView } from 'react-native';
import React, { useCallback, useState } from 'react';
import MapView, { Marker } from 'react-native-maps';
import { useNavigation } from '@react-navigation/native';
import { MagnifyingGlassIcon, XMarkIcon } from 'react-native-heroicons/outline';
import { debounce } from 'lodash';

import styles from '../../styles';
import { fetchSearchEndpoint } from '../../api/DataFetching';

const MapBook = () => {
    const navigation = useNavigation();
    // const [results, setResults] = useState([]);
    const [inputValue, setInputValue] = useState('');

    // const handleSearch = (payload) => {
    //     if (payload && payload.length > 0) {
    //         fetchSearchEndpoint({
    //             keyword: payload,
    //             lat: '20.9837639',
    //             lng: '105.8091508',
    //         }).then((data) => {
    //             if (data && data.result) setResults(data.result);
    //         });
    //     } else {
    //         setResults([]);
    //     }
    // };
    // const handleSearchDebounce = useCallback(debounce(handleSearch, 400), []);
    const handleClearInput = () => {
        setInputValue('');
    };
    return (
        <SafeAreaView style={[styles.flexFull, styles.relative, styles.bgBlack]}>
            <StatusBar barStyle="light-content" animated={true} />
            <View style={{ flex: 1 }}>
                {/* search */}
                <View
                    style={[
                        styles.absolute,
                        styles.t0,
                        styles.l0,
                        styles.r0,
                        styles.m15,
                        styles.z100,
                    ]}
                >
                    <View
                        style={[
                            styles.relative,
                            styles.bg161e,
                            styles.h48,
                            styles.flexRow,
                            styles.itemsCenter,
                        ]}
                    >
                        <TextInput
                            onChangeText={(text) => {
                                setInputValue(text);
                                // handleSearchDebounce(text);
                            }}
                            value={inputValue}
                            style={[styles.fs16, styles.textWhite, styles.pl24, styles.pr50]}
                            placeholder="Tìm kiếm"
                            placeholderTextColor={'white'}
                        />
                        <View style={[styles.absolute, styles.r0, styles.p12, styles.bg161e]}>
                            {inputValue.length > 0 ? (
                                <TouchableOpacity onPress={handleClearInput}>
                                    <XMarkIcon size={24} color={'white'} />
                                </TouchableOpacity>
                            ) : (
                                <MagnifyingGlassIcon size={24} color={'white'} />
                            )}
                        </View>
                    </View>
                </View>
                <MapView
                    style={{ flex: 1 }}
                    initialRegion={{
                        latitude: 37.78825,
                        longitude: -122.4324,
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421,
                    }}
                >
                    <Marker
                        coordinate={{ latitude: 37.78825, longitude: -122.4324 }}
                        title="Marker Title"
                        description="This is the marker description"
                    />
                </MapView>
                {/* buttom  huy chuyen */}
                <View
                    style={[
                        styles.flexRow,
                        styles.bgTransparent,
                        styles.absolute,
                        styles.b0,
                        styles.l0,
                        styles.r0,
                    ]}
                >
                    <TouchableOpacity
                        style={[
                            styles.h48,
                            styles.bgRed,
                            styles.flexFull,
                            styles.itemsCenter,
                            styles.justifyCenter,
                            styles.border1,
                            styles.borderColorRedE8,
                            styles.borderSolid,
                            styles.border4,
                            styles.mx15,
                            styles.mb15,
                        ]}
                        onPress={() => navigation.goBack()}
                    >
                        <Text style={[styles.fs16, styles.textWhite]}>OK</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    );
};

export default MapBook;
