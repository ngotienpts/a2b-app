import { View, Text, TextInput, TouchableOpacity, StatusBar } from 'react-native';
import React, { useCallback, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { MagnifyingGlassIcon, XMarkIcon } from 'react-native-heroicons/outline';
import { debounce } from 'lodash';

import styles from '../../styles';
import Header from './Header';
import Result from './Result';
import ResultDefault from './ResultDefault';
import { searchData } from '../../constants';
import { fetchSearchEndpoint } from '../../api/DataFetching';

const Home = () => {
    const navigation = useNavigation();
    const [results, setResults] = useState([]);
    const [inputValue, setInputValue] = useState('');

    const handleSearch = (payload) => {
        if (payload && payload.length > 0) {
            fetchSearchEndpoint({
                keyword: payload,
                lat: '20.9837639',
                lng: '105.8091508',
            }).then((data) => {
                if (data && data.result) setResults(data.result);
            });
        } else {
            setResults([]);
        }
    };

    const handleSearchDebounce = useCallback(debounce(handleSearch, 400), []);

    const handleClearInput = () => {
        setInputValue('');
    };
    return (
        <SafeAreaView style={[styles.flexFull, styles.relative, styles.bgBlack]}>
            <StatusBar barStyle="light-content" animated={true} />
            <View style={[styles.flexFull, styles.bgBlack]}>
                {/* header */}
                <Header navigation={navigation} />

                {/* body */}
                <View style={[styles.px15, styles.flexFull]}>
                    <Text style={[styles.textWhite, styles.fs16, styles.lh24, styles.mb12]}>
                        Xin chào, Nguyễn Văn An!
                    </Text>
                    <Text
                        style={[
                            styles.textWhite,
                            styles.fs27,
                            styles.lh40,
                            styles.fw300,
                            styles.mb10,
                        ]}
                    >
                        Bạn cần đi đâu?
                    </Text>
                    {/* back home */}
                    <TouchableOpacity
                        onPress={() => {
                            navigation.navigate('HomeBackPrimary');
                        }}
                    >
                        <Text style={[styles.textWhite]}>back home 1</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => {
                            navigation.navigate('HomeBackSecondary');
                        }}
                    >
                        <Text style={[styles.textWhite]}>back home 2</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => {
                            navigation.navigate('HomeBackTertiary');
                        }}
                    >
                        <Text style={[styles.textWhite]}>back home 3</Text>
                    </TouchableOpacity>

                    {/* search */}
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
                            onChangeText={(text) => {
                                setInputValue(text);
                                handleSearchDebounce(text);
                            }}
                            value={inputValue}
                            style={[
                                styles.flexFull,
                                styles.fs16,
                                styles.textWhite,
                                styles.pl24,
                                styles.pr50,
                            ]}
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

                    {/* result */}
                    {inputValue.length > 0 ? (
                        <Result
                            results={results}
                            navigation={navigation}
                            style={[styles.flexFull]}
                            paddingBottom={80}
                        />
                    ) : (
                        <ResultDefault data={searchData} navigation={navigation} />
                    )}
                </View>
            </View>
        </SafeAreaView>
    );
};

export default Home;
