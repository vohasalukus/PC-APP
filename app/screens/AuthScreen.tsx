import { useState } from "react";
import {View, Text, TextInput, Pressable, Alert, StyleSheet, StatusBar} from "react-native";

export default function AuthScreen({ onLoginSuccess }: { onLoginSuccess: () => void }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const correctCredentials = {
        email: "ruslan",
        password: "111",
    };

    const handleLogin = () => {
        if (email === correctCredentials.email && password === correctCredentials.password) {
            onLoginSuccess();
        } else {
            Alert.alert("Ошибка", "Неверный логин или пароль.");
        }
    };

    return (
        <View style={styles.container}>
            <StatusBar backgroundColor="#1E1E2F"/>
            <TextInput
                style={styles.inputField}
                placeholder="Email"
                placeholderTextColor="#888"
                value={email}
                onChangeText={setEmail}
            />
            <TextInput
                style={styles.inputField}
                placeholder="Password"
                placeholderTextColor="#888"
                secureTextEntry
                value={password}
                onChangeText={setPassword}
            />
            <Pressable style={styles.loginButton} onPress={handleLogin}>
                <Text style={styles.loginButtonText}>Войти</Text>
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#1E1E2F",
    },
    inputField: {
        width: "80%",
        backgroundColor: "#2A2A3D",
        color: "#FFFFFF",
        padding: 10,
        marginVertical: 10,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: "#E94560",
    },
    loginButton: {
        backgroundColor: "#E94560",
        padding: 15,
        borderRadius: 10,
        marginTop: 20,
    },
    loginButtonText: {
        color: "#FFFFFF",
        fontWeight: "bold",
    },
});
