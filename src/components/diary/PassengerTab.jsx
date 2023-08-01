import { View, Text, TouchableOpacity, SectionList } from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import { MapPinIcon } from 'react-native-heroicons/outline';
import { StopCircleIcon } from 'react-native-heroicons/solid';

import styles from '../../styles';
import { fetchListHistoryPassenger } from '../../api/DataFetching';
import { TokenContext } from '../../redux/tokenContext';
import NameDateFormat from '../nameDateFormat';
import { PassengerContext } from '../../redux/passengerContext';
import moment from 'moment';

const PassengerTab = () => {
    const today = moment().startOf('day');
    const yesterday = moment().subtract(1, 'days').startOf('day');
    const startOfWeek = moment().startOf('isoWeek');
    const startOfLastWeek = moment().subtract(1, 'weeks').startOf('isoWeek');
    const startOfMonth = moment().startOf('month');
    const startOfLastMonth = moment().subtract(1, 'months').startOf('month');
    const context = useContext(PassengerContext)
    const [passengers, setPassengers] = useState({});
    const [loading, setLoading] = useState(false);
    const contextToken = useContext(TokenContext);

    const listPassenger = () => {
        fetchListHistoryPassenger(contextToken.token)
        .then((data) => {
            if(data.res === 'success'){
                // console.log(data.result);
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

    useEffect(() => {
        listPassenger();
        // console.log(passengers);
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
                                            >
                                                <View style={[styles.flexRow, styles.mb5]}>
                                                    <StopCircleIcon
                                                        size={20}
                                                        color={'white'}
                                                        style={{ marginTop: 2 }}
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
                                                <View style={[styles.flexRow]}>
                                                    <MapPinIcon size={22} color={'white'} style={{ marginTop: 2 }} />
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
