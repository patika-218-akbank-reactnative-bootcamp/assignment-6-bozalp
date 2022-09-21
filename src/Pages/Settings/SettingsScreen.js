import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity, Alert } from 'react-native';
import { useSelector } from 'react-redux';
import { firebaseConfig } from '../../firebaseConfig';
import { initializeApp } from "firebase/app";
import { getAuth, signOut } from "firebase/auth";
import AsyncStorage from '@react-native-async-storage/async-storage';
import Theme from './Theme';

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
            <View style={{ alignItems: 'center', }}>
                <TouchableOpacity activeOpacity={0.7} onPress={goToTheme}
                    style={[styles.buttons, { borderWidth: 1, borderColor: theme.color }]}>
                    <Text style={{ color: theme.color }}>
                        Theme
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity activeOpacity={0.7} onPress={null}
                    style={[styles.buttons, { borderWidth: 1, borderColor: theme.color }]}>
                    <Text style={{ color: theme.color }}>
                        Edit Profile
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity activeOpacity={0.7} onPress={() => LogOut()}
                    style={[styles.buttons, { borderWidth: 1, borderColor: theme.color }]}>
                    <Text style={{ color: theme.color }}>
                        Logout
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container:
    {
        flex: 1,
        padding: 10,
    },
    header:
    {
        fontSize: 18,
        textAlign: 'center',
        fontWeight: 'bold',
    },
    buttons:
    {
        width: '80%',
        height: 64,
        marginBottom: 10,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
    },
});

export default SettingsScreen;