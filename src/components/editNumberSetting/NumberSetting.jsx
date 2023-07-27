import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';

import styles from '../../styles';
const NumberSetting = ({ maxLength, value, label, suffixes, pay }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [text, setText] = useState(value);
    const textInputRef = useRef(null);

    useEffect(() => {
        setText(value);
    }, [value]);

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
                    keyboardType="numeric"
                />
            ) : (
                <TouchableOpacity onPress={handleToggleEdit}>
                    <Text style={[styles.textWhite, styles.fs16, styles.lh24, styles.fw400]}>
                        {text} {suffixes}
                    </Text>
                </TouchableOpacity>
            )}
        </View>
    );
};

export default NumberSetting;
