// components/PersonalInfoItem.js
import React from 'react';
import { View, Text } from 'react-native';

import styles from '../../styles';
import EditTextComponent from '../editTextSetting';
import EditDateOfBirth from '../editDateOfBirthSetting';
import DropdownModal from '../pickerSelect/DropdownModal';
import PhoneNumberInput from '../editPhoneNumberSetting';
import BankNumberSetting from '../editBankNumberSetting/BankNumberSetting';

const PersonalInfoItem = ({
    label,
    type,
    value,
    onChangeText,
    onDateChange,
    data,
    onValueChange,
    linkFb,
    maxLength,
}) => {
    const renderContent = () => {
        switch (type) {
            case 'text':
                return (
                    <EditTextComponent
                        label={label}
                        value={value}
                        onChangeText={onChangeText}
                        maxLength={20}
                    />
                );
            case 'date':
                return (
                    <EditDateOfBirth
                        label={label}
                        initialValue={value}
                        onDateChange={onDateChange}
                    />
                );
            case 'dropdown':
                return (
                    <DropdownModal
                        style={[styles.textWhite, styles.fs16, styles.lh24, styles.fw400]}
                        data={data}
                    />
                );
            case 'phoneNumber':
                return (
                    <PhoneNumberInput label={label} value={value} onValueChange={onValueChange} />
                );
            case 'Url_Fb':
                return linkFb ? (
                    <EditTextComponent
                        label={label}
                        value={value}
                        onChangeText={onChangeText}
                        maxLength={20}
                    />
                ) : null;
            case 'myCar':
                return (
                    <EditTextComponent
                        label={label}
                        value={value}
                        onChangeText={onChangeText}
                        maxLength={20}
                    />
                );
            case 'bankAccount':
                return (
                    <BankNumberSetting
                        label={label}
                        value={value}
                        onChangeText={onChangeText}
                        maxLength={maxLength}
                    />
                );
            default:
                return (
                    <Text style={[styles.textWhite, styles.fs16, styles.lh24, styles.fw400]}>
                        {value}
                    </Text>
                );
        }
    };

    return (
        <View
            style={[styles.bg161e, styles.px15, styles.py12, styles.flexBetween, styles.borderBot]}
        >
            <Text style={[styles.textWhite, styles.fs16, styles.lh24, styles.fw300]}>{label}</Text>
            {renderContent()}
        </View>
    );
};

export default PersonalInfoItem;
