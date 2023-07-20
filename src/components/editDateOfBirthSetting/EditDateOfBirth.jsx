import { View, Text, TouchableOpacity, Platform } from 'react-native';
import React, { useState } from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';
import { format } from 'date-fns';

import styles from '../../styles';

const EditDateOfBirth = ({ label, initialValue }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [date, setDate] = useState(new Date(initialValue));

    const handleToggleEdit = () => {
        setIsEditing(!isEditing);
    };

    const onChangeDate = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        handleToggleEdit(Platform.OS === 'ios');
        setDate(currentDate);
    };
    return (
        <View>
            {isEditing ? (
                <DateTimePicker
                    value={date}
                    mode="date"
                    display="default"
                    onChange={onChangeDate}
                />
            ) : (
                <TouchableOpacity onPress={handleToggleEdit}>
                    <Text style={[styles.textWhite, styles.fs16, styles.lh24, styles.fw400]}>
                        {format(date, 'dd/MM/yyyy')}
                    </Text>
                </TouchableOpacity>
            )}
        </View>
    );
};

export default EditDateOfBirth;
