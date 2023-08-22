import { View, Text, TouchableOpacity, SectionList } from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import { MapPinIcon } from 'react-native-heroicons/outline';
import { StopCircleIcon, CheckCircleIcon } from 'react-native-heroicons/solid';

import styles from '../../styles';
import { fetchListHistoryPassenger, fetchDetailDriver } from '../../api/DataFetching';
import { TokenContext } from '../../redux/tokenContext';
import moment from 'moment';
import { useNavigation } from '@react-navigation/native';

const PassengerTab = () => {
    const navigation = useNavigation();

    const today = moment().startOf('day');
    const yesterday = moment().subtract(1, 'days').startOf('day');
    const startOfWeek = moment().startOf('isoWeek');
    const startOfLastWeek = moment().subtract(1, 'weeks').startOf('isoWeek');
    const startOfMonth = moment().startOf('month');
    const startOfLastMonth = moment().subtract(1, 'months').startOf('month');
    const [passengers, setPassengers] = useState({});
    const [loading, setLoading] = useState(false);
    const contextToken = useContext(TokenContext);

    const listPassenger = () => {
        fetchListHistoryPassenger(contextToken.token)
        .then((data) => {
            if(data.res === 'success'){
                // setPassengers(data.result);
                setHistoryPassengers(data.result);
            }
        })
        .catch((err) => {
            console.log(err);
        })
        .finally(() => {
            setLoading(true);
        })
    }

    const setHistoryPassengers = (passengers) => {
        const dateArr = passengers.flatMap((passenger, index) => {
            const dateFormat = moment(passenger.created_at);
            if (dateFormat.isSame(today, 'day')) {
                return [{ data: passenger, title: 'Hôm nay' }];
            }
            if (dateFormat.isSame(yesterday, 'day')) {
                return [{ data: passenger, title: 'Hôm qua' }];
            }
            if (dateFormat.isBetween(startOfWeek, today, 'day', '[]')) {
                return [{ data: passenger, title: 'Tuần này' }];
            }
            if (dateFormat.isBetween(startOfLastWeek, startOfWeek, 'day', '[]')) {
                return [{ data: passenger, title: 'Tuần trước' }];
            }
            if (dateFormat.isBetween(startOfMonth, today, 'day', '[]')) {
                return [{ data: passenger, title: 'Tháng này' }];
            }
            if (dateFormat.isBetween(startOfLastMonth, startOfMonth, 'day', '[]')) {
                return [{ data: passenger, title: 'Tháng trước' }];
            }
        
            // Hoặc trả về một mảng trống nếu không phù hợp với bất kỳ điều kiện nào
            return [];
        });

        const convertArr = dateArr.reduce((result, item) => {
            // Tìm kiếm trong mảng kết quả có tồn tại title đã có trong item không
            const existingItem = result.find((data) => data.title === item.title);
            // Nếu đã tồn tại title này trong mảng kết quả
            if (existingItem) {
              // Thêm data vào mảng con tương ứng
              existingItem.data.push(item.data);
            } else {
              // Nếu chưa tồn tại title này, thêm một entry mới vào mảng kết quả
              result.push({ title: item.title, data: [item.data] });
            }
            return result;
            // setPassengers(result);
        }, []);

        setPassengers(convertArr);
    }

    const handleNavigation = async (item) => {
        // console.log(item.driver_id);
        if(item?.status_number == 0){
            navigation.navigate('FindScreen', {id:item?.trip_id, isFlag:1})
        }
        else if(item?.status_number == 1){
            const params = {
                driver_id: item?.driver_id,
            }
            await fetchDetailDriver(params)
            .then((data) => {
                if(data.res === 'success'){
                    let obj = data.result;
                    obj.isFlag = 1;
                    obj.id = item?.trip_id
                    navigation.navigate('ConfirmScreen',obj);
                }
            })
            .catch((err) => {
                console.log(err);
            })
        }
        else if(item?.status_number == 2){
            const params = {
                driver_id: item?.driver_id,
            }
            await fetchDetailDriver(params)
            .then((data) => {
                if(data.res === 'success'){
                    let obj = data.result;
                    obj.isFlag = 1;
                    obj.id = item?.trip_id
                    navigation.navigate('PickScreen',obj);
                }
            })
            .catch((err) => {
                console.log(err);
            })
        }
        else if(item?.status_number == 3){
            const params = {
                driver_id: item?.driver_id,
            }
            await fetchDetailDriver(params)
            .then((data) => {
                if(data.res === 'success'){
                    let obj = data.result;
                    obj.isFlag = 1;
                    obj.id = item?.trip_id
                    navigation.navigate('MovingScreen',obj);
                }
            })
            .catch((err) => {
                console.log(err);
            })
        }else if(item?.status_number == 4){
            const params = {
                driver_id: item?.driver_id,
            }
            await fetchDetailDriver(params)
            .then((data) => {
                if(data.res === 'success'){
                    let obj = data.result;
                    obj.isFlag = 1;
                    obj.id = item?.trip_id
                    navigation.navigate('CompleteScreen',obj);
                }
            })
            .catch((err) => {
                console.log(err);
            })
        }
        else{
            const params = {
                driver_id: item?.driver_id,
            }
            await fetchDetailDriver(params)
            .then((data) => {
                if(data.res === 'success'){
                    let obj = data.result;
                    obj.isFlag = 1;
                    obj.id = item?.trip_id
                    navigation.navigate('CancelBookClientScreen',obj);
                }
            })
            .catch((err) => {
                console.log(err);
            })
        }
    }

    useEffect(() => {
        listPassenger();
        // console.log(passengers)

    },[loading])

    return (
        <View>
            {/* section */}
            {loading && 
            <View>
                {/* {passengers.map((passenger, index) => ( */}
                    <View style={[styles.pb50]}>
                        {passengers.length !== undefined && 
                            <SectionList
                                sections={passengers}
                                keyExtractor={(item, index) => item.trip_id}
                                renderItem={({item}) => (
                                    <View>    
                                        <View style={[styles.bg161e, styles.p15, styles.mb15]}>
                                            <TouchableOpacity
                                                key={item?.trip_id}
                                                onPress={() => handleNavigation(item)}
                                            >
                                                <View style={[styles.flexStart, styles.mb5]}>
                                                    <CheckCircleIcon 
                                                        size={20}
                                                        color={
                                                            item?.color_status === 'status--danger' ? '#E8424A' : (item?.color_status === 'status--success' ? '#2F9881' : '#FFB848')
                                                        }
                                                        
                                                    />
                                                    <Text
                                                        style={[
                                                            styles.fs16,
                                                            styles.fw700,
                                                            item?.color_status === 'status--danger' ? styles.textRedE8 : 
                                                            (item?.color_status === 'status--success' ? styles.textCyan2F : styles.textYellow),
                                                            styles.mb5,
                                                            styles.ml5,
                                                            styles.flexFull,
                                                        ]}
                                                    >
                                                        {item?.status}
                                                    </Text>
                                                </View>
                                                <View style={[styles.flexStart, styles.mb5]}>
                                                    <StopCircleIcon
                                                        size={20}
                                                        color={'white'}
                                                    />
                                                    <Text
                                                        style={[
                                                            styles.fs16,
                                                            styles.fw700,
                                                            styles.textWhite,
                                                            styles.mb5,
                                                            styles.ml5,
                                                            styles.flexFull,
                                                        ]}
                                                    >
                                                        {item?.start_location}
                                                    </Text>
                                                </View>
                                                <View style={[styles.flexStart]}>
                                                    <MapPinIcon size={22} color={'white'} style={{marginTop: -2}} />
                                                    <Text
                                                        style={[
                                                            styles.fs16,
                                                            styles.fw700,
                                                            styles.textWhite,
                                                            styles.mb5,
                                                            styles.ml5,
                                                            styles.flexFull,
                                                        ]}
                                                    >
                                                        {item?.end_location}
                                                    </Text>
                                                </View>
                                            </TouchableOpacity>
                                        </View> 
                                    </View>
                                )}
                                renderSectionHeader={({section: {title}}) => (
                                    <Text
                                        style={[
                                            styles.textWhite,
                                            styles.fs16,
                                            styles.fw400,
                                            styles.lh24,
                                            styles.px15,
                                            styles.mb15,
                                        ]}
                                    >
                                        {title}
                                    </Text>
                                )}
                                stickySectionHeadersEnabled={false}
                            />
                        }
                    </View>
                {/* ))} */}
            </View>
            }
        </View>
    );
};

export default PassengerTab;
