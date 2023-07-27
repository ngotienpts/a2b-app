import { View, Text, TouchableOpacity } from 'react-native';
import React from 'react';

import styles from '../../styles';

const TransactionTab = () => {
    return (
        <View>
            <TouchableOpacity style={[styles.bg161e, styles.px15, styles.py10, styles.mb12]}>
                <View style={[styles.flexBetween, styles.mb12]}>
                    <Text style={[styles.textGray77, styles.fs16, styles.lh24, styles.fw300]}>
                        3 phút trước
                    </Text>
                    <View style={[styles.flexEnd]}>
                        <Text style={[styles.textCyan2F, styles.fs16, styles.fw700, styles.lh24]}>
                            +100
                        </Text>
                        <Text
                            style={[
                                styles.textCyan2F,
                                styles.fs12,
                                styles.fw700,
                                styles.lh22,
                                { marginLeft: 1 },
                            ]}
                        >
                            k
                        </Text>
                    </View>
                </View>
                <Text style={[styles.textWhite, styles.fs16, styles.lh24]}>
                    Bạn đã nạp 1K thành công
                </Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.bg161e, styles.px15, styles.py10, styles.mb12]}>
                <View style={[styles.flexBetween, styles.mb12]}>
                    <Text style={[styles.textGray77, styles.fs16, styles.lh24, styles.fw300]}>
                        3 phút trước
                    </Text>
                    <View style={[styles.flexEnd]}>
                        <Text style={[styles.textRedE8, styles.fs16, styles.fw700, styles.lh24]}>
                            -100
                        </Text>
                        <Text
                            style={[
                                styles.textRedE8,
                                styles.fs12,
                                styles.fw700,
                                styles.lh22,
                                { marginLeft: 1 },
                            ]}
                        >
                            k
                        </Text>
                    </View>
                </View>
                <Text style={[styles.textWhite, styles.fs16, styles.lh24]}>
                    Bạn đã nạp 1K thành công
                </Text>
            </TouchableOpacity>
        </View>
    );
};

export default TransactionTab;
