import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity, Alert } from 'react-native';
import { useSelector } from 'react-redux';
import { firebaseConfig } from '../../firebaseConfig';
import { initializeApp } from "firebase/app";
import { getAuth, signOut } from "firebase/auth";
import AsyncStorage from '@react-native-async-storage/async-storage';
import Theme from './Theme';
import Button from '../../Components/Button';

const SettingsScreen = ({ navigation }) => {
    const theme = useSelector((state) => state.theme.theme);
    const app = initializeApp(firebaseConfig);
    const auth = getAuth(app);

    function LogOut() {
        resetStorage();
        auth.signOut().then(() => {
            navigation.navigate("SignIn");
        }).catch(error => Alert.alert(error.message));
    }

    const resetStorage = async () => {
        await AsyncStorage.removeItem('email');
        await AsyncStorage.removeItem('password');
    };

    function goToTheme() {
        navigation.navigate("Theme");
    }

    return (
        <View style={[styles.container, { backgroundColor: theme.backgroundColor }]}>
            <View style={styles.area}>
                <View>
                    <Button title={"Theme"} onPress={() => goToTheme()} />
                    <Button title={"Edit Profile"} onPress={null} />
                </View>

                <Button title={"Logout"} onPress={() => LogOut()} />

            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container:
    {
        flex: 1,
        padding: 20,
        alignItems: 'center',
    },
    area:
    {
        flex: 1,
        justifyContent:'space-between',
    }
});

export default SettingsScreen;