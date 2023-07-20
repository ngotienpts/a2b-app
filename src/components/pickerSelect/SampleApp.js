import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import ModalSelector from 'react-native-modal-selector';

const SampleApp = () => {
    const [selectedFruit, setSelectedFruit] = useState(null);

    const data = [
        { key: 0, section: true, label: 'Fruits' },
        { key: 1, label: 'Apple' },
        { key: 2, label: 'Banana' },
        { key: 3, label: 'Cherry' },
        { key: 4, label: 'Orange' },
    ];

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ fontSize: 24, marginBottom: 20 }}>Select a fruit:</Text>

            <ModalSelector
                data={data}
                initValue="Select a fruit"
                onChange={(option) => setSelectedFruit(option.label)}
            />

            <View style={{ marginTop: 20 }}>
                <Text>You selected: {selectedFruit || 'None'}</Text>
            </View>
        </View>
    );
};

export default SampleApp;
