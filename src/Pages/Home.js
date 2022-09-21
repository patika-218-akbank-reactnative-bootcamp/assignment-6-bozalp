import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, FlatList, ActivityIndicator } from 'react-native';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { useState, useEffect } from 'react';

const Musics = ({ navigation }) => {
    const theme = useSelector((state) => state.theme.theme);
    const [musicList, setMusicList] = useState([]);
    const [loading, setLoading] = useState(true);


    return (
        <View style={[styles.container, { backgroundColor: theme.backgroundColor }]}>
           <Text style={{color:theme.color}}>Main</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default Musics;