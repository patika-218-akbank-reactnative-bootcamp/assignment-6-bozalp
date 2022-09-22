import React, { useState } from 'react';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import { useSelector } from 'react-redux';
import MapView, { PROVIDER_GOOGLE, Marker, LatLng } from 'react-native-maps';
//import Geolocation from '@react-native-community/geolocation';

const Map = () => {
    const theme = useSelector((state) => state.theme.theme);
    /* const [coord, setCoord] = useState(LatLng);
 
     Geolocation.getCurrentPosition(
         (c) =>
             setCoord({
                 latitude: c.coords.latitude,
                 longitude: c.coords.longitude,
             }),
         (error) => console.log(error),
         {
             enableHighAccuracy: true,
         },
     );
 
     let myLocation = Location.getCurrentPositionAsync({})
     const loc = {
         latitude: myLocation.latitude,
         longitude: myLocation.longitude,
         latitudeDelta: myLocation.latitudeDelta,
         longitudeDelta: myLocation.longitudeDelta
     }
     const coordDolmabahce = {
         latitude: 41.0391683,
         longitude: 28.9982707,
         latitudeDelta: 0.01,
         longitudeDelta: 0.01,
     };*/

    return (
        <View style={[styles.container, { backgroundColor: theme.backgroundColor }]}>
            <Text style={[styles.header, { color: theme.color }]}>
                Map
            </Text>
            {/*  <MapView
                style={styles.map}
                provider={PROVIDER_GOOGLE}
                initialRegion={coordDolmabahce}
            >
                {coord !== undefined && <Marker coordinate={coord} />}
    </MapView>*/}
        </View >
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    map: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
    },
});

export default Map;