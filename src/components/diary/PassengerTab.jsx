import { View, Text, TouchableOpacity } from 'react-native';
import React from 'react';
import { MapPinIcon } from 'react-native-heroicons/outline';
import { StopCircleIcon } from 'react-native-heroicons/solid';

import styles from '../../styles';

const PassengerTab = () => {
    return (
        <View>
            {/* section */}
            <View>
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
                    Trong tuần
                </Text>
                {/* list */}
                <View>
                    {/* item */}
                    <View style={[styles.bg161e, styles.p15, styles.mb15]}>
                        <TouchableOpacity>
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
                                    Nhà riêng
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
                                    Cảng hàng không quốc tế Nội Bài
                                </Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                    {/* item */}
                    <View style={[styles.bg161e, styles.p15, styles.mb15]}>
                        <TouchableOpacity>
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
                                    Nhà riêng
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
                                    Cảng hàng không quốc tế Nội Bài
                                </Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                    {/* item */}
                    <View style={[styles.bg161e, styles.p15, styles.mb15]}>
                        <TouchableOpacity>
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
                                    Nhà riêng
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
                                    Cảng hàng không quốc tế Nội Bài
                                </Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </View>
    );
};

export default PassengerTab;
