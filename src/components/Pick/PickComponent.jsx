import 'react-native-gesture-handler';
import React, { useRef } from 'react';
import MapView, { Marker } from 'react-native-maps';
import { Text, View } from 'react-native';
import { BottomSheetModal, BottomSheetModalProvider, TouchableOpacity } from '@gorhom/bottom-sheet';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import styles from '../../styles';
import { useNavigation } from '@react-navigation/native';
const PickComponent = () => {
    const navigation = useNavigation();
    const bottomSheetModalRef = useRef(null);
    const snapPoints = ['25%', '90%'];
    return (
        <GestureHandlerRootView style={[styles.flexFull]}>
            <BottomSheetModalProvider>
                <View style={[styles.flexFull, styles.bgGray2727]}>
                    <View style={{ flex: 1 }}>
                        <MapView
                            style={{ flex: 1 }}
                            initialRegion={{
                                latitude: 37.78825,
                                longitude: -122.4324,
                                latitudeDelta: 0.0922,
                                longitudeDelta: 0.0421,
                            }}
                        >
                            <Marker
                                coordinate={{ latitude: 37.78825, longitude: -122.4324 }}
                                title="Marker Title"
                                description="This is the marker description"
                            />
                        </MapView>
                        <BottomSheetModal
                            ref={bottomSheetModalRef}
                            index={0}
                            snapPoints={snapPoints}
                        >
                            <View>
                                <Text>Helloffgfdgfgf</Text>
                            </View>
                        </BottomSheetModal>
                    </View>
                    <TouchableOpacity onPress={() => navigation.navigate('MovingScreen')}>
                        <Text style={[styles.textCenter, styles.fs27]}>Go Moving</Text>
                    </TouchableOpacity>
                </View>
            </BottomSheetModalProvider>
        </GestureHandlerRootView>
    );
};

export default PickComponent;
