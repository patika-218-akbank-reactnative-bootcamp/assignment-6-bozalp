import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, ActivityIndicator } from 'react-native';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { useState, useEffect } from 'react';
import Button from '../Components/Button';
import * as ImagePicker from 'expo-image-picker';

const Musics = ({ navigation }) => {
    const theme = useSelector((state) => state.theme.theme);
    const [musicList, setMusicList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [image, setImage] = useState(null);

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            quality: 1,
        });

        console.log(result);

        if (!result.cancelled) {
            setImage(result.uri);
        }
    };

    return (
        <View style={[styles.container, { backgroundColor: theme.backgroundColor }]}>
            <Text style={[styles.header_text, { color: theme.color }]}>Share image</Text>
            <View>
                <Button title="Select from gallery" onPress={pickImage} />
            </View>
            <View>
                {image && <Image source={{ uri: image }} style={styles.image} />}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
    },
    header_text:
    {
        fontWeight: '800',
        fontSize: 16,
        paddingTop: 10,
        paddingBottom: 50,
    },
    image:
    {
        width: 200,
        height: 200,
    },
});

export default Musics;