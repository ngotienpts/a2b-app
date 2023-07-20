import { View, Text } from 'react-native';
import React from 'react';
import SelectDropdown from 'react-native-select-dropdown';

const PickerSelect = () => {
    const countries = ['Nam', 'Nữ', 'Khác'];
    return (
        <SelectDropdown
            data={countries}
            onSelect={(selectedItem, index) => {
                console.log(selectedItem, index);
            }}
            buttonTextAfterSelection={(selectedItem, index) => {
                return selectedItem;
            }}
            rowTextForSelection={(item, index) => {
                return item;
            }}
        />
    );
};

export default PickerSelect;
