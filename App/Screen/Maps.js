import React, { useState } from 'react';
import { Marker } from 'react-native-maps';
import { View, StyleSheet } from 'react-native';
import MapView from 'react-native-maps';
const Maps = ({ route}) => {
  const [mapRegion, setmapRegion] = useState({
    latitude: 26.5113,
    longitude: 80.2349,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });
  return (
    <View style={styles.container}>
      <MapView
        style={{ alignSelf: 'stretch', height: '100%' }}
        region={mapRegion}
      >
      <Marker coordinate={mapRegion} title='Car Live Location' />
      </MapView>
    </View>
  );
};
export default Maps;
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});