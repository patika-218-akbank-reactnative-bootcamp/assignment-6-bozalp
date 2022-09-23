import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, View, Dimensions, Alert, Image, TouchableOpacity } from 'react-native';
import { useSelector } from 'react-redux';
import MapView, { PROVIDER_GOOGLE, Marker, LatLng } from 'react-native-maps';
import * as Location from 'expo-location';

const CustomMarker = ({ coordinate, imageUrl }) => {

function s()
{
    Alert.alert("sa");
}

    return (
        <Marker coordinate={coordinate} onPress={s}>            
            <View style={styles.image_area}>
                <Image
                    style={styles.image}
                    source={{
                        uri: imageUrl
                    }}
                />
                <View style={styles.triangle} />
            </View>      
        </Marker >
    )
}

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
    };

    useEffect(() => {
        getCurrentLocation();
        // Alert.alert("sa");
    }, []);

    const coordDolmabahce = {
        latitude: 41.0391683,
        longitude: 28.9982707,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
    };
    const coordDolmabahce2 = {
        latitude: 40.0391683,
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
                showsMyLocationButton
                mapType="standard"
                // ref={mapRef}
                showsScale
                showsUserLocation
                style={styles.map}
            //minZoomLevel={15}
            >
                <CustomMarker coordinate={coordDolmabahce} imageUrl={'https://firebasestorage.googleapis.com/v0/b/snapchatapp-de814.appspot.com/o/b8b40622-f1e1-4c73-8f50-840bdd85266b?alt=media&token=abf69362-2762-4b5d-8532-0e55fd6dd0ad'} />
                <CustomMarker coordinate={coordDolmabahce2} imageUrl={'https://firebasestorage.googleapis.com/v0/b/snapchatapp-de814.appspot.com/o/b8b40622-f1e1-4c73-8f50-840bdd85266b?alt=media&token=abf69362-2762-4b5d-8532-0e55fd6dd0ad'} />



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
    image_area:
    {
        alignItems: 'center',
    },
    image:
    {
        width: 40,
        height: 40,
        borderRadius: 20,
        borderColor: 'red',
        borderWidth: 3,
    },
    triangle: {
        width: 0,
        height: 0,
        backgroundColor: "transparent",
        borderStyle: "solid",
        borderLeftWidth: 10,
        borderRightWidth: 10,
        borderBottomWidth: 25,
        borderLeftColor: "transparent",
        borderRightColor: "transparent",
        borderBottomColor: "red",
        bottom: 5,
        transform: [{ rotate: "180deg" }],
    },
});

export default Map;