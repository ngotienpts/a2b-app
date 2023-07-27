import React, { useRef } from 'react';
import { View, Text } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import BottomSheet from '@gorhom/bottom-sheet';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

const PickComponent = () => {
    const bottomSheetRef = useRef(null);

    return (
        <View style={{ flex: 1 }}>
            <GestureHandlerRootView style={{ flex: 1 }}>
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

                {/* Bottom Sheet Drawer */}
                <BottomSheet ref={bottomSheetRef} snapPoints={['20%', '50%', '90%']}>
                    <View style={{ backgroundColor: 'white', padding: 16 }}>
                        <Text style={{ fontSize: 24 }}>Bottom Sheet Drawer</Text>
                        <Text style={{ fontSize: 16, marginTop: 10 }}>
                            This is the content of the Bottom Sheet Drawer.
                        </Text>
                        <Text style={{ fontSize: 16, marginTop: 10 }}>
                            This is the content of the Bottom Sheet Drawer.
                        </Text>
                        <Text style={{ fontSize: 16, marginTop: 10 }}>
                            This is the content of the Bottom Sheet Drawer.
                        </Text>
                        <Text style={{ fontSize: 16, marginTop: 10 }}>
                            This is the content of the Bottom Sheet Drawer.
                        </Text>
                        <Text style={{ fontSize: 16, marginTop: 10 }}>
                            This is the content of the Bottom Sheet Drawer.
                        </Text>
                    </View>
                </BottomSheet>
            </GestureHandlerRootView>
        </View>
    );
};

export default PickComponent;
