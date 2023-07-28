import React, { memo, useRef, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';

import styles from '../../styles';

const EditTextComponent = ({ label, maxLength, value, onChangeText }) => {
    const [isEditing, setIsEditing] = useState(false);
    const textInputRef = useRef(null);
    const handleToggleEdit = () => {
        setIsEditing(!isEditing);
    };

    const handleSave = () => {
        if (value.trim() === '') {
            Alert.alert(`${label} không được để trống`);
            if (textInputRef.current) {
                textInputRef.current.focus();
            }
        } else {
            setIsEditing(false);
        }
    };
    return (
        <View>
            {isEditing ? (
                <TextInput
                    ref={textInputRef}
                    value={value}
                    maxLength={maxLength}
                    onChangeText={onChangeText}
                    onBlur={handleSave}
                    autoFocus
                    style={[styles.textWhite, styles.fs16, styles.lh24]}
                />
            ) : (
                <TouchableOpacity onPress={handleToggleEdit}>
                    <Text style={[styles.textWhite, styles.fs16, styles.lh24, styles.fw400]}>
                        {value}
                    </Text>
                </TouchableOpacity>
            )}
        </View>
    );
};

export default memo(EditTextComponent);