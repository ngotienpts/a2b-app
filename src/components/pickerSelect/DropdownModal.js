import React, { useState } from 'react';
import { View, Text, Modal, TouchableOpacity, ScrollView, Dimensions } from 'react-native';

import styles from '../../styles';
const DropdownModal = ({ style, data }) => {
    if (!Array.isArray(data)) {
        data = [];
    }

    const [selectedItem, setSelectedItem] = useState(() => (data.length > 0 ? data[0].label : ''));
    const [modalVisible, setModalVisible] = useState(false);

    const handleSelectItem = (itemLabel) => {
        setSelectedItem(itemLabel);
        setModalVisible(false);
    };

    const handleCloseModal = () => {
        setModalVisible(false);
    };

    const maxHeight = Dimensions.get('window').height * 0.7;

    return (
        <View>
            {/* Button to open the modal */}
            <TouchableOpacity onPress={() => setModalVisible(true)}>
                <Text style={style}>{selectedItem}</Text>
            </TouchableOpacity>

            {/* Modal */}
            <Modal visible={modalVisible} animationType="slide" transparent>
                <TouchableOpacity
                    style={[
                        styles.flexFull,
                        styles.itemsCenter,
                        styles.justifyCenter,
                        styles.bgBlack50,
                    ]}
                    onPress={handleCloseModal}
                >
                    <View
                        style={[
                            styles.bgWhite,
                            styles.border10,
                            styles.hidden,
                            { maxHeight: maxHeight, width: '80%' },
                        ]}
                    >
                        <ScrollView showsVerticalScrollIndicator={false}>
                            {data.map((item) => (
                                <TouchableOpacity
                                    key={item.id}
                                    onPress={() => handleSelectItem(item.label)}
                                    style={[
                                        styles.py10,
                                        selectedItem === item?.label && styles.bg161e,
                                    ]}
                                >
                                    <Text
                                        style={[
                                            styles.fs18,
                                            styles.px10,

                                            selectedItem === item?.label
                                                ? styles.textWhite
                                                : styles.textGray77,
                                        ]}
                                    >
                                        {item.label}
                                    </Text>
                                </TouchableOpacity>
                            ))}
                        </ScrollView>
                    </View>
                </TouchableOpacity>
            </Modal>
        </View>
    );
};

export default DropdownModal;
