import { View } from 'react-native';
import React from 'react';
import MapView, { Marker } from 'react-native-maps';
import { useRoute } from '@react-navigation/native';
// import { Button } from 'react-native-web';

const MapScreen = () => {
  const {params: items} = useRoute();
  return (
    <View style={{ flex: 1 }}>
      <MapView
        style={{ flex: 1 }}
        initialRegion={{
          latitude: items?.coordinates.lat,
          longitude: items?.coordinates.lng,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        <Marker
          coordinate={{ latitude: items?.coordinates.lat, longitude: items?.coordinates.lng }}
          title="Marker Title"
          description="This is the marker description"
        />
      </MapView>
    </View>
  );
};

export default MapScreen;
