import React, { memo, useRef, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';

import styles from '../../styles';

const EditTextComponent = ({ label, initialValue, maxLength }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [text, setText] = useState(initialValue);
    const textInputRef = useRef(null);
    const handleToggleEdit = () => {
        setIsEditing(!isEditing);
    };

    const handleSave = () => {
        if (text.trim() === '') {
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
                    value={text}
                    maxLength={maxLength}
                    onChangeText={(newText) => setText(newText)}
                    onBlur={handleSave}
                    autoFocus
                    style={[styles.textWhite, styles.fs16, styles.lh24]}
                />
            ) : (
                <TouchableOpacity onPress={handleToggleEdit}>
                    <Text style={[styles.textWhite, styles.fs16, styles.lh24, styles.fw400]}>
                        {text}
                    </Text>
                </TouchableOpacity>
            )}
        </View>
    );
};

export default memo(EditTextComponent);
