import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, View, Dimensions, Alert } from 'react-native';
import { useSelector } from 'react-redux';
import MapView, { PROVIDER_GOOGLE, Marker, LatLng } from 'react-native-maps';
import * as Location from 'expo-location';

const Map = () => {
    const theme = useSelector((state) => state.theme.theme);
    const [yourLocation, setLocation] = useState(null);
    const [lat, setLat] = useState(null);
    const [long, setLong] = useState(null);
    const mapRef = useRef();

    const getCurrentLocation = async () => {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
            Alert.alert('Permission to access location was denied');
            return;
        }

        let location = await Location.watchPositionAsync(
            {
                distanceInterval: 10,
            },
            location => {
                setLocation(location);
                setLat(location.coords.latitude);
                setLong(location.coords.longitude);
                mapRef.current.animateToRegion({
                    latitude: location.coords.latitude,
                    longitude: location.coords.longitude,
                });
            },
        );
        // Alert.alert(location);
    };

    const updateUsersCurrentLocation = async location => {
        //const docRef = doc(db, 'user', user.id);
        await updateDoc(docRef, {
            currentLocation: {
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
            },
        });
    };

    useEffect(() => {
        getCurrentLocation();
        Alert.alert("sa");
    }, []);

    /*const loc = {
        latitude: myLocation.latitude,
        longitude: myLocation.longitude,
        latitudeDelta: myLocation.latitudeDelta,
        longitudeDelta: myLocation.longitudeDelta
    }*/
    const coordDolmabahce = {
        latitude: 41.0391683,
        longitude: 28.9982707,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
    };

    return (
        <View style={[styles.container, { backgroundColor: theme.backgroundColor }]}>
            <Text style={[styles.header, { color: theme.color }]}>
                Map
            </Text>
            <MapView
                 initialRegion={coordDolmabahce}
                //showsMyLocationButton
                mapType="standard"
               // ref={mapRef}
                showsScale
                showsUserLocation
                style={styles.map}
            //minZoomLevel={15}
            >
                
                

            </MapView>
            {/*  <MapView
                style={styles.map}
                provider={PROVIDER_GOOGLE}
                initialRegion={coordDolmabahce}
            >
               <Marker coordinate={{
                    latitude: yourLocation.coords.latitude,
                    longitude: yourLocation.coords.longitude,
                }} />

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